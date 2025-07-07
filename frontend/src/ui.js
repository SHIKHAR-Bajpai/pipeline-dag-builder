import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TransformNode } from './nodes/transformNode';
import { FilterNode } from './nodes/filterNode';
import { MergeNode } from './nodes/mergeNode';
import { SplitNode } from './nodes/splitNode';
import { ConditionNode } from './nodes/conditionNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  transform: TransformNode,
  filter: FilterNode,
  merge: MergeNode,
  split: SplitNode,
  condition: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  removeNode: state.removeNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const getNodesWithSelection = (nodes, selectedNodeId) => {
  return nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      selected: node.id === selectedNodeId
    }
  }));
};

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      removeNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete' || event.key === 'Backspace') {
                if (selectedNodeId) {
                    removeNode(selectedNodeId);
                    setSelectedNodeId(null);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedNodeId, removeNode]);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNodeId(node.id);
    }, []);

    const onPaneClick = useCallback(() => {
        setSelectedNodeId(null);
    }, []);

    const handleLockToggle = useCallback(() => {
        setIsLocked(!isLocked);
    }, [isLocked]);

    return (
        <div 
            ref={reactFlowWrapper} 
            style={{
                width: '100%', 
                height: '70vh',
                background: '#ffffff',
                borderRadius: '12px',
                margin: '10px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                position: 'relative'
            }}
        >
            {nodes.length === 0 && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: '#6b7280',
                    zIndex: 1
                }}>
                    <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                        Drag nodes from the toolbar to get started
                    </div>
                    <div style={{ fontSize: '14px' }}>
                        Click on nodes to select them, then press Delete or Backspace to remove
                    </div>
                </div>
            )}
            <ReactFlow
                nodes={getNodesWithSelection(nodes, selectedNodeId)}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
                nodesDraggable={!isLocked}
                nodesConnectable={!isLocked}
                elementsSelectable={!isLocked}
            >
                <Background 
                    color="#f1f5f9" 
                    gap={gridSize}
                    size={1}
                />
                <Controls 
                    style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        padding: '8px',
                        border: '1px solid #e2e8f0'
                    }}
                    onLockClick={handleLockToggle}
                />
                <MiniMap 
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '8px',
                        border: '2px solid #e2e8f0'
                    }}
                    nodeColor={(node) => {
                        switch (node.type) {
                            case 'customInput':
                                return '#3b82f6';
                            case 'customOutput':
                                return '#10b981';
                            case 'llm':
                                return '#f59e0b';
                            case 'text':
                                return '#8b5cf6';
                            case 'transform':
                                return '#06b6d4';
                            case 'filter':
                                return '#ef4444';
                            case 'merge':
                                return '#84cc16';
                            case 'split':
                                return '#f97316';
                            case 'condition':
                                return '#ec4899';
                            default:
                                return '#6b7280';
                        }
                    }}
                    nodeStrokeColor="#ffffff"
                    nodeStrokeWidth={1}
                    maskColor="rgba(0, 0, 0, 0.1)"
                    zoomable
                    pannable
                />
            </ReactFlow>
        </div>
    )
}
