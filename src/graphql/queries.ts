/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      owner
      content
      createdAt
      updatedAt
      codes {
        items {
          id
          owner
          postID
          title
          lang
          code
          skipline
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        content
        createdAt
        updatedAt
        codes {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getCode = /* GraphQL */ `
  query GetCode($id: ID!) {
    getCode(id: $id) {
      id
      owner
      postID
      title
      lang
      code
      skipline
      createdAt
      updatedAt
      post {
        id
        owner
        content
        createdAt
        updatedAt
        codes {
          nextToken
        }
      }
    }
  }
`;
export const listCodes = /* GraphQL */ `
  query ListCodes(
    $filter: ModelCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        postID
        title
        lang
        code
        skipline
        createdAt
        updatedAt
        post {
          id
          owner
          content
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
