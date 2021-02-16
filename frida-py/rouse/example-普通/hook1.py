import frida,sys,time

device = frida.get_usb_device()
#启动"demo02" app
pid = device.spawn(["com.droider.demo345"])
device.resume(pid)
time.sleep(1)
session = device.attach(pid)

with open("1.js") as f:
    script = session.create_script(f.read())
script.load()
sys.stdin.read()