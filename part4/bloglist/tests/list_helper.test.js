const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const listWithOne = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithMany = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

const listWithManySame = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

describe('total likes', () => {

  test('zero when list is empty', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('with a list of one, equals its likes', () => {
    const result = listHelper.totalLikes(listWithOne)
    expect(result).toBe(5)
  })

  test('with a list of more than one, equals the sum', () => {
    const result = listHelper.totalLikes(listWithMany)
    expect(result).toBe(24)
  })

})

describe('favourite list', () => {
  test('undefined when there are no blogs', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('with a list of one, return it', () => {
    const result = listHelper.favoriteBlog(listWithOne)
    expect(result).toEqual(listWithOne[0])
  })

  test('with a longer list, return one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithMany)
    expect(result).toEqual(listWithMany[2])
  })

  test('with multiple max likes, return first', () => {
    const result = listHelper.favoriteBlog(listWithManySame)
    expect(result).toEqual(listWithManySame[1])
  })
})

describe('most blogs', () => {
  test('undefined when there are none', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('with a list of one, return it', () => {
    const result = listHelper.mostBlogs(listWithOne)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('with more than one, returns the one with most', () => {
    const result = listHelper.mostBlogs(listWithMany)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
  })

})