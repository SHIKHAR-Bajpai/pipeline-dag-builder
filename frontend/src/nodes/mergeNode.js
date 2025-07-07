import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concatenate');
  const [separator, setSeparator] = useState(data?.separator || ' ');

  const handleTypeChange = (e) => {
    setMergeType(e.target.value);
  };

  const handleSeparatorChange = (e) => {
    setSeparator(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      inputHandles={[
        { id: `${id}-input1` },
        { id: `${id}-input2` },
        { id: `${id}-input3` }
      ]}
      outputHandles={[{ id: `${id}-output` }]}
      className="merge-node"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Type:</span>
          <select 
            value={mergeType} 
            onChange={handleTypeChange}
            style={{
              padding: '8px 10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              backgroundColor: '#f9fafb'
            }}
          >
            <option value="concatenate">Concatenate</option>
            <option value="join">Join</option>
            <option value="zip">Zip</option>
            <option value="union">Union</option>
          </select>
        </label>
        {mergeType === 'join' && (
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Separator:</span>
            <input 
              type="text" 
              value={separator} 
              onChange={handleSeparatorChange}
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
          Merges 3 inputs
        </div>
      </div>
    </BaseNode>
  );
} 