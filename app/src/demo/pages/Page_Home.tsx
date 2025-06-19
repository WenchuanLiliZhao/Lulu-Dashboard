import { CircularProgress } from "../../design-system";
import type { PageShape } from "../object-shapes/Page";

const Page_Home: PageShape = {
  info: {
    title: "Home",
    slug: "",
  },
  content: (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Lulu Dashboard</h1>
      
      <div style={{ margin: '40px 0' }}>
        <h2>Switch 切换组件</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>✨ 现代化的多选项切换组件，支持 2-n 个选项之间平滑切换！</p>
        
        <p style={{ marginTop: '20px' }}>
          <a href="/switch" style={{ color: '#007bff', textDecoration: 'underline' }}>
            查看完整的 Switch 组件演示 →
          </a>
        </p>
      </div>
      
      <div style={{ margin: '40px 0' }}>
        <h2>🎨 Van Gogh Color Palette</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>✨ A vibrant semantic color system inspired by Vincent van Gogh's masterpieces, featuring active, success, warning, and error states!</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '20px 0', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px',
            height: '60px',
            backgroundColor: 'var(--color-semantic-active)',
            borderRadius: '8px',
            border: '2px solid var(--color-border-main)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Active
          </div>
          <div style={{
            width: '80px',
            height: '60px',
            backgroundColor: 'var(--color-semantic-success)',
            borderRadius: '8px',
            border: '2px solid var(--color-border-main)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Success
          </div>
          <div style={{
            width: '80px',
            height: '60px',
            backgroundColor: 'var(--color-semantic-warning)',
            borderRadius: '8px',
            border: '2px solid var(--color-border-main)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Warning
          </div>
          <div style={{
            width: '80px',
            height: '60px',
            backgroundColor: 'var(--color-semantic-error)',
            borderRadius: '8px',
            border: '2px solid var(--color-border-main)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            Error
          </div>
        </div>
        
        <p style={{ marginTop: '20px' }}>
          <a href="/colors" style={{ color: '#007bff', textDecoration: 'underline' }}>
            Explore the complete Van Gogh color palette →
          </a>
        </p>
        <p style={{ marginTop: '12px' }}>
          <a href="/buttons" style={{ color: '#007bff', textDecoration: 'underline' }}>
            See Button components with Van Gogh colors →
          </a>
        </p>
      </div>
      
      <div style={{ margin: '40px 0' }}>
        <h2>📊 Timeline 时间线组件</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>✨ 支持多种数据源的时间线展示，包括静态数据和 Jira API 集成！</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0', flexWrap: 'wrap' }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '2px solid #e9ecef',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '200px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>📊 静态数据</h4>
            <p style={{ fontSize: '14px', color: '#6c757d', margin: '0 0 15px 0' }}>使用示例数据的时间线演示</p>
            <a href="/timeline" style={{ 
              color: '#007bff', 
              textDecoration: 'underline',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              查看演示 →
            </a>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: '#e8f5e8',
            borderRadius: '8px',
            border: '2px solid #28a745',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '200px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>🔌 Jira API</h4>
            <p style={{ fontSize: '14px', color: '#155724', margin: '0 0 15px 0' }}>连接到公开 Jira 测试实例</p>
            <a href="/timeline-jira" style={{ 
              color: '#155724', 
              textDecoration: 'underline',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              查看演示 →
            </a>
          </div>
        </div>
      </div>

      <div style={{ margin: '40px 0' }}>
        <h2>圆形进度条组件示例</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>✨ 支持加载动画效果和延迟控制！刷新页面查看瀑布流动画</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
          <div>
            <CircularProgress 
              progress={25} 
              animationDelay={0}
            />
            <p>25% (立即)</p>
          </div>
          <div>
            <CircularProgress 
              progress={50} 
              size={32} 
              progressColor="#10b981" 
              animationDelay={300}
            />
            <p>50% (+300ms)</p>
          </div>
          <div>
            <CircularProgress 
              progress={75} 
              size={40} 
              strokeWidth={4} 
              progressColor="#f59e0b" 
              animationDelay={600}
            />
            <p>75% (+600ms)</p>
          </div>
          <div>
            <CircularProgress 
              progress={100} 
              size={48} 
              strokeWidth={5} 
              progressColor="#ef4444" 
              animationDelay={900}
            />
            <p>100% (+900ms)</p>
          </div>
        </div>
        
        <p style={{ marginTop: '20px' }}>
          <a href="/circular-progress" style={{ color: '#007bff', textDecoration: 'underline' }}>
            查看完整的交互式演示 →
          </a>
        </p>
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <h3>使用方法</h3>
        <div style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto' }}>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '16px', 
            borderRadius: '4px', 
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`import CircularProgress from './components/CircularProgress';

// 基本用法 (默认带动画)
<CircularProgress progress={50} />

// 自定义尺寸和颜色
<CircularProgress 
  progress={75} 
  size={48} 
  strokeWidth={4}
  progressColor="#10b981"
  backgroundColor="#f3f4f6"
/>

// 控制动画时长和延迟
<CircularProgress 
  progress={60} 
  enableAnimation={true}       // 启用/禁用动画
  animationDuration={1500}     // 动画时长(毫秒)
  animationDelay={500}         // 动画延迟(毫秒)
/>

// 创建瀑布流效果
<CircularProgress progress={25} animationDelay={0} />
<CircularProgress progress={50} animationDelay={300} />
<CircularProgress progress={75} animationDelay={600} />

// 禁用动画（立即显示）
<CircularProgress 
  progress={80} 
  enableAnimation={false}
/>`}
          </pre>
        </div>
        
        <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '700px', margin: '20px auto 0' }}>
          <h4>新功能特性：</h4>
          <ul style={{ textAlign: 'left', color: '#555' }}>
            <li>🎬 <strong>加载动画</strong>：页面加载时自动播放从0到目标进度的动画</li>
            <li>⏰ <strong>动画延迟</strong>：支持设置动画开始延迟时间，创建瀑布流效果</li>
            <li>⚡ <strong>性能优化</strong>：使用 requestAnimationFrame 实现流畅动画</li>
            <li>🎨 <strong>缓动效果</strong>：内置 ease-out 缓动函数，动画更自然</li>
            <li>🎛️ <strong>完全可控</strong>：可自定义动画时长、延迟、启用/禁用动画</li>
            <li>🔄 <strong>响应式</strong>：进度值变化时自动重新播放动画</li>
            <li>🌊 <strong>瀑布流</strong>：多个进度条可设置不同延迟，形成优美的连锁动画</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export default Page_Home;