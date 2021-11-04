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
import { gqlQuery, serverQuery } from '../src/utils/graphql'
import { notNull } from '../src/utils/nullable'
import { useAuth } from '../src/utils/auth'
import { Button, Grid, ToggleButton } from '@mui/material'
import { PostForm } from '../src/components/PostForm'
import { Posts } from '../src/components/Posts'
import { useArraySettor } from '../src/utils/recoilArraySettor'
import {
  omitCode,
  omitComment,
  omitPost,
  separatePosts,
} from '../src/utils/omit'
import { useRenderState } from '../src/utils/render'
import {
  useSubscription,
  subscribePost,
  subscribeCode,
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

  const subscribePostFunc = () => {
    return subscribePost({
      createfn: (data) => setPosts.createItem(data.onCreatePost),
      updatefn: (data) => setPosts.updateItem(data.onUpdatePost),
      deletefn: (data) => setPosts.deleteItem(data.onDeletePost),
    })
  }
  const subscribeCodeFunc = () => {
    return subscribeCode({
      createfn: (data) => setCodes.createItem(data.onCreateCode),
      updatefn: (data) => setCodes.updateItem(data.onUpdateCode),
      deletefn: (data) => setCodes.deleteItem(data.onDeleteCode),
    })
  }
  const { unsubscribe, toggle } = useSubscription([
    subscribePostFunc,
    subscribeCodeFunc,
  ])
  const [selected, setSelected] = useState<boolean>(false)

  const changeSubscribe = () => {
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
          <Button onClick={getAdditionalPosts} variant="outlined">
            Read more
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default Home
