import nodeURL from 'url';

/**
 * @method
 *
 * @param {string} baseUrl
 * @param {...string} pathnames
 *
 * @returns {?string}
 */
export default function concatURL(baseUrl, ...pathnames) {
  if (pathnames.length === 1 && Boolean(nodeURL.parse(pathnames[0]).hostname)) {
    return pathnames[0];
  }

  const separator = '/';
  const replace = new RegExp(separator + '{1,}', 'g');
  const pathname = pathnames.join(separator).replace(replace, separator);

  return pathnames.length > 0 ? new URL(pathname, baseUrl).toString() : baseUrl;
}
