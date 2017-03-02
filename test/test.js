import xs from 'xstream'
import tween from 'xstream/extra/tween'
import adapter from '@cycle/xstream-adapter'
import mocha from 'mocha'
import {assert} from 'chai'
import {select} from 'snabbdom-selector'
import Navbar from '../src/components/navbar'
import {mockDOMSource} from '@cycle/dom'
import {toState} from '../src/components/navbar/model'

const noop = () => {}
const path$ = xs.of('/')
const props = {
  path: '/',
  open: false,
  items: [
    {text: 'Dashboard', href: '/'},
    {text: 'History', href: '/history'},
    {text: 'Statistics', href: '/stats'},
    {text: 'Settings',href: '/settings'},
  ],
  ease: tween.linear.ease,
  duration: 1000
}

describe('model', _ => {
  describe('#toState', _ => {
    it('should transform props to a view state', () => {
      const actual = toState(props)
      assert.isDefined(actual, 'to State returns undefined')
      assert.strictEqual(0, actual.transition, 'transition property is not 0')
      assert.isArray(actual.items, 'items is not an array')
      assert.strictEqual(actual.items.length, 4, 'items differ in lenght')
      const texts = actual.items.filter(item => item.text !== undefined)
      assert.strictEqual(texts.length, 4, 'at least one item has no text property')
      const hrefs = actual.items.filter(item => item.href !== undefined)
      assert.strictEqual(hrefs.length, 4, 'at least one item has no href property')
      const actives = actual.items.filter(item => item.active !== undefined)
      assert.strictEqual(actives.length, 4, 'at least one item has no active property')
      const activeItems = actual.items.filter(item => item.active === true)
      assert.strictEqual(activeItems.length, 1, 'only one item should be active')
      assert.strictEqual(activeItems[0].text, 'Dashboard', 'wrong active item')
    })
  })
})
/*describe('burgerMenu', _ => {
  describe('initial state from props', _ => {

    const props = {
      path$: path$,
      open: false,
      items: [
        {text: 'Dashboard', href: '/'},
        {text: 'History', href: '/history'},
        {text: 'Statistics', href: '/stats'},
        {text: 'Settings', href: '/settings'},
      ]
    }
    const addClick$ = xs.create()
    const subtractClick$ = xs.create()
    const DOM = mockDOMSource(adapter, {
      '.sign': {
          click: xs.empty()
        }
    })
    const nav = Navbar({DOM}, xs.of(props))
    it('should render 4 navigation items', (done) => {
      const items$ = nav.DOM.map(vtree => select('.nav-item', vtree)[0])
      items$.addListener({
        next: (items) => {
          console.log(items)
          assert.strictEqual(items.length, 4)
          done()
        },
        error: done,
        complete: noop
      })
    })
  })
})
*/
