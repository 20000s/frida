function trace(pattern)
{
    var type = (pattern.toString().indexOf("!") === -1) ? "java" : "module";

    if(type === "module") {
        console.log("module");
        var res = new ApiResolver("module");
        var matches = res.enumerateMatchesSync(pattern);
        var targets = uniqBy(matches,JSON.stringify);
        targets.forEach(function(target){
            try{
                traceModule(target.address,target.name);
            }
            catch(err){}
        });
    } else if(type === "java"){
        console.log("java");
        var found = false;
        Java.enumerateLoadedClasses({
            onMatch : function(aClass){
                if(aClass.match(pattern)){
                    found = true;
                    console.log("found is true");
                    console.log("before" + aClass);
                    var className = aClass.match(/[L]?(.*);?/)[1].replace(/\//g, ".");
                    console.log("after:"+className);
                    traceClass(className);
                }
            },
            onComplete: function(){}
        });
        if(!found){
            try{
                traceMethod(pattern);
            }
            catch(err){
                console.error(err);
            }
        }
    }
}

function traceClass(targetClass)
{
    console.log("entering traceClass");
    var hook = Java.use(targetClass);
    var methods = hook.class.getDeclaredMethods();
    hook.$dispose();

    console.log("entering pasedMethods");
    var parsedMethods = [];
    methods.forEach(function(method){
            try{
                parsedMethods.push(method.toString().replace(targetClass + ".", "TOKEN").match(/\sTOKEN(.*)\(/)[1]);
            }
            catch(err){}
    });

    console.log("entering traceMethods");
    var targets = uniqBy(parsedMethods,JSON.stringify);
    targets.forEach( function(targetMethod){
        try{
            traceMethod(targetClass + "." + targetMethod);
        }
        catch(err){}
    });
}

function traceMethod(targetClassMethod)
{
    var delim = targetClassMethod.lastIndexOf(".");
    if(delim ===-1) return;

    var targetClass = targetClassMethod.slice(0,delim);
    var targetMethod = targetClassMethod.slice(delim+1,targetClassMethod.length);

    var hook = Java.use(targetClass);
    var overloadCount = hook[targetMethod].overloads.length;
    console.log("Tracing " + targetClassMethod + "[" + overloadCount + "overload(s)]");
    for(var i = 0 ; i < overloadCount ; ++i)
    {
        hook[targetMethod].overloads[i].implementation = function(){
            console.warn("\n*** entered" + targetClassMethod);
            if(arguments.length) console.log();
            for(var j = 0; j < arguments.length ; ++j){
                console.log("arg[" + j + "]:" + arguments[j]);
            }
            var retval = this[targetMethod].apply(this,arguments);
            console.log("\nretval: "+ retval);
            console.warn("\n*** exiting" + targetClassMethod);
            return retval;
        }
    }
}

function traceModule(impl,name)
{
    console.log("Tracing" + name);
    Interceptor.attach(impl,{
        onEnter: function(args){
            this.flag = true;
            if(this.flag){
                console.warn("\n*** entered" + name);
                console.log("\nBacktrace:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n"));
            }
        },
        onLeave: function(retval){
               
               console.log("\nretval: " + retval);
               console.warn("\n*** exiting " + name);
        }
    });
}

function uniqBy(array, key)
{
        var seen = {};
        return array.filter(function(item) {
                var k = key(item);
                return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
}

setTimeout(function() { // avoid java.lang.ClassNotFoundException

	Java.perform(function() {

		console.log("first entering selector")
		trace("com.example.mysecondapp.MainActivity");
		//trace("exports:*!open*");
		//trace("exports:*!write*");
		//trace("exports:*!malloc*");
		//trace("exports:*!free*");

	});
}, 0);