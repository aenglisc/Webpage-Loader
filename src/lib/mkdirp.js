import util from 'util';
import mkdirp from 'mkdirp';

export default util.promisify(mkdirp);
