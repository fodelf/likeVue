/*
 * @Description: 在angular 里面使用VueAPi
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-12-18 08:28:50
 * @LastEditors  : 吴文周
 * @LastEditTime : 2019-12-18 17:58:34
 */
export function LikeVue(params) {
  return function (target, propertyName) {
    target['$watchCache'] = {};  // 监听数据缓存
    target['$watchObj'] = {}; // 监听对象
    /**
     * @author: 吴文周
     * @name:  $watchObserver
     * @description: 添加观察者
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     * @example: 示例
     */
    target['$watchObserver'] = function (key) {
      Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get: function () {
          let value = target.$watchCache[key] || '';
          return value;
        },
        set: function (newValue) {
          target.$watchCache[key] = newValue;
          let fun = target.$watchObj[key];
          if (typeof fun === 'function') {
            setTimeout(() => {
              fun.call(target, newValue);
            }, 0)
          } else {
            console.log('this prop' + key + 'callback is not a function');
          }
        }
      })
    };
    /**
     * @author: 吴文周
     * @name: $watchInit
     * @description: 监听初始化
     * @param {type}: 默认参数
     * @return {type}: 默认类型
     * @example: 示例
     */
    target['$watchInit'] = function () {
      if (typeof target.$watch === 'function') {
        target.$watchObj = target.$watch();
        Object.keys(target.$watchObj).forEach((key) => {
          target.$watchObserver(key);
        });
      } else {
        console.log('target $watch is not a function');
      }
    };
    // 自执行初始化
    target['$watchInit']();
  }
}