var hook = Java.use(targetclass);

var overloadCount = hook[taegetMethod].overloads.length;

console.log("Tracing" + taegetMethod + "[" + overloadCount +"overloads ]");

for(var i = 0 ; i < overloadCount ; ++i){
    hook[taegetMethod].overloads[i].implementation = function(){
        console.log("n*** entered" + taegetMethod);

        Java.perform(function(){
            var bt = Java.use("android.util.Log").getStackTraceStrinng(Java.use("java.lang.Exception").$new());
            console.log("nBacktrace: n" + bt);
        });

        if(arguments.length) console.log();

        for(var j = 0 ; j < arguments.length ; ++j){
            console.log("arg[" + j + "]" + arguments[j]);
        }
        var retval = this[taegetMethod].apply(this,arguments);
        console.log("nretval:" + retval);
        console.warn("n*** exiting " + taegetMethod);
    }
    return retval;
}