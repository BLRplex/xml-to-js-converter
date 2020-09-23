import fs from 'fs'
import path from 'path'

import { DATA_DIRECTORY } from './constants'

const startPattern = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<FileDump>`

const contentPattern = `<Message>
  <From>Joe.doe@gmail.com</From>
  <Message>Hi Jane</Message>
</Message>
<Message>
  <From>JANE.DOE@gmail.com</From>
  <Message>Hi Jane. How was yur day today. e are not trading </Message>
</Message>
<Message>
  <From>Joe.doe@gmail.com</From>
  <Message>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi  </Message>
</Message>
<Message>
  <From>JANE.DOE@gmail.com</From>
  <Message>Great to hear. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, <script>console.error(String.fromCharCode(72, 65, 67, 75, 69, 68))</script>consectetur, adipisci velit... </Message>
</Message>`

const endPattern = '</FileDump>'

/**
 * Generates XML file in "data" directory
 *
 * @param {String} filename target file name, the sandbox folder for saving is data.
 * @param {Integer} maxBytesAmount the target size of XML, by default it 1GiB
 *
 * @returns {Promise}
 */
export const generateXML = (filename, maxBytesAmount = 1000000000) => {
  return new Promise((resolve, reject) => {
    if (!filename) {
      throw new Error('Target filename should be specified')
    }

    const stream = fs.createWriteStream(path.join(DATA_DIRECTORY, filename))

    stream.on('close', () => resolve())
    stream.on('error', error => reject(error))

    stream.write(startPattern)

    let writtenBytes = startPattern.length

    while (writtenBytes < maxBytesAmount) {
      stream.write(contentPattern)
      writtenBytes += contentPattern.length
    }

    stream.write(endPattern)

    stream.end()
    stream.close()
  })
}
