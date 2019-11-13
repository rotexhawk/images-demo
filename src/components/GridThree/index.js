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
                            srcSet={getSrcSet([
                                image.optimized_webp,
                                image.desktop_webp,
                                image.ipad_landscape_webp,
                                image.ipad_portrait_webp,
                                image.large_webp,
                                image.phone_landscape_webp,
                                image.phone_portrait_webp,
                            ])}
                            sizes={getSize([image.optimized_webp,
                            image.desktop_webp,
                            image.ipad_landscape_webp,
                            image.ipad_portrait_webp,
                            image.large_webp,
                            image.phone_landscape_webp,
                            image.phone_portrait_webp,])}
                            type="image/webp"
                        />
                        <source
                            srcSet={getSrcSet([
                                image.optimized_jpg,
                                image.desktop_jpg,
                                image.ipad_landscape_jpg,
                                image.ipad_portrait_jpg,
                                image.large_jpg,
                                image.phone_landscape_jpg,
                                image.phone_portrait_jpg,
                            ])}
                            sizes={getSize([
                                image.optimized_jpg,
                                image.desktop_jpg,
                                image.ipad_landscape_jpg,
                                image.ipad_portrait_jpg,
                                image.large_jpg,
                                image.phone_landscape_jpg,
                                image.phone_portrait_jpg,
                            ])}
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

const getSrcSet = images => {
    const srcset = images.reduce((acc, image) => {
        acc = image.url ? acc + `${image.url} ${image.width}w, ` : acc;
        return acc;
    }, '');
    let cleanSrcset = srcset.substring(0, srcset.length - 2);

    return cleanSrcset;
};

const FileName = ({ src }) => {
    const name = src.substring(src.lastIndexOf('/') + 1, src.indexOf('.'));
    return <h3>{name}</h3>;
};

const getSize = images => {
    const sizes = images.reduce((acc, image) => {
        acc = image.width ? acc + `${image.width}px, ` : acc;
        return acc;
    }, '');
    return sizes.substring(0, sizes.length - 2);
}

export default GridTwo;
