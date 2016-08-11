/**
 * ApiThen.js
 *
 * A RESTful module for ease of API interactions.
 */
class ApiThen {

  constructor(config = {}) {
    this.options = config.options || {}
    this.headers = config.headers || {}

    // TODO:
    // - Setup options
    // - required options and erroring

    // default Config
    this.options.route = ''
    this.required = {}
  }

  /**
   * CONFIGURATION
   * Helper methods to modify or configure module aspects
   */
  setHeader (key, val) {
    this.headers[key] = val

    // if its a method, reset the route string
    this.options.route = ''
  }
  setOption (key, val) {
    this.options[key] = val
  }
  setRequire (key, val) {
    this.required[key] = val
  }
  getRoute () {
    return this.options.baseUrl + this.options.route
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

  /**
   * REQUEST/PROMISE
   * Returns a thenable promise, sets all configuration in the XHR request
   */
  then (res, rej) {
    let _this = this
    let endpoint = this.getRoute()
    /*eslint no-console: ["error", { allow: ["log"] }] */
    console.log('endpoint', endpoint)

    // Return a new promise.
    let deferred = new Promise(function (resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest()
      req.open(_this.headers.method, endpoint, true)
      req.onload = function () {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response)
        } else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText))
        }
      }

      // TODO: Setup headers from config
      // req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

      // Handle network errors
      req.onerror = function () {
        reject(Error('Network Error'))
      }

      // Make the request!!
      req.send()
    })

    // TODO: connect up res, rej
    return deferred.then(res, rej)
  }

  /**
   * ENDPOINT METHODS
   * All Methods specified here create short methods for endpoint url chaining
   *
   * IDEA: Create an array in options to generate these. options? sure.
   */
  users (id) {
    this.options.route += `/users${id ? '/' + id : ''}`
    return this
  }

}

// export { ApiThen }
