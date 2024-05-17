import xhrReplacer from './xhrReplacer.js';
import fetchReplacer from './fetchReplacer.js';

/**
 * 捕获脚本执行异常、
 * 捕获资源加载失败异常, 通过事件捕获获取
 */
window.addEventListener('error', function (e) {
  console.log('error', e)
}, true);

/**
 * 2. 捕获未处理的promise异常
 */
window.addEventListener('unhandledrejection', function (e) {
  console.log('unhandledrejection', e)
}, false);

// /**
//  * 3. 捕获脚本执行异常
//  */
// window.addEventListener('error', function (e) {
//   console.log('error', e)
// }, false);

function monitorError(data) {
  console.log('monitor', data)
}

xhrReplacer(monitorError);
fetchReplacer(monitorError);