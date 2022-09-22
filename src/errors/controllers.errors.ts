export class MissingFieldError extends Error {
  constructor(field: string) {
    super(`Missing ${field}.`)
  }
}

export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Missing ${param} param.`)
  }
}
export class InvalidIdError extends Error {
  constructor(property: string) {
    super(`Invalid ${property} id`)
  }
}
export class UpdateNotAllowedError extends Error {
  constructor() {
    super('Some received field is not allowed to update.')
  }
}

export class SomethingWrong extends Error {
  constructor(message: string) {
    super(`${message} or something else went wrong. Try again later.`)
  }
}
