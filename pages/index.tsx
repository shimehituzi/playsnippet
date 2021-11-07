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
import * as APIt from '../src/API'
import * as query from '../src/graphql/queries'
import { serverQuery } from '../src/utils/graphql'
import { notNull } from '../src/utils/nullable'
import { useAuth } from '../src/utils/auth'
import { useArraySettor } from '../src/utils/arraySettor'
import { omitCode, omitComment, omitPost } from '../src/utils/api/omit'
import { useRenderState } from '../src/utils/render'
import { getAdditionalPosts, getNewItems } from '../src/utils/api/query'
import { Button, Grid } from '@mui/material'
import { PostForm } from '../src/components/PostForm'
import { Posts } from '../src/components/Posts'
import {
  subscribeCode,
  subscribeComment,
  subscribePost,
} from '../src/utils/api/subscription'
import { useSubscription } from '../src/utils/subscribe'

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
  const { render, toCSR } = useRenderState()
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

  const latestTimeStamp = useRecoilValue(latestTimeStampSelector)
  const newItems = async () => {
    const { newPosts, newCodes, newComments } = await getNewItems(
      latestTimeStamp
    )
    setPosts.newItems(newPosts)
    setCodes.newItems(newCodes)
    setComments.newItems(newComments)
  }
  const subscribeFuncArray = [
    subscribePost({
      onCreate: (data) => setPosts.createItem(data?.onCreatePost),
      onDelete: (data) => setPosts.deleteItem(data?.onDeletePost),
    }),
    subscribeCode({
      onCreate: (data) => setCodes.createItem(data?.onCreateCode),
      onDelete: (data) => setCodes.deleteItem(data?.onDeleteCode),
    }),
    subscribeComment({
      onCreate: (data) => setComments.createItem(data?.onCreateComment),
    }),
  ]
  useSubscription({
    subscribeFuncArray,
    newItemsFuncArray: [newItems],
    toCSR,
  })

  return (
    <Grid container alignItems="center" justifyContent="center">
      {authenticated && (
        <Grid item xs={12} sx={{ padding: '2%' }}>
          <PostForm />
        </Grid>
      )}
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
