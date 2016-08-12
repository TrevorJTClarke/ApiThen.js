// Different Tests!

// New instance
var Api = new ApiThen({
    options: {
      baseUrl: 'https://randomuser.me/api'
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.something+json',
      'X-Client-Id': 'u8f93h0q933f2-9j3f2jpjfkwljf0923fjfew-32rfff',
      'Authorization': 'Bearer D33e0c7c57a48466eb8071d272353ba27e'
    }
  },
  [{
    name: 'newMethod',
    args: ['id', 'name'],
    fn: 'this.options.route += (id && name) ? "/newMethod/" + id + "/" + name : "/newMethod"; return this;'
  }, 'users', 'events', 'groups', 'products', 'notifications', 'organizations']
)

var createTest = Api.get().users().getRoute()
var createTest2 = Api.get().notifications(100000038).getRoute()
var createTest3 = Api.get().users(23422342).products().getRoute()
var createTest4 = Api.get().groups(1000000).notifications(100000038).getRoute()
var createTest5 = Api.get().users(23422342).products().query({ limit: 20, offset: 40 }).getRoute()
var createTest6 = Api.get().groups(1000000).notifications().query({ sort: 'desc', limit: 20, offset: 40, featured: true }).getRoute()

console.log('createTest', createTest)
console.log('createTest2', createTest2)
console.log('createTest3', createTest3)
console.log('createTest4', createTest4)
console.log('createTest5', createTest5)
console.log('createTest6', createTest6)

Api.get()
  .users(1234).products()
  .query({ limit: 20, offset: 40 })
  .then((res) => {
  console.log('res', res)
}, (err) => {
  console.log('err', err)
})

Api.post()
  .products()
  .body({
    id: 348294723,
    name: 'some product name',
    description: 'lorem ipsum stuffsome',
    images: [{
      url: 'https://example.com/images/1234567890/thumbnail.jpg'
    }],
    price: 17.75,
    variants: [{
      colors: [{
        id: 123,
        name: 'blue',
        value: '#5893ff'
      }]
    }]
  })
  .then((res) => {
  console.log('res', res)
}, (err) => {
  console.log('err', err)
})

// // Weird IDEA:
// this way I could queue up two calls,
// then do something once they both return
//
// EXAMPLE:
// Api.queue()
//   .get().users().query({ limit: 20, offset: 0 })
//   .get().groups(100000)
//   .then((res) => {
//      console.log('res', res)
//   }, (err) => {
//      console.log('err', err)
//   })
