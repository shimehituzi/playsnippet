import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { subscribeFlagState } from '../state/uiState'
import { CreateCommentMutationVariables, CreateCommentInput } from '../API'
import { createComment } from '../graphql/mutations'
import { gqlMutation } from '../utils/graphql'
import { Grid, IconButton, TextField } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import { useAuth } from '../utils/auth'

type Props = {
  postID: string
}

export const CommentForm: React.FC<Props> = ({ postID }) => {
  const { authenticated } = useAuth()
  const setSubscribeFlag = useSetRecoilState(subscribeFlagState)

  const [comment, setComment] = useState<Pick<CreateCommentInput, 'content'>>({
    content: '',
  })

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment((comment) => ({
      ...comment,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    if (!authenticated) return
    setSubscribeFlag(true)

    await gqlMutation<CreateCommentMutationVariables>({
      query: createComment,
      variables: {
        input: {
          ...comment,
          type: 'comment',
          postID: postID,
        },
      },
    })

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
