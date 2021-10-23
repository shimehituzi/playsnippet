import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { withSSRContext } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { GraphQLAPIClass } from '@aws-amplify/api-graphql'
import { Appbar } from '../src/components/Appbar'
import { Card, Container } from '@mui/material'
import {
  ListPostsByDateQuery,
  ListPostsByDateQueryVariables,
  ModelSortDirection,
  Post,
} from '../src/API'
import { listPostsByDate } from '../src/graphql/queries'
import { notNull } from '../src/utils/nullable'

type Props = {
  posts: Post[]
}

const Global: NextPage<Props> = ({ posts }) => {
  return (
    <React.Fragment>
      <Appbar />
      <Container>
        {posts.map((v, i) => (
          <Card key={i}>
            <h1>{v.title}</h1>
            <h2>{v.owner}</h2>
            <p>{v.content}</p>
          </Card>
        ))}
      </Container>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const API: GraphQLAPIClass = withSSRContext().API

  const queryVariables: ListPostsByDateQueryVariables = {
    type: 'post',
    sortDirection: ModelSortDirection.DESC,
    limit: 20,
  }

  const res = (await API.graphql({
    query: listPostsByDate,
    variables: queryVariables,
    authMode: 'AWS_IAM',
  })) as GraphQLResult<ListPostsByDateQuery>

  const posts = res.data?.listPostsByDate?.items?.filter(notNull) ?? []

  return {
    props: {
      posts: posts,
    },
    revalidate: 5,
  }
}

export default Global
