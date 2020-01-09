$('#ClickMe').click(function() {
    $('#goodcover').show();
    $('#code').fadeIn();
});
$('#goodcover').click(function() {
    $('#goodcover').hide();
    $('#code').fadeOut();
});
function resetTabs(obj) {
	$(obj).parent().parent().next("div").find("div").hide();
	$(obj).parent().parent().find("a").removeClass("current");
}
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
$('#two_type i').click(function(){
    $('#two_type i').removeClass('ifocus');
    $(this).addClass('ifocus');
});

$('#two_num i').click(function(){
    $('#two_num i').removeClass('ifocus');
    $(this).addClass('ifocus');
    var num=$(this).html();
    $('#two_input_num').val(num);
    change_money_total('two');
});
//龙虎选择
$('#four_type i').click(function(){
    $('#four_type i').removeClass('ifocus');
    $(this).addClass('ifocus');
});


$('#four_num i').click(function(){
    $('#four_num i').removeClass('ifocus');
    $(this).addClass('ifocus');
    var num=$(this).html();
    $('#four_input_num').val(num);
    change_money_total('four');
});

//牛牛选择
$('#ten_type i').click(function(){
    $('#ten_type i').removeClass('ifocus');
    $(this).addClass('ifocus');
});


$('#ten_num i').click(function(){
    $('#ten_num i').removeClass('ifocus');
    $(this).addClass('ifocus');
    var num=$(this).html();
    $('#ten_input_num').val(num);
    change_money_total('ten');
});
$('.sm1').click(function(){
    $('.game_sm').addClass('show');
});
$('.newclose').click(function(){
    $('.game_sm').removeClass('show');
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
    var current_num=parseInt($('#'+type+'_input_num').val());
    if(current_num<2){return false;}
    var new_num=current_num-1;
    $('#'+type+'_input_num').val(new_num);
    change_money_total(type);
}

function add_num(type){
    var current_num=parseInt($('#'+type+'_input_num').val());
    if(current_num>99){return false;}
    var new_num=current_num+1;
    $('#'+type+'_input_num').val(new_num);
    change_money_total(type);
}

function change_money_total(type){
    var type_price=$('#'+type+'_type .ifocus').attr('data');
    var num=$('#'+type+'_input_num ').val();
    var type_price_arr=type_price.split('_');
    var price=type_price_arr[1];
    var money=num*price;
    if(type=='ten'){
        var number_num=$('#ten_type .ifocus').length;
        money=money*number_num;
    }
    $('#'+type+'_pay_money').html(money.toFixed(2));

    if(num>usermoney){
        $('#'+type+'_button').val('余额不足，去充值');
    }else{
        $('#'+type+'_button').val('开始夺宝');
    }
}

function sell_now(type){
    var times=parseInt($("#time").text());
    if(times<=10){
        $(".endsgames").addClass("show");
      	 return false;
    }
    if(type=='two'){
        var money=$('#'+type+'_input_num').val();
        var nubs = $("#two_type .ifocus").attr('data');
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
        if(num!='s0' && num!='s1' && num!='s2' && num!='s3'){
            layer.open({
                content: '数据错误'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        //alert(num);
        game_type=0;
    }else if(type=='four'){
        var money=$('#'+type+'_input_num').val();
        var nubs = $("#four_type .ifocus").attr('data');
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
        if(num!='l0' && num!='l1' && num!='l2'){
            layer.open({
                content: '数据错误'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        //alert(num);
        game_type=1;
    }else if(type=='ten'){
        var money=$('#'+type+'_input_num').val();
        var nubs = $("#ten_type .ifocus").attr('data');
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
        if(num!='n1' && num!='n8' && num!='n2' && num!='n3' && num!='n4' && num!='n5' && num!='n6' && num!='n7'){
            layer.open({
                content: '数据错误'
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
           $("#gp_money").text(res['userjine']);
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