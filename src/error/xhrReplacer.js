import { replace } from '../utils.js';

/**
 * 捕获接口异常，通过复写XMLHttpRequest的方法
 * @param {function} handler 
 * @returns 
 */
function xhrReplacer(handler) {
  if (!('XMLHttpRequest' in window)) {
    return;
  }
  if (typeof handler !== 'function') {
    throw new TypeError('handler must be a function');
  }
  const originalXhrProto = XMLHttpRequest.prototype;
  // 拦截open方法
  replace(originalXhrProto, 'open', (open) => {
    return (...args) => {
      // 获取请求的信息
      this._xhr = {
        method: typeof args[0] === 'string' ? args[0].toUpperCase() : args[0],
        url: args[1],
        startTime: new Date().getTime(),
        type: 'xhr',
      };
      // 执行原始的open方法
      open.apply(this, args);
    };
  });

  // 拦截send方法
  replace(originalXhrProto, 'send', (send) => {
    return (...args) => {
      // 当请求结束时触发，无论请求成功还是失败都会触发
      this.addEventListener('loadend', () => {
        const { responseType, response, status } = this;
        const endTime = new Date().getTime();
        this._xhr.reqData = args[0];
        this._xhr.status = status;
        if (['', 'json', 'text'].indexOf(responseType) !== -1) {
          this._xhr.responseText =
            typeof response === 'object' ? JSON.stringify(response) : response;
        }
        // 获取接口的请求时长
        this._xhr.elapsedTime = endTime - this._xhr.startTime;

        // 处理
        handler(this._xhr);
      });

      // 执行原始的send方法
      send.apply(this, args);
    };
  });
}

export default xhrReplacer;
