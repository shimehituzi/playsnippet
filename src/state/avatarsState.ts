import { useEffect } from 'react'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { GetAvatarQueryVariables, GetAvatarQuery, Avatar } from '../API'
import { getAvatar } from '../graphql/queries'
import {
  atom,
  selector,
  selectorFamily,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

const displayedOwnersState = atom<string[]>({
  key: 'displayedOwnersState',
  default: [],
})

const avatarsState = selector<Avatar[]>({
  key: 'avatarsState',
  get: ({ get }) => {
    const owners = get(displayedOwnersState)
    return owners
      .map((owner) => get(avatarQuery(owner)))
      .filter((value) => value)
  },
})

const avatarQuery = selectorFamily<Avatar | null, string>({
  key: 'avatarQuery',
  get: (owner) => async () => {
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

const avatarState = selectorFamily<Avatar | null, string>({
  key: 'avatarState',
  get:
    (owner) =>
    ({ get }) => {
      const avatars = get(avatarsState)
      const avatar = avatars.find((v) => v.owner === owner)
      return avatar ? avatar : null
    },
})

export const useAvatar = (username: string): Avatar | null => {
  const setOwner = useSetRecoilState(displayedOwnersState)
  const avatar = useRecoilValueLoadable(avatarState(username))

  useEffect(() => {
    setOwner((prev) => Array.from(new Set([...prev, username])))
  }, [username])

  return avatar.state === 'hasValue' ? avatar.contents : null
}
