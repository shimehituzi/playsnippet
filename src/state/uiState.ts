import { atom } from 'recoil'

export const typingIDState = atom<string | null>({
  key: 'typingIDState',
  default: null,
})

export const drawerOpenState = atom<boolean>({
  key: 'drawerOpenState',
  default: false,
})
