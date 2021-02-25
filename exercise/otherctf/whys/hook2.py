import frida,sys

def on_message(message,data):
    if(message["type"]== "send"):
        print("[*]{0}".format(message["payload"]))
    else:
        print(message)

jscode = """
function stringToBytes(str){
    var ch,st,re = [];
    for(var i = 0 ; i < str.length; ++i) {
        ch = str.charCodeAt(i);
        st = [];
        do{
            st.push(ch & 0xff);
            ch = ch >>8;
        }while(ch);
        re = re.concat(st.reverse());
    }
    return re;

}

function byteToString(arr) {
    if(typeof arr === "string") {
        return arr;
    }
    var str = "";
    var _arr = arr;
    for(var i = 0 ; i < _arr.length;++i) {
        var one = _arr[i].toString(2);
          var  v = one.match(/^1+?(?=0)/);
        if(v && one.length == 8){
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for( var st =1 ; st < bytesLength ; st++) {
              store += _arr[st + i].toString(2).slice(2); 
            }
            str += String.fromCharCode(parseInt(store,2));
            i += bytesLength -1;
        } else {
           str += String.fromCharCode(_arr[i]);   
        }
    }
    return str;
}
 
Java.perform(function(){
    var hook_activity = Java.use("de.fraunhofer.sit.premiumapp.LauncherActivity");
    var MainActivity = Java.use("de.fraunhofer.sit.premiumapp.MainActivity");
    var LicenseStr = "LICENSEKEYOK";
    hook_activity.getKey.implementation = function() {
        var Mac = this.getMac();
        var instance = MainActivity.$new();
        var MacByte = stringToBytes(Mac);
        var LicenseByte = stringToBytes(LicenseStr);
        send("MacByte:" + MacByte);
        send("LicenseByte:" + LicenseByte);
        var xorResult = instance.xor(MacByte,LicenseByte);
        send(xorResult);
        var Key = byteToString(xorResult);
        send(Key);
        return Key;
    }
    hook_activity.verifyClick.implementation = function(v){
        this.showPremium(v);
    }
   
});
"""
process = frida.get_usb_device().attach("de.fraunhofer.sit.premiumapp")
script = process.create_script(jscode)
script.on("message",on_message)
script.load()
sys.stdin.read()
