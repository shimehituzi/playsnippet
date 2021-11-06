import React, { useEffect, useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
import { useRecoilState } from 'recoil'
import {
  codesState,
  commentsState,
  postNextTokenState,
  postsState,
} from '../src/state/apiState'
import * as APIt from '../src/API'
import * as query from '../src/graphql/queries'
import { serverQuery } from '../src/utils/graphql'
import { notNull } from '../src/utils/nullable'
import { useAuth } from '../src/utils/auth'
import { Button, Grid, ToggleButton } from '@mui/material'
import { PostForm } from '../src/components/PostForm'
import { Posts } from '../src/components/Posts'
import { useArraySettor } from '../src/utils/recoilArraySettor'
import { omitCode, omitComment, omitPost } from '../src/utils/omit'
import { useRenderState } from '../src/utils/render'
import { getAdditionalPosts, getNewItems } from '../src/utils/fetcher'
import {
  useSubscribe,
  subscribePost,
  subscribeCode,
  subscribeComment,
} from '../src/utils/subscriptions'
import { Sync as SyncIcon } from '@mui/icons-material'

type Props = {
  posts: APIt.Post[]
  nextToken: string | null
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await serverQuery<
    APIt.ListPostsByDateQueryVariables,
    APIt.ListPostsByDateQuery
  >({
    query: query.listPostsByDate,
    variables: {
      type: 'post',
      sortDirection: APIt.ModelSortDirection.DESC,
      limit: 20,
    },
  })

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
  const { renderState, toCSR } = useRenderState()
  const { authenticated } = useAuth()

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

    const { posts, newNextToken } = await getAdditionalPosts(nextToken)

    setPosts.appendItems(posts)
    setCodes.appendItems(posts?.flatMap((v) => v?.codes?.items))
    setComments.appendItems(posts?.flatMap((v) => v?.comments?.items))
    setNextToken(newNextToken ?? null)
    toCSR()
  }

  const getCurrentTime = () => new Date().toISOString()
  const [time, setTime] = useState<string>(getCurrentTime())

  const newItems = async () => {
    const { newPosts, newCodes, newComments } = await getNewItems(time)
    setPosts.newItems(newPosts)
    setCodes.newItems(newCodes)
    setComments.newItems(newComments)
  }

  const { unsubscribe, toggle } = useSubscribe([
    subscribePost({
      onCreate: (data) => setPosts.createItem(data.onCreatePost),
      onUpdate: (data) => setPosts.updateItem(data.onUpdatePost),
      onDelete: (data) => setPosts.deleteItem(data.onDeletePost),
    }),
    subscribeCode({
      onCreate: (data) => setCodes.createItem(data.onCreateCode),
      onUpdate: (data) => setCodes.updateItem(data.onUpdateCode),
      onDelete: (data) => setCodes.deleteItem(data.onDeleteCode),
    }),
    subscribeComment({
      onCreate: (data) => setComments.createItem(data.onCreateComment),
      onUpdate: (data) => setComments.updateItem(data.onUpdateComment),
      onDelete: (data) => setComments.deleteItem(data.onDeleteComment),
    }),
  ])
  const [selected, setSelected] = useState<boolean>(false)

  const changeSubscribe = () => {
    if (!selected) {
      newItems()
    } else {
      setTime(getCurrentTime())
    }
    toggle()
    setSelected(!selected)
    toCSR()
  }

  useEffect(() => {
    return unsubscribe
  }, [])

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item sx={{ padding: '2%' }}>
        <ToggleButton
          value="subscribe"
          selected={selected}
          onChange={changeSubscribe}
        >
          <SyncIcon />
        </ToggleButton>
      </Grid>
      {authenticated && (
        <Grid item xs={12} sx={{ padding: '2%' }}>
          <PostForm />
        </Grid>
      )}
      <Grid item xs={12}>
        {renderState === 'ISR' ? <Posts posts={props.posts} /> : <Posts />}
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
