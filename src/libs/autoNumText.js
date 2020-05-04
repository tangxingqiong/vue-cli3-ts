
export function autoNumText (obj,callback){
    $(document).on('focus',obj,function(){
        if($.trim($(this).val()).length==0){
            $(this).val('1、');
        }
    });

    $(document).on('input propertychange',obj,function(event){
        var qs_number_obj = $(this).siblings('div[class=amount-div]').children('input[name=amount]');

        var text_arr = $(this).val().split("\n");
        var qs_number = qs_number_obj.val();
        if(text_arr.length!=qs_number){
            var temp_string = '';
            if($(this).val().length==0){
                qs_number = 0;
            }else{
                qs_number = text_arr.length;
                //重新整理编号
                for(var i=0;i<text_arr.length;i++){
                    text_arr[i] = $.trim(text_arr[i]);

                    if(text_arr[i].length == 0){
                        text_arr[i] = (i+1)+'、';
                    }else{
                        var pattern = /^\d+\、/;
                        if(pattern.test(text_arr[i])){
                            text_arr[i] = text_arr[i].replace(/^\d+/,(i+1));
                        }else{
                            text_arr[i] = (i+1)+'、'+text_arr[i];
                        }
                    }
                    if(i<text_arr.length-1){
                        temp_string += text_arr[i]+'\n';
                    }else{
                        temp_string += text_arr[i];
                    }
                }
            }
            $(this).val(temp_string);
            qs_number_obj.val(qs_number);
        }
        if($(this).val()==''){
            qs_number = 0;
            qs_number_obj.val(qs_number).parent('div').hide();
        }else{
            qs_number_obj.parent('div').show();
        }
        if(qs_number>5){
            $(this).height(280);
        }
    });
    $(document).on('keyup',obj,function(event){
        if(event.keyCode==13){
            var text_arr = $(this).val().split("\n");
            var temp_string = '';            
            for(var i=0;i<text_arr.length;i++){
                if(text_arr[i].length == 0){
                    text_arr[i] = (i+1)+'、';
                }else{
                    var pattern = /^\d+、/;
                    if(pattern.test(text_arr[i])){
                        text_arr[i] = text_arr[i].replace(/^\d+/,(i+1));
                    }else{
                        text_arr[i] = (i+1)+'、'+text_arr[i];
                    }
                }
                if(i<text_arr.length-1){
                    temp_string += text_arr[i]+'\n';
                }else{
                    temp_string += text_arr[i];
                }
            }
            $(this).val(temp_string);
        }
    });
}