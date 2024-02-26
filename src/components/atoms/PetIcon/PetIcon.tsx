import styled, { css } from 'styled-components';

interface PetProps {
  $dogSize: string;
}

const Pet = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))<PetProps>`
  ${(props) => {
    if (props.$dogSize === '대형견') {
      return css`
        inline-size: 26px;
        block-size: 12px;
      `;
    }
    if (props.$dogSize === '중형견') {
      return css`
        inline-size: 20px;
        block-size: 10px;
      `;
    }
    if (props.$dogSize === '소형견') {
      return css`
        inline-size: 16px;
        block-size: 8px;
      `;
    }
  }}
  padding-inline: 2px;
  padding-block: 4px;
`;

interface PetIconProps {
  // Union Type : 또는
  dogSize: '대형견' | '중형견' | '소형견';
}

const PetIcon = ({ dogSize }: PetIconProps) => {
  return <Pet src={'/images/BigDog.svg'} $dogSize={dogSize} alt={dogSize} />;
};

export default PetIcon;
