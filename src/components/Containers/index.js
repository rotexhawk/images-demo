import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    justify-content: center;
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 96%;
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