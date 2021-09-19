/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      owner
      content
      type
      createdAt
      updatedAt
      codes {
        items {
          id
          owner
          postID
          name
          lang
          code
          skipline
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          owner
          postID
          comment
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
        type
        createdAt
        updatedAt
        codes {
          nextToken
        }
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listPostsByDate = /* GraphQL */ `
  query ListPostsByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        content
        type
        createdAt
        updatedAt
        codes {
          nextToken
        }
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listPostsByOwner = /* GraphQL */ `
  query ListPostsByOwner(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsByOwner(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        content
        type
        createdAt
        updatedAt
        codes {
          nextToken
        }
        comments {
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
      name
      lang
      code
      skipline
      type
      createdAt
      updatedAt
      post {
        id
        owner
        content
        type
        createdAt
        updatedAt
        codes {
          nextToken
        }
        comments {
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
        name
        lang
        code
        skipline
        type
        createdAt
        updatedAt
        post {
          id
          owner
          content
          type
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCodesByDate = /* GraphQL */ `
  query ListCodesByDate(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCodesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        postID
        name
        lang
        code
        skipline
        type
        createdAt
        updatedAt
        post {
          id
          owner
          content
          type
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCodesByOwner = /* GraphQL */ `
  query ListCodesByOwner(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCodesByOwner(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        postID
        name
        lang
        code
        skipline
        type
        createdAt
        updatedAt
        post {
          id
          owner
          content
          type
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      owner
      postID
      comment
      createdAt
      updatedAt
      post {
        id
        owner
        content
        type
        createdAt
        updatedAt
        codes {
          nextToken
        }
        comments {
          nextToken
        }
      }
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        postID
        comment
        createdAt
        updatedAt
        post {
          id
          owner
          content
          type
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCommentsByOwner = /* GraphQL */ `
  query ListCommentsByOwner(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentsByOwner(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        postID
        comment
        createdAt
        updatedAt
        post {
          id
          owner
          content
          type
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listCommentsByPost = /* GraphQL */ `
  query ListCommentsByPost(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentsByPost(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        owner
        postID
        comment
        createdAt
        updatedAt
        post {
          id
          owner
          content
          type
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
