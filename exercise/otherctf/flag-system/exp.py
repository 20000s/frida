#!/usr/bin/env python2
# -*- coding: utf-8 -*-
import frida , sys#select book_author,book_name from books_table
 
# resume是重启 看情况使用


def on_mesage(message,data):
    if(message['type'] == "send"):
        print("[*] {0}".format(message["payload"]))
    else:
        print(message)

device = frida.get_usb_device()
pid = device.spawn(["com.example.mybackup"])
#device.resume(pid)
session = device.attach(pid)
with open("1.js") as f:
    script = session.create_script(f.read())
script.on("message",on_mesage)
script.load()
device.resume(pid)
sys.stdin.read()

