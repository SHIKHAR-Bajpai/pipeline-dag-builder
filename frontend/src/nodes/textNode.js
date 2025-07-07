// textNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [nodeHeight, setNodeHeight] = useState(80);

  const extractVariables = (text) => {
    const variableRegex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...text.matchAll(variableRegex)];
    return matches.map(match => match[1]);
  };

  const calculateHeight = (text) => {
    const baseHeight = 80;
    const lineHeight = 20;
    const lines = Math.max(1, Math.ceil(text.length / 30));
    return Math.max(baseHeight, 60 + (lines * lineHeight));
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    
    const newVariables = extractVariables(newText);
    setVariables(newVariables);
    setNodeHeight(calculateHeight(newText));
  };

  useEffect(() => {
    const newVariables = extractVariables(currText);
    setVariables(newVariables);
    setNodeHeight(calculateHeight(currText));
  }, [currText]);

  const inputHandles = variables.map((variable, index) => ({
    id: `${id}-${variable}`,
    top: `${((index + 1) * 100) / (variables.length + 1)}%`
  }));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputHandles={inputHandles}
      outputHandles={[{ id: `${id}-output` }]}
      height={nodeHeight}
      className="text-node"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Text:</span>
          <textarea 
            value={currText} 
            onChange={handleTextChange}
            style={{
              padding: '8px 10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              resize: 'vertical',
              minHeight: '50px',
              fontFamily: 'monospace',
              backgroundColor: '#f9fafb',
              lineHeight: '1.4'
            }}
            placeholder="Enter text with {{variables}}"
          />
        </label>
        {variables.length > 0 && (
          <div style={{ 
            fontSize: '11px', 
            color: '#6b7280',
            fontStyle: 'italic',
            padding: '6px 8px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            border: '1px solid #e5e7eb'
          }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
