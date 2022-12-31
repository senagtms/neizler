const MovieModel = require("../model/MovieModel");
const BaseService = require("./BaseService");
const mongoose = require('mongoose');
class MovieService extends BaseService{
    constructor() {
        super(MovieModel);
    }

    joinedList(last_id = null){

        const pipeline = [
            {
                $sort: {_id:-1}
            },
            {
                $limit: 20
            },
            {
                $lookup: {
                    from:'people',
                    localField:'director',
                    foreignField:'_id',
                    as:'directorData'
                }
            },
            {
                $unwind: '$directorData'
            },

            {
                $lookup: {
                    from:'categories',
                    localField:'categories',
                    foreignField:'_id',
                    as:'categoriesData'
                }
            },
            {
                $project:{
                    director:0,
                    __v:0,
                    categories:0,
                    'directorData.__v': 0,
                    'categoriesData.__v': 0,
                    'categoriesData._id': 0,
                }
            },
        ];
        if(last_id){
            pipeline.push({$match:{_id: {$lt:mongoose.Types.ObjectId(last_id)} }});
        }
        return this.model.aggregate(pipeline);
    }
}

module.exports = MovieService