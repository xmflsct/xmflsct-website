import React from 'react'
import { AnimatePresence } from 'framer-motion'
import useDarkMode from 'use-dark-mode'

const Layout = ({ children }) => {
  useDarkMode()

  return <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
}

export default Layout
