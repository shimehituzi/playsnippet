import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/auth'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import {
  ListPostsByDateQueryVariables,
  ModelSortDirection,
  ListPostsByDateQuery,
  DeletePostMutationVariables,
  DeletePostMutation,
  DeleteCodeMutationVariables,
  Post,
  Code,
} from '../../API'
import { listPostsByDate } from '../../graphql/queries'
import {
  deletePost as deletePostQuery,
  deleteCode as deleteCodeQuery,
} from '../../graphql/mutations'
import { PostListItem } from '../component/PostListItem'
import { Button, Card, colors, Grid, makeStyles } from '@material-ui/core'
import { PostForm } from './PostForm'
import { useRecoilValue } from 'recoil'
import { connectedPostsState, usePostsSettor } from '../../state/postsState'
import { useCodesSettor } from '../../state/codesState'
import {
  subscribeCreateCode,
  subscribeCreatePost,
  subscribeDeleteCode,
  subscribeDeletePost,
} from '../../utils/subscribe'

const useStyle = makeStyles({
  card: {
    backgroundColor: colors.grey[500],
    padding: '1%',
    paddingLeft: '5%',
    paddingRight: '5%',
    minWidth: 726,
  },
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

type QueryType = 'INIT' | 'APPEND'
export const PostList: React.FC = () => {
  const { authenticated, user, isInit } = useAuth()
  const rPost = useRecoilValue(connectedPostsState)
  const { initPosts, appendPosts, deletePost, createPost } = usePostsSettor()
  const { initCodes, appendCodes, deleteCode, createCode } = useCodesSettor()

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

    switch (type) {
      case 'INIT':
        initPosts(omitPosts)
        initCodes(omitCodes)
        break
      case 'APPEND':
        appendPosts(omitPosts)
        appendCodes(omitCodes)
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
        createPost(omitPost(msg.value.data.onCreatePost))
      },
    })

    const deletePostSubscription = subscribeDeletePost({
      next: (msg) => {
        deletePost(omitPost(msg.value.data.onDeletePost))
      },
    })

    const createCodeSubscription = subscribeCreateCode({
      next: (msg) => {
        createCode(omitCode(msg.value.data.onCreateCode))
      },
    })
    const deleteCodeSubscription = subscribeDeleteCode({
      next: (msg) => {
        deleteCode(omitCode(msg.value.data.onDeleteCode))
      },
    })

    return () => {
      createPostSubscription.unsubscribe()
      deletePostSubscription.unsubscribe()
      createCodeSubscription.unsubscribe()
      deleteCodeSubscription.unsubscribe()
    }
  }, [isInit])

  return (
    <React.Fragment>
      {authenticated && <PostForm />}
      <Grid container alignItems="center" justifyContent="center">
        {rPost.map((post, key) => (
          <Grid item xs={12} className={classes.grid} key={key}>
            <Card className={classes.card}>
              <PostListItem
                post={post}
                typingID={typingID}
                setTypingID={setTypingID}
                handleDeletePost={handleDeletePost}
                isOwner={user ? user.username === post.owner : false}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item>
          <Button onClick={handleGetAdditionalPosts} variant="outlined">
            Read more
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
