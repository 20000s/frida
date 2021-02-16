console.log("Script loaded successfully");
Java.perform(function x(){
    console.log("INside java perfom function");
    //定位类
    var my_activity = Java.use("com.droider.demo345.MainActivity");
    console.log("java use successfully");//定位类成功
    my_activity.fun.implementation = function(x,y){//替换
        console.log("original call : fun(" + x + ","+ y+")");
        var ret_val = this.fun(2,5);
        return ret_val;
    }

});