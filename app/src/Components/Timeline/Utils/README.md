# Timeline Utils

## useIsTodayVisible Hook

这个自定义 Hook 用于检测今天的日期是否在 Timeline 的可视区域内。

### 功能特性

- ✅ 实时监听滚动事件
- ✅ 自动响应视图变化（如缩放级别改变）
- ✅ 性能优化的事件监听器管理
- ✅ 封装良好，使用简单

### 使用方法

```tsx
import { useIsTodayVisible } from './useIsTodayVisible';

// 在组件中使用（单行调用）
const isTodayVisible = useIsTodayVisible(containerRef, dayWidth, yearList, startMonth);

// 在BackToTodayButton中的实际应用
const BackToTodayButton = ({ containerRef, dayWidth, yearList, startMonth }) => {
  const isTodayVisible = useIsTodayVisible(containerRef, dayWidth, yearList, startMonth);
  
  return (
    <Button active={isTodayVisible}>
      Today
    </Button>
  );
};
```

### 参数说明

- `containerRef`: Timeline 容器的 React ref
- `dayWidth`: 每天的宽度（像素）
- `yearList`: 年份列表数组
- `startMonth`: 开始月份（0-based，0 = 一月）

### 返回值

返回一个 `boolean` 值：
- `true`: 今天的日期在可视区域内
- `false`: 今天的日期不在可视区域内

### 工作原理

1. 计算从 Timeline 开始到今天的总天数
2. 根据天数和 `dayWidth` 计算今天在 Timeline 中的像素位置
3. 获取当前可视区域的范围
4. 检测今天的格子是否与可视区域有重叠
5. 监听滚动事件，实时更新状态 