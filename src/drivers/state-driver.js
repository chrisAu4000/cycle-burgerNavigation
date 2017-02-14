import rx from 'xstream'
import {compose, not, curry} from 'ramda'

const isObject = x => typeof x === 'object'
const notObject = compose(not, isObject)
const toError = curry((msg, x) => rx.throw(msg))

function makeStateDriver(stateStore = {}) {
  return function stateDriver(sink$) {
    const source$ = sink$
      .filter(isObject)
      .fold((acc, curr) => Object.assign({}, acc, curr), stateStore)
    const error$ = sink$
      .filter(notObject)
      .map(toError('State must be an object'))
      .flatten()
    return rx.merge(source$, error$)//.debug(console.log)
  }
}

export {makeStateDriver}
