
    setImmediate(function(){
    console.log("[*] Starting script");
    Java.perform(function() {
    Java.use("com.droider.crackme0201.MainActivity").checkSN.implementation=function(s1,s2){
        console.log("[*] checkSN() called");
        console.log("[*] s1: " + s1);
        console.log("[*] s2:" + s2);return true;
    };
    console.log("[*] onClick handler modified");
});
}); 