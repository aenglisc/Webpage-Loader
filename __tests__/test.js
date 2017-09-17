import nock from 'nock';
import fs from 'mz/fs';
import path from 'path';
import rmrf from 'rimraf';
import webpageLoader from '../';

const localhost = 'http://localhost';
const fixturesDir = './__tests__/__fixtures__/';
const tmpDir = './__tests__/__tmp__/';
fs.mkdirSync(tmpDir);

const newhtml = fs.readFileSync(`${fixturesDir}result/test.1.html`, 'utf8');
const html = fs.readFileSync(`${fixturesDir}base/test.html`, 'utf8');
const icon = fs.readFileSync(`${fixturesDir}base/icon.ico`, 'utf8');
const img = fs.readFileSync(`${fixturesDir}base/home.png`, 'utf8');
const script = fs.readFileSync(`${fixturesDir}base/script.js`, 'utf8');

const gentmpdir = () => fs.mkdtempSync(tmpDir);
let tmpdir = '';

describe('test', () => {
  beforeEach(() => {
    tmpdir = gentmpdir();
    nock(localhost)
      .get('/')
      .reply(200, html)
      .get('/icon.ico')
      .reply(200, icon)
      .get('/home.png')
      .reply(200, img)
      .get('/script.js')
      .reply(200, script);
  });

  // clean up
  /*
  afterAll(() => {
    rmrf(tmpDir, () => {});
  });
  */

  test('html', async () => {
    await webpageLoader(localhost, tmpdir);
    const dlhtml = await fs.readFile(`${tmpdir}/localhost.html`, 'utf8');
    expect(dlhtml).toBe(newhtml);
  });

  test('icon', async () => {
    const tmpdirSrc = path.join(tmpdir, 'localhost_files');
    await webpageLoader(localhost, tmpdir);
    const dlicon = await fs.readFile(`${tmpdirSrc}/icon.ico`, 'utf8');
    expect(dlicon).toBe(icon);
  });

  test('img', async () => {
    const tmpdirSrc = path.join(tmpdir, 'localhost_files');
    await webpageLoader(localhost, tmpdir);
    const dlimg = await fs.readFile(`${tmpdirSrc}/home.png`, 'utf8');
    expect(dlimg).toBe(img);
  });

  test('script', async () => {
    const tmpdirSrc = path.join(tmpdir, 'localhost_files');
    await webpageLoader(localhost, tmpdir);
    const dlscript = await fs.readFile(`${tmpdirSrc}/script.js`, 'utf8');
    expect(dlscript).toBe(script);
  });
});
