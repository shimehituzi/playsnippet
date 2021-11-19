import { atom } from 'recoil'

export const subscribeFlagState = atom<boolean>({
  key: 'subscribeFlagState',
  default: false,
})

export const drawerOpenState = atom<boolean>({
  key: 'drawerOpenState',
  default: false,
})

type EditState = {
  isEdit: boolean
  open: boolean
  id: string
}

export const editState = atom<EditState>({
  key: 'editState',
  default: {
    isEdit: false,
    open: false,
    id: '',
  },
})
