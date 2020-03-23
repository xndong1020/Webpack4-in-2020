import pig from '../assets/imgs/pig.jpg'

export const addImage = () => {
  const img = document.createElement('img')
  img.alt = 'pig'
  // this process.env.NODE_NODE_EN is injected by 'webpack.DefinePlugin'
  img.width = process.env.NODE_ENV === 'production' ? 600 : 60
  img.src = pig

  const body = document.querySelector('body')
  body.appendChild(img)

  const p = document.createElement(p)
  p.innerHTML = process.env.NODE_ENV
  body.appendChild(p)
}
