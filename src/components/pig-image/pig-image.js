import pig from '../../../assets/imgs/pig.jpg'
import './pig-image.scss'

export default class PigImage {
  render() {
    const img = document.createElement('img')
    img.alt = 'pig'
    img.width = 100
    img.src = pig
    img.classList.add('pig-img')

    const body = document.querySelector('body')
    body.appendChild(img)
  }
}
