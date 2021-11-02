import { Avatar } from '../API'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { avatarQuery, forceAvatarUpdate } from '../state/avatarsState'
import { Nullable } from './nullable'

export const useAvatarUpdate = (): (() => void) => {
  const setForceAvatarUpdate = useSetRecoilState(forceAvatarUpdate)
  const forceUpdate = () => setForceAvatarUpdate((n) => n + 1)
  return forceUpdate
}

export const useAvatar = (username: string): Nullable<Avatar> => {
  const avatar = useRecoilValueLoadable(avatarQuery(username))

  return avatar.state === 'hasValue' ? avatar.contents : null
}
