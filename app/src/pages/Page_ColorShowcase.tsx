import type { PageShape } from "../object-shapes/Page";
import { useState, useEffect } from 'react';

// Color card component for better organization
const ColorCard = ({ 
  title, 
  description, 
  artwork, 
  primaryVar, 
  lightVar, 
  bgVar,
  className = "" 
}: {
  title: string;
  description: string;
  artwork: string;
  primaryVar: string;
  lightVar: string;
  bgVar: string;
  className?: string;
}) => {
  return (
    <div className={`color-card ${className}`} style={{
      border: '1px solid var(--color-border-main)',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
      backgroundColor: 'var(--color-bg-sec)',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
    }}>
      <div style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3 style={{
            margin: '0 0 8px 0',
            color: 'var(--color-text-main)',
            fontSize: '1.5em',
            fontWeight: '600'
          }}>
            {title}
          </h3>
          <p style={{
            margin: '0 0 16px 0',
            color: 'var(--color-text-sec)',
            lineHeight: '1.6',
            fontStyle: 'italic'
          }}>
            Inspired by Van Gogh's "{artwork}"
          </p>
          <p style={{
            margin: '0',
            color: 'var(--color-text-sec)',
            lineHeight: '1.6'
          }}>
            {description}
          </p>
          
          {/* CSS Variables Display */}
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: 'var(--color-bg-main)',
            borderRadius: '6px',
            fontSize: '13px',
            fontFamily: 'monospace'
          }}>
            <div>--color-semantic-{primaryVar}: <span style={{ color: `var(--color-semantic-${primaryVar})` }}>Primary</span></div>
            <div>--color-semantic-{lightVar}: <span style={{ color: `var(--color-semantic-${lightVar})` }}>Light</span></div>
            <div>--color-semantic-{bgVar}: Background variant</div>
          </div>
        </div>
        
        {/* Color Swatches */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minWidth: '200px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: `var(--color-semantic-${primaryVar})`,
              borderRadius: '8px',
              border: '2px solid var(--color-border-main)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}></div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>Primary</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-sec)' }}>Main semantic color</div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: `var(--color-semantic-${lightVar})`,
              borderRadius: '8px',
              border: '2px solid var(--color-border-main)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}></div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>Light Variant</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-sec)' }}>Softer tone</div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: `var(--color-semantic-${bgVar})`,
              borderRadius: '8px',
              border: '2px solid var(--color-border-main)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                inset: '4px',
                backgroundColor: `var(--color-semantic-${primaryVar})`,
                borderRadius: '4px',
                opacity: '0.15'
              }}></div>
            </div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>Background</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-sec)' }}>Subtle tint</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive demo component
const InteractiveDemo = () => {
  const [demoType, setDemoType] = useState<'active' | 'success' | 'warning' | 'error'>('active');
  
  const demos = {
    active: {
      title: 'Active State Demo',
      content: 'This represents an active or selected state, like a focused button or active navigation item.'
    },
    success: {
      title: 'Success State Demo', 
      content: 'This represents successful operations, confirmations, or positive feedback.'
    },
    warning: {
      title: 'Warning State Demo',
      content: 'This represents caution, important notices, or operations that need attention.'
    },
    error: {
      title: 'Error State Demo',
      content: 'This represents errors, failures, or critical issues that need immediate attention.'
    }
  };

  return (
    <div style={{
      border: '1px solid var(--color-border-main)',
      borderRadius: '12px',
      padding: '24px',
      backgroundColor: 'var(--color-bg-sec)',
      marginTop: '32px'
    }}>
      <h3 style={{
        margin: '0 0 16px 0',
        color: 'var(--color-text-main)',
        fontSize: '1.5em',
        fontWeight: '600'
      }}>
        Interactive Color Demo
      </h3>
      
      {/* Color Type Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        {Object.keys(demos).map((type) => (
          <button
            key={type}
            onClick={() => setDemoType(type as 'active' | 'success' | 'warning' | 'error')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: demoType === type 
                ? `var(--color-semantic-${type})` 
                : 'var(--color-bg-main)',
              color: demoType === type 
                ? 'white' 
                : 'var(--color-text-main)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'capitalize',
              fontWeight: '500'
            }}
          >
            {type}
          </button>
        ))}
      </div>
      
      {/* Demo Content */}
      <div style={{
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: `var(--color-semantic-${demoType}-bg)`,
        border: `2px solid var(--color-semantic-${demoType})`,
        color: 'var(--color-text-main)'
      }}>
        <h4 style={{
          margin: '0 0 8px 0',
          color: `var(--color-semantic-${demoType})`,
          fontSize: '1.2em'
        }}>
          {demos[demoType].title}
        </h4>
        <p style={{
          margin: '0',
          lineHeight: '1.6'
        }}>
          {demos[demoType].content}
        </p>
      </div>
    </div>
  );
};

// Theme toggle component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDark(currentTheme === 'dark');
  }, []);
  
  const toggleTheme = () => {
    const newTheme = isDark ? null : 'dark';
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', newTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    setIsDark(!isDark);
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <button
        onClick={toggleTheme}
        style={{
          padding: '12px 20px',
          borderRadius: '25px',
          border: '2px solid var(--color-border-main)',
          backgroundColor: 'var(--color-bg-main)',
          color: 'var(--color-text-main)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontWeight: '500',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
};

const Page_ColorShowcase: PageShape = {
  info: {
    title: "Van Gogh Color Palette",
    slug: "colors",
  },
  content: (
    <div style={{ 
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative'
    }}>
      <ThemeToggle />
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          margin: '0 0 16px 0',
          color: 'var(--color-text-main)',
          fontSize: '2.5em',
          fontWeight: '700'
        }}>
          Van Gogh-Inspired Color Palette
        </h1>
        <p style={{
          color: 'var(--color-text-sec)',
          fontSize: '1.2em',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 24px'
        }}>
          A carefully curated semantic color system inspired by the vibrant and expressive colors 
          from Vincent van Gogh's masterpieces, designed for modern light and dark interfaces.
        </p>
        <div style={{
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: 'var(--color-semantic-active-bg)',
          border: `1px solid var(--color-semantic-active)`,
          borderRadius: '20px',
          color: 'var(--color-semantic-active)',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          🎨 Semantic Colors: Active • Success • Warning • Error
        </div>
      </div>

      {/* Color Cards */}
      <div style={{ marginBottom: '48px' }}>
        <ColorCard
          title="Active"
          description="Deep, contemplative blues that capture the swirling energy and movement of a starlit sky. Perfect for indicating active states, selected items, and interactive elements that draw the user's attention."
          artwork="The Starry Night"
          primaryVar="active"
          lightVar="active-light" 
          bgVar="active-bg"
        />
        
        <ColorCard
          title="Success"
          description="Rich, natural greens reminiscent of Mediterranean cypresses and olive groves. These colors convey growth, harmony, and positive outcomes with an organic, timeless quality."
          artwork="The Cypresses & Wheatfield with Cypresses"
          primaryVar="success"
          lightVar="success-light"
          bgVar="success-bg"
        />
        
        <ColorCard
          title="Warning"
          description="Warm, luminous yellows and golds that capture the radiant energy of sunflowers in full bloom. These colors command attention while maintaining a sense of warmth and optimism."
          artwork="Sunflowers Series"
          primaryVar="warning"
          lightVar="warning-light"
          bgVar="warning-bg"
        />
        
        <ColorCard
          title="Error"
          description="Passionate, expressive reds that reflect the artist's emotional intensity and the dramatic beauty of autumn vineyards. These colors convey urgency and importance without being harsh."
          artwork="The Red Vineyard & Self-Portrait with Bandaged Ear"
          primaryVar="error"
          lightVar="error-light"
          bgVar="error-bg"
        />
      </div>

      {/* Interactive Demo */}
      <InteractiveDemo />

      {/* Usage Guidelines */}
      <div style={{
        marginTop: '48px',
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
          Usage Guidelines
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div>
            <h4 style={{
              margin: '0 0 12px 0',
              color: 'var(--color-semantic-active)',
              fontSize: '1.1em'
            }}>
              Semantic Meaning
            </h4>
            <ul style={{
              margin: '0',
              paddingLeft: '20px',
              color: 'var(--color-text-sec)',
              lineHeight: '1.6'
            }}>
              <li><strong>Active:</strong> Selected states, focused elements, primary actions</li>
              <li><strong>Success:</strong> Completed actions, confirmations, positive feedback</li>
              <li><strong>Warning:</strong> Cautions, important notices, pending actions</li>
              <li><strong>Error:</strong> Failures, validation errors, critical alerts</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{
              margin: '0 0 12px 0',
              color: 'var(--color-semantic-success)',
              fontSize: '1.1em'
            }}>
              Accessibility
            </h4>
            <ul style={{
              margin: '0',
              paddingLeft: '20px',
              color: 'var(--color-text-sec)',
              lineHeight: '1.6'
            }}>
              <li>All colors meet WCAG AA contrast requirements</li>
              <li>Different variants provide flexibility for various uses</li>
              <li>Background variants offer subtle tinting options</li>
              <li>Colors adapt automatically between light and dark modes</li>
            </ul>
          </div>
        </div>
        
        <div style={{
          marginTop: '24px',
          padding: '20px',
          backgroundColor: 'var(--color-bg-main)',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontFamily: 'inherit' }}>CSS Usage Examples:</h4>
          <div style={{ color: 'var(--color-text-sec)' }}>
            <div>background-color: var(--color-semantic-active);</div>
            <div>color: var(--color-semantic-success-light);</div>
            <div>border: 1px solid var(--color-semantic-warning);</div>
            <div>background-color: var(--color-semantic-error-bg);</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '48px',
        textAlign: 'center',
        padding: '24px',
        borderTop: '1px solid var(--color-border-main)',
        color: 'var(--color-text-sec)'
      }}>
        <p style={{ margin: '0', fontSize: '14px' }}>
          "I dream of painting and then I paint my dream." - Vincent van Gogh
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
          Color palette inspired by the Post-Impressionist master's vibrant and emotional use of color.
        </p>
      </div>
    </div>
  ),
};

export default Page_ColorShowcase; 