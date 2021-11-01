async function withAsync(fn, context, ...args) {
  try {
    const { data } = await fn.bind(context, ...args)();
    return {
      data,
      error: null,
    };
  } catch (err) {
    const error = {};
    if (err?.response) {
      error.status = err.response.status;
      error.message = err.response.data.message;
    } else if (err?.request) {
      error.status = null;
      error.message = err.toJSON().message;
    } else {
      error.status = null;
      error.message = err.message || "Oops, Something Went Wrong";
    }
    return {
      data: null,
      error,
    };
  }
}

export default withAsync;
