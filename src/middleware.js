import { Exception } from './Exception'
import http from 'http-status'

export function middleware (options = {}) {
  return (error, request, response, next) => {
    if (!error) {
      next()
    }
    if (!(error instanceof Exception)) {
      if (typeof error === 'number') {
        error = { code: error, message: http[ error ] }
      }
      if (typeof error === 'object') {
        error = new Exception(error.message || error.description, error.code, error.error)
      }
      if (!(error instanceof Exception)) {
        throw new Error('error must be an instance of Exception, number or object')
      }
    }
    response
      .status(error.data.code)
      .json(error.data)
  }
}
