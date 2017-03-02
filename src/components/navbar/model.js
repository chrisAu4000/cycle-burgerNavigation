import xs from 'xstream'
import concat from 'xstream/extra/concat'
import tween from 'xstream/extra/tween'
import delay from 'xstream/extra/delay'
import sampleCombine from 'xstream/extra/sampleCombine'
import dropRepeats from 'xstream/extra/dropRepeats'
import {prop, compose, isNil, not, curry, merge} from 'ramda'

const toState = props => {
  return {
    items: props.items.map(item =>
      item.href === props.path
        ? Object.assign({}, item, {active: true})
        : Object.assign({}, item, {active: false})
      ),
    open: props.open
  }
}

const toggleOpen = state => Object.assign({}, state, {open: !state.open})
const setClosed = state => Object.assign({}, state, {open: false})
const setPath = curry((path, state) => Object.assign({}, state, {path: path}))

const model = (props$, actions) => {
  const initialState$ = props$.take(1)
  const closeMenu$ = actions.closeMenu$
    .map(_ => setClosed)
  const toggleMenu$ = actions.toggleMenu$
    .map(_ => toggleOpen)
  const pathChanged$ = actions.pathName$
    .map(setPath)
    .compose(delay(500))
  const changes$ = xs.merge(toggleMenu$, closeMenu$, pathChanged$)
  const state$ = changes$
    .fold((state, transform) => state.map(transform), initialState$)
    .flatten()
    .map(toState)

  const path$ = concat(
      props$
        .map(prop('path'))
        .take(1),
      actions.pathName$
    )
    .compose(dropRepeats())
    .drop(1)

  return {
    path$: path$,
    state$: state$
  }
}

export default model
export {toState}
