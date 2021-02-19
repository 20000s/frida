Java.perform(function(){
    send("start hooking");
    var mainactivity = Java.use("com.ctf.vezel.MainActivity");
    var b;
    
    mainactivity.getSig.implementation = function(a){
        send("i can hook sig" + a);
         b = this.getSig(a);
         send("b =" + b.toString())
         return b;
    }
    var c;
    mainactivity.getCrc.implementation = function(){
        send("i can hook crc");
        c = this.getCrc();
        send("c = " + c.toString())
        return c;
    }
    var d = b +c;
  send("flag :" + d.toString())
 
});