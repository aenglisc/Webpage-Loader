import cheerio from 'cheerio';
import path from 'path';
import { genSrcName, genSrcDirName } from './nameBuilders';

const srcAtts = {
  link: 'href',
  img: 'src',
  script: 'src',
};

const getData = (html, address) => {
  const $ = cheerio.load(html);
  const srcDirName = genSrcDirName(address);

  const links = Object.keys(srcAtts).reduce((acc, tag) => {
    const srcLinks = $('html').find(tag).toArray().reduce((srcAcc, currentSrc) => {
      const srcLink = $(currentSrc).attr(srcAtts[tag]);

      if (srcLink) {
        const newResourceName = genSrcName(srcLink);
        const newSrcLink = path.join(srcDirName, newResourceName);

        $(currentSrc).attr(srcAtts[tag], newSrcLink);
        return [...srcAcc, srcLink];
      }
      return srcAcc;
    }, []);

    return [...acc, ...srcLinks];
  }, {});

  return { html: $.html(), links };
};

export default (html, address) => getData(html, address);
