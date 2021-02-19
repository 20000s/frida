function test(){
    Java.perform(function(){
      Java.choose("com.kanxue.pediy1.MainActivity",{
          onMatch : function(instance){
                    instance.loadDexClass()
          },
          onComplete: function(){}
      });
      Java.enumerateClassLoaders({
          onMatch : function(loader){
              console.log(loader)
              if(loader.toString().indexOf("dalvik.system.DexClassLoader") != -1){
                  console.log("find loader")
                  Java.classFactory.loader = loader
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
      var func = Java.use("com.kanxue.pediy1.VVVVV")
      console.log("yes  can hook ")
      
          for(var a = '0';a<='9'; ++a)
          {
              for(var b = '0'; b <='9' ; ++b)
              {
                  for(var c = '0' ; c <='9' ; ++c)
                  {
                      for(var d = '0' ; d <='9' ; ++d)
                      {
                          for(var e = '0'; e <='9' ; ++e)
                          {
                              console.log(a.toString() + b.toString() + c.toString() + d.toString() + e.toString())
                              var string_class = Java.use("java.lang.String")
                              var newinput = string_class.$new(a.toString() + b.toString() + c.toString() + d.toString() + e.toString())
                              var result =func.VVVV(newinput)
                              if(result ==true)
                              {
                                  console.log("flag:",newinput)
                                  return true
                              }
                          }
                      }
                  }
              }
          

      }
    });

}
setTimeout(test)