function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function fetchCounter() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const counter = getRandomInt(1, 100);

      if (counter <= 5) {
        reject(new Error('The API failed'));
      } else {
        resolve(getRandomInt(1, 100));
      }
    }, 500);
  });
}
