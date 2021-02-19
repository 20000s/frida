function hook_native(){
    console.log("start hook native ");
    Java.perform(function(){
        var hook_method = new NativeFunction(Module.findExportByName("libc.so","kill"),'int64',['pointer','int']);
        console.log("address:",Module.findExportByName("libc.so","kill"));
        Interceptor.replace(hook_method,new NativeCallback(function(a,b){
            return 1234;
        },'int64',['pointer','int']));
        console.log(hook_method());
    });
}
/*
function hook_native(){
    var recvfrom_addr = Module.findExportByName("libc.so","strcmp");
    console.log("recvfrom_addr:",recvfrom_addr);
    if (recvfrom_addr){
        Java.perform(function(){
            Interceptor.attach(recvfrom_addr,{
                onEnter:function(args){
                },onLeave:function(retval){
                        retval.replace(1);
                 //       console.log("hook complete");
                }
            })
        })
    }
}
*/
function test(){
    hook_native();
    console.log("start least");
    Java.perform(function(){
        console.log("perform success");
        Java.choose("com.kanxue.pediy1.MainActivity",{
            onMatch : function(instance){
                instance.loadDexClass();
            },
            onComplete : function(){
                console.log("dexloader has been loaded");
            }
        });
        Java.enumerateClassLoaders({
            onMatch : function(loader){
                console.log(loader);
                if(loader.toString().indexOf("dalvik.system.DexClassLoader") != -1){
                    console.log("has found loader");
                    Java.classFactory.loader = loader;
                }

            },
            onComplete : function(){

            }
        });
        Java.enumerateLoadedClasses({
            onMatch : function(classname){
                console.log(classname)
            },
            onComplete: function(){
                console.log("end")
            }
        });
        var func = Java.use("com.kanxue.pediy1.VVVVV");
        var sting_class = Java.use("java.lang.String");
        console.log("you can enmu");
        for(var a = '0'; a <='9'; ++a)
        {
            for(var b = '0'; b <='9'; ++b)
            {
                for(var c = '0'; c <='9' ;++c)
                {
                    for(var d = '0' ; d <='9'; ++d)
                    {
                        for(var e = '0'; e <='9' ;++e)
                        {
                           var new_input = sting_class.$new( a.toString() + b.toString() + c.toString() + d.toString() + e.toString());
                            console.log(new_input)
                            var result = func.VVVV(new_input);
                            if(result==true)
                            {
                                console.log("flag:",new_input);
                                return true;
                            }
                           
                        }
                    }
                }
            }
        }
    });
  
}

setTimeout(test)