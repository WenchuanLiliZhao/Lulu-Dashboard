// 测试文件：验证团队视觉配置自动同步功能
import { Team } from './Shapes';
import { 
  TeamColors, 
  TeamVisuals,
  debugTeamVisuals,
  getTeamColor,
  getTeamVisual,
  getTeamDisplayName,
  getTeamEmoji,
  getTeamColorName,
  getAllTeamVisuals
} from './TeamColors';

// 验证所有团队都有对应的颜色
export function validateTeamColorSync(): boolean {
  const teamKeys = Object.keys(Team);
  const colorKeys = Object.keys(TeamColors);
  
  // 检查数量是否一致
  if (teamKeys.length !== colorKeys.length) {
    console.error('团队数量与颜色数量不匹配');
    return false;
  }
  
  // 检查每个团队都有对应颜色
  const missingColors = teamKeys.filter(team => !TeamColors[team as keyof typeof TeamColors]);
  if (missingColors.length > 0) {
    console.error('以下团队缺少颜色映射:', missingColors);
    return false;
  }
  
  console.log('✅ 团队颜色同步验证通过！');
  return true;
}

// 新增：验证所有团队都有对应的视觉配置
export function validateTeamVisualSync(): boolean {
  const teamKeys = Object.keys(Team);
  const visualKeys = Object.keys(TeamVisuals);
  
  // 检查数量是否一致
  if (teamKeys.length !== visualKeys.length) {
    console.error('团队数量与视觉配置数量不匹配');
    return false;
  }
  
  // 检查每个团队都有完整的视觉配置
  const incompleteVisuals = teamKeys.filter(team => {
    const visual = TeamVisuals[team as keyof typeof TeamVisuals];
    return !visual || !visual.name || !visual.emoji || !visual.color;
  });
  
  if (incompleteVisuals.length > 0) {
    console.error('以下团队缺少完整的视觉配置:', incompleteVisuals);
    return false;
  }
  
  console.log('✅ 团队视觉配置同步验证通过！');
  return true;
}

// 演示函数：展示如何使用新的视觉配置
export function demonstrateVisualUsage() {
  console.log('=== 团队视觉配置演示 ===');
  
  // 打印所有团队的视觉配置
  debugTeamVisuals();
  
  // 示例：获取特定团队的各种信息
  console.log('\n=== 视觉信息获取示例 ===');
  const teams: Array<keyof typeof Team> = ['Tech', 'Product', 'Brand Marketing'];
  
  teams.forEach(team => {
    const visual = getTeamVisual(team);
    console.log(`${team}:`);
    console.log(`  显示名称: ${getTeamDisplayName(team)}`);
    console.log(`  Emoji: ${getTeamEmoji(team)}`);
    console.log(`  颜色名称: ${getTeamColorName(team)}`);
    console.log(`  颜色值: ${getTeamColor(team)}`);
    console.log(`  完整配置:`, visual);
    console.log('---');
  });
  
  // 验证同步
  console.log('\n=== 同步验证 ===');
  validateTeamColorSync();
  validateTeamVisualSync();
}

// 新增：演示如何在组件中使用视觉配置
export function demonstrateComponentUsage() {
  console.log('\n=== 组件使用示例 ===');
  
  // 模拟在组件中使用
  const allTeamVisuals = getAllTeamVisuals();
  
  console.log('团队列表渲染示例:');
  allTeamVisuals.forEach(({ team, visual }) => {
    console.log(`${visual.emoji} ${visual.name} (${team})`);
  });
  
  console.log('\n团队徽章渲染示例:');
  allTeamVisuals.slice(0, 3).forEach(({ team, visual }) => {
    console.log(`<span style="color: ${getTeamColor(team)}">
      ${visual.emoji} ${visual.name}
    </span>`);
  });
}

// 综合演示函数
export function demonstrateUsage() {
  demonstrateVisualUsage();
  demonstrateComponentUsage();
}

// 如果需要运行演示，取消下面的注释
// demonstrateUsage(); 