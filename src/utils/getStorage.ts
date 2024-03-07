const { localStorage } = window;

export default function getStorage(key: string): Promise<any> {
  return new Promise((resolve) => {
    if (key) {
      resolve(JSON.parse(localStorage.getItem(key) as string));
    }
  });
}
