// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        setIsLoading(true);
        
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            setAlert({
                title: 'Pipeline Analysis Complete',
                content: `Nodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nIs DAG: ${result.is_dag ? 'Yes' : 'No'}`,
                type: result.is_dag ? 'success' : 'warning'
            });

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setAlert({
                title: 'Error',
                content: `Failed to analyze pipeline: ${error.message}`,
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => {
        setAlert(null);
    };

    return (
        <>
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '20px',
                background: '#ffffff',
                borderTop: '1px solid #e2e8f0'
            }}>
                <button 
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Analyzing...' : 'Submit Pipeline'}
                </button>
            </div>

            {alert && (
                <div className="alert" style={{
                    borderLeftColor: alert.type === 'success' ? '#10b981' : 
                                   alert.type === 'warning' ? '#f59e0b' : '#ef4444'
                }}>
                    <button className="alert-close" onClick={closeAlert}>×</button>
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-content" style={{ whiteSpace: 'pre-line' }}>
                        {alert.content}
                    </div>
                </div>
            )}
        </>
    );
}
