import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  codesState,
  commentsState,
  postsState,
} from '../../../src/state/apiState'
import * as APIt from '../../../src/API'
import * as query from '../../../src/graphql/queries'
import { serverQuery } from '../../../src/utils/graphql'
import { useArraySettor } from '../../../src/utils/recoilArraySettor'
import { separatePosts } from '../../../src/utils/omit'
import { Grid } from '@mui/material'
import { Post } from '../../../src/components/Post'
import { useRenderState } from '../../../src/utils/render'

type Props = {
  post: APIt.Post
}

type Params = ParsedUrlQuery & {
  user: string
  post: string
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
  const postID = params?.post
  if (owner === undefined || postID === undefined) return { notFound: true }

  const res = await serverQuery<APIt.GetPostQueryVariables, APIt.GetPostQuery>({
    query: query.getPost,
    variables: {
      id: postID,
    },
  })

  const post = res.data?.getPost

  if (post && post.owner === owner) {
    return {
      props: {
        post: post,
      },
      revalidate: 5,
      notFound: false,
    }
  } else {
    return { notFound: true }
  }
}

const UserPost: NextPage<Props> = (props) => {
  const { renderState } = useRenderState()

  const setPosts = useArraySettor(postsState, 'DESC')
  const setCodes = useArraySettor(codesState, 'ASC')
  const setComments = useArraySettor(commentsState, 'ASC')

  useEffect(() => {
    const data = separatePosts([props.post])
    setPosts.initItems(data.posts)
    setCodes.initItems(data.codes)
    setComments.initItems(data.comments)
  }, [])

  return (
    <>
      <Head>
        <title>{`${props.post.title} - PlaySnippet`}</title>
      </Head>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sx={{ padding: '2%' }}>
          {renderState === 'ISR' ? (
            <Post postID={props.post.id} post={props.post} />
          ) : (
            <Post postID={props.post.id} />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default UserPost
