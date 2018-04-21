<h1 align="center">
  <br>
  <a href="https://browsehandsfree.com"><img src="https://i.imgur.com/7XjWCf1m.png" alt="BrowseHandsfree"></a>
  <br>
</h1>

<h4 align="center">A Chrome Extension to help you browse the web handsfree!</h4>

<p align="center"><a href="#about">About</a> • <a href="#building">Building</a> • <a href="#links">Links</a> • <a href="#privacy">Privacy</a> • <a href="#license">License</a>

## About
BrowseHandsfree is a tool that will let you browse the web handsfree. It does this through your webcam by positioning a cursor over the part of the screen that you're looking at, and click things by smiling!

This project currently uses the trial version of [BRFv4](https://tastenkunst.github.io/brfv4_docs/), and we'll be using [Tensorflow.js](https://js.tensorflow.org/) to train custom gestures. The project is built on top of [VueJS](https://vuejs.org/).

### Contributing and Hacking
All pull requests are welcome, though we encourage you to review our [Trello Board](https://trello.com/b/vAsQoO6P) to see what things are priority. We also have a [discussion forum](https://forum.browsehandsfree.com) (via Discourse)!

The most important file is `/src/components/Pointer.vue`, which contains the `drawCursor`, `detectSmile`, and `maybeScrollPage`. These methods provide a good starting point to branch into the rest of the app.

## Building
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Links
* [Discussion Forum](https://forum.browsehandsfree.com/)
* [Contributing](https://forum.browsehandsfree.com/t/becoming-a-contributor/20) to our project
* [Trello Project Management Board](https://trello.com/b/vAsQoO6P/chrome-extension)
* [Twitter @labofoz](https://twitter.com/labofoz)
* [Twitter @BrowseHandsfree](https://twitter.com/browsehandsfree)
* Contact Email labofoz [at] gmail


## Privacy
With a project like this, privacy has to be the primary focus. The web cam is necessary to control PilotBrowser, and under no circumstance do we store, look at, or transmit anything that happens on the feed other than for Machine Learning purposes, which happens entirely within the client.

## License
Copyright 2018 Oz Ramos

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
