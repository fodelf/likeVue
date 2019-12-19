/*
 * @Description: 在angular 里面使用VueAPi
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-12-18 08:28:50
 * @LastEditors  : 吴文周
 * @LastEditTime : 2019-12-18 17:58:34
 */

/**
 * @author: 吴文周
 * @name: LikeVue
 * @description: 装饰器
 * @param {type}: 默认参数
 * @return {type}: 默认类型
 * @example:  @LikeVue() $watch() { return { // 监听的属性 "prop":(value)=>{// do something} };}
 */
export function LikeVue(params?:string) {
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
          let fun = target.$watchObj[key];
          if (typeof fun === 'function') {
            setTimeout(() => {
              // 是否是第一次设值,初始化设值不监听
              if(target.$watchCache.hasOwnProperty(key)){
                let oldValue = target.$watchCache[key];
                target.$watchCache[key] = newValue;
                fun.call(target, newValue,oldValue);
              }else{
                target.$watchCache[key] = newValue;
              }
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
          // this.$watchCache[key] = this[key];
          target.$watchObserver(key);
        });
      } else {
        console.log('this $watch is not a function');
      }
    };
    // 自执行初始化
    target['$watchInit']();
  }
}

/**
 * @author: 吴文周
 * @name: NgVue
 * @description: 继承类
 * @param {type}: 默认参数
 * @return {type}: 默认类型
 * @example: $watch() { return { // 监听的属性 "prop":(value)=>{// do something} };}
 */
export class NgVue {
  constructor() {
    this.$watchInit();
  };
  $watchCache = {};  // 监听数据缓存
  $watchObj = {}; // 监听对象
   /**
   * @author: 吴文周
   * @name:  $watchObserver
   * @description: 添加观察者
   * @param {type}: 默认参数
   * @return {type}: 默认类型
   * @example: 示例
   */
  $watchObserver(key) {
    Object.defineProperty(this, key, {
    	enumerable: true,
    	configurable: true,
      get: function () {
        let value =  this.$watchCache[key] || '';
        return value;
      },
      set: function (newValue) {
        let fun = this.$watchObj[key];
        if (typeof fun === 'function') {
          setTimeout(() => {
            // 是否是第一次设值,初始化设值不监听
            if(this.$watchCache.hasOwnProperty(key)){
              let oldValue = this.$watchCache[key];
              this.$watchCache[key] = newValue;
              fun.call(this, newValue,oldValue);
            }else{
              this.$watchCache[key] = newValue;
            }
          },0)
        } else {
          console.log('this' + key + 'callback is not a function');
        }
      }
    });
  }
   /**
   * @author: 吴文周
   * @name: $watch
   * @description: 监听行为
   * @param {type}: 默认参数
   * @return {type}: 默认类型
   * @example: 示例
   */
  $watch() {
    return {};
  }
  /**
   * @author: 吴文周
   * @name: $watchInit
   * @description: 监听初始化
   * @param {type}: 默认参数
   * @return {type}: 默认类型
   * @example: 示例
   */
  $watchInit() {
    if (typeof this.$watch === 'function') {
      this.$watchObj = this.$watch();
      Object.keys(this.$watchObj).forEach((key) => {
        // this.$watchCache[key] = this[key];
        this.$watchObserver(key);
      });
    } else {
      console.log('this $watch is not a function');
    }
  }
}