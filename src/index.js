import path from 'path';
import axios from './lib/axios';
import debug from './lib/debug';
import loadData from './loadData';
import loadFiles from './loadFiles';

export default (address, destination = './tmp') => axios.get(address)
  .catch((e) => {
    const errmsg = `Unable to download ${address}. ${e.message}`;
    debug(errmsg);
    console.error(errmsg);
    throw new Error(errmsg);
  })
  .then(({ data }) => {
    console.log(`Downloading ${address}...\n`);
    return loadData(data, address);
  })
  .then(({ html, links }) => loadFiles(html, links, address, destination))
  .then(() => console.log(`\n${address} has been downloaded to ${path.resolve(destination)}\n`))
  .catch(e => new Error(e.message));
