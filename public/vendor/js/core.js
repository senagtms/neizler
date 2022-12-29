$(document).ready(function (){
/*    const registerSubmit = function (e){
        e.preventDefault();
        const data = $(this).serialize();
        $.ajax({
            type:'POST',
            data,
            url:myUrl + '/auth/register',
            dataType:'json',
            success: function (result){
                if(!result.success){
                    alert(result.message);
                    return
                }

                alert('kuallanıcı Kaydedildi');
            }
        })
    };
    $('form#registerForm').on('submit',registerSubmit);*/
    const getMapArray = object=> {
        return object.map(function(){
            return $(this).val();
        }).get()
    }
    $('form#userNameForm').on('submit',function (e){
        e.preventDefault();
        const data = {
            userName: $('input[name="userName"]').val()
        };
        if(!data.userName){
            alert('Lütfen Bir Kullanıcı Adı Girin');
            return;
        }
        if(data.userName.length < 6){
            alert('Kullanıcı Adı En Az 6 Karakter Olmalıdır');
            return;
        }
        $.ajax({
            type:'PATCH',
            data,
            dataType:'json',
            url:myUrl + '/setting/userName',
            success: function (result){
                if(!result.success){
                    alert(result.message);
                    return;
                }
                alert('Kullanıcı Adı Güncellendi');
            }
        })
    });

    $('form#userInfoForm').on('submit',function (e){
        e.preventDefault();
        const data = {
            email:  $('input[name="email"]').val(),
            name:  $('input[name="name"]').val(),
            birthDay:  $('input[name="birthDay"]').val()

        }
        if(!data.email || !data.name){
            alert("Email ve isim boş bırakılamaz!") ;
            return;
        }
        $.ajax({
            type:'PATCH',
            data,
            dataType:'json',
            url:myUrl + '/setting/userInfo',
            success: function (result){
                if(!result.success){
                    alert(result.message);
                    return;
                }
                alert('Kullanıcı Bilgileri Güncellendi');
            }
        });
    });



    $("#banUser").click(function (e){
        if(!confirm('Bu kullanıcıyı banlamak istediğine emin misin')) return false;
        const id = $(this).data('id');
        $.ajax({
            type:'POST',
            data:{id},
            dataType:'json',
            url:myUrl + '/user/blockUser',
            success: function (result){
                if(!result.success){
                    alert(result.message);
                    return;
                }
               location.href = '/';
            }
        });
    })


    $('.unBlockButton').click(function (e) {
        e.preventDefault();
        if(!confirm('Bu kullanıcının engelini kaldırmak istediğine emin misin ?')) return false;
        const id = $(this).data('id');
        $.ajax({
            type:'DELETE',
            dataType:'json',
            url:myUrl + '/setting/unBlockUser/'+id,
            success: function (result){
                if(!result.success){
                    alert(result.message);
                    return;
                }
                location.reload();
            }
        });
    });

    $("form#passwordUpdateForm").on('submit',function (e) {
        e.preventDefault();
        const currentPassword = $('input[name="currentPassword"]').val();
        const password = $('input[name="password"]').val();
        const rePassword = $('input[name="rePassword"]').val();
        if(!password || !currentPassword || !rePassword){
            alert('Lütfen Tüm Alanları Doldurun');
            return;
        }
        if(password.length<6 || password.length>32 || rePassword.length<6 || rePassword.length>32){
            alert('Düzgün Şifre Gir')
            return ;
        }

        if(password !== rePassword){
            alert('Şifreler Eşleşmiyor')
            return ;
        }
        const data = {
            currentPassword,
            password,
            rePassword:rePassword
        };

        $.ajax({
            type:'PATCH',
            dataType:'json',
            url: myUrl + '/setting/password',
            data,
            success:function (result){
                if(!result.success){
                    alert(result.message);
                    return;
                }
                alert('Şifre Güncellendi');
                $('input[name="currentPassword"]').val('');
                $('input[name="password"]').val('');
                $('input[name="rePassword"]').val('');
            }
        });
    })
    $('form#createCategory').on('submit',function (e){
        e.preventDefault();
        const data = {
            title: $('input[name="title"]').val()
        };
        $.ajax({
            type:'POST',
            data,
            url:myUrl + '/admin/movie/createCategory',
            success:function (result){
                if(!result.success){
                    alert(result.message);
                    return;
                }
                alert('Kategori Eklendi');
            }

        })

    })
    $('form#createPerson').on('submit',function (e){
        e.preventDefault();
        const name= $('input[name="name"]').val();
        const surName= $('input[name="surName"]').val();
        const personType=  $('#personType :selected').val();
        const gender= $('input[name="gender"]').val();

        const data = {
            name,
            surName,
            personType,
            gender
        };
        console.log(data)
        $.ajax({
            type:'POST',
            data,
            url:myUrl + '/admin/movie/createPerson',
            success:function (result){
                if(!result.success){
                    alert(result.message);
                    return;
                }
                alert('Kişi Eklendi');
            }

        })

    })

/*    let createMovieCoverData;
    $("#cover").change(function (e) {
        console.log(e.target.value);
    });*/
    $('form#createMovie').on('submit',function (e){
        e.preventDefault();
        const title= $('input[name="title"]').val();
        const originalTitle= $('input[name="originalTitle"]').val();
        const year= $('input[name="year"]').val();
        const imdb= $('input[name="imdb"]').val();
        const categories= getMapArray($('input[name="categories[]"]:checked'));
        const director=$('.director :selected').val();
        const actors= getMapArray( $('select[name="actors[]"'));
        const cover = $("#cover")[0].files[0];
        if(!categories.length){
            alert('Kategori Seç');
            return;
        }
        const formData = new FormData();
        formData.append('title',title)
        formData.append('originalTitle',originalTitle)
        formData.append('year',year)
        formData.append('imdb',imdb)
        formData.append('categories',categories)
        formData.append('director',director)
        formData.append('actors',actors);
        formData.append('cover',cover);
        $.ajax({
            type:'POST',
            url:myUrl + '/admin/movie/create',
            data:formData,
            contentType: false,
            processData: false,
            dataType:'json',
            success:function (result){
                if(!result.success){
                    alert(result.message);
                    return;
                }
                alert('Film  Eklendi');
               location.href = myUrl + '/admin/movie/list'
            }
        })
    })
});