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