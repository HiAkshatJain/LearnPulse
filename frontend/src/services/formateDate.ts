export const formatDate = (dateString: string) => {
  if (!dateString) return null;

  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString); //@ts-ignore
  const formattedDate = date.toLocaleDateString("en-US", options);

  return `${formattedDate} `;
};
