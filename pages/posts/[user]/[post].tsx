import React, { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import {
  codesState,
  commentsState,
  postSelector,
  postsState,
} from '../../../src/state/apiState'
import * as APIt from '../../../src/API'
import * as query from '../../../src/graphql/queries'
import * as subscription from '../../../src/graphql/subscriptions'
import { gqlSubscription, serverQuery } from '../../../src/utils/graphql'
import { useAuth } from '../../../src/utils/auth'
import { useArraySettor } from '../../../src/utils/recoilArraySettor'
import { separatePosts } from '../../../src/utils/omit'
import { Grid } from '@mui/material'
import { Post } from '../../../src/components/Post'
import { useRecoilValue } from 'recoil'

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
  const { isInit } = useAuth()

  const router = useRouter()
  const { user, post: pid } = router.query

  const setPosts = useArraySettor(postsState, 'DESC')
  const setCodes = useArraySettor(codesState, 'ASC')
  const setComments = useArraySettor(commentsState, 'ASC')

  const post = useRecoilValue(postSelector(pid as string))

  useEffect(() => {
    const data = separatePosts([props.post])
    setPosts.initItems(data.posts)
    setCodes.initItems(data.codes)
    setComments.initItems(data.comments)
  }, [])

  useEffect(() => {
    if (!isInit) return
    const onCComment = gqlSubscription<APIt.OnCreateCommentSubscription>({
      query: subscription.onCreateComment,
      callback: {
        next: (msg) => {
          const comment = msg.value.data?.onCreateComment
          comment &&
            comment.post?.owner === user &&
            setComments.createItem(comment)
        },
      },
    })
    const onDComment = gqlSubscription<APIt.OnDeleteCommentSubscription>({
      query: subscription.onDeleteComment,
      callback: {
        next: (msg) => {
          const comment = msg.value.data?.onDeleteComment
          comment &&
            comment.post?.owner === user &&
            setComments.deleteItem(comment)
        },
      },
    })

    return () => {
      onCComment.unsubscribe()
      onDComment.unsubscribe()
    }
  }, [isInit])

  return props.post ? (
    <>
      <Head>
        <title>{`${props.post.title} - PlaySnippet`}</title>
      </Head>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sx={{ padding: '2%' }}>
          <Post postID={props.post.id} post={props.post} />
        </Grid>
      </Grid>
    </>
  ) : (
    <React.Fragment />
  )
}

export default UserPost
