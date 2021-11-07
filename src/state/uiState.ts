import { atom } from 'recoil'

export const subscribeFlagState = atom<boolean>({
  key: 'subscribeFlagState',
  default: false,
})

export const enableSabscribeState = atom<boolean>({
  key: 'isEnableSubscribeState',
  default: false,
})

export const typingIDState = atom<string | null>({
  key: 'typingIDState',
  default: null,
})

export const drawerOpenState = atom<boolean>({
  key: 'drawerOpenState',
  default: false,
})
