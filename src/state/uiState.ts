import { atom } from 'recoil'

export const subscribeFlagState = atom<boolean>({
  key: 'subscribeFlagState',
  default: false,
})

export const drawerOpenState = atom<boolean>({
  key: 'drawerOpenState',
  default: false,
})
