const ControllerHelper = {
  serverError() {
    return { statusCode: 500, body: 'Something went wrong. Try again later' }
  }
}

export default ControllerHelper
