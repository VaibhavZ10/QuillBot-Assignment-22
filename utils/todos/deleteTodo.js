const deleteTodo = async (id) => {
  await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });
};

export default deleteTodo;
