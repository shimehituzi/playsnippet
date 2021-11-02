import React from 'react'
import { Appbar } from './Appbar'
import { Container } from '@mui/material'

export const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Appbar />
      <Container>{children}</Container>
    </React.Fragment>
  )
}
