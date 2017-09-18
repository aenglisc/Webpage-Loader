import fs from 'mz/fs';
import url from 'url';
import path from 'path';
import Listr from 'listr';
import mkdirp from './lib/mkdirp';
import axios from './lib/axios';
import debug from './lib/debug';
import { genPageName, genSrcDirName, genSrcName } from './nameBuilders';

const downloadResources = (links, address, srcDir) => Promise.all(links.map((link) => {
  debug(`downloading ${url.resolve(address, link)}`);
  return new Listr([{
    title: url.resolve(address, link),
    task: () => axios
      .get(url.resolve(address, link), { responseType: 'arraybuffer' })
      .then(({ data }) => fs.writeFile(path.resolve(srcDir, genSrcName(link)), data)),
  }]).run()
    .catch(e => debug(`Could not get resource at ${url.resolve(address, link)}\n >${e.message}`));
}));

export default (html, links, address, destination) => {
  const pageName = genPageName(address);
  const srcDirName = genSrcDirName(address);

  const pageLoc = path.resolve(destination, pageName);
  const srcDir = path.resolve(destination, srcDirName);

  return mkdirp(srcDir)
    .catch((e) => {
      const errmsg = `Unable to download to '${path.resolve(destination)}'. ${e.message}`;
      debug(errmsg);
      throw new Error(errmsg);
    })
    .then(() => {
      debug(`creating ${pageName}`);
      return fs.writeFile(pageLoc, html, 'utf8');
    })
    .then(() => downloadResources(links, address, srcDir));
};
