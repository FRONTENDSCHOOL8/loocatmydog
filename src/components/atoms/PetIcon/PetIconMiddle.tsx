import React from 'react';
import styled from 'styled-components';

const MiddlePet = styled.img.attrs((props) => ({
  src: props.src,
}))`
  inline-size: 20px;
  block-size: 10px;
  padding-inline: 2px;
  padding-block: 4px;
`;

const PetIconMiddle = () => {
  return <MiddlePet src={'/images/BigDog.svg'} alt="중형견" />;
};
export default PetIconMiddle;
