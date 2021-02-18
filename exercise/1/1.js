function learn(){
    console.log("hook successfully")
    Java.perform(function(){
        console.log("perform successfully")
        var vvvv = Java.use("com.kanxue.pediy1.VVVVV")
        console.log("attach succeddfulyy")
        vvvv.VVVV.implementation = function(context,input){
            console.log("input: ",input)
            for(var a = '0' ; a <='9'; a++)
            {
                for(var b = '0' ; b <= '9' ; b++)
                {
                    for(var c = '0'; c <= '9'; c++)
                    {
                        for(var d = '0'; d <= '9' ; d++)
                        {
                            for(var f = '0'; f <= '9' ;f++){
                                var string_class = Java.use("java.lang.String")
                                var new_input = string_class.$new(a.toString()+b.toString()+c.toString()+d.toString()+f.toString())
                                console.log("new_input:",new_input)
                                var result = this.VVVV(context,new_input)
                                if(result == true)
                                {
                                    console.log("flag:",new_input)
                                    return true
                                }
                            }
                        }
                    }

                }
            }
        }
    });
}
setTimeout(learn)