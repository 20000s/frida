import frida,sys
device = frida.get_usb_device()
pid = device.spawn(["com.droider.demo02"])
device.resume(pid)
session = device.attach(pid)
with open("2.js") as f:
    script = session.create_script(f.read())
def on_message(message,payload):
    print(message,payload)
script.on("message",on_message)
script.load()
sys.stdin.read()
