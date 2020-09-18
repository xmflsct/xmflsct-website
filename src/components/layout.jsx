import React from 'react'
import { motion } from 'framer-motion'
import { MDXProvider } from '@mdx-js/react'

import SEO from './seo'
import Header from './header'
import Footer from './footer'

const Layout = ({ category, children, description, schema, title }) => {
  return (
    <div className='pb-4 lg:px-10 lg:pb-8'>
      <SEO title={title} description={description} schema={schema} />
      <Header category={category} />
      <motion.main
        className='max-w-screen-xl mx-auto px-4 mt-4 lg:mt-12'
        key={Math.random()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.35 } }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
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
      </motion.main>
      <Footer />
    </div>
  )
}

export default Layout
