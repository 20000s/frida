import frida,sys
device = frida.get_usb_device()
pid = device.spawn(["com.ctf.vezel"])
device.resume(pid)
session = device.attach(pid)
with open("1.js") as f:
    script = session.create_script(f.read());

def on_message(message,data):
    if(message['type'] == "send"):
        print("[*] {0}".format(message["payload"]))
    else:
        print(message)
script.on("message",on_message)
script.load()
sys.stdin.read()