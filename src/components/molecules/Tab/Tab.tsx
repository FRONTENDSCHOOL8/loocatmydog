import styled from 'styled-components';

const StyledTabBox = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f1f1f1;
  padding-inline: 70px;
  gap: 30px;

  & input {
    appearance: none;
  }
`;

interface TabBoxLabelProps {
  $mode: 'present' | 'previous';
}

const StyledPresentTabLabel = styled.label<TabBoxLabelProps>`
  font-size: 14px;
  font-weight: 600;
  padding-inline: 30px;
  padding-block: 15px;
  ${(props) => {
    if (props.$mode === 'present') {
      return `border-bottom: 2px solid #ffb62b;`;
    }
  }}
`;

const StyledPreviousTabLabel = styled.label<TabBoxLabelProps>`
  font-size: 14px;
  font-weight: 600;
  padding-inline: 30px;
  padding-block: 15px;
  ${(props) => {
    if (props.$mode === 'previous') {
      return `border-bottom: 2px solid #ffb62b;`;
    }
  }}
`;

interface TabBoxProps {
  mode: 'present' | 'previous';
}

const Tab = ({ mode }: TabBoxProps) => {
  return (
    <StyledTabBox>
      <StyledPresentTabLabel $mode={mode} htmlFor="presentBook">
        진행 예약
      </StyledPresentTabLabel>
      <input type="radio" name="books" id="presentBook" />
      <StyledPreviousTabLabel $mode={mode} htmlFor="previousBook">
        지난 예약
      </StyledPreviousTabLabel>
      <input type="radio" name="books" id="previousBook" />
    </StyledTabBox>
  );
};

export default Tab;
