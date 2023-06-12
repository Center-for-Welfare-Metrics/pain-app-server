import { Request } from "express";

type PaginationRequestQuery = {
  page?: number;
  limit?: number;
};

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 10;

export const PaginationMiddleware = (
  request: Request<any, any, any, PaginationRequestQuery>,
  _,
  next: Function
) => {
  const { page, limit } = request.query;

  if (!page) {
    request.query.page = 0;
  } else {
    const pageNumber = Number(page);
    if (isNaN(pageNumber)) {
      request.query.page = 0;
    } else {
      request.query.page = Math.max(pageNumber, 0);
    }
  }

  if (!limit) {
    request.query.limit = DEFAULT_LIMIT;
  } else {
    const limitNumber = Number(limit);
    if (isNaN(limitNumber)) {
      request.query.limit = DEFAULT_LIMIT;
    } else {
      request.query.limit = Math.min(limitNumber, MAX_LIMIT);
    }
  }

  next();
};

type MakePaginationParams = {
  data: any[];
  page?: number;
  totalCount?: number;
  limit?: number;
};

export const MakePagination = ({
  data,
  page = 0,
  totalCount = 0,
  limit = DEFAULT_LIMIT,
}: MakePaginationParams) => {
  const currentCount = Math.min((page + 1) * limit, totalCount);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    results: data,
    meta: {
      current_page: Math.min(totalPages, page + 1),
      current_count: currentCount,
      total_count: totalCount,
      total_pages: totalPages,
      items_per_page: limit,
    },
  };
};
