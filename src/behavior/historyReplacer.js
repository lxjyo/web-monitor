import { replace } from '../utils';

// lastHref 前一个页面的路由
let lastHref = document.location.href;
function historyReplacer(handler) {
  function historyReplaceFn(originalHistoryFn) {
    return function (...args) {
      const url = args.length > 2 ? args[2] : undefined;
      if (url) {
        const from = lastHref;
        const to = String(url);
        lastHref = to;
        // 上报路由变化
        handler('routeChange', {
          from,
          to,
        });
      }
      return originalHistoryFn.apply(this, args);
    };
  }
  // 重写pushState事件
  replace(window.history, 'pushState', historyReplaceFn);
  // 重写replaceState事件
  replace(window.history, 'replaceState', historyReplaceFn);
}

export default historyReplacer;
