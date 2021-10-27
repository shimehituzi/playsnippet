import React from 'react'
import { useRecoilValue } from 'recoil'
import { postsSelector } from '../state/apiState'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Post } from './Post'

const useStyle = makeStyles({
  grid: {
    padding: '2%',
  },
})

export const Posts: React.FC = () => {
  const posts = useRecoilValue(postsSelector)
  const classes = useStyle()

  return (
    <Grid container alignItems="center" justifyContent="center">
      {posts.map((post, key) => (
        <Grid item xs={12} className={classes.grid} key={key}>
          <Post postID={post.id} />
        </Grid>
      ))}
    </Grid>
  )
}
