import fs from 'mz/fs';
import path from 'path';
import axios from './axios';
import { makePageName, makeSrcDirName } from './makeName';
import parsePage from './parsePage';

const mkdir = (exists, destination) => (exists ? undefined : fs.mkdir(destination));

export default (address, destination = './tmp') => {
  const pageName = makePageName(address);
  const srcDirName = makeSrcDirName(address);

  const baseDir = path.resolve(destination);
  const pageLoc = path.resolve(destination, pageName);
  const srcDir = path.resolve(destination, srcDirName);

  return fs.exists(baseDir)
    .then(exists => mkdir(exists, baseDir))
    .then(() => fs.exists(srcDir))
    .then(exists => mkdir(exists, srcDir))
    .then(() => axios.get(address))
    .then(({ data }) => fs.writeFile(pageLoc, data, 'utf8'))
    .catch(e => e);
};
