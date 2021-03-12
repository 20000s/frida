function hook_native(){
    var symbols = Module.enumerateSymbolsSync("libart.so");
    var addr_native = null;
    for(var i = 0 ; i < symbols.length ; ++i){
        var symbol = symbols[i];
        if(symbol.name.indexOf("art") >=0 &&
        symbol.name.indexOf("JNI")>= 0 &&
        symbol.name.indexOf("RegisterNatives")>=0 &&
        symbol.name.indexOf("CheckJNI")< 0){
            addr_native = symbol.address
            console.log("find registnative:" + symbol.name);
        }
    }
    Interceptor.attach(addr_native,{
        onEnter : function(args){
            var env = args[0];
            var java_class = args[1];
            var methods_ptr = ptr(args[2]);
            var methods_count = parseInt(args[3]);
            console.log("total register natvie function hava:" + methods_count);
            var class_name = Java.vm.tryGetEnv().getClassName(java_class);
            for(var i = 0 ; i < methods_count ; ++i){
                var name_ptr = ptr(methods_ptr.add(3*i*Process.pointerSize)).readPointer();
                var args_ptr = ptr(methods_ptr.add(3*i*Process.pointerSize + Process.pointerSize)).readPointer();
                var fun_ptr  = ptr(methods_ptr.add(3*i*Process.pointerSize + 2*Process.pointerSize)).readPointer();
                var name = name_ptr.readCString();
                var argss = args_ptr.readCString();
                //var find_module = Memory.findModuleByAddress(fun_ptr);
                var find_module = Process.findModuleByAddress(fun_ptr);
                console.log("[register native]:" + class_name + " , name:" + name + "args:" + argss + "address:" + fun_ptr + "module:"+ find_module.name + "offset: " + fun_ptr.sub(find_module.base));

            }
        },onLeave: function(retval){}
    });
}
setImmediate(hook_native);