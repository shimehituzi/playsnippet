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
import * as subscription from '../src/graphql/subscriptions'
import { gqlQuery, gqlSubscription, serverQuery } from '../src/utils/graphql'
import { notNull } from '../src/utils/nullable'
import { useAuth } from '../src/utils/auth'
import { Button, Grid } from '@mui/material'
import { PostForm } from '../src/components/PostForm'
import { Posts } from '../src/components/Posts'
import { useArraySettor } from '../src/utils/recoilArraySettor'
import { SeparatePosts, separatePosts } from '../src/utils/omit'

type Props = {
  data: {
    items: SeparatePosts
    nextToken: string | null
  }
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
      data: {
        items: separatePosts(posts),
        nextToken: res.data?.listPostsByDate?.nextToken ?? null,
      },
    },
    revalidate: 5,
    notFound: false,
  }
}

const Home: NextPage<Props> = ({ data }) => {
  const { authenticated, isInit } = useAuth()

  const setPosts = useArraySettor(postsState, 'DESC')
  const setCodes = useArraySettor(codesState, 'ASC')
  const setComments = useArraySettor(commentsState, 'ASC')
  const [nextToken, setNextToken] = useRecoilState(postNextTokenState)

  useEffect(() => {
    setPosts.initItems(data.items.posts)
    setCodes.initItems(data.items.codes)
    setComments.initItems(data.items.comments)
    setNextToken(data.nextToken)
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
  }

  useEffect(() => {
    if (!isInit) return

    const onCPost = gqlSubscription<APIt.OnCreatePostSubscription>({
      query: subscription.onCreatePost,
      callback: {
        next: (msg) => {
          const post = msg.value.data?.onCreatePost
          post && setPosts.createItem(post)
        },
      },
    })
    const onDPost = gqlSubscription<APIt.OnDeletePostSubscription>({
      query: subscription.onDeletePost,
      callback: {
        next: (msg) => {
          const post = msg.value.data?.onDeletePost
          post && setPosts.deleteItem(post)
        },
      },
    })
    const onCCode = gqlSubscription<APIt.OnCreateCodeSubscription>({
      query: subscription.onCreateCode,
      callback: {
        next: (msg) => {
          const code = msg.value.data?.onCreateCode
          code && setCodes.createItem(code)
        },
      },
    })
    const onDCode = gqlSubscription<APIt.OnDeleteCodeSubscription>({
      query: subscription.onDeleteCode,
      callback: {
        next: (msg) => {
          const code = msg.value.data?.onDeleteCode
          code && setCodes.deleteItem(code)
        },
      },
    })
    const onCComment = gqlSubscription<APIt.OnCreateCommentSubscription>({
      query: subscription.onCreateComment,
      callback: {
        next: (msg) => {
          const comment = msg.value.data?.onCreateComment
          comment && setComments.createItem(comment)
        },
      },
    })
    const onDComment = gqlSubscription<APIt.OnDeleteCommentSubscription>({
      query: subscription.onDeleteComment,
      callback: {
        next: (msg) => {
          const comment = msg.value.data?.onDeleteComment
          comment && setComments.deleteItem(comment)
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
    <Grid container alignItems="center" justifyContent="center">
      {authenticated && (
        <Grid item xs={12}>
          <PostForm />
        </Grid>
      )}
      <Grid item xs={12}>
        <Posts />
      </Grid>
      <Grid item>
        <Button onClick={getAdditionalPosts} variant="outlined">
          Read more
        </Button>
      </Grid>
    </Grid>
  )
}

export default Home
