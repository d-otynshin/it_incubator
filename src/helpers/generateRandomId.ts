export const generateRandomId = () => {
  const timestamp = Date.now();
  const randomComponent = Math.floor(Math.random() * 1000);

  return Number(`${timestamp}${randomComponent}`);
};
