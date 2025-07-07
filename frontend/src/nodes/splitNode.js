import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const SplitNode = ({ id, data }) => {
  const [splitType, setSplitType] = useState(data?.splitType || 'by_delimiter');
  const [delimiter, setDelimiter] = useState(data?.delimiter || ',');
  const [maxSplits, setMaxSplits] = useState(data?.maxSplits || 3);

  const handleTypeChange = (e) => {
    setSplitType(e.target.value);
  };

  const handleDelimiterChange = (e) => {
    setDelimiter(e.target.value);
  };

  const handleMaxSplitsChange = (e) => {
    setMaxSplits(parseInt(e.target.value) || 1);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Split"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[
        { id: `${id}-part1` },
        { id: `${id}-part2` },
        { id: `${id}-part3` },
        { id: `${id}-remainder` }
      ]}
      className="split-node"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Type:</span>
          <select 
            value={splitType} 
            onChange={handleTypeChange}
            style={{
              padding: '8px 10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              backgroundColor: '#f9fafb'
            }}
          >
            <option value="by_delimiter">By Delimiter</option>
            <option value="by_length">By Length</option>
            <option value="by_words">By Words</option>
            <option value="by_lines">By Lines</option>
          </select>
        </label>
        {splitType === 'by_delimiter' && (
          <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Delimiter:</span>
            <input 
              type="text" 
              value={delimiter} 
              onChange={handleDelimiterChange}
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
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Max Splits:</span>
          <input 
            type="number" 
            value={maxSplits} 
            onChange={handleMaxSplitsChange}
            min="1"
            max="10"
            style={{
              padding: '8px 10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              backgroundColor: '#f9fafb'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
} 