const BaseService = require('./BaseService');
const BlockUserModel = require('../model/blockUserModel');
class BlockUserService extends BaseService{
    constructor() {
        super(BlockUserModel)
    }

    async getBlockList(activeUserId){
        const condition = {
            $or: [
                {bannedVia: activeUserId},
                {bannedId: activeUserId},
            ]
        };
        const list = await this.model.find(condition,{bannedVia: 1,bannedId: 1,_id:0});
        if(list.length){
            const currentList =  list.map(item => {
                return item.bannedVia.toString() === activeUserId.toString() ? item.bannedId : item.bannedVia
            });
            currentList.push(activeUserId);
            return  currentList;
        }
        return  [activeUserId];
    }
    async getMyBlockList(activeUserId){
        const list  = await  this.model.aggregate([
            {  $match : { bannedVia: activeUserId } },
            {
                $lookup:{
                    localField:'bannedId',
                    from:'users',
                    foreignField:'_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    'user.name':1,
                    'user._id':1,
                    'user.userName':1,
                    _id:1
                }
            }
        ]);
        return list
    }
    async isBlockedBetween(activeUserId,bannedId){
        const condition = {
            $or:[
                {
                    $and: [
                        {bannedVia: activeUserId},
                        {bannedId: bannedId},
                    ]
                },
                {
                    $and: [
                        {bannedVia: bannedId},
                        {bannedId: activeUserId},
                    ]
                }
            ]
        };
        const result = await this.model.findOne(condition,{_id:1});
        return result ? true : false;
    }
}

module.exports = BlockUserService;