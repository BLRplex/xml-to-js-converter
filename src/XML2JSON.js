import '@babel/polyfill'
import fs from 'fs'
import XmlStream from 'xml-stream'
import path from 'path'

import { DATA_DIRECTORY, JSON_OUTPUT_FILENAME } from './constants'

/**
 * Generates JSON from XML file in "data" directory
 *
 * @param {String} targetFilename target file name, the sandbox folder for saving is data.
 * @param {String} outputFileName destination JSON filename
 *
 * @returns {Promise}
 */
export const xml2json = (targetFilename, outputFileName) => {
  return new Promise((resolve, reject) => {
    if (!targetFilename) {
      throw new Error('Target filename should be specified')
    }

    const fileStream = fs.createReadStream(path.join(DATA_DIRECTORY, targetFilename), { encoding: 'utf-8' })
    const jsonStream = fs.createWriteStream(path.join(DATA_DIRECTORY, outputFileName || JSON_OUTPUT_FILENAME))

    fileStream.on('error', error => reject(error))
    jsonStream.on('error', error => reject(error))

    const xmlStream = new XmlStream(fileStream)
    xmlStream.on('error', error => reject(error))
    jsonStream.write('[')

    let jsonSeparator = ''
    xmlStream.on('endElement: FileDump > Message', (element) => {
      jsonStream.write(`${jsonSeparator}${JSON.stringify(element)}`)

      if (!jsonSeparator) {
        jsonSeparator = ','
      }
    })

    xmlStream.on('end', () => {
      jsonStream.write(']')
      jsonStream.close()
    })

    jsonStream.on('close', () => {
      fileStream.close()
      resolve()
    })
  })
}
