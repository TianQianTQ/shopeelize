/**
 * EntitySchema构造函数
 * @params name 该schema名称
 * @params entityParams 为可选参数，定义该schema的外键，定义的外键可以不存在
 * @params entityConfig 为可选参数，目前仅支持一个参数,定义该entity的主键，默认值为字符串'id'
 */
export default class EntitySchema {
    constructor(name, entityParams = {}, entityConfig = {}) {
        if (!name || typeof name !== 'string') {
            throw new Error(`Expected a string key for Entity, but found ${key}.`);
        }
        this.name = name
        this.idAttribute = entityConfig.idAttribute || 'id'
        this.define(entityParams)
    }
    /**
     * 遍历当前schema中的entityParams，处理嵌套
     * @param {*} entityParams 
     */
    define(entityParams) {
        if (!this.schema) {
            this.schema = {}
        }
        for (let key in entityParams) {
            if (entityParams.hasOwnProperty(key)) {
                this.schema[key] = entityParams[key]
            }
        }
    }
    /**
     * 获取当前schema的name
     * @returns name
     */
    getName() {
        return this.name;
    }
    /**
     * 获取schema的主键
     * @param {*} input 
     * @returns 主键值
     */
    getId(input) {
        return input[this.idAttribute];
    }
}
