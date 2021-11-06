import { atom } from 'recoil'

export type PageRenderState = {
  render: 'ISR' | 'CSR'
  mount: boolean
}

export const pageRenderState = atom<PageRenderState>({
  key: 'renderState',
  default: {
    render: 'ISR',
    mount: false,
  },
})

export const isSubscribeState = atom<boolean>({
  key: 'isSubscribeState',
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
