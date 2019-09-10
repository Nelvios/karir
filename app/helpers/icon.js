import { helper } from '@ember/component/helper';
import { isEmpty, html } from 'karir/utils/short';

const FONT_ICON = 'material-icons';
const DEFAULT_STYLE = null;

export function iconClass(hash) {
  const classNames = [
    FONT_ICON,
    hash.style || DEFAULT_STYLE,
    hash.class || null
  ];

  return classNames.compact().join(' ');
}

export function iconAttrs(hash) {
  let attrs = '';

  for (let attr in hash) {
    switch (attr) {
      case 'class': break;
      case 'style': break;
      case 'html': break;

      default: attrs += ` ${attr}="${hash[attr]}"`;
        break;
    }
  }

  return attrs;
}

export function iconHtml(icon, classNames, attrs, isHtmlSafe) {
  const htmlString = `<i class="${classNames}"${attrs}>${icon}</i>`;
  return isHtmlSafe || isEmpty(isHtmlSafe) ? html(htmlString) : htmlString;
}

export function icon(params, hash) {
  const classNames = iconClass(hash);
  const attrs = iconAttrs(hash);

  return iconHtml(params[0], classNames, attrs, hash.html);
}

export default helper(icon);
