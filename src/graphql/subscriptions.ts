/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      owner
      title
      content
      type
      createdAt
      updatedAt
      codes {
        items {
          id
          owner
          postID
          title
          content
          lang
          skipline
          type
          createdAt
          updatedAt
          post {
            id
            owner
            title
            content
            type
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      comments {
        items {
          id
          owner
          postID
          content
          createdAt
          updatedAt
          post {
            id
            owner
            title
            content
            type
            createdAt
            updatedAt
          }
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
      title
      content
      type
      createdAt
      updatedAt
      codes {
        items {
          id
          owner
          postID
          title
          content
          lang
          skipline
          type
          createdAt
          updatedAt
          post {
            id
            owner
            title
            content
            type
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      comments {
        items {
          id
          owner
          postID
          content
          createdAt
          updatedAt
          post {
            id
            owner
            title
            content
            type
            createdAt
            updatedAt
          }
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
      title
      content
      type
      createdAt
      updatedAt
      codes {
        items {
          id
          owner
          postID
          title
          content
          lang
          skipline
          type
          createdAt
          updatedAt
          post {
            id
            owner
            title
            content
            type
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      comments {
        items {
          id
          owner
          postID
          content
          createdAt
          updatedAt
          post {
            id
            owner
            title
            content
            type
            createdAt
            updatedAt
          }
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
      content
      lang
      skipline
      type
      createdAt
      updatedAt
      post {
        id
        owner
        title
        content
        type
        createdAt
        updatedAt
        codes {
          items {
            id
            owner
            postID
            title
            content
            lang
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
            content
            createdAt
            updatedAt
          }
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
      content
      lang
      skipline
      type
      createdAt
      updatedAt
      post {
        id
        owner
        title
        content
        type
        createdAt
        updatedAt
        codes {
          items {
            id
            owner
            postID
            title
            content
            lang
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
            content
            createdAt
            updatedAt
          }
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
      content
      lang
      skipline
      type
      createdAt
      updatedAt
      post {
        id
        owner
        title
        content
        type
        createdAt
        updatedAt
        codes {
          items {
            id
            owner
            postID
            title
            content
            lang
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
            content
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      owner
      postID
      content
      createdAt
      updatedAt
      post {
        id
        owner
        title
        content
        type
        createdAt
        updatedAt
        codes {
          items {
            id
            owner
            postID
            title
            content
            lang
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
            content
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      owner
      postID
      content
      createdAt
      updatedAt
      post {
        id
        owner
        title
        content
        type
        createdAt
        updatedAt
        codes {
          items {
            id
            owner
            postID
            title
            content
            lang
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
            content
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      owner
      postID
      content
      createdAt
      updatedAt
      post {
        id
        owner
        title
        content
        type
        createdAt
        updatedAt
        codes {
          items {
            id
            owner
            postID
            title
            content
            lang
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
            content
            createdAt
            updatedAt
          }
          nextToken
        }
      }
    }
  }
`;
