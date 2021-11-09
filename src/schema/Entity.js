// 定义EntitySchema构造函数
class EntitySchema {
    // 参数处理
    // name 该schema名称
    // entityParams 为可选参数，定义该schema的外键，定义的外键可以不存在
    // entityConfig 为可选参数，目前仅支持一个参数,定义该entity的主键，默认值为字符串'id'
    constructor(name, entityParams = {}, entityConfig = {}) {
        this.name = name
        this.idAttribute = entityConfig.idAttribute || 'id'
        this.inits(entityParams)
    }
    // 处理参数嵌套
    init(entityParams) {
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
