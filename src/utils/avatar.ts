import { useEffect } from 'react'
import { Avatar } from '../API'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import {
  avatarState,
  displayedOwnersState,
  forceAvatarUpdate,
} from '../state/avatarsState'

export const useAvatarUpdate = (): (() => void) => {
  const setForceAvatarUpdate = useSetRecoilState(forceAvatarUpdate)
  const forceUpdate = () => setForceAvatarUpdate((n) => n + 1)
  return forceUpdate
}

export const useAvatar = (username: string): Avatar | null => {
  const setOwner = useSetRecoilState(displayedOwnersState)
  const avatar = useRecoilValueLoadable(avatarState(username))

  useEffect(() => {
    setOwner((prev) => Array.from(new Set([...prev, username])))
  }, [username])

  return avatar.state === 'hasValue' ? avatar.contents : null
}
