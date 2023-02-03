const slugify = require('slugify');
const isEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const isValidUserName = str => {
    const pattern = /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/g;
    if(str.length < 6) return false
    return pattern.test(str.toString())
}

const generateSlugTitle = text => {
    return slugify(text.toLowerCase());
}



module.exports = {
    isEmail,
    isValidUserName,
    generateSlugTitle
}