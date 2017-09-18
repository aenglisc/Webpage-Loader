import path from 'path';
import axios from './lib/axios';
import debug from './lib/debug';
import loadData from './loadData';
import loadFiles from './loadFiles';

export default (address, destination = './tmp') => axios.get(address)
  .catch((e) => {
    const errmsg = `\nUnable to download ${address}. ${e.message}`;
    debug(errmsg);
    throw new Error(errmsg);
  })
  .then(({ data }) => loadData(data, address))
  .then(({ html, links }) => loadFiles(html, links, address, destination))
  .then(() => console.log(`\n${address} has been downloaded to ${path.resolve(destination)}`));
