import intent from './intent'
import model from './model'
import view from './view'
/* INPUT
 * prop$ :: Stream({
 *   path$ :: Stream(String),
 *   open :: Boolean,
 *   items :: Array({href :: String, text :: String})
 * })
 *
 * Sources :: {DOM :: domSource [mandatory], ...}
 *
 * OUTPUT
 * Sinks :: {
 *   DOM :: Stream(vdom),
 *   state$ :: Stream({
 *     open :: Boolean,
 *     items :: Array({href :: String, text :: String})
 *   }),
 *   path$ :: Stream(String)
 * }
 *
**/

// Navbar :: Stream({Path, Open, Array(Item)}) -> Sources -> Sinks
function Navbar(sources, props$) {
  const childrenDOM$ = props$
    .map(props => props.button.DOM)
    .flatten()
  const childrenState$ = props$
    .map(props => props.button.state$)
    .flatten()
  const actions = intent(sources)
  const {state$, path$} = model(props$, {...actions, toggleMenu$: childrenState$})
  const view$ = view(state$, childrenDOM$)
  return {
    DOM: view$,
    state$: state$,
    path$: path$
  }
}

export default Navbar
