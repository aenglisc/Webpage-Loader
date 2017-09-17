import nock from 'nock';
import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import rmrf from 'rimraf';
import webpageLoader from '../';

const localhost = 'http://localhost';
const fixturesDir = path.resolve('./__tests__/__fixtures__/');
const tempDirBase = os.tmpdir();

const newhtmlloc = path.resolve(fixturesDir, 'result/test.1.html');
const newhtml = fs.readFileSync(newhtmlloc, 'utf8');

const htmlloc = path.resolve(fixturesDir, 'base/test.html');
const html = fs.readFileSync(htmlloc, 'utf8');

const iconloc = path.resolve(fixturesDir, 'base/icon.ico');
const icon = fs.readFileSync(iconloc, 'utf8');

const imgloc = path.resolve(fixturesDir, 'base/home.png');
const img = fs.readFileSync(imgloc, 'utf8');

const scriptloc = path.resolve(fixturesDir, 'base/script');
const script = fs.readFileSync(scriptloc, 'utf8');

let tmpdir = '';

describe('success', () => {
  beforeAll(async () => {
    tmpdir = fs.mkdtempSync(`${tempDirBase}/`);
    nock(localhost)
      .get('/')
      .reply(200, html)
      .get('/icon.ico')
      .reply(200, icon)
      .get('/home.png')
      .reply(200, img)
      .get('/script')
      .reply(200, script)
      .get('/404.js')
      .reply(404);
    await webpageLoader(localhost, tmpdir);
  });

  // clean up
  afterAll(() => {
    rmrf(tmpdir, () => {});
  });

  test('html', async () => {
    const dlhtmlloc = path.resolve(tmpdir, 'localhost.html');
    const dlhtml = await fs.readFile(dlhtmlloc, 'utf8');
    await expect(dlhtml).toBe(newhtml);
  });

  test('resources', async () => {
    const tmpdirSrc = path.join(tmpdir, 'localhost_files');

    const dlicon = await fs.readFile(`${tmpdirSrc}/icon.ico`, 'utf8');
    const dlimg = await fs.readFile(`${tmpdirSrc}/home.png`, 'utf8');
    const dlscript = await fs.readFile(`${tmpdirSrc}/script`, 'utf8');

    expect.assertions(3);
    await expect(dlicon).toBe(icon);
    await expect(dlimg).toBe(img);
    await expect(dlscript).toBe(script);
  });
});

describe('errors', () => {
  test('404', async () => {
    const error = '\nUnable to download http://localhost/404. Request failed with status code 404';
    nock(localhost)
      .get('/404')
      .reply(404);

    const result = await webpageLoader(`${localhost}/404`, tempDirBase);
    await expect(result.message).toMatch(error);
  });

  test('download to root', async () => {
    const error = '\nUnable to download to \'/\'. EACCES: permission denied, mkdir \'/localhost-root_files\'';
    nock(localhost)
      .get('/root')
      .reply(200, html);

    const result = await webpageLoader(`${localhost}/root`, '/');
    await expect(result.message).toMatch(error);
  });
});
