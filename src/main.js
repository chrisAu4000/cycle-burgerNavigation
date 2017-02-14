import xs from 'xstream'
import delay from 'xstream/extra/delay'
import dropRepeats from 'xstream/extra/dropRepeats'
import {state, routes} from './state'
import Navbar from './components/navbar'
import ContentRouter from './components/content-router'
import {prop} from 'ramda'
import {div} from '@cycle/dom'
import Home from './dialogue/home'
import Other from './dialogue/other'

const options = {
  routes: {
    '/': Home,
    '/history': Other
  }
}
const view$ = (navigation, content) => {
  return xs.combine(navigation, content).map(div)
}
function main(sources) {
  const {state$, DOM, path$} = ContentRouter(sources, options)
  const prop$ = xs.of({
    path$: path$,
    open: false,
    items: [
      {text: 'Dashboard', href: '/'},
      {text: 'History', href: '/history'},
      {text: 'Statistics', href: '/stats'},
      {text: 'Settings', href: '/settings'},
    ]
  })
  const navbar = Navbar(prop$, sources)
  return {
    DOM: view$(navbar.DOM, DOM),
    state$: state$.startWith({}),
    router: navbar.path$,
  }
}

export default main
