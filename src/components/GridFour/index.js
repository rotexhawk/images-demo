import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import IdealImage from 'react-ideal-image';

const Container = styled.div`
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    justify-content: center;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 24%;
    box-sizing: border-box;
    background-color: #fff;
    -webkit-border-radius: 2px;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    margin: 7px;
    overflow: hidden;
    position: relative;
    -webkit-transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
    transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
    img {
        width: 100%;
        flex: 1;
    }
`;

const GridFour = () => {
    const [images, setImage] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/images').then(result => {
            console.log('res', result);
            setImage(result.data);
        });
    }, []);

    if (!images.length) {
        return null;
    }

    return (
        <Container>
            {images.map(image => (
                <ImageContainer key={image.src}>
                    <IdealImage
                        placeholder={{
                            color: 'black',
                        }}
                        srcSet={getSrcTypes([
                            image.optimized_jpg,
                            image.desktop_jpg,
                            image.ipad_landscape_jpg,
                            image.ipad_portrait_jpg,
                            image.large_jpg,
                            image.phone_landscape_jpg,
                            image.phone_portrait_jpg,
                        ])}
                        alt="doggo"
                        width={image.width}
                        height={image.height}
                    />
                </ImageContainer>
            ))}
        </Container>
    );
};

const getSrcTypes = images => {
    let srcsets = images.map(image => getSrcType(image));
    console.log('srcsets', srcsets);
    return srcsets;
};
const getSrcType = image => {
    return {
        width: image.width, // required
        src: image.url,
        size: image.width,
        format: image.type.replace('jpg', 'jpeg'),
    };
};

export default GridFour;
