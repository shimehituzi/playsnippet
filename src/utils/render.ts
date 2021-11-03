import { useCallback, useState } from 'react'

type RenderState = 'ISR' | 'CSR'

export const useRenderState = (): {
  renderState: RenderState
  toCSR: () => void
  toISR: () => void
} => {
  const [renderState, setRenderState] = useState<RenderState>('ISR')

  const toCSR = useCallback(() => {
    setRenderState('CSR')
  }, [])

  const toISR = useCallback(() => {
    setRenderState('ISR')
  }, [])

  return { renderState, toCSR, toISR }
}
