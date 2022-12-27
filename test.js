const user = {
    name:'necip',

}


class User{
    constructor(name,email,password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    save(){
        console.log(this.name, 'adlı kullanıcıyı veritabanına kaydettim')
    }

}
const user_ = new User('necip','necip@gmail.com','sdfsdf');
const user2_ = new User('ali','necip@gmail.com','sdfsdf');
const user3_ = new User('necip','necip@gmail.com','sdfsdf');

user_.save();
user2_.save();
user3_.save();