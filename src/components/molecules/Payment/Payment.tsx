import styled from 'styled-components';

const StyledPayment = styled.div``;

interface PaymentProps {
  userPay: string;
  name: string;
}

function Payment({ userPay, name }: PaymentProps) {
  return (
    <StyledPayment>
      <img src="/images/card.svg" alt={name} />
      <div>
        <p className="title">{userPay ? name : '등록하기'}</p>
        <p>
          {userPay ? '결제 시 예약이 완료됩니다' : '결제 수단을 등록해주세요'}
        </p>
      </div>
    </StyledPayment>
  );
}

export default Payment;
