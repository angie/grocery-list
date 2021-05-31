export const getGroceryList = async () => {
  const response = await fetch('http://localhost:3017/items');

  if (!response.ok) {
    throw new Error('failed to fetch');
  }
  const json = await response.json();

  return json;
};
