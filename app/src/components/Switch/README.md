# Switch 组件

一个现代化的多选项切换组件，支持在 2-n 个选项之间进行平滑切换。

## 特性

- 🎯 **多选项支持**: 支持 2-n 个选项之间的切换
- 🎨 **现代化设计**: 美观的渐变背景和平滑动画
- 📱 **响应式**: 支持不同尺寸和移动端适配
- 🌙 **深色模式**: 自动适配系统主题
- ♿ **无障碍**: 支持键盘导航和焦点管理
- 🎛️ **高度可定制**: 支持自定义样式和尺寸
- ⚡ **性能优化**: 使用 CSS 变量和硬件加速

## 使用方法

### 基础用法

```tsx
import Switch, { type SwitchOption } from './components/Switch';

const options: SwitchOption[] = [
  { value: 'list', label: '列表' },
  { value: 'grid', label: '网格' },
  { value: 'card', label: '卡片' }
];

function MyComponent() {
  return (
    <Switch
      options={options}
      defaultValue="grid"
      onChange={(value) => console.log('选择:', value)}
    />
  );
}
```

### 不同尺寸

```tsx
// 小尺寸
<Switch options={options} size="small" />

// 中等尺寸 (默认)
<Switch options={options} size="medium" />

// 大尺寸
<Switch options={options} size="large" />
```

### 禁用状态

```tsx
<Switch 
  options={options} 
  disabled={true}
  defaultValue="list"
/>
```

### 自定义样式

```tsx
<Switch 
  options={options}
  className="my-custom-switch"
  onChange={(value) => handleChange(value)}
/>
```

## API

### SwitchProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `options` | `SwitchOption[]` | - | 选项列表 (必需) |
| `defaultValue` | `string` | `options[0]?.value` | 默认选中的值 |
| `onChange` | `(value: string) => void` | - | 值改变时的回调函数 |
| `className` | `string` | `''` | 自定义 CSS 类名 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |

### SwitchOption

| 属性 | 类型 | 说明 |
|------|------|------|
| `value` | `string` | 选项的值 (必需) |
| `label` | `string` | 选项的显示文本 (必需) |

## 样式定制

组件使用 CSS 变量，可以轻松定制样式：

```scss
.my-custom-switch {
  .switchIndicator {
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
  }
  
  .switchOption.active {
    color: #ffffff;
  }
}
```

## 无障碍特性

- 支持键盘导航 (Tab 键切换焦点)
- 支持 Enter/Space 键激活选项
- 自动管理 ARIA 属性
- 支持屏幕阅读器

## 浏览器兼容性

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 示例

查看 `SwitchExample.tsx` 文件获取更多使用示例。 