#### 2. Initial Setup and Integrating Webpack

##### 2.2. Setting Up Our Application

initial it is a plain old html project

```
/
│  index.html
│  package.json
│  README.md
│
└─ /src
        hello-world.js
        index.js

```

./index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./src/hello-world.js"></script>
    <script src="./src/index.js"></script>
  </body>
</html>
```

./src/hello-world.js

```js
function helloWorld() {
  console.log('Hello World')
}
```

./src/index.js

```js
helloWorld()
```

Problem is, we have to remember the oder of the JavaScript files, the `hello-world.js` has to be put before `index.js`. If you have more js files, it will be a nightmare.

##### 2.3. Install Webpack And Integrate It With NPM

To install webpack

```
npm i -D webpack webpack-cli
```

and create a simple webpack configuration file.
./webpack.config.js

```js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
  mode: 'none'
}
```

for mode, we put "none" for now

##### 2.5. Integrating Webpack Into Our JS Application

Now we update our html file to use the bundled js file

./index.html

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

and ./src/index.js as an entry point, has to include other JavaScript files
./src/index.js

```js
import { helloWorld } from './hello-world'

helloWorld()
```

./src/hello-world.js

```js
export const helloWorld = () => {
  console.log('Hello World')
}
```

Now if we run `npm run build`, we will get an error:

```
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.output.path: The provided value "./dist" is not an absolute path!
   -> The output directory as **absolute path** (required).
```

This is because the 'output.path' must be a absolute path

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'none'
}
```

If you run `npm run build` again, you will see a success result

```
Hash: f7cd397a6c3b8eb6d862
Version: webpack 4.42.0
Time: 72ms
Built at: 03/21/2020 5:33:47 PM
    Asset      Size  Chunks             Chunk Names
bundle.js  4.15 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/index.js 60 bytes {0} [built]
[1] ./src/hello-world.js 68 bytes {0} [built]
```

#### 3. Loaders

##### 3.1. What Is Webpack Loader

With Webpack, you can import JavaScript, CSS, Sass, Less, Handlebar, and lot more

##### 3.2. Handling Images With Webpack

Now we try to load an image file using Webpack

We created a new js file, called add-image.js
./src/add-image.js

```js
import pig from '../assets/imgs/pig.jpg'

export const addImage = () => {
  const img = document.createElement('img')
  img.alt = 'pig'
  img.width = 300
  img.src = pig

  const body = document.querySelector('body')
  body.appendChild(img)
}
```

And import it from index.js
./src/index.js

```js
import { helloWorld } from './hello-world'
import { addImage } from './add-image'

helloWorld()
addImage()
```

Now we run Webpack, we will see below error:

```
ERROR in ./assets/imgs/pig.jpg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)
 @ ./src/add-image.js 1:0-40 7:12-15
 @ ./src/index.js
```

This is because Webpack does NOT know how to deal with files other than JavaScript files
We need to setup rules for Webpack to load different types of files

webpack.config.js

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'none',
  // please setup rules for me, how to load files other than Js files
  module: {
    // if see .png or .jpg files, use 'file-loader'
    rules: [{ test: /\.(png|jpg)$/, use: ['file-loader'] }]
  }
}
```

And `file-load` is a separate npm package

Install `npm i -D file-loader`

Now if you run `npm run build` then problem solved

```
Hash: 92879cb1c4379eab2f9b
Version: webpack 4.42.0
Time: 142ms
Built at: 03/21/2020 6:27:42 PM
                               Asset      Size  Chunks             Chunk Names
2fbcb72217d6eb574dadea2e0268c5d3.jpg  62.5 KiB          [emitted]
                           bundle.js  5.18 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/index.js 112 bytes {0} [built]
[1] ./src/hello-world.js 68 bytes {0} [built]
[2] ./src/add-image.js 254 bytes {0} [built]
[3] ./assets/imgs/pig.jpg 80 bytes {0} [built]
```

However the image is not displayed properly. This is because missing of a public path
![01](docs/imgs/01.png)

##### 3.3. Handling Images With Webpack. How To Use publicPath.mp4

We need to tell the public path of the bundled files, in `output.publicPath`

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // Where you uploaded your bundled files. (Relative to server root)
    publicPath: '/dist/'
  },
  mode: 'none',
  // please setup rules for me, how to load files other than Js files
  module: {
    // if see .png or .jpg files, use 'file-loader'
    rules: [{ test: /\.(png|jpg)$/, use: ['file-loader'] }]
  }
}
```

Now if run `npm run build` then problem solved
![02](docs/imgs/02.png)

##### 3.4. Handling CSS With Webpack

Now we create a new js file, which requires a CSS file
./src/components/hello-world-button/hello-world-button.js

```js
import './hello-world-button.css'

export default class HelloWorldButton {
  render() {
    const button = document.createElement('button')
    button.innerHTML = 'Hello World'
    button.classList.add('hello-world-button')
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
```

./src/index.js

```js
import HelloWorldButton from './components/hello-world-button/hello-world-button'

const helloWorldButton = new HelloWorldButton()
helloWorldButton.render()
```

When you build, you will see below error:

```
ERROR in ./src/components/hello-world-button/hello-world-button.css 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> .hello-world-button {
|   font-size: 20px;
|   padding: 7px 15px;
 @ ./src/components/hello-world-button/hello-world-button.js 1:0-33
 @ ./src/index.js
```

TO load CSS properly, we will need `css-loader`, and optional `style-loader`

```
npm i -D css-loader style-loader
```

##### Optional 1:using css-loader with style loader

Now if you use css-loader with style loader, bundle is working fine. The css style will be inject into the header of the index.html file

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // Where you uploaded your bundled files. (Relative to server root)
    publicPath: '/dist/'
  },
  mode: 'none',
  // please setup rules for me, how to load files other than Js files
  module: {
    // if see .png or .jpg files, use 'file-loader'
    rules: [
      { test: /\.(png|jpg)$/, use: ['file-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
}
```

Now if run `npm run build`
![03](docs/imgs/03.png)

##### Optional 2: using css-loader ONLY

Now if you use css-loader alone, the css content will be bundled into js file

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // Where you uploaded your bundled files. (Relative to server root)
    publicPath: '/dist/'
  },
  mode: 'none',
  // please setup rules for me, how to load files other than Js files
  module: {
    // if see .png or .jpg files, use 'file-loader'
    rules: [
      { test: /\.(png|jpg)$/, use: ['file-loader'] },
      { test: /\.css$/, use: ['css-loader'] }
    ]
  }
}
```

Now if run `npm run build`
![04](docs/imgs/04.png)

##### Optional 3: To export css into a separate file, we need mini-css-extract-plugin plugin

Install

```
npm install --save-dev mini-css-extract-plugin
```

For configuration, you will need at least 3 lines in below code:

```js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // Where you uploaded your bundled files. (Relative to server root)
    publicPath: '/dist/'
  },
  mode: 'none',
  plugins: [new MiniCssExtractPlugin()],
  // please setup rules for me, how to load files other than Js files
  module: {
    // if see .png or .jpg files, use 'file-loader'
    rules: [
      { test: /\.(png|jpg)$/i, use: ['file-loader'] },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
    ]
  }
}
```

1. import MiniCssExtractPlugin.

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
```

2. Create a MiniCssExtractPlugin instance

```js
plugins: [new MiniCssExtractPlugin()]
```

3. Include MiniCssExtractPlugin instance into css rules

```js
rules: [{ test: /\.css$/i, use: ['css-loader'] }]
```

4. MiniCssExtractPlugin will NOT inject the generated css file into index.html. so you need to manually add css reference into index.html

```html
...
<head>
  <title>Document</title>
  <link rel="stylesheet" href="./dist/main.css" />
</head>
...
```

Now when you run `npm run build`. You will see the `main.css` file is generated

```
Hash: d2c1c1b9605b7951ac26
Version: webpack 4.42.0
Time: 256ms
Built at: 03/22/2020 10:45:53 AM
    Asset       Size  Chunks             Chunk Names
bundle.js   5.05 KiB       0  [emitted]  main
 main.css  197 bytes       0  [emitted]  main
Entrypoint main = main.css bundle.js
[0] ./src/index.js 161 bytes {0} [built]
    + 3 hidden modules
Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!src/components/hello-world-button/hello-world-button.css:
    Entrypoint mini-css-extract-plugin = *
       2 modules
```

##### 3.5. Handling SASS

let's rename the css filet to scss file

```scss
$font-size: 20px;
$button-background-color: green;

.hello-world-button {
  font-size: $font-size;
  padding: 7px 15px;
  background-color: $button-background-color;
  color: white;
  outline: none;
}

.hello-world-text {
  color: $button-background-color;
  font-weight: bold;
}
```

and change the reference in js file

```js
import './hello-world-button.scss'

export default class HelloWorldButton {
  render() {
    const button = document.createElement('button')
    button.innerHTML = 'Hello World'
    button.classList.add('hello-world-button')
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
```

Now when you run `npm run build`, you will get an error:

```
ERROR in ./src/components/hello-world-button/hello-world-button.js
Module not found: Error: Can't resolve './hello-world-button.scss' in 'C:\Users\Jeremy\Desktop\Webpack4-in-2020\src\components\hello-world-button'
 @ ./src/components/hello-world-button/hello-world-button.js 1:0-34
 @ ./src/index.js
```

To load sass file, you will need `sass-loader node-sass`

install:

```
npm i -D sass-loader node-sass
```

Then add an new rule for .sass or .scss file

```js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // Where you uploaded your bundled files. (Relative to server root)
    publicPath: '/dist/'
  },
  mode: 'none',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
  // please setup rules for me, how to load files other than Js files
  module: {
    // if see .png or .jpg files, use 'file-loader'
    rules: [{ test: /\.(png|jpg)$/, use: ['file-loader'] }],
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  }
}
```

##### 3.6. Using Latest JavaScript Features With Babel 7

Some new JavaScript features are not supported by most of Web Browsers. To solve that, we can use Webpack and `babel-loader` to transpile that into ES5 code

For example we add in some non-function Class Property

```js
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
```

if you run `npm run build`, you will get below error:

```
ERROR in ./src/components/hello-world-button/hello-world-button.js 4:17
Module parse failed: Unexpected token (4:17)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|
| export default class HelloWorldButton {
>   buttonCssClass = 'hello-world-button'
|   render() {
|     const button = document.createElement('button')
 @ ./src/index.js 1:0-81 3:29-45
```

We need to install and config `babel-loader`

```
npm i -D @babel/core @babel/preset-env babel-plugin-transform-class-properties babel-loader
```

and we need to create a new rule for js files

```js
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    // Where you uploaded your bundled files. (Relative to server root)
    publicPath: '/dist/'
  },
  mode: 'none',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
  // please setup rules for me, how to load files other than Js files
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties']
          }
        }
      },
      // if see .png or .jpg files, use 'file-loader'
      { test: /\.(png|jpg)$/, use: ['file-loader'] },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  }
}
```
