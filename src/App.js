import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <header>
        <h1>A simple file upload</h1>
      </header>
      <div style={{maxWidth: 900, margin: '0 auto', marginTop: '2rem'}}>
        <FileUpload server="http://localhost:4000/api"/>
      </div>
    </div>
  );
}

export default App;
