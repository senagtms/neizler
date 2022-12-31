const fs = require('fs');
const rootPath = process.env.PWD;
const path = require('path');
class FileManager{
    static deleteFile(fileName, folderList = ['public','images']){
        const path_ = path.join(rootPath,...folderList,fileName);
        if (!fs.existsSync(path_)) return false;
        fs.unlinkSync(path_);
        return true;
    }

    static get getRootPath(){
        return path;
    }

    static uploadFile(){}
}


module.exports = FileManager;