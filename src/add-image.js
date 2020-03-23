import pig from '../assets/imgs/pig.jpg'

export const addImage = () => {
  const img = document.createElement('img')
  img.alt = 'pig'
  // this process.env.NODE_NODE_EN is injected by 'webpack.DefinePlugin'
  img.width = process.env.NODE_NODE_EN === 'production' ? 60 : 600
  img.src = pig

  const body = document.querySelector('body')
  body.appendChild(img)
}
