import Home from './dialogue/home'
import Other from './dialogue/other'

const state = {
  navigation: {
    isOpen: false,
    title: 'Title',
    pages: [
      {href: '/', title: 'Home'},
      {href: '/other', title: 'Other'} 
    ]
  }
}

const routes = {
  '/': Home,
  '/other': Other,
}

export {state, routes}
