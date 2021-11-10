# shopeelize简介
可以用于将嵌套对象范式化，或者将范式化的数据还原成嵌套对象
# 文件目录
- eq 题目详情
- schema 方法实现
    - EntitySchema EntitySchema构造函数
    - index 范式化与反范式化方法具体实现及方法导出
- index.js 使用示例
- index.test.js 测试示例
# API
## schema.Entity(name, [entityParams], [entityConfig])
#### 方法说明
    Entity的实例为一个schema
#### 参数说明
- name：该schema的名称
- entityParams：可选参数，定义该schema的外键，定义的外键可以不存在
- entityConfig：可选参数，目前仅支持一个参数
    - entityConfig，定义该entity的主键，默认值为字符串'id'

## normalize(data, entity)
#### 方法说明
    根据提供的架构定义规范化输入数据
#### 参数说明
- data：需要范式化的数据，必须为符合schema定义的对象或由该类对象组成的数组
- entity：Entity实例，代表schema，当表示方式为[entity]时则表示该schema为符合entity结构的对象组成的数组
#### 用法举例

```
import { normalize, schema } from 'shopeelize';

const myData = { users: [{ id: 1 }, { id: 2 }] };
const user = new schema.Entity('users');
const mySchema = { users: [user] };
const normalizedData = normalize(myData, mySchema);

// 输出
{
  result: { users: [ 1, 2 ] },
  entities: {
    users: {
      '1': { id: 1 },
      '2': { id: 2 }
    }
  }
}

```


## denormalize (normalizedData, entity, entities)
#### 方法说明
    反范式化函数
#### 参数说明
- normalizedData：需要反范式化的数据，id的数组
- entity：同上文
- entities：范式化后的数据对象
#### 用法举例

```
import { denormalize, schema } from 'shopeelize';

const user = new schema.Entity('users');
const mySchema = { users: [user] };
const entities = { users: { '1': { id: 1 }, '2': { id: 2 } } };
const denormalizedData = denormalize({ users: [1, 2] }, mySchema, entities);

// 输出
{
  users: [{ id: 1 }, { id: 2 }];
}

```

