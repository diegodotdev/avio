function useGetUser() {
  const user = localStorage.getItem("user");
  return { user };
}

export default useGetUser;
