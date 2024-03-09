export default function sizeWeight(weight: number) {
  if (weight < 7) {
    return '소형';
  } else if (7 <= weight && weight <= 14.9) {
    return '중형';
  } else {
    return '대형';
  }
}
