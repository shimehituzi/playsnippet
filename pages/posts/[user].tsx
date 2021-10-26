import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
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
import { Card } from '@mui/material'

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
  if (owner === undefined) return { notFound: true }

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
    <>
      {posts.map((post, i) => (
        <Card key={i}>
          <h1>{post.title}</h1>
          <h2>{post.owner}</h2>
          <p>{post.content}</p>
          {post.codes && (
            <li>
              {post.codes?.items?.filter(notNull).map((code, j) => (
                <ul key={j}>
                  {code.title}
                  <Link href={`/codes/${code.owner}/${code.id}`}>
                    <a>コード詳細</a>
                  </Link>
                </ul>
              ))}
            </li>
          )}
          <Link href={`/posts/${post.owner}/${post.id}`}>
            <a>詳細</a>
          </Link>
        </Card>
      ))}
    </>
  )
}

export default UserPosts
