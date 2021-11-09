import styled, { css } from 'styled-components';
import cover_image from './pictures/card-top.jpeg';

const TRANSITION_DURATION = '0.35s';

const CardDimensions = css`
  width: 100px;
  height: 100px;
`;

const Card = (visible: boolean) => css`
  ${CardDimensions}
  cursor: pointer;
  position: absolute;
  transform: ${visible ? '' : 'rotateY(90deg)'};
  transition: transform ${TRANSITION_DURATION};
  transition-delay: ${visible ? TRANSITION_DURATION : '0s'};
`;

export const Container = styled.div`
  display: grid;
  padding: 16px;
  margin: 32px auto;
  max-width: 800px;
  row-gap: 30px;
  grid-template-columns: repeat(6, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Box = styled.div`
  ${CardDimensions}
  position: relative;
`;

export const Cover = styled.div<{ visible: boolean }>`
  background-image: url(${cover_image});
  ${(props) => Card(props.visible)};
`;

export const Face = styled.div<{ imgUrl: string; visible: boolean }>`
  background-image: ${(props) => `url(${props.imgUrl})`};
  ${(props) => Card(props.visible)};
`;
