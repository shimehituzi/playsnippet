import React, { useState } from 'react'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { createCode, createPost } from '../graphql/mutations'
import {
  CreatePostMutationVariables,
  CreatePostMutation,
  CreateCodeMutationVariables,
} from '../API'
import { Button, Grid } from '@material-ui/core'

type CodeInput = {
  name: string
  lang: string
  code: string
}

export const PostForm: React.FC = () => {
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
      <Button variant="contained" type="submit">
        create post
      </Button>
    </form>
  )
}
