import {div} from '@cycle/dom'
import xs from 'xstream'

function Other(sources) {
  return {
    DOM: xs.of(div(['other'])),
    state$: sources.state$
  }
}

export default Other
