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
  if (owner === undefined || postID === undefined) return { notFound: true }

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
          {post.codes && (
            <li>
              {post.codes?.items?.map((code, i) =>
                code ? (
                  <ul key={i}>
                    {code.title}
                    <Link href={`/codes/${code.owner}/${code.id}`}>
                      <a>コード詳細</a>
                    </Link>
                  </ul>
                ) : (
                  <React.Fragment key={i} />
                )
              )}
            </li>
          )}
          <Link href={`/posts/${post.owner}`}>
            <a>投稿一覧</a>
          </Link>
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default UserPost
