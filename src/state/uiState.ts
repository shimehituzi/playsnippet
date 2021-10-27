import { atom } from 'recoil'

export const typingIDState = atom<string | null>({
  key: 'typingIDState',
  default: null,
})
