# Number Counter Animation

一个轻量级的数字滚动动画插件，当页面滚动到元素位置时，数字从0平滑滚动到目标值，增强用户体验和数据展示效果。

## 特性

- 🔄 平滑的数字滚动动画
- 📱 响应式设计，适配各种设备
- ⚙️ 丰富的配置选项
- 🚀 高性能，使用 Intersection Observer API
- 📦 支持多种模块系统（CommonJS, AMD, ES6）
- 🌐 跨浏览器兼容

## 安装

### 通过 NPM 安装

```bash
npm install number-counter-animation --save
```

### 通过 Yarn 安装

```bash
yarn add number-counter-animation
```

### 通过 CDN 使用

```html
<script src="https://cdn.jsdelivr.net/npm/number-counter-animation@1.0.0/dist/number-counter.min.js"></script>
```

## 使用方法

### 1. HTML 结构

```html
<!-- 基础用法 -->
<span class="counter" data-counter data-target="100">0</span>

<!-- 带自定义选项 -->
<span class="counter" 
      data-counter 
      data-target="1234.56" 
      data-duration="2000" 
      data-decimals="2"
      data-prefix="$"
      data-suffix=" USD"
      data-separator=",">0</span>
```

### 2. JavaScript 初始化

#### ES6 模块导入

```javascript
import NumberCounter from 'number-counter-animation';

// 初始化所有带有 data-counter 属性的元素
NumberCounter.init();

// 或者使用自定义选项初始化
NumberCounter.init({
  selector: '.my-counter',
  duration: 2000,
  delay: 0,
  separator: ','
});
```

#### CommonJS 模块导入

```javascript
const NumberCounter = require('number-counter-animation');

NumberCounter.init();
```

#### 浏览器全局变量

```javascript
// 在引入 CDN 脚本后
NumberCounter.init();
```

### 3. 单独初始化元素

```javascript
import NumberCounter from 'number-counter-animation';

// 获取元素
const element = document.querySelector('.counter');

// 创建实例
const counter = new NumberCounter(element, {
  target: 1000,
  duration: 2000,
  decimals: 2,
  prefix: '$',
  suffix: ' USD',
  separator: ','
});
```

## 配置选项

### 数据属性

可以通过 HTML 数据属性设置每个计数器的选项：

| 数据属性 | 类型 | 默认值 | 描述 |
|---------|------|-------|------|
| data-target | number | 100 | 目标数字值 |
| data-duration | number | 1000 | 动画持续时间（毫秒） |
| data-delay | number | 0 | 动画延迟时间（毫秒） |
| data-decimals | number | 0 | 小数位数 |
| data-prefix | string | '' | 数字前缀 |
| data-suffix | string | '' | 数字后缀 |
| data-separator | string | '' | 千位分隔符 |

### JavaScript 选项

通过 JavaScript 初始化时可以设置的选项：

| 选项 | 类型 | 默认值 | 描述 |
|-----|------|-------|------|
| selector | string | '[data-counter]' | 要选择的元素选择器 |
| target | number | 100 | 目标数字值 |
| duration | number | 1000 | 动画持续时间（毫秒） |
| delay | number | 0 | 动画延迟时间（毫秒） |
| decimals | number | 0 | 小数位数 |
| prefix | string | '' | 数字前缀 |
| suffix | string | '' | 数字后缀 |
| separator | string | '' | 千位分隔符 |
| easing | string | 'easeOutQuad' | 缓动函数 |
| threshold | number | 0.1 | Intersection Observer 阈值 |

### 缓动函数

支持以下缓动函数：

- linear
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInCubic
- easeOutCubic
- easeInOutCubic
- easeInQuart
- easeOutQuart
- easeInOutQuart
- easeInQuint
- easeOutQuint
- easeInOutQuint

## 示例

### 基础示例

```html
<span class="counter" data-counter data-target="100">0</span>
```

### 带千位分隔符

```html
<span class="counter" data-counter data-target="1234567" data-separator=",">0</span>
```

### 带前缀和后缀

```html
<span class="counter" data-counter data-target="99.99" data-prefix="$" data-suffix=" USD">0</span>
```

### 带小数位

```html
<span class="counter" data-counter data-target="3.14159" data-decimals="5">0</span>
```

### 自定义持续时间

```html
<span class="counter" data-counter data-target="100" data-duration="3000">0</span>
```

## API

### NumberCounter.init(options)

初始化所有匹配选择器的元素。

**参数：**
- `options` (Object): 配置选项

**返回值：**
- 无

### new NumberCounter(element, options)

创建一个新的计数器实例。

**参数：**
- `element` (HTMLElement): 要应用动画的DOM元素
- `options` (Object): 配置选项

**返回值：**
- NumberCounter 实例

### counter.init()

初始化计数器实例。

**参数：**
- 无

**返回值：**
- 无

### counter.animate()

开始数字滚动动画。

**参数：**
- 无

**返回值：**
- 无

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

对于不支持 Intersection Observer API 的浏览器，会自动回退到立即执行动画。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License