money=5;
cm_sl=0;
jqrxz=0;
$(".tzjine").click(function(){
    $(this).addClass('on').siblings('div').removeClass('on');
    money=$(this).attr('data');
    console.log($(this).attr('data'));
});
$(".showgamesm").click(function(){
      $(".gamesm").addClass("show");
});
$(".hidesm").click(function(){
  	$('.gamesm').removeClass('show');
});
$("#zj1").mousedown(function(e){
    if(iftime3()==2){
        return false;
    }
    if(ifmoney(money)==2){
        return false;
    }
    xiazhu(1,e.pageX,e.pageY)
});
$("#xj1").mousedown(function(e){	//庄
    if(iftime3()==2){
        return false;
    }
    if(ifmoney(money)==2){
        return false;
    }
    xiazhu(2,e.pageX,e.pageY)
});
function xiazhu(lx,x,y){
	if(lx==1){
		var newtype=1;
	}else if(lx==2){
		var newtype=2;
	}
    cm_sl = cm_sl + 1;
	money=$(".tzmoney>.on").attr('data');
	$.ajax({
	    url:"/index/kaijiang/payget.html",
	    type:'post',
	    dataType:'json',
	    data:{
	        money:money,
			gametype:newtype,
          	x:x,
          	y:y
	    },
	    success:function(res) {
	        if(res['code']==1){
              	 layer.open({
                    content: res['info']
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                });
	        }else if(res['code']==2){
            	$(".bgmoney").append('<img id="cm_'+ cm_sl +'" src="/static/19game/images/money/max'+money+'.png" style="height:.32rem;border: 2px solid #D3D3D3; border-radius:50%; overflow:hidden;opacity:0;position: absolute; left:2%;top:100%"   />');
                $("#cm_"+cm_sl).animate({
                    left:(x-15)+'px',
                    top:(y-15)+'px',
                    opacity:'1',
                    height:'30px',
                    width:'30px',
                });
            //下注成功
               document.getElementById('userxzlist').contentWindow.location.reload(true);  
            }
	    }   
	});
}
//倒计时
//是时间
var setTime;
$(document).ready(function(){
    var time=parseInt($("#time").text());
    setTime=setInterval(function(){
        if(time<=0){
            //time=60;
            $("#kjsjhide").hide();
            $("#kjsjshow").fadeIn(200);
            $('.info_btn').hide();
            $('.newshow').show();
            $.ajax({
                url:"/index/kaijiang/getopen.html",
                type:'post',
                dataType:'json',
                data:{
                    code:dqterm
                },
                success:function(res) {
                    if(res['code']==1){
                      	 cle_xz();
            			fa_pai(res['zj1'],res['zj2'],res['xj1'],res['xj2'],res['nzj1'],res['nzj2']);
                      	$('#zjsf').text(res['sf']+res['zjds']);
                      	$('#xjsf').text(res['sf1']+res['xjds']);
                      	$('#nzjsf').text(res['sf2']+res['nzjds']);
                      	 setTimeout(function(){
							location.reload();
    					}, 5000);
                        
                    }
                }   
            });
        }
      	getnewpay();
        time--;
      	if(time>=4){
            var jqr=Math.floor(Math.random()*4); 
            if(jqr==1){
               var gtypes = ["#zj1","#xj1"]; 
               gtypes=gtypes[Math.floor(Math.random()*gtypes.length)];
              jqrxz= jqrxz + 1;
               var lx_top = $(gtypes).position().top  + 10
               var lx_left = $(gtypes).position().left + 10
               var test = ["2","10","20","50","200"]; 
               var jines=test[Math.floor(Math.random()*test.length)];
               if(gtypes=="#zj1"){
                  $(".bgmoney").append('<img id="jqr_'+ jqrxz +'" src="/static/19game/images/money/max'+jines+'.png" style="height:.32rem;border: 2px solid #D3D3D3; border-radius:50%; overflow:hidden;opacity:0;position: absolute; left:2%;top:100%"   />');
                    $("#jqr_"+jqrxz).animate({
                        left:(GetRandomNum(5, 30))+'%',
                        top:(GetRandomNum(16, 22))+'%',
                        opacity:'1',
                        height:'30px',
                        width:'30px',
                 });
                }else if(gtypes=="#xj1"){
                 $(".bgmoney").append('<img id="jqr_'+ jqrxz +'" src="/static/19game/images/money/max'+jines+'.png" style="height:.32rem;border: 2px solid #D3D3D3; border-radius:50%; overflow:hidden;opacity:0;position: absolute; right:2%;top:100%"   />');
                    $("#jqr_"+jqrxz).animate({
                        right:(GetRandomNum(5, 30))+'%',
                        top:(GetRandomNum(16, 22))+'%',
                        opacity:'1',
                        height:'30px',
                        width:'30px',
                 });
                }
            }
        }
        $('.times').text(time);
        $("#time").text(time);
    },1000);
});
function iftime3(){
    var times=parseInt($("#time").text());
    if(times<=5){
        layer.open({
            content: '不好意思，本期下注已结束！'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
        return 2;
    }
    return 1;
}
function ifmoney(money){
    var usermoney=Number($('#moneys').text());
	money=$(".tzmoney>.on").attr('data');
    console.log(money);
	 console.log(usermoney);
    if(usermoney<money){
        layer.open({
            content: '余额不足'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
        return 2;
    }
  	var new2019jine=usermoney-money;
    $('#moneys').text(new2019jine.toFixed(2));
}
//清理下注抽显示
cm_sl_start=1;
cm_jqr_start=1;
function cle_xz(){
    for (i=cm_sl_start;i<=cm_sl;i++){
        $("#cm_"+i).animate({
           left:'90%',
           top:'200%',
           opacity:'1',
           height:'30px',
           width:'30px',
         },500+(i - cm_sl_start+1)*10,'');
   }
   for (i=cm_jqr_start;i<=jqrxz;i++){
        $("#jqr_"+i).animate({
           left:'90%',
           top:'200%',
           opacity:'1',
           height:'30px',
           width:'30px',
         },500+(i - cm_sl_start+1)*10,'');
   }
}
//发牌
function fa_pai(p1,p2,p3,p4,p5,p6){
    //显示背面
    beipai();
    //显示点
    setTimeout(function(){
        for(i=1;i<=6;i++){
            if(i==1){
                $(".pai_show").append('<img id="paix1" src="/static/19game/images/pai/'+ p1 +'.png" style="z-index: 2;display:none;position: absolute;width: 15%;left: 3.5%;top: 18%;">');
            }else if(i==2){
                $(".pai_show").append('<img id="paix2" src="/static/19game/images/pai/'+ p2 +'.png" style="z-index: 2;display:none;position: absolute;width: 15%;left: 19%;top: 18%;">');
            }else if(i==3){
                $(".pai_show").append('<img id="paix3" src="/static/19game/images/pai/'+ p3 +'.png" style="z-index: 2;display:none;position: absolute;width: 15%;right: 3.5%;top: 18%;">');
            }else if(i==4){
                $(".pai_show").append('<img id="paix4" src="/static/19game/images/pai/'+ p4 +'.png" style="z-index: 2;display:none;position: absolute;width: 15%;right: 19%;top: 18%;">');
            }else if(i==5){
                $(".pai_show").append('<img id="paix5" src="/static/19game/images/pai/'+ p5 +'.png" style="z-index: 2;display:none;position: absolute;width: 12%;left: 38%;top: 22%;">');
            }else if(i==6){
                $(".pai_show").append('<img id="paix6" src="/static/19game/images/pai/'+ p6 +'.png" style="z-index: 2;display:none;position: absolute;width: 12%;right: 38%;top: 22%;">');
            }
        }
        for(i=1;i<=6;i++){
            $("#pai"+i).fadeOut(200);
            $("#paix"+i).fadeIn(300);
			$(".kj_shengfu").fadeIn(300);
			$(".kj_shengfu1").fadeIn(300);
          	$(".kj_shengfu2").fadeIn(300);
        }
    }, 2000);
   
}
function beipai(){
    for(i=1;i<=6;i++){
        if(i==1){
            $("#pai"+i).animate({
                left:'3.5%',
                top:'18%',
                opacity:'1',
            });
        }else if(i==2){
            $("#pai"+i).animate({
                left:'19%',
                top:'18%',
                opacity:'1',
            });
        }else if(i==3){
            $("#pai"+i).animate({
                right:'3.5%',
                top:'18%',
                opacity:'1',
            });
        }else if(i==4){
            $("#pai"+i).animate({
                right:'19%',
                top:'18%',
                opacity:'1',
            });
        }else if(i==5){
            $("#pai"+i).animate({
                right:'38%',
                top:'22%',
                opacity:'1',
            });
        }else if(i==6){
            $("#pai"+i).animate({
                left:'38%',
                top:'22%',
                opacity:'1',
            });
        }
        
    }
}
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}
function getnewpay() {
   	            $.ajax({
                url:"/index/kaijiang/getnewpay.html",
                type:'post',
                dataType:'json',
                data:{
                    code:1
                },
                success:function(res) {
                    if(res['code']==1){
                      if(res['user']!=userid){
                         	cm_sl = cm_sl + 1;
							 $(".bgmoney").append('<img id="cm_'+ cm_sl +'" src="/static/19game/images/money/max'+parseInt(res['money'])+'.png" style="height:.32rem;border: 2px solid #D3D3D3; border-radius:50%; overflow:hidden;opacity:0;position: absolute; right:2%;top:100%"   />');
                              $("#cm_"+cm_sl).animate({
                                  left:(res['x'])+'px',
                                  top:(res['y'])+'px',
                                  opacity:'1',
                                  height:'30px',
                                  width:'30px',
                           });
                      }
                    }
                }   
            });
}
