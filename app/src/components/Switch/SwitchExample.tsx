import React, { useState } from 'react';
import Switch, { type SwitchOption } from './Switch';

const SwitchExample: React.FC = () => {
  const [selectedView, setSelectedView] = useState('grid');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedSize, setSelectedSize] = useState('medium');

  // 视图选项
  const viewOptions: SwitchOption[] = [
    { value: 'list', label: '列表' },
    { value: 'grid', label: '网格' },
    { value: 'card', label: '卡片' }
  ];

  // 主题选项
  const themeOptions: SwitchOption[] = [
    { value: 'light', label: '亮色' },
    { value: 'dark', label: '暗色' }
  ];

  // 尺寸选项
  const sizeOptions: SwitchOption[] = [
    { value: 'small', label: 'S' },
    { value: 'medium', label: 'M' },
    { value: 'large', label: 'L' },
    { value: 'xlarge', label: 'XL' }
  ];

  // 语言选项
  const languageOptions: SwitchOption[] = [
    { value: 'zh', label: '中文' },
    { value: 'en', label: 'English' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'fr', label: 'Français' }
  ];

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Switch 组件示例</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h3>基础用法 - 视图切换</h3>
        <Switch
          options={viewOptions}
          defaultValue="grid"
          onChange={(value) => {
            setSelectedView(value);
            console.log('选择的视图:', value);
          }}
        />
        <p style={{ marginTop: '10px', color: '#666' }}>
          当前选择: {selectedView}
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>小尺寸 - 主题切换</h3>
        <Switch
          options={themeOptions}
          size="small"
          defaultValue="light"
          onChange={(value) => {
            setSelectedTheme(value);
            console.log('选择的主题:', value);
          }}
        />
        <p style={{ marginTop: '10px', color: '#666' }}>
          当前主题: {selectedTheme}
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>大尺寸 - 尺寸选择</h3>
        <Switch
          options={sizeOptions}
          size="large"
          defaultValue="medium"
          onChange={(value) => {
            setSelectedSize(value);
            console.log('选择的尺寸:', value);
          }}
        />
        <p style={{ marginTop: '10px', color: '#666' }}>
          当前尺寸: {selectedSize}
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>多选项 - 语言切换</h3>
        <Switch
          options={languageOptions}
          defaultValue="zh"
          onChange={(value) => console.log('选择的语言:', value)}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>禁用状态</h3>
        <Switch
          options={viewOptions}
          defaultValue="list"
          disabled={true}
          onChange={(value) => console.log('禁用状态不会触发:', value)}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>自定义样式</h3>
        <Switch
          options={themeOptions}
          defaultValue="dark"
          className="custom-switch"
          onChange={(value) => console.log('自定义样式切换:', value)}
        />
      </div>
    </div>
  );
};

export default SwitchExample; 