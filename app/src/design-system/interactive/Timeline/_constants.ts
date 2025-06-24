/**
 * 📐 Timeline组件的布局常量配置
 * 
 * 这个文件定义了Timeline组件中所有的尺寸、间距和布局相关的常量。
 * 通过集中管理这些数值，可以确保Timeline的视觉一致性和易于调整。
 * 
 * 🎯 常量类型：
 * - 基础尺寸：项目高度、分组间距
 * - 缩放级别：年视图、月视图的缩放比例
 * - 标签高度：年份、月份、日期标签的高度
 * - 内边距：项目内部的水平和垂直边距
 * 
 * 📏 布局计算：
 * - cellHeight: 每个时间线项目的基础高度（84px）
 * - groupGap: 分组之间的间距（当前为0）
 * - yearZoom/monthZoom: 不同时间视图的缩放系数
 * 
 * 🏷️ 标尺尺寸：
 * - yearLabelHeight: 年份标签区域高度
 * - monthLabelHeight: 月份标签区域高度  
 * - dayLabelHeight: 日期标签区域高度
 * 
 * 💡 使用场景：
 * - Timeline主组件布局计算
 * - 子组件尺寸统一
 * - CSS-in-JS样式计算
 * - 响应式布局调整
 * 
 * 🔧 如何修改：
 * 调整这些常量会影响整个Timeline的外观
 * 建议按比例调整相关数值以保持协调
 */

export const TimelineConst = {
  cellHeight: 84,
  groupGap: 0,
  yearZoom: 4.5,
  monthZoom: 24,

  yearLabelHight: 32,
  monthLabelHight: 48,
  dayLabelHight: 20,

  itemVPadding: 2,
  itemHPadding: 2,
};

export const TimelineConstCalc = {
  groupMinHeight: TimelineConst.cellHeight * 2,

  rulerHeight: TimelineConst.yearLabelHight + TimelineConst.monthLabelHight + TimelineConst.dayLabelHight,
};