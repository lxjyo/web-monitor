class BehaviorMonitor {
  // maxBreadcrumbs控制上报用户行为的最大条数
  maxBreadcrumbs = 20;
  // stack 存储用户行为
  stack = [];
  constructor() {}
  // 添加用户行为栈
  push(data) {
    if (this.stack.length >= this.maxBreadcrumbs) {
      // 超出则删除第一条
      this.stack.shift();
    }
    this.stack.push(data);
    // 按照时间排序
    this.stack.sort((a, b) => a.time - b.time);
  }
}

export default BehaviorMonitor;