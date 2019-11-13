import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressiveImage from 'react-progressive-image';
import { Container, ImageContainer } from '../Containers'


const GridFour = () => {
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
                    <ProgressiveImage
                        src={image.optimized_jpg.url}
                        srcSetData={{
                            srcSet:
                                getSrcSet([
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
                                ])
                            ,
                            sizes: "400px"
                        }}
                        placeholder={image.thumb_jpg.url}
                    >
                        {(src, loading, srcSetData) => {
                            console.log('srcset here is ', srcSetData)
                            return <img
                                style={{ opacity: loading ? 0.5 : 1 }}
                                src={src}
                                srcSet={srcSetData.srcSet}
                                sizes={srcSetData.sizes}
                                alt=""
                            />
                        }}
                    </ProgressiveImage>
                    <FileName src={image.src} />
                </ImageContainer>
            ))
            }
        </Container >
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


export default GridFour;
