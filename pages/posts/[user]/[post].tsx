import React from 'react'
import Link from 'next/link'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { withSSRContext } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { GraphQLAPIClass } from '@aws-amplify/api-graphql'
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

  const queryVariables: GetPostQueryVariables = {
    id: postID,
  }

  const API: GraphQLAPIClass = withSSRContext().API

  const res = (await API.graphql({
    query: getPost,
    variables: queryVariables,
    authMode: 'AWS_IAM',
  })) as GraphQLResult<GetPostQuery>

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

export default UserPost
