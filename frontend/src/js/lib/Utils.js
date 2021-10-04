import querystring from 'querystring';
import { forEach, map } from 'lodash';

const _waitTimers = [];

export default class Utils {
  static loadImages(images) {
    return Promise.all(map(images, src => Utils.loadImage(src)));
  }

  static loadImage(src) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => {
        console.log(`load error: ${src}`);
        resolve();
      };
      image.src = src;
    });
  }

  static wait(duration) {
    return new Promise(resolve => {
      _waitTimers.push(setTimeout(resolve, duration));
    });
  }

  static clearWait() {
    forEach(_waitTimers, timer => clearTimeout(timer));
    _waitTimers.length = 0;
  }

  static scrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

  static removeElement($target) {
    if (!$target) return;
    $target.parentNode.removeChild($target);
  }

  static offsetTop($target) {
    const rect = $target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  }

  static getTwitterUrl(opts) {
    return `https://twitter.com/share?${querystring.stringify(opts)}`
  }

  static getFacebookUrl(url) {
    return `https://www.facebook.com/share.php?${querystring.stringify({ u: url })}`
  }

  static getLineUrl(url) {
    return `https://social-plugins.line.me/lineit/share?${querystring.stringify({ url: url })}`
  }
}
