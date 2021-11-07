import React from 'react'
import { Appbar } from './Appbar'
import { Box, Container } from '@mui/material'
import { Drawer } from './Drawer'
import { DrawerHeader } from './Styled'

export const Layout: React.FC = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Appbar />
      <Drawer />
      <Box sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Container>{children}</Container>
      </Box>
    </Box>
  )
}
