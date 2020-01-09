gametypes=1;
newarr=[];
$('#ClickMe').click(function() {
    $('#goodcover').show();
    $('#code').fadeIn();
});
$('#goodcover').click(function() {
    $('#goodcover').hide();
    $('#code').fadeOut();
});
$('.newcdx').click(function() {
    gametypes=1;
    $('.newinfo1').show();
    $('.newinfo2').hide();
    $('.newcdx').addClass('current');
    $('.newcdm').removeClass('current');
});
$('.newcdm').click(function() {
    gametypes=2;
    $('.newinfo2').show();
    $('.newinfo1').hide();
    $('.newcdm').addClass('current');
    $('.newcdx').removeClass('current');
});

saolei_num=0;
$(".newdm_num").click(function(){
    //$(this).addClass('on').siblings('li').removeClass('on');
    if($(this).attr('rel')==0){
     $(this).addClass("on");
     $(this).attr('rel',1);
     saolei_num++;
    }else{
        $(this).removeClass("on");
        $(this).attr('rel',0);
        saolei_num--;
    }
});

$(".tabs a").on("click", function (e) {
    e.preventDefault();
    if ($(this).attr("class") == "current") {
        return;
    } else {
        resetTabs(this);
        $(this).addClass("current");
        $($(this).attr("name")).fadeIn();
    }
});
//大小选择
$('.newdx_num').click(function(){
    $('.newdx_num').removeClass('on');
    $(this).addClass('on');
});

$('#two_num i').click(function(){
    if(gametypes==1){
        $('#two_num i').removeClass('ifocus');
        $(this).addClass('ifocus');
        var num=$(this).html();
        $('#two_input_num').val(num);
        change_money_total('two');
    }else if(gametypes==2){
        $('#two_num i').removeClass('ifocus');
        $(this).addClass('ifocus');
        var num=$(this).html();
        $('#two_input_num').val(num);
        danma();
        change_money_total(2);
    }
});

$('.sm1').click(function(){
    $('.game_sm').addClass('show');
});
$('.sm2').click(function(){
    $('.game_sm1').addClass('show');
});
$('.newclose').click(function(){
    $('.game_sm').removeClass('show');
});
$('.newclose1').click(function(){
    $('.game_sm1').removeClass('show');
});
//是时间
var setTime;
$(document).ready(function(){
    var time=parseInt($("#time").text());
    setTime=setInterval(function(){
        if(time<=0){
            console.log("gogo");
            //time=60;
            $('.font18').text('开奖中...');
            $('.times').text('开奖中..');
            $('.info_btn').hide();
            $('.newshow').show();
            $.ajax({
                url:"/index/api/getopen.html",
                type:'post',
                dataType:'json',
                data:{
                    code:dqterm
                },
                success:function(res) {
                    if(res['code']==1){
                        location.reload();
                    }
                }   
            });
        }
        time--;
        $('.times').text(time);
        $("#time").text(time);
    },1000);
});

function remove_num(type){
    if(gametypes==1){
        var current_num=parseInt($('#'+type+'_input_num').val());
        if(current_num<2){return false;}
        var new_num=current_num-1;
        $('#'+type+'_input_num').val(new_num);
        change_money_total(type);
    }else if(gametypes==2){
        var current_num=parseInt($('#'+type+'_input_num').val());
        if(current_num<2){return false;}
        var new_num=current_num-1;
        $('#two_input_num').val(new_num);
        danma();
        change_money_total(2);
    }
}

function add_num(type){
    if(gametypes==1){
        var current_num=parseInt($('#'+type+'_input_num').val());
        if(current_num>99){return false;}
        var new_num=current_num+1;
        $('#'+type+'_input_num').val(new_num);
        change_money_total(type);
    }else if(gametypes==2){
        var current_num=parseInt($('#'+type+'_input_num').val());
        if(current_num<2){return false;}
        var new_num=current_num+1;
        $('#two_input_num').val(new_num);
        danma();
        change_money_total(2);
    }

}

function change_money_total(type){
    if(type==2){
        var price=newarr.length;
        var num=$('#two_input_num').val();
        var money=num*price*2.5;
        $('#two_pay_money').html(money.toFixed(2));
        if(num>usermoney){
            $('#two_button').val('余额不足，去充值');
        }else{
            $('#two_button').val('开始夺宝');
        }
    }else{
        var type_price=$('.newxiazhuxuanxiang .on').attr('data');
        var num=$('#'+type+'_input_num ').val();
        var type_price_arr=type_price.split('_');
        var price=type_price_arr[1];
        var money=num*price;
        $('#two_pay_money').html(money.toFixed(2));
        if(num>usermoney){
            $('#two_button').val('余额不足，去充值');
        }else{
            $('#two_button').val('开始夺宝');
        }
    }

}

function sell_now(type){
    var times=parseInt($("#time").text());
    if(times<=10){
        $(".endsgames").addClass("show");
      	return false;
    }
    if(gametypes==1){
        var money=$('#'+type+'_input_num').val();
        var nubs = $(".newxiazhuxuanxiang .on").attr('data');
        var numarr=nubs.split('_');
        var num=numarr[0];
        if(money>usermoney){
            layer.open({
                content: '余额金币不足！'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        if(num!='d' && num!='x' && num!='h' && num!='n' && num!='s'){
            layer.open({
                content: '数据错误'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        //alert(num);
        game_type=1;
    }else if(gametypes==2){
      	danma();
        var price=newarr.length;
        var money=$('#two_input_num').val();
        money=money*price;
        var num=newarr;
        if(money>usermoney){
            layer.open({
                content: '余额金币不足！'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        if(price>10){
            layer.open({
                content: '数据错误'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
      	if(price==""){
            layer.open({
                content: '请选择一个下注哟'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        //alert(num);
        game_type=2;
    }
    //请求后台
    $.ajax({
        url:"/index/api/newget.html",
        type:'post',
        dataType:'json',
        data:{
            game_types:game_type,
            number: num,
          	money:money,
        },
        success:function(res) {
          if(res['code']==1){   //已中奖
           $(".userjinesss").text(res['userjine']);
           layer.open({
            content: res['info']
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
            });
          }else if(res['code']==0){
            layer.open({
                content: res['info']
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
                });
          }else if(res['code']==2){
            layer.open({
                content: res['info']
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            setTimeout(function (){
              location.reload();
          	}, 1000);
          }
          document.getElementById('userxzlist').contentWindow.location.reload(true);  
        }
    });
}
$('.endtc').click(function(){
    $('.ui-dialog').removeClass('show');
});

function danma(){
    newarr=[];
    for(var i=0; i<$(".newdm_num").length;i++){
        if($(".newdm_num").eq(i).attr("rel")==1){
            newarr.push($(".newdm_num").eq(i).attr("data"));      
        }else if($(".newdm_num").eq(i).attr("rel")==0){
            newarr.remove($(".newdm_num").eq(i).attr("data"));
        }  
        console.log(newarr);
    }
}
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
    this.splice(index, 1);
    }
};