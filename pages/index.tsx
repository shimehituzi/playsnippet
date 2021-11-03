import React, { useEffect } from 'react'
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
import { gqlQuery, serverQuery } from '../src/utils/graphql'
import { notNull } from '../src/utils/nullable'
import { useAuth } from '../src/utils/auth'
import { Button, Grid } from '@mui/material'
import { PostForm } from '../src/components/PostForm'
import { Posts } from '../src/components/Posts'
import { useArraySettor } from '../src/utils/recoilArraySettor'
import { separatePosts } from '../src/utils/omit'
import { useRenderState } from '../src/utils/render'

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

  const setPosts = useArraySettor(postsState, 'DESC')
  const setCodes = useArraySettor(codesState, 'ASC')
  const setComments = useArraySettor(commentsState, 'ASC')
  const [nextToken, setNextToken] = useRecoilState(postNextTokenState)

  useEffect(() => {
    const data = separatePosts(props.posts)
    setPosts.initItems(data.posts)
    setCodes.initItems(data.codes)
    setComments.initItems(data.comments)
    setNextToken(props.nextToken)
  }, [])

  const getAdditionalPosts = async () => {
    if (!nextToken) return

    const res = await gqlQuery<
      APIt.ListPostsByDateQueryVariables,
      APIt.ListPostsByDateQuery
    >({
      query: query.listPostsByDate,
      variables: {
        type: 'post',
        sortDirection: APIt.ModelSortDirection.DESC,
        limit: 20,
        nextToken: nextToken,
      },
    })

    const posts = res.data?.listPostsByDate?.items?.filter(notNull) ?? []
    const omit = separatePosts(posts)

    setPosts.appendItems(omit.posts)
    setCodes.appendItems(omit.codes)
    setComments.appendItems(omit.comments)
    setNextToken(res.data?.listPostsByDate?.nextToken ?? null)

    toCSR()
  }

  return (
    <Grid container alignItems="center" justifyContent="center">
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
          <Button onClick={getAdditionalPosts} variant="outlined">
            Read more
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default Home
