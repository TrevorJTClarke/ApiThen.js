// Different Tests!

/*eslint no-console: ["error", { allow: ["log"] }] */
console.log('ApiThen', ApiThen)

// New instance
var Api = new ApiThen({
  options: {
    baseUrl: 'https://api.somewhere.com'
  }
})

console.log('Api.get().users(1234)', Api.get().users(1234))

Api.get().users(1234).then((res) => {
  console.log('res', res)
}, (err) => {
  console.log('err', err)
})
