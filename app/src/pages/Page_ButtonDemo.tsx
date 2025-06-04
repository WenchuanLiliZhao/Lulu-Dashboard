import type { PageShape } from "../object-shapes/Page";
import Button from "../Components/Button/Button";
import { useState } from 'react';

// Interactive demo component
const InteractiveButtonDemo = () => {
  const [currentStatus, setCurrentStatus] = useState<"normal" | "active" | "success" | "warning" | "error">('normal');
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    // Cycle through statuses
    const statuses: Array<"normal" | "active" | "success" | "warning" | "error"> = 
      ['normal', 'active', 'success', 'warning', 'error'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    setCurrentStatus(statuses[nextIndex]);
  };

  return (
    <div style={{
      padding: '24px',
      border: '1px solid var(--color-border-main)',
      borderRadius: '12px',
      backgroundColor: 'var(--color-bg-sec)',
      textAlign: 'center'
    }}>
      <h4 style={{
        margin: '0 0 16px 0',
        color: 'var(--color-text-main)',
        fontSize: '1.2em'
      }}>
        Click to Cycle Through Status Types
      </h4>
      
      <div style={{ marginBottom: '20px' }}>
        <Button 
          status={currentStatus}
          size="large"
          onClick={handleClick}
        >
          {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)} Button
        </Button>
      </div>
      
      <p style={{
        margin: '0',
        color: 'var(--color-text-sec)',
        fontSize: '14px'
      }}>
        Clicked {clickCount} times • Current status: <strong>{currentStatus}</strong>
      </p>
    </div>
  );
};

const Page_ButtonDemo: PageShape = {
  info: {
    title: "Button Demo",
    slug: "buttons",
  },
  content: (
    <div style={{ 
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          margin: '0 0 16px 0',
          color: 'var(--color-text-main)',
          fontSize: '2.5em',
          fontWeight: '700'
        }}>
          Button Component with Van Gogh Colors
        </h1>
        <p style={{
          color: 'var(--color-text-sec)',
          fontSize: '1.2em',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 24px'
        }}>
          Interactive buttons featuring our Van Gogh-inspired semantic color system with multiple variants and states.
        </p>
      </div>

      {/* Status Demo */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          color: 'var(--color-text-main)',
          fontSize: '1.8em',
          marginBottom: '24px'
        }}>
          Status Types (Primary Variant)
        </h2>
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '32px'
        }}>
          <Button status="normal">Normal Button</Button>
          <Button status="active">Active Button</Button>
          <Button status="success">Success Button</Button>
          <Button status="warning">Warning Button</Button>
          <Button status="error">Error Button</Button>
        </div>
      </div>

      {/* Variant Demo */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          color: 'var(--color-text-main)',
          fontSize: '1.8em',
          marginBottom: '24px'
        }}>
          Variants
        </h2>
        
        {(['normal', 'active', 'success', 'warning', 'error'] as const).map((status) => (
          <div key={status} style={{ marginBottom: '24px' }}>
            <h3 style={{
              color: 'var(--color-text-main)',
              fontSize: '1.2em',
              marginBottom: '12px',
              textTransform: 'capitalize'
            }}>
              {status} Status
            </h3>
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <Button variant="primary" status={status}>Primary</Button>
              <Button variant="secondary" status={status}>Secondary</Button>
              <Button variant="outline" status={status}>Outline</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Size Demo */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          color: 'var(--color-text-main)',
          fontSize: '1.8em',
          marginBottom: '24px'
        }}>
          Sizes
        </h2>
        
        {(['success', 'warning', 'error'] as const).map((status) => (
          <div key={status} style={{ marginBottom: '24px' }}>
            <h3 style={{
              color: 'var(--color-text-main)',
              fontSize: '1.2em',
              marginBottom: '12px',
              textTransform: 'capitalize'
            }}>
              {status} Status
            </h3>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <Button size="small" status={status}>Small</Button>
              <Button size="medium" status={status}>Medium</Button>
              <Button size="large" status={status}>Large</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Demo */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{
          color: 'var(--color-text-main)',
          fontSize: '1.8em',
          marginBottom: '24px'
        }}>
          Interactive Demo
        </h2>
        <InteractiveButtonDemo />
      </div>

      {/* Usage Examples */}
      <div style={{
        padding: '32px',
        backgroundColor: 'var(--color-bg-sec)',
        borderRadius: '12px',
        border: '1px solid var(--color-border-main)'
      }}>
        <h3 style={{
          margin: '0 0 24px 0',
          color: 'var(--color-text-main)',
          fontSize: '1.5em',
          fontWeight: '600'
        }}>
          Usage Examples
        </h3>
        
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--color-bg-main)',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <div style={{ color: 'var(--color-text-sec)', lineHeight: '1.8' }}>
            <div>{'<Button status="normal">Default Button</Button>'}</div>
            <div>{'<Button status="active" variant="primary">Active Primary</Button>'}</div>
            <div>{'<Button status="success" variant="secondary">Success Secondary</Button>'}</div>
            <div>{'<Button status="warning" variant="outline" size="large">Warning Outline</Button>'}</div>
            <div>{'<Button status="error" disabled>Error Disabled</Button>'}</div>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h4 style={{
            margin: '0 0 12px 0',
            color: 'var(--color-semantic-active)',
            fontSize: '1.1em'
          }}>
            Available Status Types
          </h4>
          <ul style={{
            margin: '0',
            paddingLeft: '20px',
            color: 'var(--color-text-sec)',
            lineHeight: '1.6'
          }}>
            <li><strong>normal:</strong> Default button appearance</li>
            <li><strong>active:</strong> Indicates active/selected state</li>
            <li><strong>success:</strong> Positive actions and confirmations</li>
            <li><strong>warning:</strong> Caution and important notices</li>
            <li><strong>error:</strong> Destructive actions and errors</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export default Page_ButtonDemo; 