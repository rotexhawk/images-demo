import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
    margin-top: 2rem;
    max-width: 1200px;
    overflow: hidden;
    /* img {
        width: 400px;
        height: 300px;
    } */
`;

export const IntrinsicSize = () => {
    return (
        <Container>
            <img
                src="http://localhost:4000/public/images/resized/phone_landscape/20190810_121340_HDR.jpg"
                alt="nature"
                // width="400"
                // height="300"
            />
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
            </p>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
            </p>
            <p>&nbsp;</p>
            <img
                src="http://localhost:4000/public/images/resized/phone_landscape/20190810_121340_HDR.jpg"
                alt="nature"
                style={{ float: 'left', margRight: '2rem' }}
                // width="400"
                // height="300"
            />
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
            </p>
        </Container>
    );
};
