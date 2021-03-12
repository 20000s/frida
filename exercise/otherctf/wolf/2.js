function hook_bc(){
    var offset = 0x12050;
 
    var module = Process.getModuleByName("libwolf.so");
    var fun = module.base.add(0x12050);
    var addr = Memory.alloc(0x100);
    ptr(addr).writeUtf8String("636D55B2AA8609CB");
    var func = new NativeFunction(fun,"pointer",["pointer"]);
    var result = func(addr);
    console.log("result:" + Memory.readCString(result));

}
setTimeout(hook_bc,1000);