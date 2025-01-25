import get from 'lodash/get';
import _template from 'lodash/template';
import moment from 'moment';
import formatNumber from 'number-format.js';
import _isEmpty from 'lodash/isEmpty';

export function parse(template, data, ignoreNaNValues = false) {
  let preparedStr = template;
  preparedStr = replaceVars(preparedStr, data, ignoreNaNValues);
  preparedStr = replaceBold(preparedStr);
  preparedStr = replaceItalic(preparedStr);
  preparedStr = replaceColor(preparedStr, data);
  preparedStr = replaceAlign(preparedStr, data);
  preparedStr = replaceFontSize(preparedStr, data);
  preparedStr = replaceBg(preparedStr, data);
  preparedStr = replaceLink(preparedStr, data);
  preparedStr = replaceImage(preparedStr, data);
  preparedStr = parseFunctions(preparedStr, data);
  preparedStr = replaceNewLine(preparedStr, data);

  return preparedStr;
}

export function replaceVars(template, params, ignoreNaNValues) {
  const preparedTemplate = template.replace(/(\{)([^/}]+)(\})/g, (str, first, second, third) => {
    if (params && typeof get(params, second) !== 'undefined' && get(params, second) !== null) {
      if (second.includes('.')) {
        return get(params, second);
      }
      return `\${${second}}`;
    }
    return ignoreNaNValues ? '' : `{${second}}`;
  });
  return _template(preparedTemplate)(params);
}

export function replaceBold(text) {
  return text.replace(/\[b\](.+?)\[\/b\]/gi, (match, value) => `<strong>${value}</strong>`);
}

export function replaceItalic(text) {
  return text.replace(/\[i\](.+?)\[\/i\]/gi, (match, value) => `<em>${value}</em>`);
}

export function replaceColor(text) {
  return text.replace(
    /\[color="?(.+?)"?\](.+?)\[\/color\]/gi,
    (match, color, value) => `<span style="color: ${color}">${value}</span>`,
  );
}

export function replaceAlign(text) {
  return text.replace(
    /\[align="?(.+?)"?\](.+?)\[\/align\]/gi,
    (match, align, value) => `<span style="text-align: ${align}; display: block;">${value}</span>`,
  );
}

export function replaceFontSize(text) {
  return text.replace(
    /\[size="?(\d+?)"?\](.+?)\[\/size\]/gi,
    (match, size, value) => `<span style="font-size: ${size}px">${value}</span>`,
  );
}

export function replaceNewLine(text) {
  return text.replace(/\[br\]/gi, () => '<br />');
}

export function replaceBg(text) {
  return text.replace(
    /\[bg="?(.+?)"?\](.+?)\[\/bg\]/gi,
    (match, color, value) => `<div style="background-color: ${color}; width: 100%">${value}</div>`,
  );
}

export function replaceLink(text) {
  return text.replace(
    /\[link\s+url="(.+?)"\](.+?)\[\/link\]/gi,
    (match, url, value) => `<a href="${url}">${value}</a>`,
  );
}

export function replaceImage(text) {
  return text.replace(
    /\[image\s+src="(.+?)"\]/gi,
    (match, src) => `<img src="${src}" onerror="this.style.display='none'" />`,
  );
}

export function parseFunctions(text, data) {
  return text.replace(/\{([^}]+)\.([^}]+)\(([^}]+)\)\}/gi, (match, prop, funcName, params) => {
    switch (funcName) {
      case 'dateFormat':
        let value = get(data, prop);
        if (!isNaN(value) && `${value}`.length === 10) {
          value = value * 1000;
        }
        return moment.parseZone(value).format(params);
      case 'numberFormat':
        return formatNumber(params, get(data, prop));
      default:
        return match;
    }
  });
}

export function replaceRouteVars(template, params, ignoreNaNValues) {
  const preparedTemplate = template.replace(/\/(:)([^/}]+)/g, (str, first, second) => {
    if (params && typeof get(params, second) !== 'undefined') {
      return `/\${${second}}`;
    }
    return ignoreNaNValues ? '' : `{${second}}`;
  });
  return _template(preparedTemplate)(params);
}

export function isEmpty(data) {
  return typeof data === 'undefined' || data === null || data === '' || (typeof data === 'object' && _isEmpty(data));
}

export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
