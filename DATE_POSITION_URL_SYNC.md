# Timeline 日期位置 URL 同步功能

## 概述

Timeline 组件现在支持将当前视口中心的日期位置与 URL 地址栏同步，使用户可以通过URL记住和分享特定日期位置的视图。

## 功能特性

### 🎯 自动位置记忆
- **滚动同步**：当用户滚动时间线时，URL会自动更新包含当前中心位置的日期
- **实时更新**：使用防抖机制（300ms），避免频繁更新URL
- **中心定位**：记录的是视口中心位置对应的日期，不包括侧边栏区域

### 🔗 URL 格式

| 功能 | URL 示例 | 说明 |
|------|---------|------|
| 默认位置 | `mysite.com/timeline` | 没有特定日期，显示默认位置 |
| 特定日期 | `mysite.com/timeline?date=2024-03-15` | 滚动到2024年3月15日 |
| 组合参数 | `mysite.com/timeline?view=day&date=2024-03-15` | 日视图 + 特定日期 |

### 🎨 用户体验

1. **无缝体验**
   - 滚动时URL悄无声息地更新
   - 不会影响滚动性能
   - 支持浏览器前进/后退按钮

2. **智能恢复**
   - 页面刷新后自动恢复到原位置
   - 分享链接时接收方看到相同的视图
   - 支持书签保存特定日期位置

3. **防抖优化**
   - 避免滚动时频繁更新URL
   - 300ms延迟确保只在停止滚动后更新
   - 不会产生大量历史记录

## 技术实现

### 核心文件

#### 1. `/Utils/urlSync.ts` - URL同步工具
新增功能：
- `getDateFromUrl()` - 从URL获取日期参数
- `syncDateToUrl(date)` - 同步日期到URL
- `createShareableUrl(timeView, date)` - 创建包含日期的分享链接

#### 2. `/Utils/useScrollToDate.tsx` - 日期滚动工具
提供以下功能：
- `getCenterDateString()` - 获取当前中心日期
- `scrollToDate(dateString)` - 滚动到指定日期
- `calculateDaysToDate()` - 计算日期偏移
- `calculateDateFromDays()` - 根据偏移计算日期

#### 3. `/Utils/useDateUrlSync.tsx` - 日期URL同步管理
封装所有与URL日期同步相关的逻辑：
- 监听浏览器历史变化（前进/后退按钮）
- 监听滚动事件并同步中心日期到URL
- 初始化时从URL恢复日期位置
- 防抖优化和事件清理

#### 4. `Timeline.tsx` - 主组件集成
通过调用 `useDateUrlSync()` 自定义Hook集成所有日期同步功能，保持组件简洁

### 核心算法

#### 1. 日期计算
```typescript
// 从timeline开始日期计算到目标日期的天数
const calculateDaysToDate = (targetDate: Date) => {
  // 考虑年份、月份、天数的累加
  // 处理闰年和不同月份的天数差异
}

// 根据天数偏移计算对应日期
const calculateDateFromDays = (daysFromStart: number) => {
  // 从timeline开始日期向前推算
  // 逐月累加直到找到目标日期
}
```

#### 2. 视口中心计算
```typescript
const getCenterDate = () => {
  const scrollLeft = container.scrollLeft;
  const containerWidth = container.clientWidth;
  const centerScrollPosition = scrollLeft + containerWidth / 2;
  const daysFromStart = centerScrollPosition / dayWidth;
  return calculateDateFromDays(daysFromStart);
}
```

#### 3. 滚动同步
```typescript
const handleScroll = () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const centerDateString = getCenterDateString();
    if (centerDateString) {
      syncDateToUrl(centerDateString);
    }
  }, 300); // 防抖
};
```

## 使用场景

### 📅 日常使用
```
用户查看2024年3月的项目进度
→ 滚动到3月中旬
→ URL自动更新为 ?date=2024-03-15
→ 下次访问或刷新页面时自动回到这个位置
```

### 🔄 团队协作
```
项目经理发现关键时间节点
→ 复制包含日期的URL
→ 分享给团队成员: timeline?view=day&date=2024-03-15
→ 团队成员打开链接，直接看到相同的视图
```

### 📌 书签管理
```
用户经常查看Q1季度总结
→ 滚动到Q1结束位置
→ 保存 timeline?date=2024-03-31 为书签
→ 快速访问Q1总结视图
```

## API 接口

### URL同步工具
```typescript
// 获取URL中的日期参数
const date = getDateFromUrl(); // 返回 "2024-03-15" 或 null

// 同步日期到URL
syncDateToUrl("2024-03-15"); // URL变为 ?date=2024-03-15
syncDateToUrl(null); // 移除日期参数

// 创建分享链接
const shareUrl = createShareableUrl('day', '2024-03-15');
// 返回: https://mysite.com/timeline?view=day&date=2024-03-15
```

### 日期滚动工具
```typescript
const {
  getCenterDateString,  // 获取中心日期字符串
  scrollToDate,         // 滚动到指定日期
  scrollToToday,        // 滚动到今天
} = useScrollToDate(containerRef, dayWidth, yearList, startMonth);

// 使用示例
const centerDate = getCenterDateString(); // "2024-03-15"
scrollToDate("2024-03-15", "smooth");    // 平滑滚动到指定日期
scrollToToday("instant");                // 瞬间滚动到今天
```

## 性能优化

### 🚀 防抖机制
- 滚动事件使用300ms防抖
- 避免频繁URL更新
- 减少浏览器历史记录污染

### 🎯 精确计算
- 只在真正停止滚动后计算日期
- 使用整数天数避免浮点误差
- 考虑闰年和月份差异

### 🔄 智能同步
- 只在日期真正改变时更新URL
- 避免重复的URL操作
- 支持瞬间滚动避免动画冲突

## 兼容性

### 浏览器支持
- ✅ 现代浏览器（Chrome, Firefox, Safari, Edge）
- ✅ 支持 History API
- ✅ SSR 友好（服务端渲染安全）

### 功能兼容
- ✅ 与现有缩放功能完全兼容
- ✅ 与时间视图切换功能协同工作
- ✅ 不影响现有的"回到今天"功能

## 未来扩展

### 🎯 精度控制
- 支持小时级别的精确定位
- 考虑工作日/非工作日的显示优化

### 📱 移动端优化
- 触摸滚动的防抖优化
- 手势操作的URL同步

### 🔧 自定义配置
- 可配置的防抖时间
- 可选择的日期格式
- 自定义同步策略

---

*这个功能让Timeline不仅是一个查看工具，更成为了一个可以记忆和分享特定时间点的智能平台。* 