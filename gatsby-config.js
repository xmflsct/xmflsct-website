module.exports = {
  siteMetadata: {
    title: "Zhiyuan' Portfolio",
    description:
      'A passionate and experienced product designer with a cross-cultural background of China 🇨🇳, the Netherlands 🇳🇱 and Sweden 🇸🇪. Constantly reaching out to experience cultural differences, and further reflecting upon the perception between human, human and machine.',
    siteUrl: 'https://xmflsct.com'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-49185184-1',
        head: 'true'
      }
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/layouts.jsx')
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sitemap'
    },
    {
      resolve: 'gatsby-plugin-use-dark-mode'
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: 'Source Sans Pro',
              variants: ['400', '600']
            },
            {
              family: 'Source Serif Pro',
              variants: ['400', '600']
            }
          ]
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/projects`,
        name: 'projects'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets`,
        name: 'assets'
      }
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1080,
              linkImagesToOriginal: false,
              quality: 100,
              withWebp: { quality: 100 },
              backgroundColor: 'none',
              disableBgImage: true
            }
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-plugin-postcss',
    'gatsby-transformer-sharp'
  ]
}
