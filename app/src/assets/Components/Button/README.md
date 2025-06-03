# Button Component

一个通用的按钮组件，提供多种样式和尺寸选择。

## 特性

- 支持多种变体：primary、secondary、outline
- 多种尺寸：small、medium、large
- 支持图标：可设置在左侧或右侧
- 完整的键盘和鼠标交互
- 支持禁用状态
- 响应式设计
- 深色主题支持

## 基本用法

```tsx
import Button from './components/Button';

// 基本按钮
<Button onClick={() => console.log('clicked')}>
  点击我
</Button>

// 带图标的按钮
<Button 
  variant="secondary"
  icon={<SomeIcon />}
  iconPosition="left"
  onClick={handleClick}
>
  保存
</Button>

// 大号主要按钮
<Button 
  variant="primary"
  size="large"
  onClick={handleSubmit}
>
  提交
</Button>
```

## API

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | `React.ReactNode` | - | 按钮内容 |
| `onClick` | `() => void` | - | 点击事件处理函数 |
| `className` | `string` | `''` | 额外的CSS类名 |
| `disabled` | `boolean` | `false` | 是否禁用按钮 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | 按钮变体 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮类型 |
| `icon` | `React.ReactNode` | - | 图标 |
| `iconPosition` | `'left' \| 'right'` | `'left'` | 图标位置 |

### 变体说明

- **primary**: 主要按钮，用于最重要的操作
- **secondary**: 次要按钮，用于一般操作
- **outline**: 轮廓按钮，用于不太重要的操作

### 尺寸说明

- **small**: 高度 32px，适用于紧凑的界面
- **medium**: 高度 40px，标准尺寸
- **large**: 高度 48px，适用于突出显示的操作

## 样式自定义

组件使用CSS变量来支持主题定制：

```css
:root {
  --color-semantic-active: #4f46e5;
  --color-bg-sec: #f8fafc;
  --color-text-main: #1f2937;
  --color-border-main: #e5e7eb;
}
```

## Timeline中的应用

在Timeline组件中，Button被用于实现"回到今天"的功能：

```tsx
<Button
  variant="secondary"
  size="medium"
  onClick={scrollToToday}
  icon={<TodayIcon />}
  iconPosition="left"
>
  回到今天
</Button>
```

## 可访问性

- 支持键盘导航（Tab、Enter、Space）
- 提供正确的ARIA属性
- 支持屏幕阅读器
- 符合WCAG 2.1指南 