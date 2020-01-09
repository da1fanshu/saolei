//大小单双选择
$(".dx_num").click(function(){
    $(this).addClass('on').siblings('div').removeClass('on');
    console.log($(this).attr('data'));
});
//龙虎
$(".lh_num").click(function(){
    $(this).addClass('on').siblings('div').removeClass('on');
  	var numbernan = $(".set_xuantype>.on").attr('data');
  	if(numbernan=="l2"){
          	x = $("#count").val();
            $('#count').val(x);
            $(".xzjine").text(x);
            lhnumbei=8*x;
            $('.yjsy').text(lhnumbei.toFixed(2));
    }else{
        	x = $("#count").val();
            $('#count').val(x);
            $(".xzjine").text(x);
            lhnumbei=1.9*x;
            $('.yjsy').text(lhnumbei.toFixed(2));
    }
    console.log($(this).attr('data'));
});
//牛牛
$(".nn_num").click(function(){
    $(this).addClass('on').siblings('div').removeClass('on');
    console.log($(this).attr('data'));
});
$(".jia").click(function(){
  		var numbernan = $(".set_xuantype>.on").attr('data');
  		if(numbernan=="l2"){
          	x = $("#count").val();
            x++;
            if (x > 100) { return false; };
            $('#count').val(x);
            $(".xzjine").text(x);
            lhnumbei=8*x;
            $('.yjsy').text(lhnumbei.toFixed(2));
        }else{
        	x = $("#count").val();
            x++;
            if (x > 100) { return false; };
            $('#count').val(x);
            $(".xzjine").text(x);
            lhnumbei=1.9*x;
            $('.yjsy').text(lhnumbei.toFixed(2));
        }
});
$(".jian").click(function(){
  	var numbernan = $(".set_xuantype>.on").attr('data');
  	if(numbernan=="l2"){
      x = $("#count").val();
      x--;
      if (x < 1) { return false; };
      $('#count').val(x);
      $(".xzjine").text(x);
      lhnumbei=8*x;
      $('.yjsy').text(lhnumbei.toFixed(2));
    }else{
    	x = $("#count").val();
        x--;
        if (x < 1) { return false; };
        $('#count').val(x);
        $(".xzjine").text(x);
        lhnumbei=1.9*x;
        $('.yjsy').text(lhnumbei.toFixed(2));
    }
});
//大小下注点击
$(".postget").click(function(){
    var nubs = $(".set_xuantype>.on").attr('data');
    var xzjines=Number($(".xzjine").text());
    if(xzjines>usermoney){
        showDefault("金币不足！");
        return false;
    }
    if(nubs!='s0' && nubs!='s1' && nubs!='s2' && nubs!='s3'){
        showDefault("数据错误！");
        return false;
    }
    var types=0;
    ajax_game(nubs,xzjines,types);
});
//龙虎
$(".postgetlh").click(function(){
    var nubs = $(".set_xuantype>.on").attr('data');
    var xzjines=Number($(".xzjine").text());
    if(xzjines>usermoney){
        showDefault("金币不足！");
        return false;
    }
    if(nubs!='l0' && nubs!='l1' && nubs!='l2'){
        showDefault("数据错误！");
        return false;
    }
  	var types=1;
    ajax_game(nubs,xzjines,types);
});
//牛牛
$(".postgetnn").click(function(){
    var nubs = $(".set_xuantype>.on").attr('data');
    var xzjines=Number($(".xzjine").text());
    if(xzjines>usermoney){
        showDefault("金币不足！");
        return false;
    }
    if(nubs!='n1' && nubs!='n8' && nubs!='n2' && nubs!='n3' && nubs!='n4' && nubs!='n5' && nubs!='n6' && nubs!='n7'){
        showDefault("数据错误！");
        return false;
    }
  	var types=2;
    ajax_game(nubs,xzjines,types);
});
$('input').bind('input propertychange', function() {
    var maxnum=$(this).val();
    if(maxnum>=100){
        $('#count').val(100);
        maxnum=100;
        $(".xzjine").text(maxnum);
        lhnumbei=1.9*maxnum;
        $('.yjsy').text(lhnumbei.toFixed(2));   
        return false;
    }
    if(maxnum<1){
        $('#count').val(1);
        maxnum=1;
        $(".xzjine").text(maxnum);
        lhnumbei=1.9*maxnum;
        $('.yjsy').text(lhnumbei.toFixed(2));   
        return false;
    }
    $(".xzjine").text(maxnum);
    lhnumbei=1.9*maxnum;
    $('.yjsy').text(lhnumbei.toFixed(2));   
});

var setTime;
$(document).ready(function(){
    var time=parseInt($("#time").text());
    setTime=setInterval(function(){
        if(time<=0){
            console.log("gogo");
            //time=60;
            $('.font18').text('开奖中');
            $('.kjing').hide();
            $('.kjing_view').show();
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
function iftime3(){
    var times=parseInt($("#time").text());
    if(times<=10){
        showDefault("本期已封盘!");
        return 2;
    }
    return 1;
}

function ajax_game(ajaxarr,xzjines,types){
    if(iftime3()==2){
        return false;
    }
    gametype=types;
    getxiazhu=ajaxarr;
    get_xiazhu(getxiazhu,gametype,xzjines);
}

function get_xiazhu(getxiazhu,gametype,xzjines){
    $.ajax({
        url:"/index/api/newget.html",
        type:'post',
        dataType:'json',
        data:{
            game_types:gametype,
            number: getxiazhu,
          	money:xzjines,
          	newpays:newpays
        },
        success:function(res) {
          if(res['code']==1){   //已中奖
           $(".userjinesss").text(res['userjine']);
            sesstrue(res['info']);
          }else if(res['code']==0){
            showDefault(res['info']);
          }else if(res['code']==2){
            showDefault(res['info']);
            setTimeout(function (){
              location.reload();
          	}, 1000);
          }
          document.getElementById('userxzlist').contentWindow.location.reload(true);  
        }
    });
}