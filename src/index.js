import { xml2json } from './XML2JSON'
import { JSON_OUTPUT_FILENAME, DATA_DIRECTORY } from './constants'

// xml2json('large.xml') // use this for testing large files (you need to generate it before with XMLGenerator or upload manually)
xml2json('default.xml')
  .then(() => console.log(`Done, file has been parsed, see the ${JSON_OUTPUT_FILENAME} file in ${DATA_DIRECTORY}`))
  .catch(error => console.error('Parsing error', error))
