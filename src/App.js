import React from 'react';
import styled from 'styled-components';
import './App.css';

// import FileUpload from './components/FileUpload';
import GridOne from './components/GridOne';
// import GridTwo from './components/GridTwo';
// import GridThree from './components/GridThree';
// import GridFour from './components/GridFour';
// import GridFive from './components/GridFive';
// import { IntrinsicSize } from './components/IntrinsicSize';

const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
`;

function App() {
    return (
        <Container className="App">
            {/* <header>
                <h1>A simple file upload</h1>
            </header> */}
            <GridOne />
            {/* <div style={{ maxWidth: 900, margin: '0 auto', marginTop: '2rem' }}>
                <FileUpload server="http://localhost:4000/api" />
            </div>
            <GridFive /> */}
        </Container>
    );
}

export default App;
