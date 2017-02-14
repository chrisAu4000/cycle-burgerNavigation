import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {makeStateDriver} from './drivers/state-driver'
import {makeRouterDriver} from 'cyclic-router'
import {createHashHistory} from 'history'
import switchPath from 'switch-path'

import main from './main'

const drivers = {
  DOM: makeDOMDriver('#app'),
  state$: makeStateDriver(),
  router: makeRouterDriver(createHashHistory(), switchPath)
}

run(main, drivers)
