const completeTodo = async (id, currentCompletionStatus) => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !currentCompletionStatus,
    }),
  });
  return await response.json();
};

export default completeTodo;
