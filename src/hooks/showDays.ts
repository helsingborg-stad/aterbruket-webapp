const showDays = (item: string) => {
  const createdAt = Date.parse(item);
  const convertedCreatedAt = new Date(createdAt);
  const today = new Date();
  const diffInTime = today.getTime() - convertedCreatedAt.getTime();
  const diffInDays = diffInTime / (1000 * 3600 * 24);
  return Math.ceil(diffInDays);
};

export default showDays;
