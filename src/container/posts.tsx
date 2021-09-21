import React, { useEffect, useReducer, useState } from 'react'
import { useAuth } from '../hooks'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { createPost } from '../graphql/mutations'
import {
  CreatePostMutationVariables,
  ListPostsByDateQueryVariables,
  ModelSortDirection,
  ListPostsByDateQuery,
  OnCreatePostSubscription,
  Post,
} from '../API'
import { listPostsByDate } from '../graphql/queries'
import { onCreatePost } from '../graphql/subscriptions'
import { Observable } from '../../node_modules/zen-observable-ts'
import ReactMarkdown from 'react-markdown'

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

const Posts: React.FC = () => {
  const { authenticated, authMode, isInit } = useAuth()

  const [posts, dispatch] = useReducer(reducer, [])
  const [nextToken, setNextToken] = useState<string | null>(null)

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

    type Clinet = Observable<{ value: GraphQLResult<OnCreatePostSubscription> }>
    const client = API.graphql({
      ...graphqlOperation(onCreatePost),
      authMode,
    }) as Clinet
    const subscription = client.subscribe({
      next: (msg) => {
        const post = msg.value.data.onCreatePost
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
      {posts.map((post, key) => (
        <ReactMarkdown key={key}>{post.content}</ReactMarkdown>
      ))}
      <button onClick={getAdditionalPosts}>Read more</button>
    </React.Fragment>
  )
}

const PostForm: React.FC = () => {
  const [content, setContent] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const mutationVariables: CreatePostMutationVariables = {
      input: {
        content: content,
        type: 'post',
      },
    }
    await API.graphql(graphqlOperation(createPost, mutationVariables))

    setContent('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={onChange} />
      <button type="submit">create post</button>
    </form>
  )
}

export default Posts
