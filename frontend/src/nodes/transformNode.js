import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customFunction, setCustomFunction] = useState(data?.customFunction || '');

  const handleTypeChange = (e) => {
    setTransformType(e.target.value);
  };

  const handleFunctionChange = (e) => {
    setCustomFunction(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[{ id: `${id}-output` }]}
      className="transform-node"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Type:</span>
          <select 
            value={transformType} 
            onChange={handleTypeChange}
            style={{
              padding: '8px 10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              backgroundColor: '#f9fafb'
            }}
          >
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
            <option value="reverse">Reverse</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        {transformType === 'custom' && (
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Function:</span>
            <input 
              type="text" 
              value={customFunction} 
              onChange={handleFunctionChange}
              placeholder="x => x.toUpperCase()"
              style={{
                padding: '8px 10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'monospace',
                backgroundColor: '#f9fafb'
              }}
            />
          </label>
        )}
      </div>
    </BaseNode>
  );
} 