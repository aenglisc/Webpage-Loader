import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import axios from './axios';
import { genPageName, genSrcDirName, genSrcName } from './nameBuilders';

const downloadResources = (links, address, srcDir) => links.forEach(link =>
  axios
    .get(url.resolve(address, link), { responseType: 'arraybuffer' })
    .then(({ data }) => fs.writeFile(path.resolve(srcDir, genSrcName(link)), data))
    .catch(e => e));

export default (html, links, address, destination) => {
  const pageName = genPageName(address);
  const srcDirName = genSrcDirName(address);

  const baseDir = path.resolve(destination);
  const pageLoc = path.resolve(destination, pageName);
  const srcDir = path.resolve(destination, srcDirName);

  return fs.exists(baseDir)
    .then((exists) => { if (!exists) { fs.mkdir(baseDir); } })
    .then(() => fs.writeFile(pageLoc, html, 'utf8'))
    .then(() => fs.exists(srcDir))
    .then((exists) => { if (!exists) { fs.mkdir(srcDir); } })
    .then(() => downloadResources(links, address, srcDir));
};
