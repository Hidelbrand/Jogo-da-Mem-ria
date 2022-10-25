import styled from 'styled-components';

export const Conteiner = styled.div`
    width: 100%;
    max-width: 750px;
    margin: auto;
    display: flex;
    padding: 50px 0;
    margin-top: 100px;

    @media (max-width: 750px) {
        flex-direction: column;
        margin-top: auto;
    }
`;

export const info = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;

    @media (max-width: 750px) {
        margin-bottom: 50px;
        align-items: center;
    }
`;

export const LogoLink = styled.a`
    display: block;
`;

export const infoArea = styled.div`
    width: 100%;
    margin: 10px 0;

    @media (max-width: 750px) {
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
`;

export const GridArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 750px) {
        justify-content: center;
        margin: 0 10px;
    }
`;

export const Grid = styled.div`
    width: 430px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    @media (max-width: 750px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;
