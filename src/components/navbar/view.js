import {div, nav, button, label, span, input, a, h} from '@cycle/dom'
import {curry} from 'ramda'
import xs from 'xstream'

// getMargin :: Boolean -> ItemIndex :: Number -> String
const getMargin = (open, i) => {
  let ml = ''
  let margin = ''
  if (open) {
    ml = '30px'
  } else {
    ml = '0px'
  }
  if (open && i === 0) {
    margin = '30px 0 0 '
  }
  else if (!open && i > 2) {
    margin = '-7px 0 0 '
  } else {
    margin = '0 30px 0px '
  }
  return margin + ml
}
// createNavItem :: Boolean -> Item -> ItemIndex :: Number -> DOM
const createNavItem = curry((open, item, i) =>
  a('.nav-item' + (item.active ? '.active' : ''), {
    style: {
      'pointer-events': open ? '' : 'none',
      'letter-spacing': open ? '0px' : '-8px',
      'height': open ? '40px' : '7px',
      'line-height': open ? '40px' : '7px',
      'color': open ? item.active ? '#FC9293' : '#EC7263' : 'transparent',
      'background-color' : !open && 'transparent',
      'transform': open ? 'scaleY(1)' : 'scaleY(0.2)',
      'margin': getMargin(open, i),
      'padding': open ? '0 0 0 10px' : '0',
      'transition-delay': open
        ? (4 * 0.05 - 0.05 * i).toFixed(2) + 's'
        : (0.05 * i).toFixed(2) + 's',
    },
    attrs: {
      href: item.href,
    }
  }, item.text))

// view :: Stream({open:: Boolean, items:: Array(Item)}) -> Stream(DOM)
const view = (state$, button$) => {
  return xs.combine(state$, button$)
    .map(([state, button]) => {
      return div('.nav-container', [
        nav('.nav', [
          button
        ].concat(
          state.items.map(createNavItem(state.open))
        ))
      ])
    })
}
export default view
