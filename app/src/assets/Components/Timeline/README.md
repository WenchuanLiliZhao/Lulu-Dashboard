# Timeline Components

## DayWidthSlider

### 功能
一个可以动态调节时间轴中每天宽度的滑块组件。

### Props
- `dayWidth: number` - 当前天的宽度（像素）
- `onDayWidthChange: (newWidth: number) => void` - 当宽度改变时的回调函数
- `minWidth?: number` - 最小宽度，默认 12px
- `maxWidth?: number` - 最大宽度，默认 60px

### 使用示例
```tsx
import { DayWidthSlider } from './DayWidthSlider';

const [dayWidth, setDayWidth] = useState(24);

<DayWidthSlider 
  dayWidth={dayWidth} 
  onDayWidthChange={setDayWidth}
  minWidth={12}
  maxWidth={60}
/>
```

### 集成到Timeline
DayWidthSlider 已经集成到 Timeline 组件中，位于时间轴上方。可以通过拖动滑块来实时调节每天的宽度，从而改变时间轴的视觉密度。

### 样式自定义
组件使用CSS变量进行样式设置，支持明暗主题切换：
- `--color-bg-sec` - 背景色
- `--color-border-main` - 边框色
- `--color-text-main` - 主文本色
- `--color-text-sec` - 次文本色
- `--color-accent` - 强调色（滑块颜色） 