import { atom, selector } from 'recoil'

export const typingIDState = atom<string | null>({
  key: 'typingIDState',
  default: null,
})

type TypingScoreState = {
  startTime: number
  typed: number
  correct: number
}

export const typingScoreState = atom<TypingScoreState>({
  key: 'typingScoreState',
  default: {
    startTime: 0,
    typed: 0,
    correct: 0,
  },
})

export const accuracySelector = selector<number>({
  key: 'accuracySelector',
  get: ({ get }) => {
    const { correct, typed } = get(typingScoreState)
    const accuracy = typed !== 0 ? (correct / typed) * 100 : 0
    return accuracy
  },
})
