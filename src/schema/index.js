import Entity from './Entity';

/**
 * 根据schema类型处理
 * @param {*} value 
 * @param {*} schema 
 * @param {*} addEntity 
 */
const flatten = (value, schema, addEntity) => {
    if (schema.getName) {
        return schemaNormalize(schema, value, flatten, addEntity);
    }
    return noSchemaNormalize(schema, value, flatten, addEntity);
}

/**
 * schema实例 递归 处理
 * @param {*} schema 
 * @param {*} data 
 * @param {*} flatten 
 * @param {*} addEntity 
 */
const schemaNormalize = (schema, data, flatten, addEntity) => {
    const processedEntity = {...data};
    const currentSchema = schema;
    Object.keys(currentSchema.schema).forEach((key) => {
        const schema = currentSchema.schema[key];
        const temp = flatten(processedEntity[key], schema, addEntity);
        processedEntity[key] = temp;
    })
    addEntity(currentSchema, processedEntity);
    return currentSchema.getId(data);
}

/**
 * 非schema实例 按类型（对象或数组）处理
 * @param {*} schema 
 * @param {*} data 
 * @param {*} flatten 
 * @param {*} addEntity
 * @returns arr or obj
 */
const noSchemaNormalize = (schema, data, flatten, addEntity) => {
    const obj = { ...data }
    const arr = []
    const arrFlag = Array.isArray(schema);
    Object.keys(schema).forEach((key) => {
        const nextSchema = schema[key];
        const value = flatten(data[key], nextSchema, addEntity);
        if (arrFlag) {
            arr.push(value);
        } else {
            obj[key] = value;
        }
    })
    if (arrFlag) return arr;
    return obj;
}

/**
 * 递归添加属性
 * @param {*} entities 
 * @returns 
 */
const addEntities = (entities) => (schema, processedEntity) => {
    const schemaName = schema.getName();
    const schemaId = schema.getId(processedEntity);
    if (!entities[schemaName]) {
        entities[schemaName] = {}
    }
    const entity = entities[schemaName][schemaId] || {}
    entities[schemaName][schemaId] = Object.assign(entity, processedEntity);
}

/**
 * 获得对应schema的某个id所对应的对象
 * @param {*} entities 
 * @returns object
 */
// const getEntities = (entities) => {
//     return (entityOrId, schema) => {
//         const schemaName = schema.getName();
//         return typeof entityOrId === 'object' ? entityOrId : entities[schemaName][entityOrId];
//     }
// }

/**
 * 针对不是schema实例的数据做拉平处理
 * @param {*} schema 
 * @param {*} data 
 * @param {*} unflatten 
 * @returns 
 */
// const unflattenNoEntity = (schema, data, unflatten) => {
//     const obj = {...data};
//     const arr = [];
//     const arrFlag = Array.isArray(schema);
//     Object.keys(schema).forEach((key) => {
//         if (obj[key]) {
//             obj[key] = unflatten(obj[key], schema[key]);
//         }
//         if (arrFlag) {
//             arr.push(unflatten(obj[key], schema[key]))
//         }
//     })
//     if (arrFlag) return arr;
//     return obj;
// } 

/**
 * 针对schema实例的数据做拉平处理
 * @param {*} schema 
 * @param {*} id 
 * @param {*} unflatten 
 * @param {*} getEntity 
 * @param {*} cache 
 * @returns 
 */
// const unflattenEntity = (schema, id, unflatten, getEntity, cache) => {
//     const entity = getEntity(id, schema);
//     if (!cache[schema.getName()]) {
//         cache[schema.getName()] = {}
//     }
//     if (!cache[schema.getName()][id]) {
//         const entityCopy = {...entity};
//         Object.keys(schema.schema).forEach((key) => {
//             if (entityCopy.hasOwnProperty(key)) {
//                 const nextSchema = schema.schema[key];
//                 entityCopy[key] = unflatten(entityCopy[key], nextSchema);
//             }
//         });
//         cache[schema.getName()][id] = entityCopy;
//     }
//     return cache[schema.getName()][id];
// }


/**
 * 获取反范式化结果
 * @param {*} entities 
 * @returns 返回按照不同类型对数据进行拉平处理的函数
 */
// const getUnflatten = (entities) => {
//     const cache = {};
//     const getEntity = getEntities(entities);
//     return function unflatten(data, schema) {
//         if (!schema.getName) {
//             return unflattenNoEntity(schema, data, unflatten);
//         }
//         return unflattenEntity(schema, data, unflatten, getEntity, cache);
//     }
// }


// 定义暴露对象与构造方法
export const schema = {
    Entity
};

/**
 * 范式化函数
 * @param {*} data 需要范式化的数据，必须为符合schema定义的对象或由该类对象组成的数组
 * @param {*} entity Entity实例，代表schema，当表示方式为[entity]时则表示该schema为符合entity结构的对象组成的数组
 */
export const normalize = (data, entity) => {
    // 符合定义的对象 或 对象组成的数组
    const entities = {}
    const addEntity = addEntities(entities)
    const result = flatten(data, entity, addEntity);
    return { result, entities };
}

/**
 * 反范式化函数
 * @param {*} normalizedData 需要反范式化的数据，id的数组
 * @param {*} entity 同上文
 * @param {*} entities 范式化后的数据对象
 */
// export const denormalize = (normalizedData, entity, entities) => {
//     return getUnflatten(entities)(normalizedData,entity);
// }