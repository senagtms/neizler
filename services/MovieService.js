const MovieModel = require("../model/MovieModel");
const BaseService = require("./BaseService");

class MovieService extends BaseService{
    constructor() {
        super(MovieModel);
    }

    joinedList(){
        return this.model.aggregate([
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
        ]);
    }
}

module.exports = MovieService