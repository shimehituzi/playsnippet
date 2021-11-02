import { GetAvatarQueryVariables, GetAvatarQuery, Avatar } from '../API'
import { getAvatar } from '../graphql/queries'
import { atom, selectorFamily } from 'recoil'
import { Nullable } from '../utils/nullable'
import { gqlQuery } from '../utils/graphql'

export const forceAvatarUpdate = atom<number>({
  key: 'forceAvatarUpdate',
  default: 0,
})

export const avatarQuery = selectorFamily<Nullable<Avatar>, string>({
  key: 'avatarQuery',
  get:
    (owner) =>
    async ({ get }) => {
      get(forceAvatarUpdate)
      if (owner === '') return null
      const res = await gqlQuery<GetAvatarQueryVariables, GetAvatarQuery>({
        query: getAvatar,
        variables: { owner: owner },
      })
      return res.data?.getAvatar
    },
})
