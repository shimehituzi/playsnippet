import * as APIt from '../../API'
import * as mutation from '../../graphql/mutations'
import { gqlMutation } from '../graphql'
import { GraphQLOptions, GraphQLResult } from '@aws-amplify/api-graphql'

const generateMutationFunc =
  <V extends Record<string, unknown>, M = void>(
    query: GraphQLOptions['query']
  ) =>
  (variables: V): Promise<GraphQLResult<M>> => {
    return gqlMutation<V, M>({
      query: query,
      variables: {
        ...variables,
      },
    })
  }

export const createPostMutation = generateMutationFunc<
  APIt.CreatePostMutationVariables,
  APIt.CreatePostMutation
>(mutation.createPost)
export const updatePostMutation = generateMutationFunc<
  APIt.UpdatePostMutationVariables,
  APIt.UpdatePostMutation
>(mutation.updatePost)
export const deletePostMutation = generateMutationFunc<
  APIt.DeletePostMutationVariables,
  APIt.DeletePostMutation
>(mutation.deletePost)

export const createCodeMutation = generateMutationFunc<
  APIt.CreateCodeMutationVariables,
  APIt.CreateCodeMutation
>(mutation.createCode)
export const updateCodeMutation = generateMutationFunc<
  APIt.UpdateCodeMutationVariables,
  APIt.UpdateCodeMutation
>(mutation.updateCode)
export const deleteCodeMutation = generateMutationFunc<
  APIt.DeleteCodeMutationVariables,
  APIt.DeleteCodeMutation
>(mutation.deleteCode)

export const createCommentMutation = generateMutationFunc<
  APIt.CreateCommentMutationVariables,
  APIt.CreateCommentMutation
>(mutation.createComment)
export const updateCommentMutation = generateMutationFunc<
  APIt.UpdateCommentMutationVariables,
  APIt.UpdateCommentMutation
>(mutation.updateComment)
export const deleteCommentMutation = generateMutationFunc<
  APIt.DeleteCommentMutationVariables,
  APIt.DeleteCommentMutation
>(mutation.deleteComment)

export const createAvatarMutation = generateMutationFunc<
  APIt.CreateAvatarMutationVariables,
  APIt.CreateAvatarMutation
>(mutation.createAvatar)
export const updateAvatarMutation = generateMutationFunc<
  APIt.UpdateAvatarMutationVariables,
  APIt.UpdateAvatarMutation
>(mutation.updateAvatar)
export const deleteAvatarMutation = generateMutationFunc<
  APIt.DeleteAvatarMutationVariables,
  APIt.DeleteAvatarMutation
>(mutation.deleteAvatar)
