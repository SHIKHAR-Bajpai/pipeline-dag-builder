from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes, edges):
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG)
    using topological sorting with Kahn's algorithm
    """
    if not nodes:
        return True
    
    # Create adjacency list and in-degree count
    graph = {}
    in_degree = {}
    
    # Initialize
    for node in nodes:
        node_id = node['id']
        graph[node_id] = []
        in_degree[node_id] = 0
    
    # Build graph from edges
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in graph and target in graph:
            graph[source].append(target)
            in_degree[target] += 1
    
    # Kahn's algorithm for topological sorting
    queue = []
    visited = 0
    
    # Add nodes with no incoming edges
    for node_id, degree in in_degree.items():
        if degree == 0:
            queue.append(node_id)
    
    while queue:
        current = queue.pop(0)
        visited += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG
    return visited == len(nodes)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    try:
        nodes = pipeline.nodes
        edges = pipeline.edges
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        is_dag_result = is_dag(nodes, edges)
        
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag_result
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing pipeline: {str(e)}")
