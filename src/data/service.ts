interface serviceProps {
  [key: string]: {
    name: string;
    text: string;
  };
}

export const service: serviceProps[] = [
  {
    daily: {
      name: '매일 산책',
      text: '산책 및 실외 배변 가능',
    },
    young: {
      name: '퍼피 산책 케어',
      text: '1살 이하 퍼피 가능',
    },
    old: {
      name: '노견 산책 케어',
      text: '8년 이상 노견 가능',
    },
    medicine: {
      name: '약물 복용',
      text: '경구(입) 약물 복용 가능',
    },
    hair: {
      name: '모발 관리',
      text: '눈물 또는 빗질 관리 가능',
    },
    pickup: {
      name: '도보 픽업',
      text: '비용은 플레이스와 협의',
    },
    emergency: {
      name: '응급 처치',
      text: '응급 상황 시 병원 이동 가능',
    },
    play: {
      name: '실내 놀이',
      text: '터그 놀이, 노즈 워크 등',
    },
    long: {
      name: '장기 예약',
      text: '14일 이상 예약 가능',
    },
  },
];
