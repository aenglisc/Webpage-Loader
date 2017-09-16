import axios from './lib/axios';
import debug from './lib/debug';
import loadData from './loadData';
import loadFiles from './loadFiles';

export default (address, destination = './tmp') => axios.get(address)
  .then(({ data }) => loadData(data, address))
  .then(({ html, links }) => loadFiles(html, links, address, destination))
  .catch(e => debug(e));
