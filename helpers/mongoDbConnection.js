const mongoConnection = 'mongodb://localhost:27017/neizler';
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(mongoConnection);
    const db = mongoose.connection;
    db.on('error',(err) => {
        console.log('database connection failed',err);
    })
    db.once('connected',() => {
        console.log('Database Connection success');
    });
    mongoose.Promise = global.Promise;
}