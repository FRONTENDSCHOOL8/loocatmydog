import BigPhoto from '@/components/atoms/BigPhoto/BigPhoto';
import InputWrapper from '@/components/atoms/InputWrapper/InputWrapper';
import { Form } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/atoms/Button/Button';
import Calendar from '@/components/atoms/Calendar/Calendar';
import AnimalRateInput from '@/components/molecules/AnimalRateInput/AnimalRateInput';
import ButtonCheck from '@/components/atoms/ButtonCheck/ButtonCheck';
import { service } from '@/data/service';

const StyledAddSection = styled.div`
  padding: 20px 20px 0;
  margin-bottom: 20px;
  & .sectionTitle {
    ${(props) => props.theme.fontStyles.textSemiboldBase}
    color: ${(props) => props.theme.colors.textBlack};
    margin-bottom: 15px;
  }
  & .buttonWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  & .innerWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    & > span {
      ${(props) => props.theme.fontStyles.textRegularMd}
      color: ${(props) => props.theme.colors.textBlack};
      display: inline-block;
      inline-size: 40px;
    }
  }
  & .info {
    ${(props) => props.theme.fontStyles.textRegularSm}
    color: ${(props) => props.theme.colors.textDarkGray};
    display: block;
    text-align: end;
  }
  & .introduce {
    inline-size: 100%;
    border: none;
    outline: none;
    resize: none;
    border: 1px solid ${(props) => props.theme.colors.lineColorGray};
    border-radius: 4px;
    padding: 5px;
    min-block-size: 150px;
    ${(props) => props.theme.fontStyles.textRegularMd}
  }
`;

const AddPlace = () => {
  const serviceList = Object.values(service[0]);
  console.log(serviceList);
  return (
    <Form>
      <BigPhoto type="default" />
      <StyledAddSection>
        <p className="sectionTitle">제목</p>
        <InputWrapper
          name="title"
          unit=""
          placeholder="플레이스의 이름을 입력해주세요"
        />
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">환경태그</p>
        <div className="innerWrapper">
          <span>태그명</span>
          <InputWrapper name="title" unit="" placeholder="#로 구분가능" />
        </div>
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">환경태그</p>
        <div className="innerWrapper" style={{ alignItems: 'end' }}>
          <InputWrapper
            name="title"
            unit=""
            placeholder="예) 연희동 132, 도선대로 33"
          />
          <Button size="30%" mode="normal">
            검색
          </Button>
        </div>
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">가능한 날짜 선택</p>
        <Calendar />
        <span className="info">최대 한달 이내의 날짜를 선택할 수 있어요</span>
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">이용금액</p>
        <AnimalRateInput size="소형" name="small" />
        <AnimalRateInput size="중형" name="middle" />
        <AnimalRateInput size="대형" name="large" />
      </StyledAddSection>
      <StyledAddSection>
        <div className="buttonWrapper">
          {serviceList.map((item) => {
            return (
              <ButtonCheck key={item.name} name={item.name}>
                {item.text}
              </ButtonCheck>
            );
          })}
        </div>
      </StyledAddSection>
      <StyledAddSection>
        <p className="sectionTitle">자기소개</p>
        <textarea className="introduce"></textarea>
      </StyledAddSection>
      <StyledAddSection style={{ paddingBottom: '30px' }}>
        <Button mode="normal" size="100%">
          등록하기
        </Button>
      </StyledAddSection>
    </Form>
  );
};

export default AddPlace;
