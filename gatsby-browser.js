import './src/styles/main.scss'

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), 350)
  } else {
    // const savedPosition = getSavedScrollPosition(location)
    // window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), 350)
  }
  return false
}
