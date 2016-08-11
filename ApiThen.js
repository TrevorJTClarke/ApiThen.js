/**
 * ApiThen.js
 *
 * A RESTful module for ease of API interactions.
 */
class ApiThen {

  constructor(options = {}) {
    this.options = options

    // TODO:
    // - Setup options
    // - required options and erroring

    // default Config
    this.options.baseUrl = 'https://api.somewhere.com'
  }

  /**
   * CONFIGURATION
   * Helper methods to modify or configure module aspects
   */
  setHeader (key, val) {
    this.headers[key] = val
  }
  setOption (key, val) {
    this.options[key] = val
  }
  setRequire (key, val) {
    this.required[key] = val
  }

  /**
   * METHODS
   * Responsible for configuring the method used in request
   */
  get () {
    this.setHeader('method', 'GET')
    this.setRequire('hasBody', false)
    return this
  }
  put () {
    this.setHeader('method', 'PUT')
    this.setRequire('hasBody', true)
    return this
  }
  post () {
    this.setHeader('method', 'POST')
    this.setRequire('hasBody', true)
    return this
  }
  patch () {
    this.setHeader('method', 'PATCH')
    this.setRequire('hasBody', true)
    return this
  }
  delete () {
    this.setHeader('method', 'DELETE')
    this.setRequire('hasBody', false)
    return this
  }
  options () {
    this.setHeader('method', 'OPTIONS')
    this.setRequire('hasBody', false)
    return this
  }
  head () {
    this.setHeader('method', 'HEAD')
    this.setRequire('hasBody', false)
    return this
  }

}

export { ApiThen }
