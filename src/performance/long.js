
/**
 * 获取长任务
 * @param {function} handler 
 */
function getLongTasks(handler) {
  const observer = new PerformanceObserver(list => {
    handler(list)
  });
  observer.observe({ entryTypes: ['longtask'] });
}


export default getLongTasks;