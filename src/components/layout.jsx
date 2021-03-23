import React from 'react'
// import { ExternalLink } from 'react-feather'
import { motion } from 'framer-motion'
import { MDXProvider } from '@mdx-js/react'

import SEO from './seo'
import Header from './header'
import Footer from './footer'

import EmbedImage from './mdx/embedImage'
import EmbedVideo from './mdx/embedVideo'

const Layout = ({ category, children, description, schema, title }) => {
  return (
    <div className='pb-4 lg:px-10 lg:pb-8'>
      <SEO title={title} description={description} schema={schema} />
      <Header category={category} />
      <motion.main
        className='max-w-screen-xl mx-auto px-4 mt-4 lg:mt-12'
        key={Math.random()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <MDXProvider
          components={{
            a: props => {
              return (
                <a href={props.href} rel={props.rel} target={props.target}>
                  {props.children}
                  {/* {props.href.includes('xmflsct.com') ||
                  props.href.startsWith('/') ? (
                    ''
                  ) : (
                    <ExternalLink size='0.75em' className='inline mx-1' />
                  )} */}
                </a>
              )
            },
            h2: props => <h2 {...props} className='my-4' />,
            h3: props => <h3 {...props} className='my-4' />,
            blockquote: ({ children }) => {
              if (!Array.isArray(children)) children = [children]
              return (
                <blockquote className='border-l-4 border-highlight pl-4 lg:pl-6'>
                  {children.map((child, index) => {
                    switch (child.props.originalType) {
                      case 'h2':
                        return (
                          <h2 key={index} {...child.props} className='my-2' />
                        )
                      case 'h3':
                        return (
                          <h3 key={index} {...child.props} className='my-2' />
                        )
                      case 'p':
                        return (
                          <p
                            key={index}
                            {...child.props}
                            className='font-serif mb-2 lg:mb-4 lg:text-xl lg:leading-relaxed'
                          />
                        )
                      default:
                        return (
                          <p
                            key={index}
                            {...child.props}
                            className='font-serif mb-2 lg:mb-4 lg:text-xl lg:leading-relaxed'
                          />
                        )
                    }
                  })}
                </blockquote>
              )
            },
            p: props => {
              return (
                <p
                  {...props}
                  className='font-serif mb-4 lg:mb-8 lg:text-xl lg:leading-relaxed'
                />
              )
            },
            ol: ({ children }) => {
              return (
                <ol className='font-serif -mt-2 mb-4 lg:mb-8 lg:text-xl'>
                  {children.map((child, index) => (
                    <li key={index} className='list-decimal mb-2 ml-8 lg:ml-10'>
                      {child.props.children}
                    </li>
                  ))}
                </ol>
              )
            },
            ul: ({ children }) => {
              return (
                <ol className='font-serif -mt-2 mb-4 lg:mb-8 lg:text-xl'>
                  {children.map((child, index) => (
                    <li key={index} className='list-disc mb-2 ml-8 lg:ml-10'>
                      {child.props.children}
                    </li>
                  ))}
                </ol>
              )
            },
            hr: props => <hr {...props} className='my-4 lg:my-6' />,
            EmbedImage,
            EmbedVideo
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
