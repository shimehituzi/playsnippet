import { atom } from 'recoil'

export const typingState = atom<string | null>({
  key: 'typingState',
  default: null,
})
