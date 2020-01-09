//游戏tab选择
gametype=0;
$(".gametabs").click(function(){
   index_tabs=$(this).attr("info_data");
   $(".current").removeClass("current");
   $(this).addClass("current");
    if(index_tabs==0){
        $(".headtab0").show();
        $(".headtab1").hide();
        $(".headtab2").hide();
        $(".headtab3").hide();
        gametype=0;
    }else if(index_tabs==1){
        $(".headtab0").hide();
        $(".headtab1").show();
        $(".headtab2").hide();
        $(".headtab3").hide();
        gametype=1;
    }else if(index_tabs==2){
        $(".headtab0").hide();
        $(".headtab1").hide();
        $(".headtab2").show();
        $(".headtab3").hide();
        gametype=2;
    }

});

//大小单双

$(".dsdx_num").click(function(){
    $(this).addClass('on').siblings('div').removeClass('on');
    console.log($(this).attr('data'));
});
$(".ddxd_num").click(function(){
    $(this).addClass('on').siblings('div').removeClass('on');
    console.log($(this).attr('data'));
});


//龙虎选择开始
$(".gamelh").click(function(){
    $(this).addClass('on').siblings('div').removeClass('on');
});
$(".dmnum").click(function(){
    xxiazhuxuanze(this);
});
//龙虎选择结束
saolei_num=0;
//扫雷
$(".slnum").click(function(){
    //$(this).addClass('on').siblings('li').removeClass('on');
      if($(this).attr('rel')==0){
        if(saolei_num==5){
            layer.open({
                content: "最多同时选5个雷号哟"
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
           	 });
        $(".wlbhs").show();
        $(".Prompt").show();
        return false;
        }
        $(this).addClass("on");
        $(this).css('background','rgb(18, 183, 245)');
        $(this).css('color','rgb(255, 255, 255)');
        $(this).attr('rel',1);
        saolei_num++;
    }else{
        $(this).removeClass("on");
        $(this).css('background','rgb(234, 236, 236)');
        $(this).css('color','#12B7F5');
        $(this).attr('rel',0);
        saolei_num--;
    }
})
tmnewarr = [];
dwnewarr = [];
dmnewarr = [];
newarr= [];
$(".tmnum").click(function(){
    xxiazhuxuanze(this);
});

//下注金额增加
$(".tmadd").click(function(){
    $("#tmmoney").val();
    tmmoneys=Number($("#tmmoney").val())+Number(2);
    $("#tmmoney").val(tmmoneys);
});
$(".dwadd").click(function(){
    $("#lhmoney").val();
    tmmoneys=Number($("#lhmoney").val())+Number(2);
    $("#lhmoney").val(tmmoneys);
});
$(".lhadd").click(function(){
    $("#slmoney").val();
    tmmoneys=Number($("#slmoney").val())+Number(2);
    $("#slmoney").val(tmmoneys);
});

//下注数据提交
$(".tm_gopost").click(function(){
    var numbernan = $(".game_tm_num>.on").attr('data');
    tmnewarr = numbernan;
    ajax_game(tmnewarr);
});

var setTime;
$(document).ready(function(){
    var time=parseInt($("#time").text());
    setTime=setInterval(function(){
        if(time<=0){
            console.log("gogo");
            //time=60;
            $("#kjinfos").text("开奖中...");
            $("#kjinfoss").text("...");
            $('#time').hide();
            for(var i=0; i<$(".slnum").length;i++){    
                    $('.game_kj_num').eq(i).css('background',rndColor());
            }
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
        $("#time").text(time);
    },1000);
});

function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
    this.splice(index, 1);
    }
};
function xxiazhuxuanze(thiss){
    if($(thiss).attr('rel')==0){
        $(thiss).addClass("on");
        $(thiss).css('background','rgb(246, 96, 96)');
        $(thiss).css('color','rgb(255, 255, 255)');
        $(thiss).attr('rel',1);
    }else{
        $(thiss).removeClass("on");
        $(thiss).css('background','rgb(234, 236, 236)');
        $(thiss).css('color','#F66060');
        $(thiss).attr('rel',0);
    }
}

function iftime3(){
    var times=parseInt($("#time").text());
    if(times<=3){
        layer.open({
            content: '不好意思，本期下注已结束！'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
        return 2;
    }
    return 1;
}
usermoney=user_money;
function ajax_game(ajaxarr){
    if(iftime3()==2){
        return false;
    }
    if(gametype==0){
        //如果下注大小单双
        if(ajaxarr!='s0' && ajaxarr!='s1' && ajaxarr!='s2' && ajaxarr!='s3'){
            layer.open({
                content: '下注选择错误'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        //判断余额是否足够下注
        xzjines=Number($(".xzjine").text());
        if(xzjines>usermoney){
            layer.open({
                content: '您的金额不足您这次竞猜！'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }

    }else if(gametype==1){
        //如果下注龙虎
        if(ajaxarr!="l0" && ajaxarr!="l1" && ajaxarr!="l2"){
            layer.open({
                content: '下注选择错误'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        //判断余额是否足够下注
         xzjines=Number($("#lhmoney").val());
        if(xzjines>usermoney){
            layer.open({
                content: '您的金额不足您这次下注！'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        if(Number($("#lhmoney").val())==0){
            layer.open({
                content: '请填写每注金额！'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
    }else if(gametype==2){
        //如果下注扫雷
        xiazhuarr=ajaxarr.length;
      	if(xiazhuarr>5){
            layer.open({
                content: '下注选择错误请刷新页面！'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        if(xiazhuarr<1){
            layer.open({
                content: '请选择下注雷号'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        xzjines=Number($("#slmoney").val());
        if(xzjines>usermoney){
            layer.open({
                content: '您的金额不足您这次下注！'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
        if(Number($("#slmoney").val())<=0){
            layer.open({
                content: '请填写每注金额！'
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return false;
        }
    }
    console.log(gametype);
    console.log(ajaxarr);
    get_xiazhu(ajaxarr);
}

$("#jia").click(function(){
           x = $("#total_hand").text();
           x++;
           if (x > 100) { return false; };
           $('#total_hand').text(x);
           $(".xzjine").text(x);
           $('.yjsy').text(1.9*x);
});
$("#jian").click(function(){
           x = $("#total_hand").text();
           x--
           if (x < 1) { return false; };
           $('#total_hand').text(x);
           $(".xzjine").text(x);
           $('.yjsy').text(1.9*x);
});
$("#yzmax").click(function(){
           x = 100;
           if (x > 100) { return false; };
           $('#total_hand').text(x);
           $(".xzjine").text(x);
           $('.yjsy').text(1.9*x);
});
$("#yzmin").click(function(){
           x = 1;
           if (x < 1) { return false; };
           $('#total_hand').text(x);
           $(".xzjine").text(x);
           $('.yjsy').text(1.9*x);
});
function get_xiazhu(getxiazhu){
    $.ajax({
        url:"/index/api/newget.html",
        type:'post',
        dataType:'json',
        data:{
            game_types:gametype,
            number: getxiazhu,
          	money: xzjines,
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
          }
          document.getElementById('userxzlist').contentWindow.location.reload(true);  
        }
    });
}

function rndColor(){
    var r=rn(220,255);
    var g=rn(80,255);
    var b=rn(10,30);
    return "rgb("+r+","+g+","+b+")";
}
function rn(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
};