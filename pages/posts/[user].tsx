import React from 'react'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { servergql } from '../../src/utils/gqlutils'
import {
  ListPostsByOwnerQuery,
  ListPostsByOwnerQueryVariables,
  ModelSortDirection,
  Post,
} from '../../src/API'
import { listPostsByOwner } from '../../src/graphql/queries'
import { notNull } from '../../src/utils/nullable'
import { Appbar } from '../../src/components/Appbar'
import { Card, Container } from '@mui/material'

type Props = {
  posts: Post[]
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
  if (!owner) return { notFound: true }

  const res = await servergql<
    ListPostsByOwnerQuery,
    ListPostsByOwnerQueryVariables
  >({
    query: listPostsByOwner,
    variables: {
      owner: owner,
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
    },
  })

  const posts = res.data?.listPostsByOwner?.items?.filter(notNull) ?? []

  if (posts.length > 0) {
    return {
      props: {
        posts: posts,
      },
      revalidate: 5,
      notFound: false,
    }
  } else {
    return { notFound: true }
  }
}

const UserPosts: NextPage<Props> = ({ posts }) => {
  return (
    <React.Fragment>
      <Appbar />
      <Container>
        {posts.map((v, i) => (
          <Card key={i}>
            <h1>{v.title}</h1>
            <h2>{v.owner}</h2>
            <p>{v.content}</p>
            <Link href={`/posts/${v.owner}/${v.id}`}>
              <a>詳細</a>
            </Link>
          </Card>
        ))}
      </Container>
    </React.Fragment>
  )
}

export default UserPosts
