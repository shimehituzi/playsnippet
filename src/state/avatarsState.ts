import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { GetAvatarQueryVariables, GetAvatarQuery, Avatar } from '../API'
import { getAvatar } from '../graphql/queries'
import { atom, selector, selectorFamily } from 'recoil'
import { notNull, Nullable } from '../utils/nullable'

export const forceAvatarUpdate = atom<number>({
  key: 'forceAvatarUpdate',
  default: 0,
})

export const displayedOwnersState = atom<string[]>({
  key: 'displayedOwnersState',
  default: [],
})

export const avatarState = selectorFamily<Avatar | null, string>({
  key: 'avatarState',
  get:
    (owner) =>
    ({ get }) => {
      const avatars = get(avatarsState)
      const avatar = avatars.find((v) => v.owner === owner)
      return avatar ? avatar : null
    },
})

const avatarsState = selector<Avatar[]>({
  key: 'avatarsState',
  get: ({ get }) => {
    const owners = get(displayedOwnersState)
    return owners.map((owner) => get(avatarQuery(owner))).filter(notNull)
  },
})

const avatarQuery = selectorFamily<Nullable<Avatar>, string>({
  key: 'avatarQuery',
  get:
    (owner) =>
    async ({ get }) => {
      get(forceAvatarUpdate)
      if (owner === '') return null
      const getAvatarQueryVariables: GetAvatarQueryVariables = {
        owner: owner,
      }
      const res = (await API.graphql(
        graphqlOperation(getAvatar, getAvatarQueryVariables)
      )) as GraphQLResult<GetAvatarQuery>
      return res.data?.getAvatar
    },
})
