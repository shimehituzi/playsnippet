import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { pageRenderState, PageRenderState } from '../state/uiState'

export const usePageRender = (): {
  pageState: PageRenderState
  toCSR: () => void
  toISR: () => void
  mount: () => void
  unmount: () => void
} => {
  const [pageState, setPageState] = useRecoilState(pageRenderState)

  const toCSR = useCallback(() => {
    setPageState((prev) => ({
      ...prev,
      render: 'CSR',
    }))
  }, [])

  const toISR = useCallback(() => {
    setPageState((prev) => ({
      ...prev,
      render: 'ISR',
    }))
  }, [])

  const mount = useCallback(() => {
    setPageState({
      render: 'ISR',
      mount: true,
    })
  }, [])

  const unmount = useCallback(() => {
    setPageState({
      render: 'ISR',
      mount: false,
    })
  }, [])

  return { pageState, toCSR, toISR, mount, unmount }
}
