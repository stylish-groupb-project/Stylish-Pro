import styled from 'styled-components';

export const  ColorBlock = styled.span`
    background: #${(props) => props.colorCode};
    height: 1.25rem;
    width: 1.25rem;
    margin: 0 0.5rem 0 0;
    display: inline-block;

    &:hover {
        transform: scale(1.1);
    }
`;
export const ColorContainer = styled.div`
    display: flex;
    margin: 1rem 0;
`;
