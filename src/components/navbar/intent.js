import {filterLinks} from '@cycle/history'

const preventDefault = (evt) => {
  evt.preventDefault()
  return evt
}
const intent = ({DOM}) => ({
  // toggleMenu$: DOM
  //   .select('.nav-container .nav .menuButton')
  //   .events('click')
  //   .mapTo(null),
  closeMenu$: DOM
    .select('.nav-item')
    .events('click')
    .map(preventDefault)
    .mapTo(null),
  pathName$: DOM
    .select('.nav-item')
    .events('click')
    .map(preventDefault)
    .map(evt => evt.target.pathname)
})

export default intent
