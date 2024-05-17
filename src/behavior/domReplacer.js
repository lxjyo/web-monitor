/**
 * 用户点击行为
 * @param {function} handler 
 */
function domReplacer(handler) {
  document.addEventListener(
    'click',
    ({ target }) => {
      const tagName = target.tagName.toLowerCase();
      if (tagName === 'body') {
        return null;
      }
      let classNames = target.classList.value;
      classNames = classNames !== '' ? ` class="${classNames}"` : '';
      const id = target.id ? ` id="${target.id}"` : '';
      const innerText = target.innerText;
      // 获取包含id、class、innerTextde字符串的标签
      let dom = `<${tagName}${id}${
        classNames !== '' ? classNames : ''
      }>${innerText}</${tagName}>`;

      handler({
        type: 'Click',
        dom,
      });
    },
    true
  );
}

export default domReplacer;