import Header from './components/header/header'
import HelloWorldButton from './components/hello-world-button/hello-world-button'
import PigImage from './components/pig-image/pig-image'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './pig.scss'
import React from 'react'

const helloWorldButton = new HelloWorldButton()
const header = new Header()
const pigImage = new PigImage()

header.render('pig')
helloWorldButton.render()
pigImage.render()
