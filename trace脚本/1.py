#frida -U -f com.whatsapp -l raptor_frida_android_trace_fixed.js --no-pause
import frida,sys
def on_message(message,payload):
    print(message)
    print(payload)

device = frida.get_usb_device()
pid = device.spawn(["com.example.mysecondapp"])
device.resume(pid)
session= device.attach(pid)
with open("raptor_frida_android_trace_fixed.js") as f:
    script = session.create_script(f.read())
script.on("message",on_message)
script.load()
sys.stdin.read()