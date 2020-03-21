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
