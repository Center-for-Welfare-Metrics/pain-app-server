type SortObjectOptions = {
  isAggregation?: boolean;
};

export const getSortObject = (
  sortBy: string | undefined,
  sortAggregation?: SortObjectOptions
) => {
  if (!sortBy) {
    return {};
  }

  const sortObject = {};

  const isDesc = sortBy.startsWith("-");

  const sortDirection = isDesc ? "desc" : "asc";

  const fieldName = isDesc ? sortBy.substring(1) : sortBy;

  if (sortAggregation?.isAggregation) {
    sortObject[fieldName] = sortDirection === "asc" ? 1 : -1;
  } else {
    sortObject[fieldName] = sortDirection;
  }

  return sortObject;
};
