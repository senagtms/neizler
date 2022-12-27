module.exports = (req,res,next) => {
    res.locals = {
        myUrl: req.protocol + '://' + req.headers.host,
    };
    next();
}