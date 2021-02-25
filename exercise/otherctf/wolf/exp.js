send("so address:" + Module.getExportByName("libwolf.so","_Z7wolf_dePKc"))

/*const hooks = Module.load('libwolf.so');
var Exports = hooks.enumerateExports();
for(var i = 0; i < Exports.length; i++) {
    
    console.log("name:",Exports[i].name);

 }*/
Interceptor.attach(Module.getExportByName("libwolf.so","_Z7wolf_dePKc"),{
    onEnter : function(args){
        send("ok?");
        console.log(args[0]);
        var pointer = args[0];
        console.log(pointer.readByteArray(0x10));

      
        
    },
    onLeave :function(retval){
        console.log(retval);
    }
});