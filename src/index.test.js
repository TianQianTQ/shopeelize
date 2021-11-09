import { normalize, schema, denormalize } from './schema';

// 原始数据
const originalData = {
    "id": "123",
    "author": {
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
// 范式化后的结果数据
const normalizedData = {
    result: "123",
    entities: {
        "articles": {
            "123": {
                id: "123",
                author: "1",
                title: "My awesome blog post",
                comments: {
                    total: 100,
                    result: ["324"]
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
        result: [comment]
    }
})
test('test: originalData to normalizedData', () => {
    const res = normalize(originalData, article);
    expect(res).toEqual(normalizedData);
})
test('test: normalizedData to originalData', () => {
    const res = normalize(originalData, article);
    const { result, entities } = res;
    const denormalizedData = denormalize(result, article, entities);
    expect(denormalizedData).toEqual(originalData);
})