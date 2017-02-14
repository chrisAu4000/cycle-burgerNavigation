import {div} from '@cycle/dom'
import xs from 'xstream'

function Home(sources) {
  return {
    DOM: xs.of(div(['home'])),
    state$: sources.state$,
    router: sources.router
  }
}

export default Home
