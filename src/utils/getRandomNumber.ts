export default function getRandomNumber(min: number, max: number) {
  return String(Math.floor(Math.random() * (max - min + 1)) + min).padStart(
    6,
    '0'
  );
}
