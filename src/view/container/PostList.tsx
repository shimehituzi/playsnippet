import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../../hooks/auth'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import {
  Post,
  ListPostsByDateQueryVariables,
  ModelSortDirection,
  ListPostsByDateQuery,
  OnCreateCodeSubscription,
  OnDeletePostSubscription,
  DeletePostMutationVariables,
  DeletePostMutation,
  DeleteCodeMutationVariables,
} from '../../API'
import { listPostsByDate } from '../../graphql/queries'
import { deletePost, deleteCode } from '../../graphql/mutations'
import { onCreateCode, onDeletePost } from '../../graphql/subscriptions'
import { Observable } from '../../../node_modules/zen-observable-ts'
import { PostListItem } from '../component/PostListItem'
import { Button, Card, colors, Grid, makeStyles } from '@material-ui/core'
import { PostForm } from './PostForm'
import { useRecoilValue } from 'recoil'
import { connectedPostsState, usePostsSettor } from '../../state/postsState'
import { useCodesSettor } from '../../state/codesState'

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

enum ActionType {
  Delete = 'Delete',
  Subscription = 'subscription',
  InitialQuery = 'initialQuery',
  AdditionalQuery = 'additionalQuery',
}

type ReducerAction = {
  type: ActionType
  post?: Post
  posts?: Post[]
  deleteID?: string
}

const reducer = (state: Post[], action: ReducerAction) => {
  switch (action.type) {
    case ActionType.InitialQuery:
      return action.posts
    case ActionType.AdditionalQuery:
      return [...state, ...action.posts]
    case ActionType.Subscription:
      return [action.post, ...state]
    case ActionType.Delete:
      return state.filter((post) => post.id !== action.deleteID)
    default:
      return state
  }
}

export const PostList: React.FC = () => {
  const { authenticated, user, authMode, isInit } = useAuth()
  const rPost = useRecoilValue(connectedPostsState)
  const {
    initPosts,
    appendPosts,
    deletePost: setDeletePost,
    createPost: setCreatePost,
  } = usePostsSettor()
  const {
    initCodes,
    appendCodes,
    deleteCode: setDeleteCode,
    createCode: setCreateCode,
  } = useCodesSettor()

  const [posts, dispatch] = useReducer(reducer, [])
  const [nextToken, setNextToken] = useState<string | null>(null)
  const [typingID, setTypingID] = useState<string>('')

  const classes = useStyle()

  const handleGetPosts = async (type: ActionType, nextToken = null) => {
    const queryVariables: ListPostsByDateQueryVariables = {
      type: 'post',
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
      nextToken: nextToken,
    }

    const res = (await API.graphql({
      ...graphqlOperation(listPostsByDate, queryVariables),
      authMode,
    })) as GraphQLResult<ListPostsByDateQuery>

    const posts = res.data.listPostsByDate.items

    const omitPosts = posts.map((post) => {
      const { codes: _codes, comments: _comments, ...omitPost } = post
      return omitPost
    })

    const omitCodes = posts.map((post) => post.codes.items).flat()

    switch (type) {
      case ActionType.InitialQuery:
        initPosts(omitPosts)
        initCodes(omitCodes)
        break
      case ActionType.AdditionalQuery:
        appendPosts(omitPosts)
        appendCodes(omitCodes)
        break
    }
    dispatch({ type: type, posts: res.data.listPostsByDate.items })
    setNextToken(res.data.listPostsByDate.nextToken)
  }

  const handleDeletePost = async (postId: string) => {
    const deletePostVariables: DeletePostMutationVariables = {
      input: {
        id: postId,
      },
    }

    const deletePostResult = (await API.graphql({
      ...graphqlOperation(deletePost, deletePostVariables),
      authMode,
    })) as GraphQLResult<DeletePostMutation>

    const codeIds = deletePostResult.data.deletePost.codes.items.map(
      (code) => code.id
    )

    codeIds.forEach(async (id) => {
      const deleteCodeVariables: DeleteCodeMutationVariables = {
        input: {
          id: id,
        },
      }

      await API.graphql({
        ...graphqlOperation(deleteCode, deleteCodeVariables),
        authMode,
      })
    })
  }

  const handleGetAdditionalPosts = () => {
    if (nextToken === null) return
    if (!isInit) return
    handleGetPosts(ActionType.AdditionalQuery, nextToken)
  }

  useEffect(() => {
    if (!isInit) return
    handleGetPosts(ActionType.InitialQuery)

    type CreateCodeClient = Observable<{
      value: GraphQLResult<OnCreateCodeSubscription>
    }>
    const createCodeClient = API.graphql({
      ...graphqlOperation(onCreateCode),
      authMode,
    }) as CreateCodeClient
    const createCodeSubscription = createCodeClient.subscribe({
      next: (msg) => {
        const post = msg.value.data.onCreateCode.post
        dispatch({ type: ActionType.Subscription, post: post })
      },
    })

    type DeletePostClient = Observable<{
      value: GraphQLResult<OnDeletePostSubscription>
    }>
    const deletePostClient = API.graphql({
      ...graphqlOperation(onDeletePost),
      authMode,
    }) as DeletePostClient
    const deletePostSubscription = deletePostClient.subscribe({
      next: (msg) => {
        const deleteID = msg.value.data.onDeletePost.id
        dispatch({ type: ActionType.Delete, deleteID })
      },
    })

    return () => {
      createCodeSubscription.unsubscribe()
      deletePostSubscription.unsubscribe()
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
