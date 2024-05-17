import { replace } from '../utils.js';

/**
 * 捕获接口异常，通过复写fetch的方法
 * @param {function} handler 
 * @returns 
 */
function fetchReplacer(handler) {
  if (!('fetch' in window)) {
    return;
  }
  if (typeof handler !== 'function') {
    throw new TypeError('handler must be a function');
  }
  replace(window, 'fetch', (originalFetch) => {
    return function (url, config) {
      const startTime = new Date().getTime(); // 获取请求开始时间
      const method = (config && config.method) || 'GET';
      let handleData = {
        type: 'fetch',
        method,
        reqData: config && config.body,
        url,
      };

      return originalFetch.apply(window, [url, config]).then(
        (res) => {
          // res.clone克隆，防止被标记已消费
          const tempRes = res.clone();
          const endTime = new Date().getTime(); // 获取响应时间
          handleData = {
            ...handleData,
            elapsedTime: endTime - startTime, // 耗时
            status: tempRes.status,
          };
          tempRes.text().then((data) => {
            handleData.responseText = data;
            // 处理
            handler(handleData);
          });

          return res;
        },
        (error) => {
          const endTime = new Date().getTime();
          handlerData = {
            ...handlerData,
            elapsedTime: endTime - startTime,
            status: 0,
          };
          handler(handlerData);
          throw error;
        }
      );
    };
  });
}

export default fetchReplacer;