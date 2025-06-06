# Timeline 日期位置 URL 同步功能使用示例

## 功能演示

### 🎯 基本使用流程

1. **访问Timeline页面**
   ```
   http://localhost:5173/
   ```

2. **滚动时间线**
   - 使用鼠标滚轮或拖拽滚动条水平滚动
   - 观察浏览器地址栏的变化
   - URL会自动更新包含当前中心日期，例如：
     ```
     http://localhost:5173/?date=2024-03-15
     ```

3. **分享链接**
   - 复制当前地址栏的URL
   - 分享给其他人或保存为书签
   - 其他人访问时会自动滚动到相同的日期位置

### 📋 URL 格式示例

#### 默认状态
```
http://localhost:5173/
```
- 无任何参数
- 显示默认位置（通常是项目开始时间）

#### 包含日期参数
```
http://localhost:5173/?date=2024-03-15
```
- 自动滚动到2024年3月15日
- 该日期会位于视口中心位置

#### 组合时间视图和日期
```
http://localhost:5173/?view=day&date=2024-03-15
```
- 切换到日视图（高精度）
- 并滚动到2024年3月15日

#### 年视图 + 特定日期
```
http://localhost:5173/?view=year&date=2024-06-01
```
- 切换到年视图（低精度）
- 滚动到2024年6月1日附近

### 🔄 交互演示

#### 场景1：查看项目里程碑
```bash
# 1. 在浏览器中打开
http://localhost:5173/

# 2. 手动滚动到项目重要里程碑日期
# 3. 观察URL自动更新为：
http://localhost:5173/?date=2024-12-31

# 4. 刷新页面，验证是否回到相同位置
```

#### 场景2：团队协作
```bash
# 项目经理操作：
# 1. 切换到日视图
# 2. 滚动到关键交付日期
# 3. 复制地址：http://localhost:5173/?view=day&date=2024-08-15

# 团队成员：
# 1. 打开分享的链接
# 2. 自动看到日视图 + 8月15日的详细信息
```

#### 场景3：书签保存
```bash
# 1. 滚动到季度总结位置
# 2. URL更新为：http://localhost:5173/?date=2024-09-30
# 3. 保存为书签 "Q3季度总结"
# 4. 下次点击书签直接跳转到该位置
```

### 🎮 实际操作步骤

#### 步骤1：启动应用
```bash
cd app
npm run dev
```

#### 步骤2：打开浏览器
访问：`http://localhost:5173/`

#### 步骤3：测试滚动同步
1. 使用水平滚动条或鼠标滚轮滚动
2. 观察地址栏变化（约300ms延迟）
3. 验证日期参数的准确性

#### 步骤4：测试链接分享
1. 复制包含日期参数的URL
2. 在新标签页中打开
3. 验证是否滚动到正确位置

#### 步骤5：测试浏览器历史
1. 滚动到不同位置
2. 使用浏览器后退按钮
3. 验证位置是否正确恢复

### 🧪 高级测试用例

#### 测试用例1：边界情况
```bash
# 测试Timeline开始日期之前
http://localhost:5173/?date=2020-01-01
# 应该滚动到Timeline开始位置

# 测试未来日期
http://localhost:5173/?date=2030-12-31
# 应该滚动到Timeline结束位置
```

#### 测试用例2：无效日期格式
```bash
# 无效日期格式
http://localhost:5173/?date=invalid-date
# 应该忽略参数，显示默认位置

# 错误格式
http://localhost:5173/?date=2024/03/15
# 应该忽略参数，显示默认位置
```

#### 测试用例3：组合参数
```bash
# 多个参数组合
http://localhost:5173/?view=month&date=2024-06-15&other=test
# 应该正确解析view和date参数，忽略其他参数
```

### 🔧 开发者调试

#### 在浏览器控制台中测试：

```javascript
// 获取当前中心日期
const timeline = document.querySelector('[class*="timeline-content-container"]');
console.log('当前滚动位置:', timeline.scrollLeft);

// 手动触发日期同步
const event = new Event('scroll');
timeline.dispatchEvent(event);

// 检查URL参数
const urlParams = new URLSearchParams(window.location.search);
console.log('当前日期参数:', urlParams.get('date'));
```

#### 监听URL变化：

```javascript
// 监听URL变化
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    console.log('URL 已更新:', url);
  }
}).observe(document, {subtree: true, childList: true});
```

### 📊 性能验证

#### 防抖测试
1. 快速连续滚动
2. 观察URL更新频率
3. 验证只在停止滚动后更新（300ms后）

#### 内存泄漏测试
1. 长时间滚动操作
2. 检查浏览器开发者工具中的内存使用
3. 验证事件监听器正确清理

### 🚀 用户体验测试

#### 流畅性测试
- 滚动时不应有明显卡顿
- URL更新不应干扰滚动体验
- 页面刷新后的位置恢复应该快速且准确

#### 兼容性测试
- 测试不同浏览器（Chrome, Firefox, Safari）
- 测试不同屏幕尺寸
- 测试移动设备的触摸滚动

---

*通过这些示例和测试用例，您可以全面验证日期位置URL同步功能的正确性和稳定性。* 