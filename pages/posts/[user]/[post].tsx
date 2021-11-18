import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRecoilValue } from 'recoil'
import {
  postsState,
  codesState,
  commentsState,
  latestTimeStampSelector,
} from '../../../src/state/apiState'
import { Post as TypePost } from '../../../src/API'
import { useArraySettor } from '../../../src/utils/arraySettor'
import { omitCode, omitComment, omitPost } from '../../../src/utils/api/omit'
import { useRenderState } from '../../../src/utils/render'
import { listCommentsByPost, serverGetPost } from '../../../src/utils/api/query'
import { subscribeComment } from '../../../src/utils/api/subscription'
import { useSubscription } from '../../../src/utils/subscribe'
import { Grid } from '@mui/material'
import { Post } from '../../../src/components/Post'
import { TypingScore } from '../../../src/components/TypingScore'

type Props = {
  post: TypePost
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

  const res = await serverGetPost({ id: postID })
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
  const { render, toCSR } = useRenderState()

  const setPosts = useArraySettor(postsState, 'DESC', omitPost)
  const setCodes = useArraySettor(codesState, 'ASC', omitCode)
  const setComments = useArraySettor(commentsState, 'ASC', omitComment)

  useEffect(() => {
    setPosts.initItems([props.post])
    setCodes.initItems(props.post.codes?.items)
    setComments.initItems(props.post.comments?.items)
  }, [])

  const latestTimeStamp = useRecoilValue(latestTimeStampSelector)
  const newItems = async () => {
    const comments = await listCommentsByPost({
      postID: props.post.id,
      createdAt: { gt: latestTimeStamp },
    })
    setComments.newItems(comments.data?.listCommentsByPost?.items)
  }
  const subscribeFuncArray = [
    subscribeComment({
      onCreate: (data) => setComments.createItem(data?.onCreateComment),
    }),
  ]
  useSubscription({ subscribeFuncArray, newItems, toCSR })

  return (
    <>
      <Head>
        <title>{`${props.post.title} - PlaySnippet`}</title>
      </Head>
      <Grid container alignItems="center" justifyContent="center">
        <TypingScore />
        <Grid item xs={12} sx={{ padding: '2%' }}>
          {render === 'ISR' ? (
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
