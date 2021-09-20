import React, { useState } from 'react'
import { NextPage } from 'next'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { useAuth } from '../src/hooks'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost } from '../src/graphql/mutations'

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
  const [content, setContent] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await API.graphql(
      graphqlOperation(createPost, {
        input: {
          type: 'post',
          content: content,
        },
      })
    )

    // eslint-disable-next-line no-console
    console.log(res)

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
