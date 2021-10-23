import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/auth'
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
} from '../API'
import { listPostsByDate } from '../graphql/queries'
import {
  deletePost as deletePostQuery,
  deleteCode as deleteCodeQuery,
} from '../graphql/mutations'
import { useRecoilValue } from 'recoil'
import { PostListItem } from './PostListItem'
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
} from '../utils/subscribe'
import { useArraySettor } from '../utils/recoilArraySettor'
import { connectedPostsState, postsState } from '../state/postsState'
import { codesState } from '../state/codesState'
import { commentsState } from '../state/commentsState'
import { notNull, Nullable } from '../utils/nullable'

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

  const [nextToken, setNextToken] = useState<Nullable<string>>()
  const [typingID, setTypingID] = useState<string>('')

  const classes = useStyle()

  const handleGetPosts = async (type: QueryType) => {
    const queryVariables: ListPostsByDateQueryVariables = {
      type: 'post',
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
      nextToken: nextToken,
    }

    const res = (await API.graphql(
      graphqlOperation(listPostsByDate, queryVariables)
    )) as GraphQLResult<ListPostsByDateQuery>

    const posts = res.data?.listPostsByDate?.items?.filter(notNull) ?? []

    const omitPosts = posts.map((post) => omitPost(post))
    const omitCodes = posts
      .map((post) => post.codes?.items)
      .flat()
      .filter(notNull)
    const omitComment = posts
      .map((post) => post.comments?.items)
      .flat()
      .filter(notNull)

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
    setNextToken(res.data?.listPostsByDate?.nextToken)
  }

  const handleGetAdditionalPosts = () => {
    if (!isInit) return
    nextToken && handleGetPosts('APPEND')
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

    const codeIds = deletePostResult.data?.deletePost?.codes?.items
      ?.filter(notNull)
      .map((code) => code.id)

    codeIds?.forEach(async (id) => {
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
        const post = msg.value.data?.onCreatePost
        post && setPosts.createItem(omitPost(post))
      },
    })

    const deletePostSubscription = subscribeDeletePost({
      next: (msg) => {
        const post = msg.value.data?.onDeletePost
        post && setPosts.deleteItem(omitPost(post))
      },
    })

    const createCodeSubscription = subscribeCreateCode({
      next: (msg) => {
        const code = msg.value.data?.onCreateCode
        code && setCodes.createItem(omitCode(code))
      },
    })
    const deleteCodeSubscription = subscribeDeleteCode({
      next: (msg) => {
        const code = msg.value.data?.onDeleteCode
        code && setCodes.deleteItem(omitCode(code))
      },
    })

    const createCommentSubscription = subscribeCreateComment({
      next: (msg) => {
        const comment = msg.value.data?.onCreateComment
        comment && setComments.createItem(omitComment(comment))
      },
    })
    const deleteCommentSubscription = subscribeDeleteComment({
      next: (msg) => {
        const comment = msg.value.data?.onDeleteComment
        comment && setComments.deleteItem(omitComment(comment))
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
