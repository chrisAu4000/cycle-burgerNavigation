import xs from 'xstream'
import concat from 'xstream/extra/concat'
import dropRepeats from 'xstream/extra/dropRepeats'
import {prop, compose, isNil, not} from 'ramda'

const model = (props$, actions) => {
  const menuIsOpen$ = concat(
      props$.map(prop('open')),
      xs.merge(
        actions.toggleMenu$,
        actions.closeMenu$
      )
    )
    .fold((acc, curr) => curr ? !acc : curr)
    .filter(compose(not, isNil))
  const item$ = props$
    .map(({items, path$}) => path$
      .map(path => items
        .map(item =>
          item.href === path
          ? Object.assign({}, item, {active: true})
          : Object.assign({}, item, {active: false})
        )
      )
    )
    .flatten()
  const path$ = concat(
      props$
        .map(prop('path$'))
        .flatten()
        .take(1),
      actions.pathName$
    )
    .compose(dropRepeats())
    .drop(1)
  const update$ = xs.combine(
      menuIsOpen$,
      item$
    )
    .map(([isOpen, items]) => Object.assign({}, {
      open: isOpen,
      items: items,
    }))
  return {
    path$: path$,
    update$: update$
  }
}

export default model
