import React from 'react'
import { Appbar } from './Appbar'
import { Container } from '@mui/material'
import { useAuthInit } from '../utils/auth'

export const Layout: React.FC = ({ children }) => {
  useAuthInit()

  return (
    <React.Fragment>
      <Appbar />
      <Container>{children}</Container>
    </React.Fragment>
  )
}
