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
import * as subscription from '../../src/graphql/subscriptions'
import { gqlQuery, gqlSubscription, serverQuery } from '../../src/utils/graphql'
import { notNull } from '../../src/utils/nullable'
import { useAuth } from '../../src/utils/auth'
import { Button, Grid } from '@mui/material'
import { PostForm } from '../../src/components/PostForm'
import { Posts } from '../../src/components/Posts'
import { useArraySettor } from '../../src/utils/recoilArraySettor'
import { separatePosts } from '../../src/utils/omit'

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
  const { authenticated, isInit } = useAuth()

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
  }

  useEffect(() => {
    if (!isInit) return

    const onCPost = gqlSubscription<APIt.OnCreatePostSubscription>({
      query: subscription.onCreatePost,
      callback: {
        next: (msg) => {
          const post = msg.value.data?.onCreatePost
          post && post.owner === user && setPosts.createItem(post)
        },
      },
    })
    const onDPost = gqlSubscription<APIt.OnDeletePostSubscription>({
      query: subscription.onDeletePost,
      callback: {
        next: (msg) => {
          const post = msg.value.data?.onDeletePost
          post && post.owner === user && setPosts.deleteItem(post)
        },
      },
    })
    const onCCode = gqlSubscription<APIt.OnCreateCodeSubscription>({
      query: subscription.onCreateCode,
      callback: {
        next: (msg) => {
          const code = msg.value.data?.onCreateCode
          code && code.owner === user && setCodes.createItem(code)
        },
      },
    })
    const onDCode = gqlSubscription<APIt.OnDeleteCodeSubscription>({
      query: subscription.onDeleteCode,
      callback: {
        next: (msg) => {
          const code = msg.value.data?.onDeleteCode
          code && code.owner === user && setCodes.deleteItem(code)
        },
      },
    })
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
      onCPost.unsubscribe()
      onDPost.unsubscribe()
      onCCode.unsubscribe()
      onDCode.unsubscribe()
      onCComment.unsubscribe()
      onDComment.unsubscribe()
    }
  }, [isInit])

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
          <Posts posts={props.posts} />
        </Grid>
        <Grid item>
          <Button onClick={getAdditionalPosts} variant="outlined">
            Read more
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default UserPosts
