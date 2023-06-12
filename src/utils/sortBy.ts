export const getSortObject = (sortBy: string | undefined) => {
  if (!sortBy) {
    return {};
  }

  const sortObject = {};

  const isDesc = sortBy.startsWith("-");

  const sortDirection = isDesc ? "desc" : "asc";

  const fieldName = isDesc ? sortBy.substring(1) : sortBy;

  sortObject[fieldName] = sortDirection;

  return sortObject;
};
