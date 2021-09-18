/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createCode = /* GraphQL */ `
  mutation CreateCode(
    $input: CreateCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    createCode(input: $input, condition: $condition) {
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
export const updateCode = /* GraphQL */ `
  mutation UpdateCode(
    $input: UpdateCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    updateCode(input: $input, condition: $condition) {
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
export const deleteCode = /* GraphQL */ `
  mutation DeleteCode(
    $input: DeleteCodeInput!
    $condition: ModelCodeConditionInput
  ) {
    deleteCode(input: $input, condition: $condition) {
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
