# Timeline Zoom-Level URL 同步功能

## 概述

Timeline 组件现在支持将 zoom-level (时间视图) 与 URL 地址栏同步，使用户可以分享特定缩放级别的视图链接。

## 功能特性

### 🔗 URL 同步
- **自动同步**：当用户切换 zoom-level 时，URL 会自动更新
- **历史支持**：支持浏览器前进/后退按钮
- **分享友好**：生成的 URL 可以直接分享给其他用户

### 📋 URL 格式

| Zoom Level | URL 示例 | 说明 |
|------------|---------|------|
| Month (默认) | `mysite.com/timeline` | 默认视图，无参数 |
| Year | `mysite.com/timeline?view=year` | 年视图 |
| Day | `mysite.com/timeline?view=day` | 日视图 |

### 🎯 使用场景

1. **分享特定视图**
   ```
   用户A在日视图下发现了重要信息
   → 复制 mysite.com/timeline?view=day
   → 分享给用户B
   → 用户B打开链接，自动显示日视图
   ```

2. **书签保存**
   ```
   用户经常使用年视图查看整体进度
   → 保存 mysite.com/timeline?view=year 为书签
   → 下次打开直接显示年视图
   ```

3. **团队协作**
   ```
   在会议中讨论某个特定的时间范围
   → 切换到合适的 zoom-level
   → 分享当前 URL 给团队成员
   ```

## 技术实现

### 核心文件

- **`/Utils/urlSync.ts`** - URL 同步工具函数
- **`Timeline.tsx`** - 主组件，集成 URL 同步功能

### API 接口

#### `getTimeViewFromUrl(defaultView?)`
从 URL 参数中获取时间视图类型
```typescript
const timeView = getTimeViewFromUrl('month'); // 默认为 'month'
```

#### `syncTimeViewToUrl(timeView, defaultView?)`
将时间视图同步到 URL
```typescript
syncTimeViewToUrl('year'); // URL 变为 ?view=year
syncTimeViewToUrl('month'); // URL 变为无参数 (默认值)
```

#### `createShareableUrl(timeView, baseUrl?)`
创建可分享的完整 URL
```typescript
const shareUrl = createShareableUrl('day'); 
// 返回: https://mysite.com/timeline?view=day
```

#### `listenToHistoryChanges(callback)`
监听浏览器历史变化
```typescript
const cleanup = listenToHistoryChanges(() => {
  // 处理历史变化
});
// 记得调用 cleanup() 清理监听器
```

### 实现细节

1. **默认值处理**
   - Month 视图为默认值，不在 URL 中显示参数
   - 只有非默认值才会添加 `?view=` 参数

2. **无效参数处理**
   - 如果 URL 包含无效的 `view` 参数，自动回退到默认值
   - 支持的值：`year`, `month`, `day`

3. **浏览器兼容性**
   - 使用 `window.history.replaceState()` 更新 URL
   - 不会触发页面刷新
   - 支持现代浏览器的 History API

4. **SSR 友好**
   - 包含 `typeof window === 'undefined'` 检查
   - 在服务端渲染环境中安全降级

## 使用示例

### 基础使用
```typescript
// Timeline 组件自动处理 URL 同步
// 用户切换 zoom-level 时，URL 会自动更新
<Timeline inputData={data} />
```

### 手动创建分享链接
```typescript
import { createShareableUrl } from './Utils/urlSync';

const shareYearView = () => {
  const url = createShareableUrl('year');
  navigator.clipboard.writeText(url);
  alert('年视图链接已复制到剪贴板！');
};
```

### 监听 URL 变化
```typescript
import { listenToHistoryChanges, getTimeViewFromUrl } from './Utils/urlSync';

useEffect(() => {
  const cleanup = listenToHistoryChanges(() => {
    const newView = getTimeViewFromUrl();
    console.log('URL 变化，新的视图:', newView);
  });
  
  return cleanup;
}, []);
```

## 用户体验优化

### ✅ 优点
- **直观分享**：复制 URL 即可分享当前视图
- **状态保持**：刷新页面后保持相同的 zoom-level
- **历史导航**：支持浏览器前进/后退
- **简洁 URL**：默认视图不添加多余参数

### 🎨 用户界面
- Switch 组件行为保持不变
- URL 变化对用户透明，无额外 UI 负担
- 与现有功能完全兼容

## 测试场景

1. **直接访问带参数的 URL**
   - 访问 `mysite.com/timeline?view=year`
   - 应该自动显示年视图

2. **切换 zoom-level**
   - 在页面中切换到日视图
   - URL 应该更新为 `?view=day`

3. **刷新页面**
   - 在日视图下刷新页面
   - 应该保持日视图状态

4. **浏览器历史**
   - 切换多个视图后使用后退按钮
   - 应该正确恢复之前的视图状态

5. **无效参数处理**
   - 访问 `mysite.com/timeline?view=invalid`
   - 应该回退到默认的月视图

## 未来扩展

考虑的增强功能：
- 支持更多 URL 参数（如当前日期位置）
- 添加分享按钮组件
- 支持 URL fragment (#) 方式
- 集成社交媒体分享功能 