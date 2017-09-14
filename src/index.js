import fs from 'mz/fs';
import makeName from './makeName';
import loadPage from './loadPage';
import getPath from './getPath';

export default (address, destination = './tmp') => loadPage(address)
  .then(({ data }) => {
    const fileName = makeName(address);
    const filePath = getPath(fileName, destination);
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    fs.writeFile(filePath, data, 'utf8')
      .catch(e => console.log(e));
  })
  .catch(e => console.log(e));
