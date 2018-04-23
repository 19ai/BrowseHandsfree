/**
 * This command:
 * - Pieces together all the required files for a chrome extension
 * - Creates a .zip
 */
'use strict'

const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const configs = {
  webpack: require('../config'),
  app: require('../src/config.json')
}
const paths = {
  manifest: 'browser-extensions/chrome/'
}

const spinner = ora(`Compiling Chrome Extension ${configs.app.version}`)
spinner.start()

fs.copySync(path.resolve(__dirname, `../${paths.manifest}`), `${configs.webpack.build.assetsRoot}`)
spinner.stop()
