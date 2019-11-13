import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ImageContainer } from '../Containers';
import IdealImage from 'react-ideal-image';

import lqip from 'lqip.macro';

const placeholder = lqip('./image.jpg');

const GridFive = () => {
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
                    <IdealImage
                        placeholder={{ lqip: placeholder }}
                        srcSet={getSrcSet([
                            image.optimized_webp,
                            image.desktop_webp,
                            image.ipad_landscape_webp,
                            image.ipad_portrait_webp,
                            image.large_webp,
                            image.phone_landscape_webp,
                            image.phone_portrait_webp,
                            image.optimized_jpg,
                            image.desktop_jpg,
                            image.ipad_landscape_jpg,
                            image.ipad_portrait_jpg,
                            image.large_jpg,
                            image.phone_landscape_jpg,
                            image.phone_portrait_jpg,
                        ])}
                        alt="Testing images"
                        width={image.width}
                        height={image.height}
                    />
                    <FileName src={image.src} />
                </ImageContainer>
            ))}
        </Container>
    );
};

const getSrcSet = images => {
    return images.map(image => ({
        width: image.width,
        src: image.url,
        format: image.type.replace('jpg', 'jpeg'),
    }));
};

const FileName = ({ src }) => {
    const name = src.substring(src.lastIndexOf('/') + 1, src.indexOf('.'));
    return <h3>{name}</h3>;
};

export default GridFive;
