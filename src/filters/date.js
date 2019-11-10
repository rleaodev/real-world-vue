export default value => {
  const date = new Date(value);

  return date.toLocaleDateString(["en-US"], {
    month: "short",
    date: "2-digit",
    year: "2-digit"
  });
};
