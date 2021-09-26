import React from 'react'
import { useRecoilState } from 'recoil'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { createCode, createPost } from '../../graphql/mutations'
import {
  CreatePostMutationVariables,
  CreatePostMutation,
  CreateCodeMutationVariables,
} from '../../API'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import { postFormState } from '../../state/postFormState'
import { CodeForm, codesFormState } from '../../state/codesFormState'

const useStyle = makeStyles({
  form: {
    margin: '2%',
  },
})

export const PostForm: React.FC = () => {
  const classes = useStyle()

  const [post, setPost] = useRecoilState(postFormState)
  const [codes, setCodes] = useRecoilState(codesFormState)

  const handleSubmit = async () => {
    const createPostMutationVariables: CreatePostMutationVariables = {
      input: {
        ...post,
        type: 'post',
      },
    }
    const res = (await API.graphql(
      graphqlOperation(createPost, createPostMutationVariables)
    )) as GraphQLResult<CreatePostMutation>

    codes.forEach(async (code) => {
      const createCodeMutationVariables: CreateCodeMutationVariables = {
        input: {
          ...code,
          skipline: '',
          postID: res.data.createPost.id,
          type: 'code',
        },
      }
      await API.graphql(
        graphqlOperation(createCode, createCodeMutationVariables)
      )
    })

    setPost({
      title: '',
      content: '',
    })
    setCodes([])
  }

  const onChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((post) => ({
      ...post,
      [e.target.name]: e.target.value,
    }))
  }

  const onChangeCode =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCodes((codes) => {
        const prevCode = codes[index]
        const newItem: CodeForm = {
          ...prevCode,
          [e.target.name]: e.target.value,
        }

        return [...codes.slice(0, index), newItem, ...codes.slice(index + 1)]
      })
    }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={5} className={classes.form}>
        <TextField
          fullWidth
          variant="standard"
          label="Post Title"
          value={post.title}
          onChange={onChangePost}
          name="title"
        />
      </Grid>
      <Grid item xs={12} className={classes.form}>
        <TextField
          fullWidth
          variant="outlined"
          label="Post"
          multiline
          value={post.content}
          onChange={onChangePost}
          name="content"
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
