import styled from 'styled-components';

interface InlineProps {
  $inlineSize: number;
  $blockSize: number;
}

const Inline = styled.img.attrs((props) => ({
  src: props.src,
}))<InlineProps>`
  inline-size: ${(props) => props.$inlineSize}px;
  block-size: ${(props) => props.$blockSize}px;
`;

interface LogoInlineProps {
  blockSize?: number;
  inlineSize?: number;
}

const LogoInline = ({ blockSize = 20, inlineSize = 50 }: LogoInlineProps) => {
  return (
    <Inline
      src={'/images/logo.svg'}
      alt="봐주개냥 가로버전 로고"
      $blockSize={blockSize}
      $inlineSize={inlineSize}
    />
  );
};
export default LogoInline;
