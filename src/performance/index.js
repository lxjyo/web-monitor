import getResource from './resource';
import getLongTasks from './long';

window.addEventListener('load', () => {
  // 只统计首屏幕资源
  const resources = getResource();
  console.log(resources)

  // 获取内存
  console.log("memory", performance.memory);
})

getLongTasks(tasks => {
  console.log(tasks)
})