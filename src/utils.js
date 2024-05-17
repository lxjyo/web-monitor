function isObject(value) {
  return value !== null && typeof value === 'object';
}

/**
 * 重写指定的方法
 * @param {object} source 重写的对象
 * @param {string} name 重写的属性
 * @param {function} fn 拦截的函数
 */
export function replace(source, name, fn) {
  if (!isObject(source)) {
    throw new TypeError('source should be on object');
  }
  if (source.hasOwnProperty(name)) {
    const originFn = source[name];
    const proxyFn = fn(originFn);
    if (typeof proxyFn === 'function') {
      source[name] = proxyFn;
    }
  }
}