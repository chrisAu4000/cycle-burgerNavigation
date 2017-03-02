import xs from 'xstream'
import {prop} from 'ramda'

function ContentRouter(sources, options = {}) {
  const routes = options.routes || {}
  const {router} = sources
  const match$ = router.define(routes)
  const page$ = match$
    .map(({path, value}) => value({
      ...sources,
      router: router.path(path)
    }))
  const view$ = page$
    .map(prop('DOM'))
    .flatten()
  const pageState$ = page$
    .map(prop('state$'))
    .flatten()
  const path$ = match$
    .map(prop('path'))
  return {
    DOM: view$,
    state$: pageState$,
    path$: path$
  }
}

export default ContentRouter
