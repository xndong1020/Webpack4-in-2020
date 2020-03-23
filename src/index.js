import HelloWorldButton from './components/hello-world-button/hello-world-button'
import Header from './components/header/header'
import { addImage } from './add-image'

const helloWorldButton = new HelloWorldButton()
const header = new Header()

header.render()
helloWorldButton.render()

addImage()
