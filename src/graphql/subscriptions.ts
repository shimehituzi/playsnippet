/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateCode = /* GraphQL */ `
  subscription OnCreateCode {
    onCreateCode {
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
export const onUpdateCode = /* GraphQL */ `
  subscription OnUpdateCode {
    onUpdateCode {
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
export const onDeleteCode = /* GraphQL */ `
  subscription OnDeleteCode {
    onDeleteCode {
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
