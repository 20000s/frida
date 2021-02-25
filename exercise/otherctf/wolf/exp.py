import frida,sys
def on_message(message,data):
    if(message["type"] == "send"):
        print("[*]{0}".format(message["payload"]))
    else:
        print(message)


device = frida.get_usb_device()
pid = device.spawn(["com.wolf.ndktest"])
device.resume(pid)
session = device.attach(pid)
with open("exp.js") as f:
    script = session.create_script(f.read())
script.on("message",on_message)
script.load()
sys.stdin.read()