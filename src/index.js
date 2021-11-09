import { normalize, schema } from './schema'

const originalData = {
  "id": "123",
  "author":  {
    "uid": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": {
    total: 100,
    result: [{
        "id": "324",
        "commenter": {
          "uid": "2",
          "name": "Nicole"
        }
      }]
  }
}
// Define a users schema
const user = new schema.Entity('users', {}, {
  idAttribute: 'uid'
})
console.log('user:', user);

// Define your comments schema
const comment = new schema.Entity('comments', {
  commenter: user
})

console.log('comment:', comment);

// Define your article
const article = new schema.Entity('articles', {
  author: user,
  comments: {
    result: [ comment ]
  }
})

console.log('article:', article);

const normalizedData = normalize(originalData, article)
console.log('normalizedData', normalizedData);