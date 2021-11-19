import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  postsState,
  codesState,
  commentsState,
} from '../../../src/state/apiState'
import { Post as TypePost } from '../../../src/API'
import { useArraySettor } from '../../../src/utils/arraySettor'
import { omitCode, omitComment, omitPost } from '../../../src/utils/api/omit'
import { useRenderState } from '../../../src/utils/render'
import { getPost, serverGetPost } from '../../../src/utils/api/query'
import {
  subscribePost,
  subscribeCode,
  subscribeComment,
} from '../../../src/utils/api/subscription'
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

  const router = useRouter()

  const reloadQuery = async () => {
    const post = (await getPost({ id: props.post.id })).data?.getPost
    if (post) {
      setPosts.initItems([post])
      setCodes.initItems(post.codes?.items)
      setComments.initItems(post.comments?.items)
    } else {
      router.replace('/404')
    }
  }
  const subscribeFuncArray = [
    subscribePost({
      onUpdate: (data) => {
        const postID = data?.onUpdatePost?.id
        if (postID === props.post.id) setPosts.updateItem(data?.onUpdatePost)
      },
    }),
    subscribeCode({
      onUpdate: (data) => {
        const postID = data?.onUpdateCode?.postID
        if (postID === props.post.id) setCodes.updateItem(data?.onUpdateCode)
      },
    }),
    subscribeComment({
      onCreate: (data) => {
        const postID = data?.onCreateComment?.postID
        if (postID === props.post.id)
          setComments.createItem(data?.onCreateComment)
      },
    }),
  ]
  useSubscription({ subscribeFuncArray, reloadQuery, toCSR })

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
