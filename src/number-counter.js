/**
 * NumberCounter - 数字滚动动画插件
 * 当页面滚动到元素位置时，数字从0平滑滚动到目标值
 * 
 * @version 1.0.0
 * @author Your Name
 * @license MIT
 */

class NumberCounter {
  /**
   * 构造函数
   * @param {HTMLElement} element - 要应用动画的DOM元素
   * @param {Object} options - 配置选项
   */
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      target: parseFloat(element.dataset.target) || 100,
      duration: parseInt(element.dataset.duration) || 1000,
      delay: parseInt(element.dataset.delay) || 0,
      decimals: parseInt(element.dataset.decimals) || 0,
      prefix: element.dataset.prefix || '',
      suffix: element.dataset.suffix || '',
      separator: element.dataset.separator || '',
      easing: 'easeOutQuad',
      threshold: 0.1,
      ...options
    };
    
    this.startValue = 0;
    this.startTime = null;
    this.running = false;
    this.observer = null;
    
    this.init();
  }
  
  /**
   * 初始化插件
   */
  init() {
    // 使用 Intersection Observer 检测元素是否可见
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.running) {
            setTimeout(() => {
              this.animate();
            }, this.options.delay);
            this.observer.unobserve(this.element);
          }
        });
      }, { threshold: this.options.threshold });
      
      this.observer.observe(this.element);
    } else {
      // 回退方案：立即执行动画
      setTimeout(() => {
        this.animate();
      }, this.options.delay);
    }
  }
  
  /**
   * 执行数字滚动动画
   */
  animate() {
    this.running = true;
    this.startTime = performance.now();
    
    const animate = (currentTime) => {
      if (!this.startTime) this.startTime = currentTime;
      const elapsed = currentTime - this.startTime;
      const progress = Math.min(elapsed / this.options.duration, 1);
      
      // 应用缓动函数
      const easedProgress = this.easingFunctions[this.options.easing](progress);
      
      // 计算当前值
      const currentValue = this.startValue + (this.options.target - this.startValue) * easedProgress;
      
      // 格式化并更新元素
      this.element.textContent = this.formatNumber(currentValue);
      
      // 继续动画
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // 确保最终值精确
        this.element.textContent = this.formatNumber(this.options.target);
        this.running = false;
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  /**
   * 格式化数字
   * @param {number} num - 要格式化的数字
   * @returns {string} 格式化后的数字字符串
   */
  formatNumber(num) {
    // 四舍五入到指定小数位
    const roundedNum = Math.round(num * Math.pow(10, this.options.decimals)) / Math.pow(10, this.options.decimals);
    
    // 转换为字符串并分割整数和小数部分
    const parts = roundedNum.toFixed(this.options.decimals).split('.');
    
    // 添加千位分隔符到整数部分
    if (this.options.separator && parts[0].length > 3) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.options.separator);
    }
    
    // 重新组合整数和小数部分
    const formattedNum = parts.join('.');
    
    // 添加前缀和后缀
    return `${this.options.prefix}${formattedNum}${this.options.suffix}`;
  }
  
  /**
   * 缓动函数集合
   */
  easingFunctions = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: t => t * t * t * t,
    easeOutQuart: t => 1 - (--t) * t * t * t,
    easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    easeInQuint: t => t * t * t * t * t,
    easeOutQuint: t => 1 + (--t) * t * t * t * t,
    easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
  };
  
  /**
   * 静态方法：初始化所有带有指定选择器的元素
   * @param {Object} options - 配置选项
   */
  static init(options = {}) {
    const selector = options.selector || '[data-counter]';
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      new NumberCounter(element, options);
    });
  }
}

// 导出插件
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS 模块
  module.exports = NumberCounter;
} else if (typeof define === 'function' && define.amd) {
  // AMD 模块
  define([], () => NumberCounter);
} else {
  // 浏览器全局变量
  window.NumberCounter = NumberCounter;
}