import styled from 'styled-components';

//type 정의
interface A11yHiddenProps {
  [key: string]: any;
}

const StyleA11yHidden = styled.span`
  overflow: hidden;
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: circle(0);
  width: 1px;
  height: 1px;
  margin: -1px;
  white-space: nowrap;
`;

function A11yHidden({ ...restProps }: A11yHiddenProps) {
  return <StyleA11yHidden {...restProps} />;
}

export default A11yHidden;
