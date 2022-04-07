const success = {
  SUCCESS: true,
  FAILURE: false,
};

const ResponseStatus = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500,
  GOOGLE_ACCESS_DENIED: 405,
};

const successResponse = (res, msg, data) => {
  if (data) {
    res.status(ResponseStatus.SUCCESS).send({
      msg,
      data,
    });
    return;
  }
  res.status(ResponseStatus.SUCCESS).send({
    msg,
  });
};

const createdSuccessResponse = (res, msg, data) => {
  res.status(ResponseStatus.CREATED).send({
    msg,
    data,
  });
};

const notFoundResponse = (res, msg = 'Not found') => {
  res.status(ResponseStatus.NOT_FOUND).send({
    msg,
  });
};

const unauthorizedResponse = (res, msg = 'Unauthorized') => {
  res.status(ResponseStatus.UNAUTHORIZED).send({
    msg,
  });
};

const badRequestResponse = (res, msg = 'Bad request') => {
  res.status(ResponseStatus.BAD_REQUEST).send({
    msg,
  });
};

const forbiddenResponse = (res, msg = 'Forbidden') => {
  res.status(ResponseStatus.FORBIDDEN).send({
    msg,
  });
};

const serverErrorResponse = (res, msg = 'Internal server error') => {
  res.status(ResponseStatus.INTERNAL_ERROR).send({
    msg,
  });
};

const googleAccessDeniedResponse = (res, msg = 'Google access denied') => {
  res.status(ResponseStatus.GOOGLE_ACCESS_DENIED).send({
    msg,
  });
};

const unprocessableEntityResponse = (res, msg = 'Unprocessable entity') => {
  res.status(ResponseStatus.UNPROCESSABLE_ENTITY).send({
    msg,
  });
};

module.exports = {
  successResponse,
  createdSuccessResponse,
  notFoundResponse,
  unauthorizedResponse,
  badRequestResponse,
  forbiddenResponse,
  serverErrorResponse,
  googleAccessDeniedResponse,
  unprocessableEntityResponse,
};

