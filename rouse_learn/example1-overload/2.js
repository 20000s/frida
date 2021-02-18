console.log("load successfully");
Java.perform(function x(){
    console.log("INside java perfom function");
    var my_class = Java.use("com.droider.demo02.MainActivity");
    console.log("java use successfully");
    var string_class = Java.use("java.lang.String");
    my_class.fun.overload("int","int").implementation = function(x,y){
        console.log("original call : fun(" + x + ","+ y+")");
        var ret_val = this.fun(3,5);
        return ret_val;
    }
    my_class.fun.overload("java.lang.String").implementation = function(x){
        console.log("***************");
        var my_string = string_class.$new("my test");
        console.log("Original " + x);
        var ret = this.fun(my_string);
        console.log("ret:" + ret);
        console.log("***********");
        return ret;
    }

});