import './header.scss'

export default class Header {
  render(pageName) {
    const h1 = document.createElement('h1')
    const body = document.querySelector('body')
    h1.innerHTML = `Welcome to ${pageName} page`
    body.appendChild(h1)
  }
}
