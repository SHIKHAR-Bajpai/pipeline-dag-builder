import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [conditionType, setConditionType] = useState(data?.conditionType || 'if_else');
  const [condition, setCondition] = useState(data?.condition || 'x > 0');
  const [threshold, setThreshold] = useState(data?.threshold || '0');

  const handleTypeChange = (e) => {
    setConditionType(e.target.value);
  };

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const handleThresholdChange = (e) => {
    setThreshold(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[
        { id: `${id}-true` },
        { id: `${id}-false` }
      ]}
      className="condition-node"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Type:</span>
          <select 
            value={conditionType} 
            onChange={handleTypeChange}
            style={{
              padding: '8px 10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              backgroundColor: '#f9fafb'
            }}
          >
            <option value="if_else">If/Else</option>
            <option value="switch">Switch</option>
            <option value="threshold">Threshold</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        {conditionType === 'custom' && (
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Condition:</span>
            <input 
              type="text" 
              value={condition} 
              onChange={handleConditionChange}
              placeholder="x > 0"
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
        {conditionType === 'threshold' && (
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Threshold:</span>
            <input 
              type="number" 
              value={threshold} 
              onChange={handleThresholdChange}
              style={{
                padding: '8px 10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '12px',
                backgroundColor: '#f9fafb'
              }}
            />
          </label>
        )}
        <div style={{ 
          fontSize: '11px', 
          color: '#6b7280',
          fontStyle: 'italic',
          textAlign: 'center',
          padding: '6px 8px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          border: '1px solid #e5e7eb'
        }}>
          Routes based on condition
        </div>
      </div>
    </BaseNode>
  );
} 