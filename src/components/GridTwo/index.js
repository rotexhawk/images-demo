import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ImageContainer } from '../Containers'


const GridTwo = () => {
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
                    <picture>
                        <source
                            srcSet={image.optimized_webp.url}
                            type="image/webp"
                        />
                        <source
                            srcSet={image.optimized_jpg.url}
                            type="image/jpeg"
                        />
                        <img src={image.optimized_jpg.url} alt="Alt Text!" />
                    </picture>
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

export default GridTwo;
