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
function Navbar(prop$, sources) {
  const actions = intent(sources)
  const {update$, path$} = model(prop$, actions)
  const view$ = view(update$)
  return {
    DOM: view$,
    state$: update$,
    path$: path$
  }
}

export default Navbar
