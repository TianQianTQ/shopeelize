/**
 * 根据schema类型处理
 * @param {*} value 
 * @param {*} schema 
 * @param {*} addEntity 
 */
export const flatten = (value, schema, addEntity) => {
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
export const schemaNormalize = (schema, data, flatten, addEntity) => {
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
export const noSchemaNormalize = (schema, data, flatten, addEntity) => {
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
 * 
 * @param {*} entities 
 * @returns 
 */
export const addEntities = (entities) => (schema, processedEntity) => {
    const schemaName = schema.getName();
    const schemaId = schema.getId(processedEntity);
    if (!Object.keys(entities).length) {
        entities[schema][schemaId] = {}
    }
    const entity = entities[schemaName][schemaId] || {}
    entities[schemaName][schemaId] = Object.assign(entity, processedEntity);
}

/**
 * 获得对应schema的某个id所对应的对象
 * @param {*} entities 
 * @returns object
 */
export const getEntities = (entities) => {
    return (entityOrId, schema) => {
        const schemaName = schema.getName();
        return typeof entityOrId === 'object' ? entityOrId : entities[schemaName][entityOrId];
    }
}


/**
 * 针对不是schema实例的数据做拉平处理
 * @param {*} schema 
 * @param {*} data 
 * @param {*} unflatten 
 * @returns 
 */
export const unflattenNoEntity = (schema, data, unflatten) => {
    const obj = {...data};
    const arr = [];
    const arrFlag = Array.isArray(schema);
    Object.keys(schema).forEach((key) => {
        if (obj[key]) {
            obj[key] = unflatten(obj[key], schema[key]);
        }
        if (arrFlag) {
            arr.push(unflatten(obj[key], schema[key]))
        }
    })
    if (arrFlag) return arr;
    return obj;
} 

/**
 * 针对schema实例的数据做拉平处理
 * @param {*} schema 
 * @param {*} id 
 * @param {*} unflatten 
 * @param {*} getEntity 
 * @param {*} cache 
 * @returns 
 */
export const unflattenEntity = (schema, id, unflatten, getEntity, cache) => {
    const entity = getEntity(id, schema);
    if (!cache[schema.getName()]) {
        cache[schema.getName()] = {}
    }
    if (!cache[schema.getName()][id]) {
        const entityCopy = {...entity};
        Object.keys(schema.schema).forEach((key) => {
            if (entityCopy.hasOwnProperty(key)) {
                const nextSchema = schema.schema[key];
                entityCopy[key] = unflatten(entityCopy[key], nextSchema);
            }
        });
        cache[schema.getName()][id] = entityCopy;
    }
    return cache[schema.getName()][id];
}