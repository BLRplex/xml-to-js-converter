/* global test, expect */
import fs from 'fs'
import path from 'path'

import { xml2json } from '../src/XML2JSON'
import { generateXML } from '../src/XMLGenerator'
import { DATA_DIRECTORY } from '../src/constants'
import { expectJSONContent } from '../mocks'

test('XML2JSON should be callable', () => {
  expect(typeof xml2json).toBe('function')
})

test('XML2JSON should reject promise if target filename is not specified', async () => {
  const wrapper = async () => await xml2json()

  await expect(wrapper())
    .rejects
    .toThrow('Target filename should be specified')
})

test('XML should be transformed into JSON', async () => {
  const testFileName = 'test-file.xml'
  const expectFileName = 'test-output.json'

  const testFilePath = path.join(DATA_DIRECTORY, testFileName)
  const expectFilePath = path.join(DATA_DIRECTORY, expectFileName)

  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath)
  }

  if (fs.existsSync(expectFilePath)) {
    fs.unlinkSync(expectFilePath)
  }

  await generateXML(testFileName, 100)
  await xml2json(testFileName, expectFileName)

  const content = fs.readFileSync(expectFilePath, { encoding: 'utf-8' })
  expect(content).toBe(expectJSONContent)

  fs.unlinkSync(testFilePath)
  fs.unlinkSync(expectFilePath)
})
