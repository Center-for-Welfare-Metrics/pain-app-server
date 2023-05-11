import { verifyToken } from "@routes/middlewares/authentication";

export const methods = {
  GET: "GET",
  GET_COUNT: "GET_COUNT",
  GET_BY_ID: "GET_BY_ID",
  CREATE: "CREATE",
  UPDATE_BY_ID: "UPDATE_BY_ID",
  DELETE_BY_ID: "DELETE_BY_ID",
};

const defaultMiddleware = (req, res, next) => {
  next();
};

export const generateEndpoints = (router, model, requestList) => {
  requestList.forEach((request) => {
    let basePath = "/";
    const middleware = request?.config?.middleware ?? defaultMiddleware;
    if (request.config && request.config.path) {
      basePath = request.config.path;
    }
    switch (request.method) {
      case methods.GET:
        router.get(basePath, middleware, get(model, request.config));
        break;
      case methods.GET_COUNT:
        router.get(
          `${basePath}count`,
          middleware,
          getCount(model, request.config)
        );
        break;
      case methods.GET_BY_ID:
        router.get(
          `${basePath}:id`,
          middleware,
          getById(model, request.config)
        );
        break;
      case methods.CREATE:
        router.post(basePath, verifyToken(), create(model));
        break;
      case methods.UPDATE_BY_ID:
        router.put(`${basePath}:id`, verifyToken(), updateById(model));
        break;
      case methods.DELETE_BY_ID:
        router.delete(`${basePath}:id`, verifyToken(), deleteById(model));
        break;
      default:
        break;
    }
  });
};

const get = (model, config: any = {}) => {
  return async (req, res, next) => {
    try {
      // Clone req.query for easier manipulaton
      const queryObj: any = {};
      Object.assign(queryObj, req.query);

      if (config.additionalFilterMappings) {
        addAdditionalFilters(req, queryObj, config.additionalFilterMappings);
      }

      // Delete configuration  properties from the query object
      if (config.pagination) {
        delete queryObj.pageLimit;
        delete queryObj.pageOffset;
      }

      // Base query object
      let query = model.find(queryObj).lean();

      if (config.propertiesSelection) {
        query = query.select(config.propertiesSelection);
      }

      if (config.sort) {
        query = query.sort(config.sort);
      }

      if (config.pagination) {
        const limit = req.query.pageLimit || 30;
        const offset = req.query.pageOffset || 0;
        query = query.limit(Number(limit)).skip(Number(offset));
      }

      if (config.populateFields) {
        query = addPopulation(query, config.populateFields);
      }

      let result = await query.exec();

      if (config.totalDocuments) {
        result = {
          results: result,
          total: await model.countDocuments(queryObj).exec(),
        };
      }

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

const getCount = (model, config: any = {}) => {
  return async (req, res, next) => {
    try {
      // Clone req.query for easier manipulaton
      const queryObj = {};
      Object.assign(queryObj, req.query);
      if (config.additionalFilterMappings) {
        addAdditionalFilters(req, queryObj, config.additionalFilterMappings);
      }
      const count = await model.countDocuments(queryObj).exec();

      res.send({ count });
    } catch (err) {
      next(err);
    }
  };
};

const getById = (model, config: any = {}) => {
  return async (req, res, next) => {
    try {
      let query = model.findById(req.params.id);

      if (config.propertiesSelection) {
        query = query.select(config.propertiesSelection);
      }

      if (config.populateFields) {
        query = addPopulation(query, config.populateFields);
      }

      const document = await query.exec();

      res.send(document);
    } catch (err) {
      next(err);
    }
  };
};

const create = (model) => {
  return async (req, res, next) => {
    try {
      const newDocument = new model(req.body);
      const savedDocument = await newDocument.save();
      res.status(201).send(savedDocument);
    } catch (err) {
      next(err);
    }
  };
};

const updateById = (model) => {
  return async (req, res, next) => {
    try {
      const updatedDocument = await model
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .exec();
      res.send(updatedDocument);
    } catch (err) {
      next(err);
    }
  };
};

const deleteById = (model) => {
  return async (req, res, next) => {
    try {
      await model.findByIdAndDelete(req.params.id).exec();
      res.send();
    } catch (err) {
      next(err);
    }
  };
};

// ======================================== Helper functions

const addPopulation = (query, populateFields) => {
  let newQuery = query;
  populateFields.forEach((populateField) => {
    newQuery = newQuery.populate(populateField);
  });
  return newQuery;
};

const addAdditionalFilters = (req, queryObj, additionalFilterMappings) => {
  additionalFilterMappings.forEach((mapping) => {
    const property = req[mapping.property];
    if (property) {
      mapping.fields.forEach((field) => {
        queryObj[field.target] = property[field.source];
      });
    }
  });
};
