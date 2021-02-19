#!/usr/bin/env python2
# -*- coding: utf-8 -*-
import frida , sys#select book_author,book_name from books_table
 
jscode = """
Java.perform(function () {
    send("Hook start..");
    
    var test = Java.use('com.example.mybackup.Test');
    var k;
    test.getSign.implementation = function () {
        send("getSign Function implemented");
        k = test.getSign.apply(this,arguments);
        send("Password is : " + k);

        return k;
    }

    var demo = Java.use('com.example.mybackup.BooksDB');
    var db;
    demo.getReadableDatabase.implementation = function (k) {
        send("getReadableDatabase Function implemented");
        db = this.getReadableDatabase(k);
        if(db != null)
            send('DB got');
        var S = Java.use("java.lang.String");
        var sql = S.$new("select book_author,book_name from books_table");
        var cursor = db.rawQuery(sql,null);
        if(cursor!=null)
            send('cursor got');
        /*cursor.getString(0);
        while(cursor.moveToNext()) {
            send("Result : " + cursor.getString(0));
        }
        Java.choose("net.sqlcipher.Cursor" , {
            onMatch : function(instance){
                console.log("Found instance: "+instance);
            },
            onComplete:function(){}
        });*/
        var class_cursor = Java.use("android.database.Cursor");
        cursor = Java.cast(cursor,class_cursor);
        while(cursor.moveToNext()) {
            send("Result : " + cursor.getString(0));
        }

        return db;
    }

    demo.$init.implementation = function (a) {
        send("$init Function implemented");
        return this.$init(a);
    }



});
"""
def on_message(message, data):
    if message['type']=='send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)

device = frida.get_usb_device()
pid = device.spawn(['com.example.mybackup'])
process = device.attach(pid)
 
script = process.create_script(jscode)
 
script.on("message", on_message)
script.load()
device.resume(pid)
sys.stdin.read()