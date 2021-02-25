function traceClass(targetClass){
    var hook = Java.use(targetClass);
//利用反射的方式 
    var methods = hook.class.getDeclaredMethods();
    hook.$dispose;

    var parsedMethods = [];
    methods.forEach(function(method) {
        parsedMethods.push(method.toString().replace(targetClass + ".", "TOKEN").match(/sTOKEN(.*)(/)[1]);
    });
    var targets = uniqBy(parsedMethods, JSON.stringify);
    //对数组中所有的方法进行hook，traceMethod也就是第一小节的内容
      targets.forEach(function(targetMethod) {
          traceMethod(targetClass + "." + targetMethod);
      });

}