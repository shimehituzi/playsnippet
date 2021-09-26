import React, { useState } from 'react'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { createCode, createPost } from '../../graphql/mutations'
import {
  CreatePostMutationVariables,
  CreatePostMutation,
  CreateCodeInput,
  CreateCodeMutationVariables,
} from '../../API'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'

const useStyle = makeStyles({
  form: {
    margin: '2%',
  },
})

type CodeInput = Pick<CreateCodeInput, 'title' | 'content' | 'lang'>

export const PostForm: React.FC = () => {
  const classes = useStyle()

  const [content, setContent] = useState('')
  const [code, setCode] = useState<CodeInput>({
    title: '',
    content: '',
    lang: '',
  })

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode({
      ...code,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    if (code.title === '') return
    if (code.content === '') return
    if (code.lang === '') return
    if (content === '') return

    const createPostMutationVariables: CreatePostMutationVariables = {
      input: {
        title: '',
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
      title: '',
      content: '',
      lang: '',
    })
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} className={classes.form}>
        <TextField
          fullWidth
          variant="outlined"
          label="Post"
          multiline
          value={content}
          onChange={onChangeContent}
        />
      </Grid>
      <Grid item xs={5} className={classes.form}>
        <TextField
          fullWidth
          variant="standard"
          label="Code Title"
          value={code.title}
          onChange={onChangeCode}
          id="title"
        />
      </Grid>
      <Grid item xs={3} className={classes.form}>
        <TextField
          fullWidth
          variant="standard"
          label="Code Language"
          value={code.lang}
          onChange={onChangeCode}
          id="lang"
        />
      </Grid>
      <Grid item xs={12} className={classes.form}>
        <TextField
          fullWidth
          variant="outlined"
          label="Code"
          multiline
          value={code.content}
          onChange={onChangeCode}
          id="content"
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleSubmit}>
          create post
        </Button>
      </Grid>
    </Grid>
  )
}
