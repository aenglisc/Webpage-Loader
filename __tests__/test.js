import nock from 'nock';
import fs from 'mz/fs';
import path from 'path';
import loadPage from '../src/loadPage';
import makeName from '../src/makeName';
import getPath from '../src/getPath';
import run from '../';

const localhost = 'http://localhost';
const genFolder = () => fs.mkdtempSync('tmp/');
const createNock = () => nock(localhost)
  .get('/')
  .reply(200, 'Hello world!');

test('make name: short', () => {
  const address = 'https://hexlet.io/';
  expect(makeName(address)).toBe('hexlet-io.html');
});

test('make name: long', () => {
  const address = 'https://ru.hexlet.io/projects/4/sessions/118';
  expect(makeName(address)).toBe('ru-hexlet-io-projects-4-sessions-118.html');
});

test('load page: local', () => {
  createNock();

  expect.assertions(2);
  return loadPage(localhost)
    .then(({ status, data }) => {
      expect(status).toBe(200);
      expect(data).toBe('Hello world!');
    });
});

test('load page: remote', () => {
  expect.assertions(1);
  return loadPage('https://google.com/')
    .then(({ status }) => {
      expect(status).toBe(200);
    });
});

test('get path: default', () => {
  expect(getPath('test.html', './tmp')).toBe(path.resolve('./tmp/test.html'));
});

test('get path: custom', () => {
  expect(getPath('test.html', '/test')).toBe(path.resolve('/test/test.html'));
});

test('download file', () => {
  createNock();
  const dir = genFolder();

  expect.assertions(1);
  return run(localhost, dir)
    .then(() => fs.readFile(getPath('localhost.html', dir), 'utf8'))
    .then(data => expect(data.toString()).toBe('Hello world!'));
});

