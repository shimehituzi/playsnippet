import React from 'react'
import API, { graphqlOperation } from '@aws-amplify/api'
import { Send as SendIcon } from '@mui/icons-material'
import { Grid, IconButton, TextField } from '@mui/material'
import { useRecoilState } from 'recoil'
import { CreateCommentMutationVariables } from '../API'
import { createComment } from '../graphql/mutations'
import { commentFormState } from '../state/commentFormState'

type Props = {
  postID: string
}

export const CommentForm: React.FC<Props> = ({ postID }) => {
  const [comment, setComment] = useRecoilState(commentFormState)

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment((comment) => ({
      ...comment,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    const createCommentMutationVariables: CreateCommentMutationVariables = {
      input: {
        ...comment,
        postID: postID,
      },
    }
    await API.graphql(
      graphqlOperation(createComment, createCommentMutationVariables)
    )

    setComment({ content: '' })
  }

  return (
    <Grid container>
      <Grid item xs={11}>
        <TextField
          fullWidth
          variant="standard"
          label="comment"
          value={comment.content}
          onChange={onChangeComment}
          name="content"
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={handleSubmit}>
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}
