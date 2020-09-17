import React from 'react'

import Layout from '../components/layout'
import Cards from '../components/cards'

const Category = ({ pageContext }) => {
  return (
    <Layout category={pageContext.category}>
      <h2 className='text-center lg:text-4xl my-8 lg:mt-0 lg:mb-20 lg:px-64'>
        Passionate and experienced product designer, based in{' '}
        <a
          href='https://visitsweden.com/stockholm/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Stockholm
        </a>{' '}
        working for{' '}
        <a
          href='https://hmgroup.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          H&amp;M Group
        </a>
      </h2>

      <Cards filter={pageContext.category} />
    </Layout>
  )
}

export default Category
