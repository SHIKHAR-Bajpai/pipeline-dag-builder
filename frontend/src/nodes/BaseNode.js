import React from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  children, 
  inputHandles = [], 
  outputHandles = [],
  width = 200,
  height = 80,
  className = ''
}) => {
  const { removeNode } = useStore();

  const handleDelete = () => {
    removeNode(id);
  };

  return (
    <div 
      className={`base-node ${className} ${data?.selected ? 'selected' : ''}`}
      style={{
        width,
        height,
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        padding: '16px',
        position: 'relative',
        margin: '8px'
      }}
    >
      <button
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: data?.selected ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = data?.selected ? '1' : '0'}
        title="Delete node (or press Delete/Backspace)"
      >
        ×
      </button>

      {inputHandles.map((handle, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{
            top: handle.top || `${((index + 1) * 100) / (inputHandles.length + 1)}%`,
            background: '#3b82f6',
            border: '2px solid #ffffff'
          }}
        />
      ))}

      <div style={{
        fontSize: '16px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '12px',
        textAlign: 'center',
        padding: '4px 0'
      }}>
        {title}
      </div>

      <div style={{ 
        fontSize: '13px',
        lineHeight: '1.4'
      }}>
        {children}
      </div>

      {outputHandles.map((handle, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={{
            top: handle.top || `${((index + 1) * 100) / (outputHandles.length + 1)}%`,
            background: '#10b981',
            border: '2px solid #ffffff'
          }}
        />
      ))}
    </div>
  );
}; 