import nock from 'nock';
import fs from 'mz/fs';
import os from 'os';
import path from 'path';
import webpageLoader from '../';

const localhost = 'http://localhost';
const fixturesDir = './__tests__/__fixtures__/';
const gentmpdir = () => fs.mkdtempSync(os.tmpdir());

test('download test page', () => {
  const tmpdir = gentmpdir();

  const html = fs.readFileSync(`${fixturesDir}base/test.html`, 'utf8');
  const icon = fs.readFileSync(`${fixturesDir}base/icon.ico`);
  const img = fs.readFileSync(`${fixturesDir}base/home.png`);
  const script = fs.readFileSync(`${fixturesDir}base/script.js`);

  const newhtml = fs.readFileSync(`${fixturesDir}result/test.1.html`, 'utf8');

  nock(localhost)
    .get('/')
    .reply(200, html)
    .get('/icon.ico')
    .reply(200, icon)
    .get('/home.png')
    .reply(200, img)
    .get('/script.js')
    .reply(200, script);

  const filepath = path.join(tmpdir, 'localhost.html');
  const tmpdirSrc = path.join(tmpdir, 'localhost_files');
  const iconFilepath = path.join(tmpdirSrc, 'icon.ico');
  const imgFilepath = path.join(tmpdirSrc, 'home.png');
  const scriptFilepath = path.join(tmpdirSrc, 'script.js');

  expect.assertions(4);
  return webpageLoader(localhost, tmpdir)
    .then(() => fs.readFile(filepath, 'utf8'))
    .then(data => expect(data).toBe(newhtml, 'utf8'))
    .then(() => fs.readFile(iconFilepath, 'utf8'))
    .then(data => expect(data).toBe(icon.toString()))
    .then(() => fs.readFile(imgFilepath, 'utf8'))
    .then(data => expect(data).toBe(img.toString()))
    .then(() => fs.readFile(scriptFilepath, 'utf8'))
    .then(data => expect(data).toBe(script.toString()));
});
