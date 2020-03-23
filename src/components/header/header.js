import './header.scss'

export default class Header {
  render() {
    const h1 = document.createElement('h1')
    const body = document.querySelector('body')
    h1.innerHTML = 'Webpack Tutorial'
    body.appendChild(h1)
  }
}
