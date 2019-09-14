import React from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import GridOne from './components/GridOne';
import GridTwo from './components/GridTwo';
import GridThree from './components/GridThree';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
`;

function App() {
    return (
        <Container className="App">
            <header>
                <h1>A simple file upload</h1>
            </header>
            <div style={{ maxWidth: 900, margin: '0 auto', marginTop: '2rem' }}>
                <FileUpload server="http://localhost:4000/api" />
            </div>
            <GridThree />
        </Container>
    );
}

export default App;
