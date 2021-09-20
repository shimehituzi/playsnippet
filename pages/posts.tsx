import React, { useState } from 'react'
import { NextPage } from 'next'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { useAuth } from '../src/hooks'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost } from '../src/graphql/mutations'
import { CreatePostInput } from '../src/API'

const Posts: NextPage = () => {
  const { authenticated } = useAuth()

  return (
    <React.Fragment>
      {authenticated && <AmplifySignOut />}
      {authenticated && <Form />}
      <p>post page</p>
    </React.Fragment>
  )
}

const Form: React.FC = () => {
  const initialInput: CreatePostInput = {
    type: 'post',
    content: '',
  }
  const [createPostInput, setCreatePostInput] =
    useState<CreatePostInput>(initialInput)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatePostInput({
      ...createPostInput,
      content: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await API.graphql(
      graphqlOperation(createPost, {
        input: createPostInput,
      })
    )

    setCreatePostInput(initialInput)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={createPostInput.content} onChange={onChange} />
      <button type="submit">create post</button>
    </form>
  )
}

export default Posts
