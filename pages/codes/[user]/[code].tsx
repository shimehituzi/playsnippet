import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { servergql } from '../../../src/utils/gqlutils'
import { Code, GetCodeQuery, GetCodeQueryVariables } from '../../../src/API'
import { getCode } from '../../../src/graphql/queries'
import { Card } from '@mui/material'

type Props = {
  code: Code
}

type Params = ParsedUrlQuery & {
  user: string
  code: string
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
  const codeID = params?.code
  if (owner === undefined || codeID === undefined) return { notFound: true }

  const res = await servergql<GetCodeQuery, GetCodeQueryVariables>({
    query: getCode,
    variables: {
      id: codeID,
    },
  })

  const code = res.data?.getCode

  if (code && code.owner === owner) {
    return {
      props: {
        code: code,
      },
      revalidate: 5,
      notFound: false,
    }
  } else {
    return { notFound: true }
  }
}

const UserCode: NextPage<Props> = ({ code }) => {
  return (
    <>
      <Head>
        <title>{`${code.title} - PlaySnippet`}</title>
      </Head>
      <Card>
        <h1>{code.title}</h1>
        <h2>{code.owner}</h2>
        <p>{code.lang}</p>
        <pre>{code.content}</pre>
        <Link href={`/posts/${code.owner}/${code.postID}`}>
          <a>投稿詳細</a>
        </Link>
        <Link href={`/codes/${code.owner}`}>
          <a>コード一覧</a>
        </Link>
      </Card>
    </>
  )
}

export default UserCode
