import React from 'react'
import { useRecoilValue } from 'recoil'
import { postsSelector } from '../state/apiState'
import * as APIt from '../API'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Post } from './Post'

type Props = {
  posts?: APIt.Post[]
}

export const Posts: React.FC<Props> = (props) => {
  const posts = useRecoilValue(postsSelector)
  return <PostsRenderer posts={props.posts ? props.posts : posts} />
}

const useStyle = makeStyles({
  grid: {
    padding: '2%',
  },
})

type RendererProps = {
  posts: APIt.Post[]
}

const PostsRenderer: React.FC<RendererProps> = ({ posts }) => {
  const classes = useStyle()
  return (
    <Grid container alignItems="center" justifyContent="center">
      {posts.map((post, key) => (
        <Grid item xs={12} className={classes.grid} key={key}>
          <Post postID={post.id} post={post} />
        </Grid>
      ))}
    </Grid>
  )
}
