import React from "react"
import useDarkMode from 'use-dark-mode';

import Header from "../components/header"
import Footer from "../components/footer"

const Layout = props => {
  useDarkMode()

  const { children } = props

  return (
    <div className="site-wrapper transition-fade">
      <Header category={props.category}/>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
