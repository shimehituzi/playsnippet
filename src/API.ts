/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostInput = {
  id?: string | null,
  owner?: string | null,
  content: string,
};

export type ModelPostConditionInput = {
  content?: ModelStringInput | null,
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
  content: string,
  createdAt: string,
  updatedAt: string,
  codes?: ModelCodeConnection | null,
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
  lang: string,
  code: string,
  skipline: string,
  createdAt: string,
  updatedAt: string,
  post?: Post | null,
};

export type UpdatePostInput = {
  id: string,
  owner?: string | null,
  content?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateCodeInput = {
  id?: string | null,
  owner?: string | null,
  postID: string,
  title: string,
  lang: string,
  code: string,
  skipline: string,
};

export type ModelCodeConditionInput = {
  postID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  lang?: ModelStringInput | null,
  code?: ModelStringInput | null,
  skipline?: ModelStringInput | null,
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
  lang?: string | null,
  code?: string | null,
  skipline?: string | null,
};

export type DeleteCodeInput = {
  id: string,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items?:  Array<Post | null > | null,
  nextToken?: string | null,
};

export type ModelCodeFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  postID?: ModelIDInput | null,
  title?: ModelStringInput | null,
  lang?: ModelStringInput | null,
  code?: ModelStringInput | null,
  skipline?: ModelStringInput | null,
  and?: Array< ModelCodeFilterInput | null > | null,
  or?: Array< ModelCodeFilterInput | null > | null,
  not?: ModelCodeFilterInput | null,
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
    content: string,
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
        lang: string,
        code: string,
        skipline: string,
        createdAt: string,
        updatedAt: string,
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
    content: string,
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
        lang: string,
        code: string,
        skipline: string,
        createdAt: string,
        updatedAt: string,
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
    content: string,
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
        lang: string,
        code: string,
        skipline: string,
        createdAt: string,
        updatedAt: string,
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
    lang: string,
    code: string,
    skipline: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      content: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
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
    lang: string,
    code: string,
    skipline: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      content: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
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
    lang: string,
    code: string,
    skipline: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      content: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        nextToken?: string | null,
      } | null,
    } | null,
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
    content: string,
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
        lang: string,
        code: string,
        skipline: string,
        createdAt: string,
        updatedAt: string,
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
      content: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
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
    lang: string,
    code: string,
    skipline: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      content: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
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
      lang: string,
      code: string,
      skipline: string,
      createdAt: string,
      updatedAt: string,
      post?:  {
        __typename: "Post",
        id: string,
        owner?: string | null,
        content: string,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    owner?: string | null,
    content: string,
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
        lang: string,
        code: string,
        skipline: string,
        createdAt: string,
        updatedAt: string,
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
    content: string,
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
        lang: string,
        code: string,
        skipline: string,
        createdAt: string,
        updatedAt: string,
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
    content: string,
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
        lang: string,
        code: string,
        skipline: string,
        createdAt: string,
        updatedAt: string,
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
    lang: string,
    code: string,
    skipline: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      content: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
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
    lang: string,
    code: string,
    skipline: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      content: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
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
    lang: string,
    code: string,
    skipline: string,
    createdAt: string,
    updatedAt: string,
    post?:  {
      __typename: "Post",
      id: string,
      owner?: string | null,
      content: string,
      createdAt: string,
      updatedAt: string,
      codes?:  {
        __typename: "ModelCodeConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};
