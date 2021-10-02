import { Send as SendIcon } from '@mui/icons-material'
import { Grid, IconButton, TextField } from '@mui/material'
import React from 'react'
import { useRecoilState } from 'recoil'
import { commentFormState } from '../../state/commentFormState'

type Props = {
  postID: string
}

export const CommentForm: React.FC<Props> = () => {
  const [comment, setComment] = useRecoilState(commentFormState)

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment((comment) => ({
      ...comment,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    // TODO
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
