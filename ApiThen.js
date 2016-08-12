// key = method name
// value = boolean --> has body?
//
// NOTE: There are a ton more methods than this, but these are the most generic.
const xhrMethods = {
  PUT: true,
  POST: true,
  PATCH: true,
  GET: false,
  DELETE: false,
  HEAD: false,
  OPTIONS: false
}

/**
 * ApiThen.js
 *
 * A RESTful module for ease of API interactions.
 */
class ApiThen {

  constructor(config = {}, methods = []) {
    this.options = config.options || {}
    this.headers = config.headers || {}
    this.methods = methods

    // TODO:
    // - Setup options
    // - required options and erroring

    // default Config
    this.options.route = ''
    this.options.query = ''
    this.required = {}
    this.bodyContent = {} // default to object?

    // Initializing xhr methods
    this.xhrMethodsInit()

    // Initializing methods
    this.methodsInit()
  }


  /**
   * AUTO GENERATE XHR METHODS
   * NOTE: HIGHLY experimental, checking if this is a good idea or not
   */
  xhrMethodsInit () {
    var _this = this

    // generate
    for (var x in xhrMethods) {
      _this.createMethod(x.toLowerCase(), [], `this.setHeader('method', '${x}'); this.setRequire('hasBody', ${xhrMethods[x]}); return this;`)
    }
  }

  /**
   * AUTO GENERATE METHODS
   * NOTE: HIGHLY experimental, checking if this is a good idea or not
   */

  // grabs all methods from config and sends to creator
  methodsInit () {
    if (!this.methods || this.methods.length <= 0) return;
    var _this = this

    // SUPER BRITTLE,
    // TODO: check for args, fn returns, etc
    this.methods.forEach(function (method) {
      let stdMethodFn
      let stdMethodArgs = ['id']

      // auto generate based on the type passed in
      if (typeof method === 'string') {
        stdMethodFn = 'this.options.route += (id) ? "/' + method + '/" + id : "/' + method + '"; return this;'
        _this.createMethod(method, stdMethodArgs, stdMethodFn)
      } else {

        stdMethodFn = 'this.options.route += (id) ? "/' + method.name + '/" + id : "/' + method.name + '"; return this;'
        _this.createMethod(method.name, method.args || stdMethodArgs, method.fn || stdMethodFn)
      }
    })
  }

  // generates the method inside the prototype
  createMethod (name, args, fn) {
    this.__proto__[name] = new Function(args, fn)

    return this
  }

  /**
   * CONFIGURATION
   * Helper methods to modify or configure module aspects
   */
  setHeader (key, val) {
    this.headers[key] = val

    // if its a method, reset the route & query strings
    this.options.route = ''
    this.options.query = ''
  }
  setOption (key, val) {
    this.options[key] = val
  }
  setRequire (key, val) {
    this.required[key] = val
  }
  getRoute () {
    /*eslint no-console: ["error", { allow: ["log"] }] */
    console.log('this.__proto__', this.__proto__)

    return this.options.baseUrl + this.options.route + this.options.query
  }

  /**
   * BODY
   * Places data into the request body
   * TODO: Check all types of data
   */
  body (data) {
    if (!data) throw new Error('Request Body requires data! Please pass data into the .body() method!')
    this.bodyContent = data

    return this;
  }

  /**
   * ENDPOINT QUERY PARAMS
   * All query params specified here are formatted and appended to final route
   *
   * EXAMPLES:
   * - .query({ limit: 20, offset: 40 })
   * - .query({ sort: 'desc', limit: 20, offset: 40, featured: true })
   *
   * OUTPUTS
   * - https://api.somewhere.com/users?limit=20&offset=40
   * - https://api.somewhere.com/users?sort=desc&limit=20&&offset=40&featured=true
   */
  query (params) {
    let finalParams = ''

    // setup each param into main params string, formatted of course
    for (var p in params) {
      finalParams += `${p}=${params[p]}&`
    }

    // remove last & -- Is there a better way to do this?
    finalParams = finalParams.slice(0, -1)

    this.options.query += (finalParams && finalParams.length > 0) ? `?${finalParams}` : ''

    return this;
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
      if (Object.keys(_this.headers).length > 0) {
        for (var hh in _this.headers) {
          req.setRequestHeader(hh, _this.headers[hh])
        }
      }

      // Handle network errors
      req.onerror = function () {
        reject(Error('Network Error'))
      }

      // Make the request!!
      if (_this.bodyContent) {
        req.send(JSON.stringify(_this.bodyContent))
      } else {
        req.send()
      }
    })

    // TODO: connect up res, rej
    return deferred.then(res, rej)
  }

  /**
   * TODO: Assess for need, since we can auto-generate the methods, prolly dont need
   * ENDPOINT METHODS
   * All Methods specified here create short methods for endpoint url chaining
   *
   * IDEA: Create an array in options to generate these. options? sure.
   */
  // users (id) {
  //   // this.options.route += `/users${id ? '/' + id : ''}`
  //   return this
  // }

}

// export { ApiThen }
