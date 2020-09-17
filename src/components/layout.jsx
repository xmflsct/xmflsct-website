import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import useDarkMode from 'use-dark-mode'

import Header from './header'
import Footer from './footer'

const Layout = ({ children, category }) => {
  useDarkMode()

  return (
    <div className='pb-4 lg:px-10 lg:pb-8'>
      <Header category={category} />
      <main className='max-w-screen-xl mx-auto px-4 mt-4 lg:mt-12'>
        <MDXProvider
          components={{
            h2: props => <h2 {...props} className='font-serif' />,
            h3: props => <h3 {...props} className='font-serif' />,
            h4: props => <h4 {...props} className='font-serif' />,
            blockquote: props => (
              <blockquote
                {...props}
                className='border-l-4 border-highlight pl-4'
              />
            ),
            p: props => (
              <p
                {...props}
                className='font-serif leading-relaxed mb-4 lg:text-xl'
              />
            )
          }}
        >
          {children}
        </MDXProvider>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
