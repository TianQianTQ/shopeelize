import { normalize, schema, denormalize } from './schema';

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

// Define your comments schema
const comment = new schema.Entity('comments', {
  commenter: user
})


// Define your article
const article = new schema.Entity('articles', {
  author: user,
  comments: {
    result: [ comment ]
  }
})


const normalizedData = normalize(originalData, article);
const { result, entities } = normalizedData;
const denormalizedData = denormalize(result, article, entities);
console.log(denormalizedData);

// const page = new schema.Entity('page', {})
// const user = new schema.Entity('user', {}, {})
// const book = new schema.Entity('book', {
//   pages: [ page ],
//   author: user
// })
// const comment = new schema.Entity('comments', {
//   commenter: user
// })
// const mybook = new schema.Entity('mybook', {
//   author: user,
//   books: [ book ],
//   comments: {
//     result: [ comment ]
//   }
// }, { idAttribute: 'customizedId' })

// // 对应的originalData:
// // 原始数据没有包含`books`字段
// const mybookOriginalData = {
//   customizedId: '666',
//   author: { id: '12345', name: 'uname' },
//   comments: {
//     total: 100,
//     result: [{
//         id: 'comment1',
//         commenter: {
//         id: '999',
//           name: 'Shopee' 
//         }
//       }, {
//         id: 'coment2',
//         commenter: {
//         id: '999',
//           name: 'Shopee' 
//         }
//     }]
//   }
// }

// const normalizedData = normalize(mybookOriginalData, mybook);
// console.log(JSON.stringify(normalizedData));