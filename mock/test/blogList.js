let Mock = require('mockjs')
let Random = Mock.Random
module.exports = (function () {
  var data = {
    blogList: []
  }
  for (let i = 0; i < 100; i++) {
    var content = Random.cword(100, 500)
    data.blogList.push({
      id: i,
      title: Random.cword(8, 16),
      desc: content.substr(0, 40),
      content: content,
      categories: i > 50 ? ['Vue.js'] : ['其他'],
      date: new Date(new Date(2012, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2012, 0, 1).getTime())),
      author: i > 50 ? 'admin' : '雷勋品'
    })
  }
  return data
})()
