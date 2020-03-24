import rabbit from '../../../assets/imgs/rabbit.jpg'
import './rabbit-image.scss'

export default class RabbitImage {
  render() {
    const img = document.createElement('img')
    img.alt = 'rabbit'
    img.width = 100
    img.src = rabbit
    img.classList.add('rabbit-img')

    const body = document.querySelector('body')
    body.appendChild(img)
  }
}
