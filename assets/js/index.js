function getUserInfo(){
    $.ajax({
        method: "GET",
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token'),
        // },
        success: (res)=>{
            if(res.status !== 0) return layer.msg(res.message);
            layer.msg('获取用户信息成功')
            renderAvatar(res.data)
        },
        // complete:(res)=> {
        //     if(res.responseJSON.status === 1 && res.responseJSON.message ==="身份认证失败！") {
        //     localStorage.removeItem("token");
        //     location.href = "/login.html";
        //     }
        // }
    })
}

const renderAvatar = (user) => {
    const name = user.nickname || user.username
    $("#welcome").html(`欢迎 ${name}`);
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName).show();
    }
}

$("#btnLogout").click(() => {
    layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "提示" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});
function change(){
    $('#change').addClass('layui-this').next().removeClass('layui-this')
}
getUserInfo()