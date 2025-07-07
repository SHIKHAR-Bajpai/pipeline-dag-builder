// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputHandles={[
        { id: `${id}-system`, top: '33%' },
        { id: `${id}-prompt`, top: '66%' }
      ]}
      outputHandles={[{ id: `${id}-response` }]}
      className="llm-node"
    >
      <div style={{ 
        textAlign: 'center', 
        color: '#6b7280',
        fontSize: '13px',
        padding: '8px',
        backgroundColor: '#f9fafb',
        borderRadius: '6px',
        border: '1px solid #e5e7eb'
      }}>
        This is a LLM.
      </div>
    </BaseNode>
  );
}
