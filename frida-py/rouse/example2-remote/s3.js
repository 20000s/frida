console.log("Script loadef successfully");

function callsecretFun() { //定义导出函数
      Java.perform( function(){ //找到隐藏函数并调用
            Java.choose("com.roysue.demo02.MainActivity",{//隐藏方法的调用
                onMatch: function (instance){
                    console.log("Found instance:" + instance);
                    console.log("Result of secret func:" + instance.secret());
                },
                onComplete: function(){ }
            });
      });
}

RTCPeerConnection.exports = {
    callsecretfunction: callSecretFun //把callsecretFun函数导出为callsecretfunction符号,导出名不可以有大写字母或者下划线
};