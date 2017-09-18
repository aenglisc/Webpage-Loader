import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import Listr from 'listr';
import mkdirp from './lib/mkdirp';
import axios from './lib/axios';
import debug from './lib/debug';
import { genPageName, genSrcDirName, genSrcName } from './nameBuilders';

const downloadResources = (links, address, srcDir, listr) => Promise.all(links.map((link) => {
  debug(`downloading ${url.resolve(address, link)}`);

  const sourceurl = url.resolve(address, link);
  const filename = genSrcName(link);
  const dlresource = () => axios
    .get(sourceurl, { responseType: 'arraybuffer' })
    .then(({ data }) => fs.writeFile(path.resolve(srcDir, filename), data));

  const success = `Successfully dowloaded resource\nat ${sourceurl}\nas ${filename}\nto ${srcDir}`;
  const error = `Could not get resource at ${sourceurl}\n >`;

  return listr
    ? new Listr([{ title: sourceurl, task: dlresource }]).run()
      .then(() => debug(success))
      .catch(e => debug(`${error}${e.message}`))
    : dlresource()
      .then(() => success)
      .catch(e => `${error}${e.message}`);
}));

export default (html, links, address, destination, listr) => {
  const pageName = genPageName(address);
  const srcDirName = genSrcDirName(address);

  const pageLoc = path.resolve(destination, pageName);
  const srcDir = path.resolve(destination, srcDirName);

  return mkdirp(srcDir)
    .then(() => {
      debug(`creating ${pageName}`);
      return fs.writeFile(pageLoc, html, 'utf8');
    })
    .then(() => downloadResources(links, address, srcDir, listr));
};
