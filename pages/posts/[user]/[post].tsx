import React from 'react'
import Link from 'next/link'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { servergql } from '../../../src/utils/gqlutils'
import { GetPostQuery, GetPostQueryVariables, Post } from '../../../src/API'
import { getPost } from '../../../src/graphql/queries'
import { Appbar } from '../../../src/components/Appbar'
import { Card, Container } from '@mui/material'

type Props = {
  post: Post
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
  if (!owner || !postID) return { notFound: true }

  const res = await servergql<GetPostQuery, GetPostQueryVariables>({
    query: getPost,
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

const UserPost: NextPage<Props> = ({ post }) => {
  return (
    <React.Fragment>
      <Appbar />
      <Container>
        <Card>
          <h1>{post.title}</h1>
          <h2>{post.owner}</h2>
          <p>{post.content}</p>
          <Link href={`/posts/${post.owner}`}>
            <a>戻る</a>
          </Link>
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default UserPost
