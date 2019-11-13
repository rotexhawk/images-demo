import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ImageContainer } from '../Containers'



const GridOne = () => {
    const [images, setImage] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/images').then(result => {
            console.log('res', result);
            setImage(result.data);
        });
    }, []);

    return (
        <Container>
            {images.map(image => (
                <ImageContainer key={image.src}>
                    <img src={image.src} alt="" />
                    <FileName src={image.src} />
                </ImageContainer>
            ))}
        </Container>
    );
};

const FileName = ({ src }) => {
    const name = src.substring(src.lastIndexOf('/') + 1, src.indexOf('.'));
    return <h3>{name}</h3>;
};

export default GridOne;
