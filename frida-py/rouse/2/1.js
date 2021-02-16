// hook方法的所有重载
var hook = Java.use(targetclass)

var overloadCount = hook[targetMethod].overloads.length;
console.log("Tracing" + targetClassMethod + "[" + overloadCount + "overload(s)]");
for(var i = 0 ; i < overloadCount ; ++i){
    hook[targetMethod].overloads[i].implementation = function(){
        console.warn("\n***entered" + targetClassMethod);
        Java.perform(function(){
            var bt = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
            console.log("\nBacktrace\n" + bt);
        });
        if(arguments.length) console.log()
        for(var j = 0 ; j < arguments.length; ++j){
            console.log("arg[" + j + "]:" + arguments[i] );
        }
        var retval = this[targetMethod].apply(this,arguments);
        console.log("\nretval:" + retval);
        console.warn("\n***exiting" + targetClassMethod);
        return retval;
    }
}

// hook类的所有方法

function traceClass(traceClass)
{
    var hook = Java.use(traceClass);
    var methods = hook.class.getDeclaredMethods();

    hook.$dispose;

    var parsedMethods = [];
    methods.forEach(function(method){
        parsedMethods.push(method.toString().replace(targetclass + ".","TOKEN").match(/\sTOKEN(.*)\(/)[1]);

    });
    var targets = unidBy(parsedMethodsm,JSON.stringify);
    targets.forEach(function(targetMethods){
        traceMethod(targetClass + "." + targetMethod);//上面那个
    });
}

//hook类的所有子类
Java.enumerateLoadedClasses({
    onMatch : function(aClass){
        if(aClass.match(pattern)){
            var className = aClass.match(/[L]?(.*);?/)[1].replace(/\//g, ".");

        }
    },
    onComplete:function(){}
});

//hook 本地库的导出函数
function traceModule(impl,name)
{
    console.log("Tracing" + name);
    Interceptor.attach(impl,{
        onEnter: function(args){
            console.warn("\n*** entered"  + name);
            console.log("\nBacktrace:\n" + Thread.backtrace(this.context,Backtracer.Accurate).map(DebugSymbol.fromAddress).join("\n"));
        },
        onLeave: function(retval){
            console.log("\n retval: " + retval);
            console.log("\n*** exiting" + name);
        }
    });

}