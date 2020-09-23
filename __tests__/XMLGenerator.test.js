/* global test, expect */
import fs from 'fs'
import path from 'path'

import { generateXML } from '../src/XMLGenerator.js'
import { DATA_DIRECTORY } from '../src/constants'
import { expectXMLContent } from '../mocks'

test('XML generator should be callable', () => {
  expect(typeof generateXML).toBe('function')
})

test('XML generator should reject promise if target filename is not specified', async () => {
  const wrapper = async () => await generateXML()

  await expect(wrapper())
    .rejects
    .toThrow('Target filename should be specified')
})

test('XML generator should generate an XML file', async () => {
  const testFileName = 'test-file.xml'
  const testFilePath = path.join(DATA_DIRECTORY, testFileName)

  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath)
  }

  await generateXML(testFileName, 100)
  expect(fs.existsSync(testFilePath)).toBe(true)

  const content = fs.readFileSync(testFilePath, { encoding: 'utf-8' })
  expect(content).toBe(expectXMLContent)

  fs.unlinkSync(testFilePath)
})
