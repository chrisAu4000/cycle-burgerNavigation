import {div, nav, button, label, span, input, a, h} from '@cycle/dom'
import {curry} from 'ramda'
import tween from 'xstream/extra/tween'
import xs from 'xstream'

// renderBurgerSVG :: Boolean -> Number -> SVG
const renderBurgerSVG = (open, i) => {
  return h('svg', [
    h('line', {attrs: {
      x1: 0,
      y1: 0,
      x2: '100%',
      y2: open ? i+'%' : 100 - i+'%',
      'stroke-width': open ? 2 : i === 100 ? 4 : 2,
    }}),
    h('line', {attrs: {
      x1: open ? (0.5*i) + '%' : (50-0.5*i)+'%',
      y1: '50%',
      x2: open ? (100-0.5*i)+'%' : (50+0.5*i)+'%',
      y2: '50%',
      'stroke-width': 2,
    }}),
    h('line', {attrs: {
      x1: '0%',
      y1: '100%',
      x2: '100%',
      y2: open ? 100 - i+'%' : i+'%' ,
      'stroke-width': open ? 2 : i === 100 ? 4 : 2,
    }}),
  ])
}
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
  a('.nav-item', {
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
      href: item.href
    }
  }, item.text))
// renderItems :: Boolean -> Array(Item) -> DOM
const renderItems = curry((open, items) =>
  div(items.map(createNavItem(open))))
// dom :: Boolean -> Array(Items) -> Number -> DOM
const dom = ({open, items, i}) =>
  div('.nav-container', {style: {}}, [
    nav('.nav', [div('.sign', [renderBurgerSVG(open, i)])]
      .concat(items.map(createNavItem(open)))
    )
  ])

// view :: Stream({open:: Boolean, items:: Array(Item)}) -> Stream(DOM)
const view = (state$) => {
  const first$ = state$
    .take(1)
    .map(({open, items}) => ({
      open,
      items,
      i: 100
    }))
  const default$ = state$
    .map(({open, items}) => tween({
        from: 0,
        to: 100,
        ease: tween.circular.easeOut,
        duration: 250,
      })
      .map(i => ({open, items, i}))
    )
    .flatten()

  return xs.merge(first$, default$).map(dom)
}
export default view
