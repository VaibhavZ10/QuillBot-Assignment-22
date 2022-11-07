const getTodos = async () => {
  const response = await fetch("/api/todos");
  return await response.json();
};

export default getTodos;
