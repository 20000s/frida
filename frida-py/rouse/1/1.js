Java.enumerateLoadedClasses(callbacks) //模仿所有类被加载,cakkbacks要具体

onMatch(name,handle) //name类的名字 加载类时对类做的操作
OnComplete()//所有类加载模拟完后做的事
//example
Java.enumerateLoadedClasses({onMatch(name,handle){},onComplete(){}
});

//枚举所有的类
Java.perform(function(){
    Java.enumerateLoadedClasses({
        onMatch : function(_className){
            console.log("[*] found instance of" + _className + "'");
        },
        onComplete: function(){
            console.log("[*] class enuemration complete");
        }
    });
});

// 定位目标类并打印类的实例
Java.enumerateLoadedClasses({
    onMatch : function(instance){
        if(instance.split(".")[1] == "bluetooth"){
            console.log("[->]\t" + instance);
        }
    },
    onComplete : function(){
   console.log("[*] class enuemration complelte");
    }
});

/**
 * Java.choose(className,callbacks) 模拟指定的类，对他们执行callbacks
 *  onMatch(instance)
 *  onComplete()
 */
//定位研究的类后，打印类的实例
Java.choose("android.bluetooth.BluetoothDevice",{
    onMatch: function(instance){
        console.log("[*]" + "android.bluetooth,BluetoothDevice instance found" + ":=>" + instance + "'");
        bluetoothDeviceInfo(instance);
    },
    onComplete: function(){
        console.log("[*]---------");
    }
});
/**
 * 枚举所有的方法并定位方法
 *   Java.use(classname) 新建一个类
 *    Java.use()会新建一个对象，而java.choose会选择内存中的实例
 *  array.forEach(callback[, thisObject]);
 */
function enumMethods(targetClass)
{
    var hook = Java.use(targetClass);
    var ownMethods = hook.class.getDeclaredMethods();
    hook.$dispose;
    return ownMethods;

}

var a = enumMethods("android.bluetooth.BluetoothDevoce");
a.forEach(function(s){
    console.log(s);
});
    
/**
 * 综合练习
 */

 setTimeout(function(){
     Java.perform(function(){
         Java.enumerateLoadedClasses({
                 onMatch: function(instance){
                     if(instance.split(".")[1] == "bluetooth"){
                         console.log("[->]\t" + lightBlueCursor() + instance + closeCursor());
                     }
                 },
                 onComplete:function(){}
         });
        Jva.choose("android.bluetooth.BluetoothGattServer",{
            onMatch: function(){},
            onComplete: function() {console.log("[*]----");}
        });
        Java.choose("android.bluetooth.BluetoothGattService",{
            onMatch: function (instance){
                ...
            onComplete: function() { console.log("[*] -----");}
        });

     Java.choose("android.bluetooth.BluetoothSocket",{
            onMatch: function (instance){
                ...
            onComplete: function() { console.log("[*] -----");}
        });

      Java.choose("android.bluetooth.BluetoothServerSocket",{
            onMatch: function (instance){
                ...
            onComplete: function() { console.log("[*] -----");}
        });

      Java.choose("android.bluetooth.BluetoothDevice",{
            onMatch: function (instance){
                ...
            onComplete: function() { console.log("[*] -----");}
        });
        });
 });