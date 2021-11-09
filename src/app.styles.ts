import styled from 'styled-components';
import cover_image from './pictures/card-top.jpeg';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 32px auto;
  max-width: 800px;
  row-gap: 30px;
`;

export const Box = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

export const Cover = styled.div`
  background-image: url(${cover_image});
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: absolute;
`;

export const Face = styled.div<{ imgUrl: string; visible: boolean }>`
  background-image: ${(props) => `url(${props.imgUrl})`};
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: absolute;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
