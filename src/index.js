import axios from './lib/axios';
import debug from './lib/debug';
import loadData from './loadData';
import loadFiles from './loadFiles';

export default (address, destination = './tmp', listr = false) => axios.get(address)
  .then(({ data }) => loadData(data, address))
  .then(({ html, links }) => loadFiles(html, links, address, destination, listr))
  .catch((e) => {
    const errmsg = `Unable to download ${address} to ${destination}\n >${e.message}`;
    debug(errmsg);
    throw new Error(errmsg);
  });
