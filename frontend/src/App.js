import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <PipelineToolbar />
      <div style={{ flex: 1, padding: '0 20px' }}>
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
