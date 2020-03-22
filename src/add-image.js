import pig from '../assets/imgs/pig.jpg'

export const addImage = () => {
  const img = document.createElement('img')
  img.alt = 'pig'
  img.width = 600
  img.src = pig

  const body = document.querySelector('body')
  body.appendChild(img)
}
