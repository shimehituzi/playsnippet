import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../hooks'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { createCode, createPost } from '../graphql/mutations'
import {
  CreatePostMutationVariables,
  CreatePostMutation,
  ListPostsByDateQueryVariables,
  ModelSortDirection,
  ListPostsByDateQuery,
  CreateCodeMutationVariables,
  OnCreateCodeSubscription,
  Post,
} from '../API'
import { listPostsByDate } from '../graphql/queries'
import { onCreateCode } from '../graphql/subscriptions'
import { Observable } from '../../node_modules/zen-observable-ts'
import { PostListItem } from '../component/postListItem'
import { Card, colors, Grid, makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
  tiles: {
    padding: '1%',
  },
  card: {
    backgroundColor: colors.grey[500],
    padding: '1%',
    paddingLeft: '5%',
  },
  grid: {
    padding: '1%',
  },
})

enum ActionType {
  Subscription = 'subscription',
  InitialQuery = 'initialQuery',
  AdditionalQuery = 'additionalQuery',
}

type ReducerAction = {
  type: ActionType
  post?: Post
  posts?: Post[]
}

const reducer = (state: Post[], action: ReducerAction) => {
  switch (action.type) {
    case ActionType.InitialQuery:
      return action.posts
    case ActionType.AdditionalQuery:
      return [...state, ...action.posts]
    case ActionType.Subscription:
      return [action.post, ...state]
    default:
      return state
  }
}

const PostList: React.FC = () => {
  const { authenticated, authMode, isInit } = useAuth()

  const [posts, dispatch] = useReducer(reducer, [])
  const [nextToken, setNextToken] = useState<string | null>(null)

  const classes = useStyle()

  const getPosts = async (type: ActionType, nextToken = null) => {
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

    dispatch({ type: type, posts: res.data.listPostsByDate.items })
    setNextToken(res.data.listPostsByDate.nextToken)
  }

  const getAdditionalPosts = () => {
    if (nextToken === null) return
    if (!isInit) return
    getPosts(ActionType.AdditionalQuery, nextToken)
  }

  useEffect(() => {
    if (!isInit) return
    getPosts(ActionType.InitialQuery)

    type Clinet = Observable<{ value: GraphQLResult<OnCreateCodeSubscription> }>
    const client = API.graphql({
      ...graphqlOperation(onCreateCode),
      authMode,
    }) as Clinet
    const subscription = client.subscribe({
      next: (msg) => {
        const post = msg.value.data.onCreateCode.post
        dispatch({ type: ActionType.Subscription, post: post })
      },
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [isInit])

  return (
    <React.Fragment>
      {authenticated && <PostForm />}
      <Grid container className={classes.tiles}>
        {posts.map((post, key) => (
          <Grid item xs={4} className={classes.grid} key={key}>
            <Card className={classes.card}>
              <PostListItem post={post} />
            </Card>
          </Grid>
        ))}
      </Grid>
      <button onClick={getAdditionalPosts}>Read more</button>
    </React.Fragment>
  )
}

type CodeInput = {
  name: string
  lang: string
  code: string
}

const PostForm: React.FC = () => {
  const [content, setContent] = useState('')
  const [code, setCode] = useState<CodeInput>({
    code: '',
    lang: '',
    name: '',
  })

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const onChangeCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode({
      ...code,
      code: e.target.value,
    })
  }

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode({
      ...code,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (code.code === '') return
    if (code.name === '') return
    if (code.lang === '') return
    if (content === '') return

    const createPostMutationVariables: CreatePostMutationVariables = {
      input: {
        content: content,
        type: 'post',
      },
    }
    const res = (await API.graphql(
      graphqlOperation(createPost, createPostMutationVariables)
    )) as GraphQLResult<CreatePostMutation>

    const createCodeMutationVariables: CreateCodeMutationVariables = {
      input: {
        ...code,
        skipline: '',
        postID: res.data.createPost.id,
        type: 'code',
      },
    }
    await API.graphql(graphqlOperation(createCode, createCodeMutationVariables))

    setContent('')
    setCode({
      code: '',
      lang: '',
      name: '',
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <textarea
            value={code.code}
            onChange={onChangeCode}
            placeholder="code"
          />
          <input
            type="text"
            value={code.name}
            id="name"
            onChange={onChangeInput}
            placeholder="code title"
          />
          <input
            type="text"
            value={code.lang}
            id="lang"
            onChange={onChangeInput}
            placeholder="code lang"
          />
        </Grid>
        <Grid item xs={12}>
          <textarea
            value={content}
            onChange={onChangeContent}
            placeholder="post content"
          />
        </Grid>
      </Grid>
      <button type="submit">create post</button>
    </form>
  )
}

export default PostList
