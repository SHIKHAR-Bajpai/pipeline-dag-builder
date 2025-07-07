import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterCondition, setFilterCondition] = useState(data?.filterCondition || 'contains');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const [caseSensitive, setCaseSensitive] = useState(data?.caseSensitive || false);

  const handleConditionChange = (e) => {
    setFilterCondition(e.target.value);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleCaseSensitiveChange = (e) => {
    setCaseSensitive(e.target.checked);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputHandles={[{ id: `${id}-input` }]}
      outputHandles={[
        { id: `${id}-matched` },
        { id: `${id}-unmatched` }
      ]}
      className="filter-node"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Condition:</span>
          <select 
            value={filterCondition} 
            onChange={handleConditionChange}
            style={{
              padding: '8px 10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              backgroundColor: '#f9fafb'
            }}
          >
            <option value="contains">Contains</option>
            <option value="starts_with">Starts with</option>
            <option value="ends_with">Ends with</option>
            <option value="equals">Equals</option>
            <option value="regex">Regex</option>
          </select>
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Value:</span>
          <input 
            type="text" 
            value={filterValue} 
            onChange={handleValueChange}
            style={{
              padding: '8px 10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              backgroundColor: '#f9fafb'
            }}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input 
            type="checkbox" 
            checked={caseSensitive} 
            onChange={handleCaseSensitiveChange}
            style={{ margin: 0, transform: 'scale(1.2)' }}
          />
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Case sensitive</span>
        </label>
      </div>
    </BaseNode>
  );
} 