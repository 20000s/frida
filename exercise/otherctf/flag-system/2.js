Java.perform(function(){
    send("start hooking");
    var test = Java.use("com.example.mybackup.Test");
    var k;
    test.getSign.implementation = function(a){
        send("functon implementaed");
        k = this.getSign(a);
        send("key:"+k);
        return k;
    }
    send("start hooking readbase");
    var demo = Java.use("com.example.mybackup.BooksDB");
    var db;
    demo.getReadableDatabase.implementation = function(a){
        db = this.getReadableDatabase(a);
        send("maybe i can hook database");
        if(db != null)
        send("db got");
        var string_class = Java.use("java.lang.String");
        var sql = string_class.$new("select book_author,book_name from books_table");
        var cursor = db.rawQuery(sql,null);
        var class_curor = Java.use("android.database.Cursor");
        cursor = Java.cast(cursor,class_curor);
        while(cursor.moveToNext()){
            send("Result:" + cursor.getString(0));
        }
        return db;
    }

});