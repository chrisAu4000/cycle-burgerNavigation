import {filterLinks} from '@cycle/history'

const preventDefault = (evt) => {
  evt.preventDefault()
  return evt
}
const intent = ({DOM}) => ({
  toggleMenu$: DOM
    .select('.nav-container .nav .sign')
    .events('click')
    .mapTo(true),
  closeMenu$: DOM
    .select('.nav-item')
    .events('click')
    .map(preventDefault)
    .mapTo(false),
  pathName$: DOM
    .select('.nav-item')
    .events('click')
    .map(preventDefault)
    .map(evt => evt.target.pathname)
})

export default intent
