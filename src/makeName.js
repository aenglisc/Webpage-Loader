import url from 'url';

export default (address) => {
  const { host, pathname } = url.parse(address);
  return `${`${host}${pathname === '/' ? '' : pathname}`.replace(/\W+/g, '-')}.html`;
};
