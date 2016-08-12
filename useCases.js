// Different Tests!

// New instance
var Api = new ApiThen({
    options: {
      baseUrl: 'https://randomuser.me/api'
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

// Api.get().users(1234).then((res) => {
//   console.log('res', res)
// }, (err) => {
//   console.log('err', err)
// })
