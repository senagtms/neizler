class ResponseManager {
    success;
    data;
    message;
    accept(data = null){
        this.success = true;
        if(data) this.data = data;
        return {...this};
    }

    error(message = ''){
        this.success = false;
        this.message = message;
        return {...this};
    }
}

module.exports = ResponseManager;