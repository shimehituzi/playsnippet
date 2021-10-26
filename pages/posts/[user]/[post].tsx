import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { servergql } from '../../../src/utils/gqlutils'
import { GetPostQuery, GetPostQueryVariables, Post } from '../../../src/API'
import { getPost } from '../../../src/graphql/queries'
import { Card } from '@mui/material'
import { notNull } from '../../../src/utils/nullable'

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
    <>
      <Card>
        <h1>{post.title}</h1>
        <h2>{post.owner}</h2>
        <p>{post.content}</p>
        {post.codes && (
          <li>
            {post.codes?.items?.filter(notNull).map((code, i) => (
              <ul key={i}>
                {code.title}
                <Link href={`/codes/${code.owner}/${code.id}`}>
                  <a>コード詳細</a>
                </Link>
              </ul>
            ))}
          </li>
        )}
        <Link href={`/posts/${post.owner}`}>
          <a>投稿一覧</a>
        </Link>
      </Card>
    </>
  )
}

export default UserPost
