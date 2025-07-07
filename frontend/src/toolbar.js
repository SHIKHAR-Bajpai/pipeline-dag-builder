// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar-container">
            <div style={{ marginBottom: '10px', fontSize: '14px', color: '#6b7280' }}>
                💡 <strong>Tip:</strong> Click on nodes to select them, then press Delete or Backspace to remove
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='split' label='Split' />
                <DraggableNode type='condition' label='Condition' />
            </div>
        </div>
    );
};
