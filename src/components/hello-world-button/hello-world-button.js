import './hello-world-button.scss'

export default class HelloWorldButton {
  buttonCssClass = 'hello-world-button'
  render() {
    const button = document.createElement('button')
    button.innerHTML = 'Hello World'
    button.classList.add(this.buttonCssClass)
    const body = document.querySelector('body')
    button.onclick = () => {
      const p = document.createElement('p')
      p.innerHTML = 'Hello World'
      p.classList.add('hello-world-text')
      body.appendChild(p)
    }
    body.appendChild(button)
  }
}
