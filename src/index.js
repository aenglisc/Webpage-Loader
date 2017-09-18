import axios from './lib/axios';
import loadData from './loadData';
import loadFiles from './loadFiles';

export default (address, destination = './tmp', listr = false) => axios.get(address)
  .then(({ data }) => loadData(data, address))
  .then(({ html, links }) => loadFiles(html, links, address, destination, listr));
