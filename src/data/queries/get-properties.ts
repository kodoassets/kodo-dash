export const getProperties = async () => {
  const data = await fetch("http://localhost:3001/properties");
  return data.json();
};
