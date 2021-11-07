/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostInput = {
  id?: string | null,
  owner?: string | null,
  title: string,
  content: string,
  type: string,
  createdAt?: string | null,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  owner?: string | null,
  title: string,
  content: string,
  type: string,
  createdAt: string,
  updatedAt: string,
  codes?: ModelCodeConnection | null,
  comments?: ModelCommentConnection | null,
};

export type ModelCodeConnection = {
  __typename: "ModelCodeConnection",
  items?:  Array<Code | null > | null,
  nextToken?: string | null,
};

export type Code = {
  __typename: "Code",
  id: string,
  owner?: string | null,
  postID: string,
  title: string,
  content: string,
  lang: string,
  skipline: string,
  type: string,
  createdAt: string,
  updatedAt: string,
  post?: Post | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items?:  Array<Comment | null > | null,
  nextToken?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  owner?: string | null,
  postID: string,
  content: string,
  type: string,
  createdAt: string,
  updatedAt: string,
  post?: Post | null,
};

export type UpdatePostInput = {
  id: string,
  owner?: string | null,
  title?: string | null,
  content?: string | null,
  type?: string | null,
  createdAt?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateCodeInput = {
  id?: string | null,
  owner?: string | null,
  postID: string,
  title: string,
  content: string,
  lang: string,
  skipline: string,
  type: string,
  createdAt?: string | null,
};

export type ModelCodeConditionInput = {
  postID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  lang?: ModelStringInput | null,
  skipline?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCodeConditionInput | null > | null,
  or?: Array< ModelCodeConditionInput | null > | null,
  not?: ModelCodeConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateCodeInput = {
  id: string,
  owner?: string | null,
  postID?: string | null,
  title?: string | null,
  content?: string | null,
  lang?: string | null,
  skipline?: string | null,
  type?: string | null,
  createdAt?: string | null,
};

export type DeleteCodeInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  owner?: string | null,
  postID: string,
  content: string,
  type: string,
  createdAt?: string | null,
};

export type ModelCommentConditionInput = {
  postID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
  owner?: string | null,
  postID?: string | null,
  content?: string | null,
  type?: string | null,
  createdAt?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type CreateAvatarInput = {
  owner: string,
  avatar: string,
};

export type ModelAvatarConditionInput = {
  avatar?: ModelStringInput | null,
  and?: Array< ModelAvatarConditionInput | null > | null,
  or?: Array< ModelAvatarConditionInput | null > | null,
  not?: ModelAvatarConditionInput | null,
};

export type Avatar = {
  __typename: "Avatar",
  owner: string,
  avatar: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAvatarInput = {
  owner: string,
  avatar?: string | null,
};

export type DeleteAvatarInput = {
  owner: string,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items?:  Array<Post | null > | null,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCodeFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  postID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  lang?: ModelStringInput | null,
  skipline?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCodeFilterInput | null > | null,
  or?: Array< ModelCodeFilterInput | null > | null,
  not?: ModelCodeFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  postID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type ModelAvatarFilterInput = {
  owner?: ModelStringInput | null,
  avatar?: ModelStringInput | null,
  and?: Array< ModelAvatarFilterInput | null > | null,
  or?: Array< ModelAvatarFilterInput | null > | null,
  not?: ModelAvatarFilterInput | null,
};

export type ModelAvatarConnection = {
  __typename: "ModelAvatarConnection",
  items?:  Array<Avatar | null > | null,
  nextToken?: string | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    codes?:  {
      __typename: "ModelCodeConnection",
      items?:  Array< {
        __typename: "Code",
        id: string,
        owner?: string | null,
        postID: string,
        title: string,
        content: string,
        lang: string,
        skipline: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        owner?: string | null,
        postID: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    codes?:  {
      __typename: "ModelCodeConnection",
      items?:  Array< {
        __typename: "Code",
        id: string,
        owner?: string | null,
        postID: string,
        title: string,
        content: string,
        lang: string,
        skipline: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        owner?: string | null,
        postID: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    codes?:  {
      __typename: "ModelCodeConnection",
      items?:  Array< {
        __typename: "Code",
        id: string,
        owner?: string | null,
        postID: string,
        title: string,
        content: string,
        lang: string,
        skipline: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        owner?: string | null,
        postID: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateCodeMutationVariables = {
  input: CreateCodeInput,
  condition?: ModelCodeConditionInput | null,
};

export type CreateCodeMutation = {
  createCode?:  {
    __typename: "Code",
    id: string,
    owner?: string | null,
    postID: string,
    title: string,
    content: string,
    lang: string,
    skipline: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateCodeMutationVariables = {
  input: UpdateCodeInput,
  condition?: ModelCodeConditionInput | null,
};

export type UpdateCodeMutation = {
  updateCode?:  {
    __typename: "Code",
    id: string,
    owner?: string | null,
    postID: string,
    title: string,
    content: string,
    lang: string,
    skipline: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteCodeMutationVariables = {
  input: DeleteCodeInput,
  condition?: ModelCodeConditionInput | null,
};

export type DeleteCodeMutation = {
  deleteCode?:  {
    __typename: "Code",
    id: string,
    owner?: string | null,
    postID: string,
    title: string,
    content: string,
    lang: string,
    skipline: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    owner?: string | null,
    postID: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    owner?: string | null,
    postID: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    owner?: string | null,
    postID: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type CreateAvatarMutationVariables = {
  input: CreateAvatarInput,
  condition?: ModelAvatarConditionInput | null,
};

export type CreateAvatarMutation = {
  createAvatar?:  {
    __typename: "Avatar",
    owner: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAvatarMutationVariables = {
  input: UpdateAvatarInput,
  condition?: ModelAvatarConditionInput | null,
};

export type UpdateAvatarMutation = {
  updateAvatar?:  {
    __typename: "Avatar",
    owner: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAvatarMutationVariables = {
  input: DeleteAvatarInput,
  condition?: ModelAvatarConditionInput | null,
};

export type DeleteAvatarMutation = {
  deleteAvatar?:  {
    __typename: "Avatar",
    owner: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    codes?:  {
      __typename: "ModelCodeConnection",
      items?:  Array< {
        __typename: "Code",
        id: string,
        owner?: string | null,
        postID: string,
        title: string,
        content: string,
        lang: string,
        skipline: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        owner?: string | null,
        postID: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPostsByDateQueryVariables = {
  type?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsByDateQuery = {
  listPostsByDate?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPostsByOwnerQueryVariables = {
  owner?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsByOwnerQuery = {
  listPostsByOwner?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCodeQueryVariables = {
  id: string,
};

export type GetCodeQuery = {
  getCode?:  {
    __typename: "Code",
    id: string,
    owner?: string | null,
    postID: string,
    title: string,
    content: string,
    lang: string,
    skipline: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListCodesQueryVariables = {
  filter?: ModelCodeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCodesQuery = {
  listCodes?:  {
    __typename: "ModelCodeConnection",
    items?:  Array< {
      __typename: "Code",
      id: string,
      owner?: string | null,
      postID: string,
      title: string,
      content: string,
      lang: string,
      skipline: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        id: string,
        owner?: string | null,
        title: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        codes?:  {
          __typename: "ModelCodeConnection",
          nextToken?: string | null,
        } | null,
        comments?:  {
          __typename: "ModelCommentConnection",
          nextToken?: string | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCodesByDateQueryVariables = {
  type?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCodeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCodesByDateQuery = {
  listCodesByDate?:  {
    __typename: "ModelCodeConnection",
    items?:  Array< {
      __typename: "Code",
      id: string,
      owner?: string | null,
      postID: string,
      title: string,
      content: string,
      lang: string,
      skipline: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        id: string,
        owner?: string | null,
        title: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        codes?:  {
          __typename: "ModelCodeConnection",
          nextToken?: string | null,
        } | null,
        comments?:  {
          __typename: "ModelCommentConnection",
          nextToken?: string | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCodesByOwnerQueryVariables = {
  owner?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCodeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCodesByOwnerQuery = {
  listCodesByOwner?:  {
    __typename: "ModelCodeConnection",
    items?:  Array< {
      __typename: "Code",
      id: string,
      owner?: string | null,
      postID: string,
      title: string,
      content: string,
      lang: string,
      skipline: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        id: string,
        owner?: string | null,
        title: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        codes?:  {
          __typename: "ModelCodeConnection",
          nextToken?: string | null,
        } | null,
        comments?:  {
          __typename: "ModelCommentConnection",
          nextToken?: string | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCodesByPostQueryVariables = {
  postID?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCodeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCodesByPostQuery = {
  listCodesByPost?:  {
    __typename: "ModelCodeConnection",
    items?:  Array< {
      __typename: "Code",
      id: string,
      owner?: string | null,
      postID: string,
      title: string,
      content: string,
      lang: string,
      skipline: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        id: string,
        owner?: string | null,
        title: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        codes?:  {
          __typename: "ModelCodeConnection",
          nextToken?: string | null,
        } | null,
        comments?:  {
          __typename: "ModelCommentConnection",
          nextToken?: string | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    owner?: string | null,
    postID: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items?:  Array< {
      __typename: "Comment",
      id: string,
      owner?: string | null,
      postID: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        id: string,
        owner?: string | null,
        title: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        codes?:  {
          __typename: "ModelCodeConnection",
          nextToken?: string | null,
        } | null,
        comments?:  {
          __typename: "ModelCommentConnection",
          nextToken?: string | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCommentsByDateQueryVariables = {
  type?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsByDateQuery = {
  listCommentsByDate?:  {
    __typename: "ModelCommentConnection",
    items?:  Array< {
      __typename: "Comment",
      id: string,
      owner?: string | null,
      postID: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        id: string,
        owner?: string | null,
        title: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        codes?:  {
          __typename: "ModelCodeConnection",
          nextToken?: string | null,
        } | null,
        comments?:  {
          __typename: "ModelCommentConnection",
          nextToken?: string | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCommentsByOwnerQueryVariables = {
  owner?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsByOwnerQuery = {
  listCommentsByOwner?:  {
    __typename: "ModelCommentConnection",
    items?:  Array< {
      __typename: "Comment",
      id: string,
      owner?: string | null,
      postID: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        id: string,
        owner?: string | null,
        title: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        codes?:  {
          __typename: "ModelCodeConnection",
          nextToken?: string | null,
        } | null,
        comments?:  {
          __typename: "ModelCommentConnection",
          nextToken?: string | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListCommentsByPostQueryVariables = {
  postID?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsByPostQuery = {
  listCommentsByPost?:  {
    __typename: "ModelCommentConnection",
    items?:  Array< {
      __typename: "Comment",
      id: string,
      owner?: string | null,
      postID: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        id: string,
        owner?: string | null,
        title: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        codes?:  {
          __typename: "ModelCodeConnection",
          nextToken?: string | null,
        } | null,
        comments?:  {
          __typename: "ModelCommentConnection",
          nextToken?: string | null,
        } | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetAvatarQueryVariables = {
  owner: string,
};

export type GetAvatarQuery = {
  getAvatar?:  {
    __typename: "Avatar",
    owner: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAvatarsQueryVariables = {
  owner?: string | null,
  filter?: ModelAvatarFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAvatarsQuery = {
  listAvatars?:  {
    __typename: "ModelAvatarConnection",
    items?:  Array< {
      __typename: "Avatar",
      owner: string,
      avatar: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    codes?:  {
      __typename: "ModelCodeConnection",
      items?:  Array< {
        __typename: "Code",
        id: string,
        owner?: string | null,
        postID: string,
        title: string,
        content: string,
        lang: string,
        skipline: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        owner?: string | null,
        postID: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    codes?:  {
      __typename: "ModelCodeConnection",
      items?:  Array< {
        __typename: "Code",
        id: string,
        owner?: string | null,
        postID: string,
        title: string,
        content: string,
        lang: string,
        skipline: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        owner?: string | null,
        postID: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    owner?: string | null,
    title: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    codes?:  {
      __typename: "ModelCodeConnection",
      items?:  Array< {
        __typename: "Code",
        id: string,
        owner?: string | null,
        postID: string,
        title: string,
        content: string,
        lang: string,
        skipline: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items?:  Array< {
        __typename: "Comment",
        id: string,
        owner?: string | null,
        postID: string,
        content: string,
        type: string,
        createdAt: string,
        updatedAt: string,
        post?:  {
          __typename: "Post",
          id: string,
          owner?: string | null,
          title: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateCodeSubscription = {
  onCreateCode?:  {
    __typename: "Code",
    id: string,
    owner?: string | null,
    postID: string,
    title: string,
    content: string,
    lang: string,
    skipline: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateCodeSubscription = {
  onUpdateCode?:  {
    __typename: "Code",
    id: string,
    owner?: string | null,
    postID: string,
    title: string,
    content: string,
    lang: string,
    skipline: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteCodeSubscription = {
  onDeleteCode?:  {
    __typename: "Code",
    id: string,
    owner?: string | null,
    postID: string,
    title: string,
    content: string,
    lang: string,
    skipline: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    owner?: string | null,
    postID: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    owner?: string | null,
    postID: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    owner?: string | null,
    postID: string,
    content: string,
    type: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      title: string,
      content: string,
      type: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        items?:  Array< {
          __typename: "Code",
          id: string,
          owner?: string | null,
          postID: string,
          title: string,
          content: string,
          lang: string,
          skipline: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        items?:  Array< {
          __typename: "Comment",
          id: string,
          owner?: string | null,
          postID: string,
          content: string,
          type: string,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateAvatarSubscription = {
  onCreateAvatar?:  {
    __typename: "Avatar",
    owner: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAvatarSubscription = {
  onUpdateAvatar?:  {
    __typename: "Avatar",
    owner: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAvatarSubscription = {
  onDeleteAvatar?:  {
    __typename: "Avatar",
    owner: string,
    avatar: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
