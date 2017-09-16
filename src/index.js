import axios from './axios';
import loadData from './loadData';
import loadFiles from './loadFiles';

export default (address, destination = './tmp') => axios.get(address)
  .then(({ data }) => loadData(data, address))
  .then(({ html, links }) => loadFiles(html, links, address, destination))
  .catch(e => e);
