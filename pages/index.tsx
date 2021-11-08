import React, { useEffect } from 'react'
import { GetStaticProps, NextPage } from 'next'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  postsState,
  codesState,
  commentsState,
  postNextTokenState,
  latestTimeStampSelector,
} from '../src/state/apiState'
import { Post } from '../src/API'
import { notNull } from '../src/utils/nullable'
import { useArraySettor } from '../src/utils/arraySettor'
import { omitCode, omitComment, omitPost } from '../src/utils/api/omit'
import { useRenderState } from '../src/utils/render'
import {
  listPostsByDate,
  listCodesByDate,
  listCommentsByDate,
  serverListPostsByDate,
} from '../src/utils/api/query'
import {
  subscribeCode,
  subscribeComment,
  subscribePost,
} from '../src/utils/api/subscription'
import { useSubscription } from '../src/utils/subscribe'
import { Button, Grid } from '@mui/material'
import { Posts } from '../src/components/Posts'
import { TypingScore } from '../src/components/TypingScore'

type Props = {
  posts: Post[]
  nextToken: string | null
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await serverListPostsByDate({ limit: 20 })
  const posts = res.data?.listPostsByDate?.items?.filter(notNull) ?? []

  return {
    props: {
      posts: posts,
      nextToken: res.data?.listPostsByDate?.nextToken ?? null,
    },
    revalidate: 5,
    notFound: false,
  }
}

const Home: NextPage<Props> = (props) => {
  const { render, toCSR } = useRenderState()

  const setPosts = useArraySettor(postsState, 'DESC', omitPost)
  const setCodes = useArraySettor(codesState, 'ASC', omitCode)
  const setComments = useArraySettor(commentsState, 'ASC', omitComment)
  const [nextToken, setNextToken] = useRecoilState(postNextTokenState)

  useEffect(() => {
    setPosts.initItems(props.posts)
    setCodes.initItems(props.posts.flatMap((v) => v.codes?.items))
    setComments.initItems(props.posts.flatMap((v) => v.comments?.items))
    setNextToken(props.nextToken)
  }, [])

  const appendPosts = async () => {
    if (!nextToken) return

    const posts = await listPostsByDate({ limit: 20, nextToken })
    const postsItems = posts?.data?.listPostsByDate?.items

    setPosts.appendItems(postsItems)
    setCodes.appendItems(postsItems?.flatMap((v) => v?.codes?.items))
    setComments.appendItems(postsItems?.flatMap((v) => v?.comments?.items))
    setNextToken(posts.data?.listPostsByDate?.nextToken ?? null)
    toCSR()
  }

  const latestTimeStamp = useRecoilValue(latestTimeStampSelector)
  const newItems = async () => {
    const posts = await listPostsByDate({ createdAt: { gt: latestTimeStamp } })
    const codes = await listCodesByDate({ createdAt: { gt: latestTimeStamp } })
    const comments = await listCommentsByDate({
      createdAt: { gt: latestTimeStamp },
    })

    setPosts.newItems(posts.data?.listPostsByDate?.items)
    setCodes.newItems(codes.data?.listCodesByDate?.items)
    setComments.newItems(comments.data?.listCommentsByDate?.items)
  }
  const subscribeFuncArray = [
    subscribePost({
      onCreate: (data) => setPosts.createItem(data?.onCreatePost),
      onUpdate: (data) => setPosts.updateItem(data?.onUpdatePost),
      onDelete: (data) => setPosts.deleteItem(data?.onDeletePost),
    }),
    subscribeCode({
      onCreate: (data) => setCodes.createItem(data?.onCreateCode),
      onUpdate: (data) => setCodes.updateItem(data?.onUpdateCode),
      onDelete: (data) => setCodes.deleteItem(data?.onDeleteCode),
    }),
    subscribeComment({
      onCreate: (data) => setComments.createItem(data?.onCreateComment),
    }),
  ]
  useSubscription({ subscribeFuncArray, newItems, toCSR })

  return (
    <Grid container alignItems="center" justifyContent="center">
      <TypingScore />
      <Grid item xs={12}>
        {render === 'ISR' ? <Posts posts={props.posts} /> : <Posts />}
      </Grid>
      {nextToken && (
        <Grid item>
          <Button onClick={appendPosts} variant="outlined">
            Read more
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default Home
