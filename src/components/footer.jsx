import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <footer className='mt-10 px-3 text-center'>
      &copy; {new Date().getFullYear()}{' '}
      <Link to={`/`}>{data.site.siteMetadata.title}</Link> &mdash; Built with{' '}
      <a href='https://gatsbyjs.com' target='_blank' rel='noopener noreferrer'>
        Gatsby
      </a>
      , hosted on{' '}
      <a href='https://vercel.com/' target='_blank' rel='noopener noreferrer'>
        Vercel
      </a>
      , source code at{' '}
      <a
        href='https://github.com/xmflsct/xmflsct-website'
        target='_blank'
        rel='noopener noreferrer'
      >
        GitHub
      </a>
    </footer>
  )
}

export default Footer
