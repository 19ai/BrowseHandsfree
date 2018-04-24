/**
 * This command:
 * - Pieces together all the required files for a chrome extension
 * - Creates a .zip
 */
'use strict'

const ora = require('ora')
const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const configs = {
  webpack: require('../config'),
  app: require('../src/config.json')
}
const paths = {
  manifest: 'browser-extensions/chrome/',
  popup: `${configs.webpack.build.assetsRoot}/chrome-src/popup.html`
}

const spinner = ora(`Compiling Chrome Extension ${configs.app.version}`)
spinner.start()

// Copy over files
fse.copySync(path.resolve(__dirname, `../${paths.manifest}`), `${configs.webpack.build.assetsRoot}`)

// Update semver
fs.readFile(paths.popup, 'utf8', (err, data) => {
  if (err) return console.log(err)

  let result = data.replace(/\$CONFIG\.VERSION/g, configs.app.version)

  fs.writeFileSync(paths.popup, result, 'utf8', (err) => { if (err) return console.log(err) })
})

spinner.stop()
