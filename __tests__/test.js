import nock from 'nock';
import fs from 'mz/fs';
import os from 'os';
import path from 'path';
import webpageLoader from '../';

const localhost = 'http://localhost';
// const fixturesDir = './__tests__/__fixtures__/';
const osTempDir = os.tmpdir();
const createNock = () => nock(localhost)
  .get('/')
  .reply(200, 'Hello world!');

test('download file', () => {
  createNock();

  expect.assertions(1);
  return webpageLoader(localhost, osTempDir)
    .then(() => fs.readFile(path.join(osTempDir, 'localhost.html'), 'utf8'))
    .then(data => expect(data.toString()).toBe('Hello world!'));
});
