# FullscreenButton 真正全屏悬浮按钮组件

一个使用浏览器原生 Fullscreen API 的通用全屏悬浮按钮组件，可以让任何内容支持真正的全屏显示功能（隐藏浏览器界面）。

## 🌟 主要特性

- **真正全屏**：使用浏览器原生 Fullscreen API，隐藏地址栏、工具栏等
- **悬浮按钮**：在右下角（可自定义位置）显示一个悬浮的全屏按钮
- **智能图标**：全屏时自动切换为退出全屏图标
- **键盘支持**：按 ESC 键或 F11 退出全屏
- **可访问性**：支持 ARIA 标签和键盘导航
- **响应式**：在移动设备和桌面设备上都有良好的用户体验
- **可自定义**：支持自定义图标、位置、大小等
- **通用性**：可以包装任何 React 组件

## 📖 使用方法

### 基本用法

```tsx
import FullscreenButton from '../Components/FullscreenButton';

function MyComponent() {
  return (
    <FullscreenButton>
      <div>
        这里是需要全屏显示的内容
      </div>
    </FullscreenButton>
  );
}
```

### 自定义配置

```tsx
<FullscreenButton
  iconName="zoom_out_map"
  buttonSize={64}
  position="top-right"
  offset={32}
>
  <MyComplexComponent />
</FullscreenButton>
```

## 🎛️ API 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | `React.ReactNode` | - | 需要全屏显示的内容 |
| `iconName` | `string` | `'fullscreen'` | Material Icons 图标名称 |
| `buttonSize` | `number` | `56` | 悬浮按钮的大小（像素） |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | 悬浮按钮的位置 |
| `offset` | `number` | `24` | 距离边缘的偏移量（像素） |

## 🚀 在 Timeline 中的使用

这个组件已经集成到 Timeline demo 中：

```tsx
// 在 Page_Timeline.tsx 中
return (
  <FullscreenButton>
    <Timeline 
      inputData={groupIssuesByField(Example_Issues, groupBy)} 
      onGroupByChange={handleGroupByChange}
    />
  </FullscreenButton>
);
```

## ⌨️ 键盘快捷键

- **ESC**：退出全屏模式
- **Tab**：在全屏模式下可以正常进行键盘导航

## 🎨 样式自定义

组件使用 CSS 变量，支持主题切换：

```scss
.floatingButton {
  background-color: var(--color-bg-main);
  border: 1px solid var(--color-border-main);
  color: var(--color-text-main);
}
```

## 📱 移动设备支持

- 自动调整按钮大小以符合触摸目标最小尺寸要求
- 支持触摸手势
- 在小屏幕设备上优化布局

## 🔧 技术细节

- 使用浏览器原生 `Fullscreen API`
- `requestFullscreen()` / `exitFullscreen()` 方法调用
- 监听 `fullscreenchange` 事件自动更新状态
- 错误处理和降级支持
- 内存泄漏防护（自动清理事件监听器）
- 支持现代浏览器的全屏体验

## 🌐 可访问性

- 完整的 ARIA 标签支持
- 键盘导航友好
- 屏幕阅读器兼容
- 高对比度模式支持

## 💡 使用场景

1. **数据可视化**：让图表、表格等支持全屏查看
2. **编辑器**：为编辑器提供专注模式
3. **媒体内容**：图片、视频的全屏预览
4. **仪表板**：复杂界面的全屏展示
5. **演示模式**：会议演示时的全屏显示 