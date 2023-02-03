class BaseService{
    constructor(model) {
        this.model = model;
    }

    async saveToDb(data){
        const result = new this.model(data);
        return await result.save();
    }

    async findById(id){
        return this.model.findById(id)
    }

    async find(cond = {},fields = {}){
        return this.model.find(cond,fields);
    }

    async findOne(cond = {},fields = {}){
        return this.model.findOne(cond,fields)
    }

    async updateOne(cond,data){
        const result = await this.model.updateOne(cond,data);
        return result.modifiedCount; // modified count = kaç tane kayıt etkilendi
    }
    async updateisDeleted(cond={},data={}){
        return await this.model.updateOne(cond,data)
    }

    async deleteOne(cond){
        const result = await this.model.deleteOne(cond);
        return result.deletedCount;
    }
}



module.exports = BaseService;