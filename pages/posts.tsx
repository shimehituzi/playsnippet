import React, { useEffect, useReducer, useState } from 'react'
import { NextPage } from 'next'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { useAuth } from '../src/hooks'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { createPost } from '../src/graphql/mutations'
import {
  CreatePostMutationVariables,
  ListPostsByDateQueryVariables,
  ModelSortDirection,
  ListPostsByDateQuery,
  OnCreatePostSubscription,
  Post,
} from '../src/API'
import { listPostsByDate } from '../src/graphql/queries'
import { onCreatePost } from '../src/graphql/subscriptions'
import { Observable } from './../node_modules/zen-observable-ts'

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

const Posts: NextPage = () => {
  const { authenticated } = useAuth()

  const [posts, dispatch] = useReducer(reducer, [])
  const [nextToken, setNextToken] = useState<string | null>(null)

  const getPosts = async (type: ActionType, nextToken = null) => {
    const queryVariables: ListPostsByDateQueryVariables = {
      type: 'post',
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
      nextToken: nextToken,
    }

    const res = (await API.graphql(
      graphqlOperation(listPostsByDate, queryVariables)
    )) as GraphQLResult<ListPostsByDateQuery>

    dispatch({ type: type, posts: res.data.listPostsByDate.items })
    setNextToken(res.data.listPostsByDate.nextToken)
  }

  const getAdditionalPosts = () => {
    if (nextToken === null) return
    getPosts(ActionType.AdditionalQuery, nextToken)
  }

  useEffect(() => {
    getPosts(ActionType.InitialQuery)

    type Clinet = Observable<{ value: GraphQLResult<OnCreatePostSubscription> }>
    const client = API.graphql(graphqlOperation(onCreatePost)) as Clinet
    const subscription = client.subscribe({
      next: (msg) => {
        const post = msg.value.data.onCreatePost
        dispatch({ type: ActionType.Subscription, post: post })
      },
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <React.Fragment>
      {authenticated && <AmplifySignOut />}
      <h1>post page</h1>
      {authenticated && <Form />}
      <li>
        {posts.map((post, key) => (
          <ul key={key}>{post.content}</ul>
        ))}
      </li>
      <button onClick={getAdditionalPosts}>Read more</button>
    </React.Fragment>
  )
}

const Form: React.FC = () => {
  const [content, setContent] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <input type="text" value={content} onChange={onChange} />
      <button type="submit">create post</button>
    </form>
  )
}

export default Posts
