/*Software Engineer, Frontend, Entry Task 1（Normalize）

实现一个库shopeelize，可以用于将嵌套对象范式化，或者将范式化的数据还原成嵌套对象。

时间

该项 Entry Task 需要在3天内完成。

目标
schema.Entity(name, [entityParams], [entityConfig])

参数说明
Entity的实例为一个schema
name为该schema的名称
entityParams为可选参数，定义该schema的外键，定义的外键可以不存在
entityConfig为可选参数，目前仅支持一个参数
entityConfig，定义该entity的主键，默认值为字符串'id'

`	
normalize(data, entity)
 
参数说明

data
需要范式化的数据，必须为符合schema定义的对象或由该类对象组成的数组
entity
Entity实例，代表schema，当表示方式为[entity]时则表示该schema为符合entity结构的对象组成的数组

denormalize (normalizedData, entity, entities)
参数说明
normalizedData 需要反范式化的数据，id的数组
entity 同上文
entities 范式化后的数据对象
---------------------------*****************-------------------------------

用例
范式化数据
import { normalize, schema } from 'shopeelize'

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
})denormalize

const normalizedData = normalize(originalData, article)
normalizedData的值为：
{
  result: "123",
  entities: {
    "articles": {
      "123": {
        id: "123",
        author: "1",
        title: "My awesome blog post",
        comments: {
    	total: 100,
    	result: [ "324" ]
        }
      }
    },
    "users": {
      "1": { "uid": "1", "name": "Paul" },
      "2": { "uid": "2", "name": "Nicole" }
    },

    "comments": {
      "324": { id: "324", "commenter": "2" }
    }
  }
}

{
  Result: “”

}


还原范式化数据

const { result, entities } = normalizedData

const denormalizedData = denormalize(result, article, entities)

denormalizedData的值应该和originalData一致


另一个数据示例：
const page = new schema.Entity('page', {})
const user = new schema.Entity('user', {}, {})
const book = new schema.Entity('book', {
  pages: [ page ],
  author: user
})
const comment = new schema.Entity('comments', {
  commenter: user
})
const mybook = new schema.Entity('mybook', {
  author: user,
  books: [ book ],
  comments: {
    result: [ comment ]
  }
}, { idAttribute: 'customizedId' })

// 对应的originalData:
// 原始数据没有包含`books`字段
const mybookOriginalData = {
  customizedId: '666',
  author: { id: '12345', name: 'uname' },
  comments: {
    total: 100,
    result: [{
        id: 'comment1',
        commenter: {
        id: '999',
          name: 'Shopee' 
        }
      }, {
        id: 'coment2',
        commenter: {
        id: '999',
          name: 'Shopee' 
        }
    }]
  }
}

使用Jest编写对应的单元测试

请遵循JavaScript Standard Style

请不要修改原始数据

评分标准:

正确实现normalize函数功能  - 30分
正确实现denormalize函数功能 - 30分
使用Jest完成单元测试，用例设计合理，覆盖完整 - 20分
代码风格遵循standardjs规范， 有必要的注释，结构清晰，实现优雅 - 20分

若 entry task 不及格，将不能通过试用期。
*/
