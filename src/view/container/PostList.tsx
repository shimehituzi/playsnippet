import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/auth'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import {
  ListPostsByDateQueryVariables,
  ListPostsByDateQuery,
  DeletePostMutationVariables,
  DeletePostMutation,
  DeleteCodeMutationVariables,
  ModelSortDirection,
  Post,
  Code,
  Comment,
} from '../../API'
import { listPostsByDate } from '../../graphql/queries'
import {
  deletePost as deletePostQuery,
  deleteCode as deleteCodeQuery,
} from '../../graphql/mutations'
import { useRecoilValue } from 'recoil'
import { PostListItem } from '../component/PostListItem'
import { PostForm } from './PostForm'
import { Button, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  subscribeCreatePost,
  subscribeCreateCode,
  subscribeCreateComment,
  subscribeDeletePost,
  subscribeDeleteCode,
  subscribeDeleteComment,
} from '../../utils/subscribe'
import { useArraySettor } from '../../utils/recoilArraySettor'
import { connectedPostsState, postsState } from '../../state/postsState'
import { codesState } from '../../state/codesState'
import { commentsState } from '../../state/commentsState'

const useStyle = makeStyles({
  grid: {
    padding: '2%',
  },
})

const omitPost = (post: Post) => {
  const { codes: _, comments: __, ...omitPost } = post
  return omitPost
}

const omitCode = (code: Code) => {
  const { post: _, ...omitCode } = code
  return omitCode
}

const omitComment = (comment: Comment) => {
  const { post: _, ...omitComment } = comment
  return omitComment
}

type QueryType = 'INIT' | 'APPEND'
export const PostList: React.FC = () => {
  const { authenticated, user, isInit } = useAuth()
  const posts = useRecoilValue(connectedPostsState)
  const setPosts = useArraySettor(postsState, 'DESC')
  const setCodes = useArraySettor(codesState, 'ASC')
  const setComments = useArraySettor(commentsState, 'ASC')

  const [nextToken, setNextToken] = useState<string | null>(null)
  const [typingID, setTypingID] = useState<string>('')

  const classes = useStyle()

  const handleGetPosts = async (type: QueryType, nextToken = null) => {
    const queryVariables: ListPostsByDateQueryVariables = {
      type: 'post',
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
      nextToken: nextToken,
    }

    const res = (await API.graphql(
      graphqlOperation(listPostsByDate, queryVariables)
    )) as GraphQLResult<ListPostsByDateQuery>

    const posts = res.data.listPostsByDate.items

    const omitPosts = posts.map((post) => omitPost(post))
    const omitCodes = posts.map((post) => post.codes.items).flat()
    const omitComment = posts.map((post) => post.comments.items).flat()

    switch (type) {
      case 'INIT':
        setPosts.initItems(omitPosts)
        setCodes.initItems(omitCodes)
        setComments.initItems(omitComment)
        break
      case 'APPEND':
        setPosts.appendItems(omitPosts)
        setCodes.appendItems(omitCodes)
        setComments.initItems(omitComment)
        break
    }
    setNextToken(res.data.listPostsByDate.nextToken)
  }

  const handleGetAdditionalPosts = () => {
    if (nextToken === null) return
    if (!isInit) return
    handleGetPosts('APPEND', nextToken)
  }

  useEffect(() => {
    if (!isInit) return
    handleGetPosts('INIT')
  }, [isInit])

  const handleDeletePost = async (postId: string) => {
    const deletePostVariables: DeletePostMutationVariables = {
      input: {
        id: postId,
      },
    }

    const deletePostResult = (await API.graphql(
      graphqlOperation(deletePostQuery, deletePostVariables)
    )) as GraphQLResult<DeletePostMutation>

    const codeIds = deletePostResult.data.deletePost.codes.items.map(
      (code) => code.id
    )

    codeIds.forEach(async (id) => {
      const deleteCodeVariables: DeleteCodeMutationVariables = {
        input: {
          id: id,
        },
      }

      await API.graphql(graphqlOperation(deleteCodeQuery, deleteCodeVariables))
    })
  }

  useEffect(() => {
    if (!isInit) return

    const createPostSubscription = subscribeCreatePost({
      next: (msg) => {
        setPosts.createItem(omitPost(msg.value.data.onCreatePost))
      },
    })

    const deletePostSubscription = subscribeDeletePost({
      next: (msg) => {
        setPosts.deleteItem(omitPost(msg.value.data.onDeletePost))
      },
    })

    const createCodeSubscription = subscribeCreateCode({
      next: (msg) => {
        setCodes.createItem(omitCode(msg.value.data.onCreateCode))
      },
    })
    const deleteCodeSubscription = subscribeDeleteCode({
      next: (msg) => {
        setCodes.deleteItem(omitCode(msg.value.data.onDeleteCode))
      },
    })

    const createCommentSubscription = subscribeCreateComment({
      next: (msg) => {
        setComments.createItem(omitComment(msg.value.data.onCreateComment))
      },
    })
    const deleteCommentSubscription = subscribeDeleteComment({
      next: (msg) => {
        setComments.deleteItem(omitComment(msg.value.data.onDeleteComment))
      },
    })

    return () => {
      createPostSubscription.unsubscribe()
      deletePostSubscription.unsubscribe()
      createCodeSubscription.unsubscribe()
      deleteCodeSubscription.unsubscribe()
      createCommentSubscription.unsubscribe()
      deleteCommentSubscription.unsubscribe()
    }
  }, [isInit])

  return (
    <Grid container alignItems="center" justifyContent="center">
      {authenticated && (
        <Grid item xs={12} className={classes.grid}>
          <PostForm />
        </Grid>
      )}
      {posts.map((post, key) => (
        <Grid item xs={12} className={classes.grid} key={key}>
          <PostListItem
            post={post}
            typingID={typingID}
            setTypingID={setTypingID}
            handleDeletePost={handleDeletePost}
            isOwner={user ? user.username === post.owner : false}
          />
        </Grid>
      ))}
      <Grid item>
        <Button onClick={handleGetAdditionalPosts} variant="outlined">
          Read more
        </Button>
      </Grid>
    </Grid>
  )
}
