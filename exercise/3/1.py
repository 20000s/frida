import frida,sys

device = frida.get_usb_device()
pid = device.spawn(["com.kanxue.pediy1"])
device.resume(pid)
session = device.attach(pid)
with open("1.js") as f:
    script = session.create_script(f.read())
script.load()
sys.stdin.read()
