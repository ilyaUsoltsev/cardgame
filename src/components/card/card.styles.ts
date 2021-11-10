import styled, { css } from 'styled-components';

const TRANSITION_DURATION = '0.35s';

const CardDimensions = css`
  width: 100px;
  height: 100px;
`;

const Card = (visible: boolean, gone: boolean) => css`
  ${CardDimensions}
  cursor: pointer;
  position: absolute;
  transform: ${visible && !gone ? '' : 'rotateY(90deg)'};
  transition: all ${TRANSITION_DURATION};
  transition-delay: ${visible ? TRANSITION_DURATION : '0s'};
  opacity: ${gone ? 0 : 1};
`;

export const Box = styled.div`
  ${CardDimensions}
  position: relative;
`;

export const Cover = styled.div<{ visible: boolean; gone: boolean }>`
  background-image: url(/pictures/card-top.jpeg);
  ${(props) => Card(props.visible, props.gone)};
`;

export const Face = styled.div<{
  imgUrl: string;
  visible: boolean;
  gone: boolean;
}>`
  background-image: ${(props) => `url(/pictures/${props.imgUrl}.jpeg)`};
  ${(props) => Card(props.visible, props.gone)};
`;
