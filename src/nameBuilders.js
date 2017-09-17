import url from 'url';
import path from 'path';

const transform = str => (str[0] === '/' ? str.slice(1) : str).replace(/\W+/g, '-');

const urlToName = (address) => {
  const { host, pathname } = url.parse(address);
  return transform(url.format(pathname === '/' ? { host } : { host, pathname }));
};

export const genPageName = address => `${urlToName(address)}.html`;
export const genSrcDirName = address => `${urlToName(address)}_files`;
export const genSrcName = (address) => {
  const { dir, name, ext } = path.parse(address);
  return `${urlToName(path.join(dir, name))}${ext}`;
};
