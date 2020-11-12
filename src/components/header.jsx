import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  Linkedin,
  GitHub,
  Instagram,
  ArrowDown,
  ArrowLeft,
  ChevronDown,
  Moon,
  Sun,
  ArrowRight
} from 'react-feather'
import { useMediaQuery } from 'react-responsive'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from '@reach/router'
import useDarkMode from 'use-dark-mode'

const Header = ({ category }) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const darkMode = useDarkMode(false)
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1024px)' })
  const pathname = useLocation().pathname

  const data = useStaticQuery(graphql`
    {
      allCategories: allMdx(
        filter: { fileAbsolutePath: { regex: "/(projects)/" } }
      ) {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
    }
  `)
  return (
    <motion.header
      className={`overflow-hidden xl:h-auo xl:overflow-visible justify-start sticky top-0 flex flex-col xl:flex-row z-50 pt-4 pb-2 xl:pt-8 xl:pb-2`}
      animate={
        isSmallScreen
          ? toggleMenu
            ? { height: '100vh' }
            : { height: '3.5em' }
          : { height: 'auto' }
      }
      transition={{ ease: 'easeInOut' }}
    >
      <div
        className={`${
          toggleMenu ? 'visible z-50' : 'hidden'
        } order-3 xl:order-1 xl:block xl:flex-1 xl:text-sm my-4 xl:my-auto`}
      >
        <div className='flex justify-center xl:justify-start'>
          <a
            className='h-8 mr-8 flex items-center'
            href='https://www.instagram.com/xmflsct/'
            title='Instagram'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Instagram size='1.25em' />
          </a>
          <a
            className='h-8 mr-8 flex items-center'
            href='https://github.com/xmflsct/'
            title='GitHub'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHub size='1.25em' />
          </a>
          <a
            className='h-8 flex items-center'
            href='https://www.linkedin.com/in/xmflsct/'
            title='LinkedIn'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Linkedin size='1.25em' />
          </a>
        </div>
      </div>

      <div className='xl:flex-1 order-1 xl:order-2 flex justify-center'>
        {pathname.startsWith('/about-zhiyuan') ? (
          <div className='xl:flex-1 text-right leading-9 pr-3'>
            <ArrowDown size='1em' className='inline' /> About
          </div>
        ) : (
          <Link
            to={`/about-zhiyuan`}
            activeClassName='active'
            className='xl:flex-1 text-right leading-9 pr-3'
          >
            <ArrowLeft size='1em' className='inline' /> About
          </Link>
        )}
        <Link to={`/`} className='opacity-100 text-2xl font-semibold'>
          ZHIYUAN
        </Link>
        <div className='relative xl:flex-1 block text-left leading-9'>
          {category ? (
            <button
              onClick={() => {
                setToggleMenu(!toggleMenu)
              }}
              className={`pl-3 xl:pr-4 relative z-50 focus:outline-none ${
                toggleMenu ? 'opacity-100' : ''
              } ${category !== '*' ? 'opacity-100' : ''}`}
            >
              designs {category === '*' ? 'below' : category.toLowerCase()}
              <motion.span
                animate={{ rotate: toggleMenu ? -180 : 0 }}
                transition={{ ease: 'easeInOut' }}
                className='inline-block  ml-1'
              >
                <ChevronDown size='1em' className='inline' />
              </motion.span>
            </button>
          ) : (
            <Link to={'/'} className='pl-3'>
              design highlights <ArrowRight size='1em' className='inline' />
            </Link>
          )}
          {toggleMenu && (
            <button
              aria-label='Close menu'
              onClick={() => {
                setToggleMenu(!toggleMenu)
              }}
              tabIndex='-1'
              className='fixed inset-0 w-full h-full cursor-default'
            />
          )}
          <AnimatePresence initial={false}>
            {toggleMenu && (
              <motion.ul
                className={`relative xl:absolute w-full xl:w-auto pl-3 pr-4 pb-1 ${
                  darkMode.value ? 'xl:bg-dark-bg' : 'xl:bg-light-bg'
                }`}
                initial={{ opacity: 0, y: '-2em' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-1em' }}
                transition={{ ease: 'easeInOut' }}
              >
                {data.allCategories.group.map(({ fieldValue }, index) => (
                  <li key={index}>
                    <Link
                      to={`/${fieldValue.toLowerCase()}`}
                      activeClassName='active'
                      className={category === fieldValue ? 'active' : ''}
                    >
                      <span className='hidden xl:inline-block opacity-0'>
                        designs
                      </span>{' '}
                      {fieldValue.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        className={`${
          toggleMenu ? 'visible z-50' : 'hidden'
        } order-2 xl:block xl:flex-1 flex my-4 xl:my-auto`}
      >
        <button
          className='mx-auto xl:ml-auto xl:mr-0 h-8 flex items-center'
          aria-label={darkMode.value ? 'Light mode' : 'Dark mode'}
          onClick={darkMode.toggle}
        >
          {darkMode.value ? (
            <Sun size='1.25em' />
          ) : (
            <Moon size='1.25em' fill='currentColor' />
          )}
        </button>
      </div>
    </motion.header>
  )
}

export default Header
