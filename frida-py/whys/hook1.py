import frida,sys

def on_message(message,data):
    if(message["type"] == "send"):
        print("[*]{0}".format(message["payload"]))
    else:
        print(message)

js_code = """
  Java.perform(function(){
      var hookactivity = Java.use("de.fraunhofer.sit.premiumapp.LauncherActivity");
      hookactivity.showPremium.implementation = function(v){
          var key = this.getKey();
          var Mac = this.getMac();
          send(Mac);
          send(key);
      }
  });
"""
process = frida.get_usb_device().attach("de.fraunhofer.sit.premiumapp")
script = process.create_script(js_code)
script.on("message",on_message)
script.load()
sys.stdin.read()