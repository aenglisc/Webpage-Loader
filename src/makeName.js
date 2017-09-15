import url from 'url';
// import path from 'path';

const transform = str => str.replace(/\W+/g, '-');

const urlToName = (address) => {
  const { host, pathname } = url.parse(address);
  return transform(`${host}${pathname === '/' ? '' : pathname}`);
};

export const makePageName = address => `${urlToName(address)}.html`;
export const makeSrcDirName = address => `${urlToName(address)}_files`;
