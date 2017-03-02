import xs from 'xstream'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'
import {state, routes} from './state'
import {div} from '@cycle/dom'

import Home from './dialogue/home'
import Other from './dialogue/other'

import ContentRouter from './components/content-router'
import MenuButton from './components/menuButton'
import Navbar from './components/navbar'

const routerOpts = {
  routes: {
    '/': Home,
    '/history': Other
  }
}
const view$ = (navigation, content) => {
  return xs.combine(
    navigation,
    // content
  )
  .map(div)
}
function main(sources) {
  const {state$, DOM, path$} = ContentRouter(sources, routerOpts)
  const open = true
  const menuButton = MenuButton(sources, xs.of({
    open: open,
    duration: 250,
    easing: tween.power4.easeOut
  }))
  const props$ = path$.map(path => ({
    path: path,
    open: open,
    items: [
      {text: 'Dashboard',  href: '/'},
      {text: 'History',    href: '/history'},
      {text: 'Statistics', href: '/stats'},
      {text: 'Settings',   href: '/settings'},
    ],
    button: menuButton,
  }))

  const navbar = Navbar(sources, props$)
  menuButton.toggle$.imitate(navbar.path$)
  return {
    DOM: view$(navbar.DOM, DOM),
    state$: state$.startWith({}),
    router: navbar.path$,
  }
}

export default main
