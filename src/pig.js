import Header from './components/header/header'
import HelloWorldButton from './components/hello-world-button/hello-world-button'
import PigImage from './components/pig-image/pig-image'

const helloWorldButton = new HelloWorldButton()
const header = new Header()
const pigImage = new PigImage()

header.render()
helloWorldButton.render()
pigImage.render()
