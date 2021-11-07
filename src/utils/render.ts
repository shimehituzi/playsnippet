import { useState, useCallback } from 'react'

type RenderState = 'ISR' | 'CSR'

export const useRenderState = (): {
  render: RenderState
  toCSR: () => void
} => {
  const [render, setRender] = useState<RenderState>('ISR')

  const toCSR = useCallback(() => {
    setRender('CSR')
  }, [])

  return { render, toCSR }
}
