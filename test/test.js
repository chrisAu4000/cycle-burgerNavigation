import xs from 'xstream'
import mocha from 'mocha'
import {assert} from 'chai'
import {identity} from 'ramda'
import {makeStateDriver} from '../src/drivers/state-driver'

const initialState = {first: 'hello'}

describe('state-driver', _ => {
  const stateDriver = makeStateDriver(initialState)
  const additionalState$ = xs.of({second: 'world'})

  const makeUpdateListener = (done) => ({
    next: val => {
      assert.deepEqual({first: 'hello', second: 'world'}, val)
      done()
    },
    error: identity,
    complete: identity
  })
  const makeIntialStateListener = (done) => ({
    next: val => {
      assert.deepEqual({first: 'hello'}, initialState)
      done()
    },
    error: identity,
    complete: identity
  })

  const makeErrorListener = (done) => ({
    next: identity,
    error: err => done(),
    complete: identity
  })

  const state = stateDriver(xs.of({second: 'world'}))
  it('should update state after changes', done => {
    state
      .drop(1)
      .addListener(makeUpdateListener(done))
  })

  it('should not change the previous state', done => {
    state
      .drop(1)
      .addListener(makeIntialStateListener(done))
  })

  it('should throw an error if state is not of type object', done => {
    const state = stateDriver(xs.of(1))
    state
      .drop(2)
      .addListener(makeErrorListener(done))
  })
})
