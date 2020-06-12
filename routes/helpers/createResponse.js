const SUCCESS = "success",
  FAIL = "fail";
function createResponse({ data, error }) {
  if (!!error) {
    return {
      status: FAIL,
      error
    };
  }

  return {
    status: SUCCESS,
    data
  };
}

module.exports = createResponse;
