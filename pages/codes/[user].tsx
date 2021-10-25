import React from 'react'
import Link from 'next/link'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { servergql } from '../../src/utils/gqlutils'
import {
  Code,
  ListCodesByOwnerQuery,
  ListCodesByOwnerQueryVariables,
  ModelSortDirection,
} from '../../src/API'
import { listCodesByOwner } from '../../src/graphql/queries'
import { notNull } from '../../src/utils/nullable'
import { Appbar } from '../../src/components/Appbar'
import { Card, Container } from '@mui/material'

type Props = {
  codes: Code[]
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
    ListCodesByOwnerQuery,
    ListCodesByOwnerQueryVariables
  >({
    query: listCodesByOwner,
    variables: {
      owner: owner,
      sortDirection: ModelSortDirection.DESC,
      limit: 20,
    },
  })

  const codes = res.data?.listCodesByOwner?.items?.filter(notNull) ?? []

  if (codes.length > 0) {
    return {
      props: {
        codes: codes,
      },
      revalidate: 5,
      notFound: false,
    }
  } else {
    return { notFound: true }
  }
}

const UserCodes: NextPage<Props> = ({ codes }) => {
  return (
    <React.Fragment>
      <Appbar />
      <Container>
        {codes.map((code, i) => (
          <Card key={i}>
            <h1>{code.title}</h1>
            <h2>{code.owner}</h2>
            <p>{code.lang}</p>
            <Link href={`/codes/${code.owner}/${code.id}`}>
              <a>詳細</a>
            </Link>
            <Link href={`/posts/${code.owner}/${code.postID}`}>
              <a>投稿詳細</a>
            </Link>
          </Card>
        ))}
      </Container>
    </React.Fragment>
  )
}

export default UserCodes
