import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import {
  codesState,
  commentsState,
  postNextTokenState,
  postsState,
} from '../../src/state/apiState'
import * as APIt from '../../src/API'
import * as query from '../../src/graphql/queries'
import { gqlQuery, serverQuery } from '../../src/utils/graphql'
import { notNull } from '../../src/utils/nullable'
import { useAuth } from '../../src/utils/auth'
import { Button, Grid } from '@mui/material'
import { PostForm } from '../../src/components/PostForm'
import { Posts } from '../../src/components/Posts'
import { useArraySettor } from '../../src/utils/arraySettor'
import { separatePosts } from '../../src/utils/api/omit'
import { useRenderState } from '../../src/utils/render'

type Props = {
  posts: APIt.Post[]
  nextToken: string | null
}

type Params = ParsedUrlQuery & {
  user: string
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const owner = params?.user
  if (owner === undefined) return { notFound: true }

  const res = await serverQuery<
    APIt.ListPostsByOwnerQueryVariables,
    APIt.ListPostsByOwnerQuery
  >({
    query: query.listPostsByOwner,
    variables: {
      owner: owner,
      sortDirection: APIt.ModelSortDirection.DESC,
      limit: 20,
    },
  })

  const posts = res.data?.listPostsByOwner?.items?.filter(notNull) ?? []

  if (posts.length > 0) {
    return {
      props: {
        posts: posts,
        nextToken: res.data?.listPostsByOwner?.nextToken ?? null,
      },
      revalidate: 5,
      notFound: false,
    }
  } else {
    return { notFound: true }
  }
}

const UserPosts: NextPage<Props> = (props) => {
  const { renderState, toCSR } = useRenderState()
  const { authenticated } = useAuth()

  const router = useRouter()
  const { user } = router.query

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
      APIt.ListPostsByOwnerQueryVariables,
      APIt.ListPostsByOwnerQuery
    >({
      query: query.listPostsByOwner,
      variables: {
        owner: user && String(user),
        sortDirection: APIt.ModelSortDirection.DESC,
        limit: 20,
        nextToken: nextToken,
      },
    })

    const posts = res.data?.listPostsByOwner?.items?.filter(notNull) ?? []
    const omit = separatePosts(posts)

    setPosts.appendItems(omit.posts)
    setCodes.appendItems(omit.codes)
    setComments.appendItems(omit.comments)
    setNextToken(res.data?.listPostsByOwner?.nextToken ?? null)

    toCSR()
  }

  return (
    <>
      <Head>
        <title>{`${user}'s posts - PlaySnippet`}</title>
      </Head>
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
    </>
  )
}

export default UserPosts
