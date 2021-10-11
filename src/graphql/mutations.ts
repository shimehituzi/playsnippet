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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createAvatar = /* GraphQL */ `
  mutation CreateAvatar(
    $input: CreateAvatarInput!
    $condition: ModelAvatarConditionInput
  ) {
    createAvatar(input: $input, condition: $condition) {
      owner
      avatar
      createdAt
      updatedAt
    }
  }
`;
export const updateAvatar = /* GraphQL */ `
  mutation UpdateAvatar(
    $input: UpdateAvatarInput!
    $condition: ModelAvatarConditionInput
  ) {
    updateAvatar(input: $input, condition: $condition) {
      owner
      avatar
      createdAt
      updatedAt
    }
  }
`;
export const deleteAvatar = /* GraphQL */ `
  mutation DeleteAvatar(
    $input: DeleteAvatarInput!
    $condition: ModelAvatarConditionInput
  ) {
    deleteAvatar(input: $input, condition: $condition) {
      owner
      avatar
      createdAt
      updatedAt
    }
  }
`;
