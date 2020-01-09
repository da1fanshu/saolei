var Domain = 'http://'+window.location.host+'/';//域名

//初始化信息
var UserUID = 0;//我的账号
var UserMoney = 0;//我的余额
var UserUIDDOM;
var UserMoneyDOM;
var UserNICKNAME;//我的昵称
//红包接收后的头像地址

//获得发包人id
var senID;
//更新红包信息
var HonbaoRes; 
var hbDOM;
//点红包相关变量
var jialei = 0;//中雷加款
var jialeiArr = new Array();//中雷加款
var syhbid = 0;//红包监控声音
var hb_id = 0;//红包ID
var hb_state = 0;//红包状态
var hb_user = ''//发红包者
var hb_name = '';//红包名
var cztypeArr = '';//充值类型Arr
var cztype = '';//充值类型
var lsyjmoney = 0;
var daymoney = 0;
var Userfuli;
var yjflid = 0;//佣金福利ID
function hb_config(hb_id,hb_state,hb_user,hb_name){
	this.hb_id = hb_id;
	this.hb_state = hb_state;
	this.hb_user = hb_user;
	this.hb_name = hb_name;
	senID = hb_user;
	sessionStorage.setItem("id",senID)
}

function yjfl(id){
	yjflid = id;
}


//机器人
var jqr_qian_time = 0;
var jqr_fa_time = 0;
//顶部充值
var czmoney = 0;
function set_czmoney(czmoney){
	this.czmoney = czmoney;
}

function isToday(str){
    var d = new Date();
    var y = d.getFullYear(); // 年
    var m = d.getMonth() + 1; // 月份从0开始的
    var d = d.getDate(); //日
    var arr=str.split(" ");
    var arr2 = arr[0].split("-");
    if(parseInt(arr2[0])==parseInt(y) && parseInt(arr2[1])==parseInt(m) && parseInt(arr2[2])==parseInt(d)){
    	return true;
    }
    return false;
}


layui.use(['layer', 'form','jquery','element','carousel'], function(){
	var layer = layui.layer
	,$ = layui.$
	,element = layui.element
	,carousel = layui.carousel
	,form = layui.form;
	var timestamp = (new Date()).valueOf();
	//初始化信息
	$.ajax({
		type: 'get',
		url: Domain + 'index/API/Info?timestamp='+timestamp,
		dataType: 'json',
		success: function(result){

			if(result.code!='ok'){alert('初始化错误！');return ;}
			if(result.UserInfo.ban=='1'){
				alert('账户被冻结，请联系管理员！');return ;
			};
			UserUID = result.UserInfo.uid;
			UserIMG = result.UserInfo.img;
			UserMoney = result.UserInfo.money;
			UserNICKNAME = result.UserInfo.nickname;
			UserNICKNAMEDOM = $('.top_font_c');
			UserUIDDOM = $('.top_font_a');
			UserMoneyDOM = $('.top_font_b');
			$('.sygg').text(result.config.sygg);
			cztypeArr = (result.config.cztype).split(",");//充值类型分割
			if(cztypeArr.length>0){cztype = cztypeArr[0];}else{alert('充值类型获取失败！');};
			Userfuli = (result.UserInfo.fuli).split(","); //佣金福利
			var UserShangji = (result.UserInfo.shangji).split(","); //上级字符分割
			var UserYjmoney = (result.UserInfo.yjmoney).split(","); //佣金字符分割
			var UserYjbl = (result.config.yjbl).split(","); //比率字符分割
			var UserXjcount = (result.UserInfo.xiaji).split(","); //下级字符分割
			var yjsore = result.UserInfo.yjsore;
			var yjblHTML = '';
			for(var i = 0;i<UserYjbl.length;i++){
				yjblHTML+='\
						<tr>\
							<td>'+(i+1)+'级</td>\
							<td>'+UserYjbl[i]+'%</td>\
						</tr>\
				';
			}
			$('.yjbl').html(yjblHTML);//等级明细
			
			var djmingxiHTML = '';
			for(var i = 0;i<UserYjmoney.length;i++){
				lsyjmoney+=parseFloat(UserYjmoney[i]);
				djmingxiHTML += '\
						<tr>\
							<td>'+(i+1)+'级</td>\
							<td>'+UserXjcount[i]+'人</td>\
							<td>'+UserYjmoney[i]+'元</td>\
						</tr>\
				';
			}
			daymoney = result.UserInfo.daymoney;
			if(isToday(result.UserInfo.timemoney)){
				$('.daymoney').text(daymoney);//今日佣金
			}else{
				$('.daymoney').text('0.00');//今日佣金
			}
			flhtml();//佣金福利
			$('.lsyjmoney').text(parseFloat(lsyjmoney).toFixed(2));//今日佣金
			$('.zsshangji').text(UserShangji[0]);//上级
			$('.djmingxi').html(djmingxiHTML);//等级明细
			$('.newyjjine').text(parseFloat(yjsore).toFixed(2));//今日佣金
			
			$('.kefuimg').attr('src','/'+result.config.kfimg);
			$('.kefuimgb').attr('src','/'+result.config.kfimg2);
			$('.wanfaimg').attr('src','/'+result.config.wfimg);
			$('.czkefu').attr('src','/'+result.config.czimg);
			UserUIDDOM.text(UserNICKNAME);
			UserNICKNAMEDOM.text(UserNICKNAME);
			UserMoneyDOM.text(parseFloat(UserMoney).toFixed(2));
			$('.zzmoney').text(parseFloat(UserMoney).toFixed(2));
			hbgxAjax();

			var ref = setInterval(function() {
				hbgxAjax();

			clearInterval(ref);
			},1000);

		},
		error: function(xhr){
			//layer.msg('连接服务器失败！',{time: 5000});
			//setTimeout('window.location.reload(true)',300)
		}
	});

	
	function hbgxAjax(){
		//红包更新
		var timestamp = (new Date()).valueOf();
		$.ajax({
			type: 'get',
			url: Domain + 'index/API/fabao?timestamp='+timestamp,
			dataType: 'json',
			success: function(result){
				if(result.code!='ok'){return ;}
				if(JSON.stringify(result) == JSON.stringify(HonbaoRes)){return ;}

				hbupdate(result);
				toBottom();
			}
		});
	}
	
	//自动滑到底部
	function toBottom(){
		//$('html,body').animate({scrollTop:document.body.scrollHeight}, 1000);
	}

	hbDOM = $('.list_honbao');//红包ul

	var dyc = true;
	var socket = new WebSocket("ws://125.88.144.197:8283");
socket.onmessage = function(event){
    var result = JSON.parse(event.data)
    if(result.code!='ok'){return ;}
	if(JSON.stringify(result) == JSON.stringify(HonbaoRes)){return ;}
 	hbupdate(result);
}

	//红包html更新
	function hbupdate(result){
		//余额刷新
		//UserMoney = result.usermoney;
		//UserMoneyDOM.text(UserMoney);
		//alert(result.UserInfo.money)
		if(HonbaoRes==null){
			HonbaoRes = result;
		}
		var xinhb = false;
		if(HonbaoRes.honbao[HonbaoRes.honbao.length-1].Id != result.honbao[result.honbao.length-1].Id){
			xinhb = true;
		}
		HonbaoRes = result;
		var up_hbid = -1;
		var jj = 0;
		var html_zong = '';
		for (var i = 0; i < result.honbao.length; i++) {
			var yilingqu = false;//是否领取
			var hbstyle = 'btn_hb';
			var dibutext = '恭喜发财 大吉大利';
			var hbstate = 1;
			var hbwo = '';
			up_hbid = result.honbao[i].Id;

			//判断是否领完
			if(result.honbao[i].number >= '7'){
					hbstate = 3;
					dibutext = '已被抢完';
					hbstyle = 'btn_hb_active';
			}
			//判断是否自己发的红包
			if(HonbaoRes.honbao[i].uid == UserUID){
				hbstate = 4;
				hbwo = 'honbaowo';
			}
			var html_b = '';
			for(var j = jj; j < result.honbaos.length; j++){
				if(HonbaoRes.honbaos[j].hbid != up_hbid){jj = j;break;}

					if(result.honbaos[j].zlei == '1'){
						html_b += '\
							<li class="exp">\
								恭喜<span class="exp_font_a">' + result.honbao[i].nickname + '</span>发红包中雷获得<span class="exp_font_b">' + (parseInt(result.honbao[i].money) * 1.6).toFixed(2)  + '</span>金币\
							</li>\
						';
						if(jialei!=0 && jialei==up_hbid){//加款
							if(jialeiArr.length==0){
								UserMoney = (parseFloat(UserMoney)+parseInt(result.honbao[i].money)*1.6 - parseInt(result.honbao[i].money)*1.6 / 16).toFixed(2);
								UserMoneyDOM.text(parseFloat(UserMoney).toFixed(2));
								jialeiArr.push(result.honbaos[j].Id);
							}else{
								for(var k = 0; k < jialeiArr.length; k++){
									if(result.honbaos[j].Id==jialeiArr[k]){
										break;
									}else if(jialeiArr.length-1==k){
										UserMoney = (parseFloat(UserMoney)+parseInt(result.honbao[i].money)*1.6 - parseInt(result.honbao[i].money)*1.6 / 16).toFixed(2);
										UserMoneyDOM.text(parseFloat(UserMoney).toFixed(2));
										jialeiArr.push(result.honbaos[j].Id);
									}
								}
							}
						}
						if(syhbid!=0 && syhbid==up_hbid){//播放声音
							syhbid = 0;
							//$("#hint").remove();audioJQ = $("<audio src='audio/lei.m4a' autoplay id='hint'/>");audioJQ.appendTo("body");
						}
					}
					//判断是否领取
					if(!yilingqu  && HonbaoRes.honbaos[j].uid == UserUID){
						yilingqu = true;
						dibutext = '已领取';
						hbstyle = 'btn_hb_active';
						hbstate = 2;
					}

				//}
			}
			var html_a = '\
			<li class="honbao '+hbwo+'" id="hb">\
				<div class="tximg">\
				<img src="'+ result.honbao[i].userimg +'">\
				</div>\
				<div class="info">\
					<div class="btn_hb '+hbstyle+'" onclick="hb_config(\'' + up_hbid + '\',\'' + hbstate + '\',\'' + result.honbao[i].nickname + ' \',\'' + result.honbao[i].money + '  金币 / 雷 ' + result.honbao[i].lei + ' \');">\
						<p class="hb_font_a">' + result.honbao[i].money + ' 金币 / 雷 ' + result.honbao[i].lei + '</p>\
						<p class="hb_font_b">已抢：' + result.honbao[i].number + ' / 7</p>\
						<p class="hb_font_c">' + dibutext + '</p>\
					</div>\
					<div class="clear"></div>\
					<ul class="list_exp">\
			';
			
			var html_c = '\
					</ul>\
				</div>\
			</li>\
			<div class="clear"></div>\
			';
			html_zong +=  html_a + html_b + html_c;
		}
		if(xinhb){
			hbDOM.css({"position":"relative","bottom":"-103px"});

		}
		hbDOM.html(html_zong);

		hbDOM.css("bottom","0");
		if(dyc){
			$('html,body').animate({scrollTop:document.body.scrollHeight}, 1000);
			dyc = false;
		}
	}//红包html更新结束


	
	


	//点开红包
	$('.list_honbao').on('click' , '.btn_hb' , function() {
		for (var i = 0; i < HonbaoRes.honbao.length; i++) {
			if(HonbaoRes.honbao[i].Id == hb_id){//如果存在红包
			    $('.kaihb_font_a_a').attr('src', HonbaoRes.honbao[i].userimg);
				$('.kaihb_font_a').text(HonbaoRes.honbao[i].nickname+' '+HonbaoRes.honbao[i].money+'/'+HonbaoRes.honbao[i].lei+'的红包');
				//把发包人的id存入临时变量
				
				var lqhtml = '';
				var yilingqu = false;//是否已领取
				var lingquj = 0;//领取的j
				var kk = false;//记录加快速度
				//渲染列表
				for(var j = 0; j < HonbaoRes.honbaos.length; j++){
					if(HonbaoRes.honbaos[j].hbid == hb_id){
						kk = true;
						var time = HonbaoRes.honbaos[j].lqtime;
						var timearr = time.replace(" ",":").replace(/\:/g,"-").split("-"); 
						var zleis = 'lqname';
						var lqmoneya = parseFloat(HonbaoRes.honbaos[j].money).toFixed(2);
						if(HonbaoRes.honbao[i].number<7){
							lqmoneya = HonbaoRes.honbaos[j].money;
						}
						if(HonbaoRes.honbaos[j].zlei=='1'){zleis += ' zlei'};
						lqhtml += '\
							<li>\
							<div class="layui-col-xs6">\
							<div class="fleft lqtx">\
							<img src="'+ HonbaoRes.honbaos[j].userimg +'">\
							</div>\
							<div class="fleft nameexp">\
							<p class="'+zleis+'">' + HonbaoRes.honbaos[j].nickname + '</p>\
							<p class="lqtime">' + timearr[3]+':'+timearr[4]+':'+timearr[5] + '</p>\
							</div>\
							</div>\
							<div class="layui-col-xs6"><span class="fright lqmoney">' + lqmoneya + '&nbsp;金币</span></div>\
							<div class="clear"></div>\
							</li>\
						';
						//判断是否领取
						if(!yilingqu && HonbaoRes.honbaos[j].uid == UserUID){
							yilingqu = true;
							lingquj = j;
						}
						
					}else if(kk){
						break;
					}
					
					
					
				}//for exit
				$('.lqlistul').html(lqhtml);

				//已领取
				if(yilingqu){
					$('.kaihonbao').css("height","421px")
					$('.kaihb_font_b').text('抢到 ' + HonbaoRes.honbaos[lingquj].money + ' 金币');
					$('.kaibtn').hide();//隐藏开奖按钮
					$('.lqlist').show();//显示领取列表
					//判断是否中雷
					if(HonbaoRes.honbaos[lingquj].uid == UserUID && HonbaoRes.honbaos[lingquj].zlei == '1'){
						$(".kaihb_font_c_span").text('踩雷了！-' + parseInt(HonbaoRes.honbao[i].money)*1.6 + '金币');
						$(".kaihb_font_c_span").show();//显示中雷提示

					}else{
						$(".kaihb_font_c_span").hide();//隐藏中雷提示

					}
				}else if(hb_state == 3){
					$('.kaihonbao').css("height","421px")
					$('.kaihb_font_b').text('抢完了！手速太慢了~');
					$('.kaibtn').hide();//隐藏开奖按钮
					$('.lqlist').show();//显示领取列表
					$('.kaihb_font_c_span').hide();//隐藏中雷提示
				}else if(hb_state == 4){
					$('.kaihonbao').css("height","421px")
					$('.kaihb_font_b').text('我发的'+HonbaoRes.honbao[i].money+'/'+HonbaoRes.honbao[i].lei+'红包');
					$('.kaibtn').hide();//隐藏开奖按钮
					$('.lqlist').show();//显示领取列表
					$('.kaihb_font_c_span').hide();//隐藏中雷提示
				}else{
					//如果一切正常
					$('.kaihonbao').css("height","331px")
					$('.kaihb_font_b').text(hb_name);
					$(".kaibtn").show();//显示开奖按钮
					$(".lqlist").hide();//隐藏领取列表
					$(".kaihb_font_c_span").hide();//隐藏中雷提示
				}
				
				break;
			}else if(i==HonbaoRes.honbao.length-1){//如果不存在红包
				layer.msg('系统错误！请刷新页面再试。');
			}
		}

		//开红包设置
		layer.open({
			type: 1
			,title: false //不显示标题栏
			,content: $('.kaihonbao')//DOM
			,anim:0//动画效果
			,shade: [0.3 ,'#fff']//遮罩透明度 颜色
			,offset: '120px'
			,shadeClose:true//遮罩关闭
			,closeBtn:false//右上关闭
			,id: 'LAY_kaihonbao'//设定一个id
		});
		$('.layui-layer').css({"background-color":"transparent","box-shadow":"0px 0px"});
	});

	//红包 开 按钮
	$('.kaibtn').click(function(){
		var load = layer.load(3,{time: 15*1000});//layer.close(load);
				//开红包
				$.ajax({
					type: 'post',
					url: Domain + 'index/api/kai',
					dataType: 'json',
					data: {"hbid":hb_id},
					success: function(result){
						layer.close(load);
						if(result.code=='no'){layer.msg(result.message,{time: 800});return;}
						if(result.code!='ok'){layer.msg('系统错误！请刷新页面再试。');return;}
						if(result.code=='ok'){
							UserMoney = result.UserMoney;
							UserMoneyDOM.text(parseFloat(UserMoney).toFixed(2));
							$('.kaihb_font_b').text('抢到 ' + parseFloat(result.money).toFixed(2) + ' 金币');
							var time = result.lqtime;
							var timearr = time.replace(" ",":").replace(/\:/g,"-").split("-");
							if(result.zlei == '1'){zleiss= 'lqname  zlei'}else{zleiss= 'lqname'};
							var lqhtml = '\
									<li>\
									<div class="layui-col-xs6">\
									<div class="fleft lqtx">\
									<img src="" id="user_img">\
									<script> $("#user_img").attr("src",UserIMG)</script>\
									</div>\
									<div class="fleft nameexp">\
									<p class="'+zleiss+'">' +UserNICKNAME + '</p>\
									<p class="lqtime">' + timearr[3]+':'+timearr[4]+':'+timearr[5] + '</p>\
									</div>\
									</div>\
									<div class="layui-col-xs6"><span class="fright lqmoney">' + parseFloat(result.money).toFixed(2) + '&nbsp;金币</span></div>\
									<div class="clear"></div>\
									</li>\
								';
							$('.lqlistul').append(lqhtml);
							$('.kaihonbao').css("height","421px")
							$('.kaihonbao').animate({height:'421px'});
							//判断是否中雷
							if(result.zlei == '1'){
								$(".kaihb_font_c_span").text('踩雷了！-' + parseInt(result.peikuan)/1.5*1.6 + '金币');
								$(".kaihb_font_c_span").show();//显示中雷提示
							}else{
								$(".kaihb_font_c_span").hide();//隐藏中雷提示
							}
							hbgxAjax();
							$(".kaibtn").hide(1000);
							$(".lqlist").show();
							if(result.zlei=='1'){
								$(".kaihb_font_c_span").show();//踩雷显示
								//$("#hint").remove();audioJQ = $("<audio src='audio/lei.m4a' autoplay id='hint'/>");audioJQ.appendTo("body");
							}else{
								$(".kaihb_font_c_span").hide();//踩雷隐藏
								//$("#hint").remove();audioJQ = $("<audio src='audio/kai.m4a' autoplay id='hint'/>");audioJQ.appendTo("body");
							}
							
						}
						
					}
				});

		

		
	});
	//底部展开隐藏
	$('.foot_jia').click(function(){
		var other_funct = $(".other_funct");
		if(other_funct.is(':hidden')){
			other_funct.show(200);
			$(".main").animate({'paddingBottom':"270"},500);
			$('html,body').animate({scrollTop:document.body.scrollHeight}, 1000);
			toBottom();//自动滑到底部
		}else{
			other_funct.hide(200);
			$(".main").animate({'paddingBottom':"60"},500);
			$('html,body').animate({scrollTop:document.body.scrollHeight}, 1000);
			toBottom();//自动滑到底部

		}
	});


	//顶部推广------------------
	//建造实例
	carousel.render({
		elem: '.tuiguang_DOM'
	    ,width: '100%' //设置容器宽度
	    ,height: '100%'
	    ,arrow: 'always' //始终显示箭头
	    ,autoplay: false //自动切换
	    //,anim: 'updown' //切换动画方式
	});
	//监听轮播切换事件
	
	carousel.on('change(tuiguang_DOM)', function(obj){
	  	$.ajax({
			type: 'post',
			url: Domain + 'index/api/tgimg',
			dataType: 'json',
			data:{'type':parseInt(obj.index)+1},
			success: function(result){
				if(result.code!='ok'){ layer.msg('图片获取失败！'); return ;}
				obj.item.html('<img src="'+result.url+'">');
			}
		});
	  //obj.item.text('1');
	});
	//弹出
	$('.top_tg').click(function(){
		var load = layer.load(1,{time: 60*1000});//layer.close(load);//关闭加载
		$.ajax({
			type: 'post',
			url: Domain + 'index/api/tgimg',
			dataType: 'json',
			data:{'type':'1'},
			success: function(result){
				if(result.code!='ok'){ layer.msg('图片获取失败！'); return ;}
				$('.tgimga').html('<img src="'+result.url+'">');
			}
		});
		layer.close(load);
		layer.open({
			type: 1
			,title: false //不显示标题栏
			,content: $('.tuiguang_DOM')//DOM
			,anim:1//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_tuiguangDOM' //设定一个id
			,area: ['260px','462px']
		});

	});

	
		//佣金提现------------------
	$('.yjwith').click(function(){
		var txmoney = parseInt($('.newyjjine').text());

		if(txmoney<1){layer.msg('最低提现1元！',{time: 800}); return}
		layer.confirm('当前可提现'+txmoney+'元，是否全部提现到微信零钱？', {
		  btn: ['立即提现', '继续赚钱']
		  ,title:'提示信息'
		  ,shadeClose:true//遮罩关闭
		  ,id: 'LAY_top_tx' //设定一个id
		}, function(index, layero){
			var load = layer.load(1,{time: 60*1000});
			$.ajax({
				type: 'post',
				url: Domain + 'index/api/yjwiths',
				dataType: 'json',
				data:{'txmoney':txmoney},
				success: function(result){
					layer.close(load);
					if(result.code!='ok' && result.code!='oks'){layer.msg(result.message);return ;}
					if(result.code==null){layer.msg('系统繁忙，请稍后再试~');return ;}
					if(result.code=='ok'){
						layer.msg('已转入到余额,请到余额提现！',{anim:0,icon:6});
					}
					if(result.code=='oks'){
						layer.msg('提现申请提交成功，请耐心等待客服人员审核！',{anim:0,icon:6});
					}
		  			$('.top_font_b').text(parseFloat(result.money).toFixed(2));
				}
			});
		  
		});

	});
	
	//顶部提现------------------
	$('.top_tx').click(function(){
		var txmoney = parseInt(UserMoney);
		if(txmoney<1){layer.msg('最低提现1元！');}
		    
   
		layer.confirm("提现<input type='text' class='txinput' value='"+txmoney+"' placeholder='输入提现金额'>"+'元，将自动扣除3%手续费', {
		  btn: ['立即提现', '继续赚钱']
		  ,title:'提示信息'
		  ,shadeClose:true//遮罩关闭
		  ,id: 'LAY_top_tx' //设定一个id
		}, function(index, layero){
			var load = layer.load(1,{time: 60*1000});
			$.ajax({
				type: 'post',
				url: Domain + 'index/api/tixian',
				dataType: 'json',
				data:{'txmoney':$('.txinput').val()},
				success: function(result){
					layer.close(load);

					if(result.code!='ok' && result.code!='oks'){layer.msg(result.message);return ;}
					if(result.code==null){layer.msg('系统繁忙，请稍后再试~');return ;}
					if(result.code=='ok'){
						layer.msg('提现成功，请到微信钱包查收！',{anim:0,icon:6});
						setTimeout("window.location.reload()",1000);
						
					}
					if(result.code=='oks'){
						layer.msg('提现申请提交成功，请耐心等待客服人员审核！',{anim:0,icon:6});
						setTimeout("window.location.reload()",1000);
					}
		  			$('.top_font_b').text(parseFloat(result.money).toFixed(2));
				}
			});
		  
		});
		$('.txinput').attr('style','width: 52px; height: 24px; margin: 4px;')
		$('.layui-layer-btn').attr('style','text-align:center')
		$('.layui-layer, .layui-layer-dialog').attr('style','z-index: 19891016; width: 80%;top: 273px;left: 11%;')
	});
//充值修改
	var czmoneyArr = [30,50,100,300,500,1000,2000,3000];
	var jianche;
	//顶部充值------------------
	$('.top_cz').click(function(){
		$(".czewm").hide();
		$(".czret").hide();
		$(".czbiaoti").text('充值金额');
		var czBtnHTML = '';
		for(var i = 0; i<czmoneyArr.length; i++){
			czBtnHTML+='<button class="layui-btn layui-btn-primary layui-btn-sm layui-btn-fluid czbtn" onclick="set_czmoney('+czmoneyArr[i]+');">充值 '+czmoneyArr[i]+' 元</button>';
		}
		$('.czbtnzu').html(czBtnHTML);
		var czTypeHtml = '';

		for(var i = 0; i<cztypeArr.length; i++){
			if(i==0){
				czTypeHtml+='<input type="radio" name="cztype" value="'+cztypeArr[i]+'" title="微信支付" checked><br/>'
			}else{
				czTypeHtml+='<input type="radio" name="cztype" value="'+cztypeArr[i]+'" title="微信支付" ><br/>';

			}
		}
		$('.zfzu').html(czTypeHtml);
		form.render('radio','zftypefrom');
		$('.czinput').hide();
		$('.czbtnzu').show();
		layer.open({
			type: 1
			,title: false //不显示标题栏
			,content: $('.chongzhi_DOM')//DOM
			,anim:0//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_chongzhidom' //设定一个id
			,area: '260px'
			,cancel: function(index, layero){ 
			 	//阻止定时刷新
			 	if(jianche!=null){
			 		clearInterval(jianche);
			 	}
			}
		});
	});

	form.on('radio', function(data){
	  cztype = data.value;
	  if(cztype=='1'){
			$('.czbtnzu').hide();
			$('.czinput').show();
		}else{
			$('.czinput').hide();
			$('.czbtnzu').show();
		}
	});
	$('.chongzhi_DOM').on('click','.czbtn' , function() {
		var load = layer.load(1,{time: 60*1000});//layer.close(load);//关闭加载
		$.ajax({
			type: 'post',
			url: Domain + 'index/api/chongzhi',
			dataType: 'json',
			data: {'czmoney':czmoney,'cztype':cztype},
			success: function(result){
				layer.close(load);//关闭加载
				if(result.code!='ok'){layer.msg(result.message);return;}
				if(result.money==null || result.payimg==null){layer.msg('支付平台出错，请联系客服！'); return ;}
				if(result.type=='dsf'){window.location.href=result.payimg;return ;}

				$('.cz_ewm').attr('src',result.payimg);
				$('.cz_moneys').text(result.money);
				$(".czewm").hide();
				$(".czret").show();
				$(".czbiaoti").text('等待付款');
				$(".czewm").show(500);
				$(".czbtnzu").hide();
				//循环刷新
				var jianche = setInterval(function() {
					$.ajax({
						url: Domain + 'index/api/chaorder',
						type: "get",
						dataType: "json",
						data: {'order':result.order},
						success: function(result) {
							if (result.code == 'ok') {
								//阻止定时刷新
								clearInterval(jianche);
								layer.msg('充值成功', {
									icon: 1,
									time: 1000
								});
								UserMoney = (parseFloat(czmoney)+parseFloat(UserMoney)).toFixed(2);
								UserMoneyDOM.text(UserMoney); 
								layer.closeAll('page');
							}
						}
					});
				},
				1000);
				//循环刷新exit
			}
		});
		

	});
	$('.czret').click(function(){//返回
		$(".czewm").hide();
		$(".czret").hide();
		$(".czbiaoti").text('充值金额');
		$(".czbtnzu").show(500);

	});

	//客服--------------------
	$('.foot_kefu').click(function(){
		//window.location.href="http://api.pop800.com/chat/521590";
		//return false;
		layer.open({
			type: 1
			,title: '在线客服' //不显示标题栏
			,content: $('.kefub_DOM')//DOM
			,anim:0//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_kefub' //设定一个id
			/*,btn: ['前往添加', '我已添加']
			,btnAlign: 'c'
			,success: function(layero){
	          var btn = layero.find('.layui-layer-btn');
	          btn.find('.layui-layer-btn0').attr({
	            href: 'http://baidu.com'
	            ,target: '_blank'
	          });
	        }*/
		});
	});
	//玩法介绍--------------------
	$('.funct_jieshao').click(function(){
		layer.open({
			type: 1
			,title: false //不显示标题栏
			,content: $('.wanfa_DOM')//DOM
			,anim:4//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_wanfa' //设定一个id
			,area: '300px'
		});
		$('.layui-layer').css({"background-color":"transparent","box-shadow":"0px 0px"}); 
		//$('.layui-layer-close2').css({"right":"12px","top":"0px"}); 
	});
	//抽奖--------------------
	$('.funct_choujiang').click(function(){
		location.href='./choujiang';
	});

	//转账
	$('.funct_zhuanzhang').click(function(){
		layer.open({
			type: 1
			,title: false //不显示标题栏
			,content: $('.zhuanzhang')//DOM
			,anim:0//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_zhuanzhang' //设定一个id
			,area: ['320px']
		});
	});
	$('.zhuanbtn').click(function(){
		txmoney = $('.cg-money').val();skuid =  $('.cg-skuserid').val();
		if(txmoney==''){
		 	layer.msg('亲！请输入转账金币数量~',{anim:6,icon:5,time: 800});return;
		}else if(skuid==''){
			layer.msg('亲！请输入收款用户ID号~',{anim:6,icon:5,time: 800});return;
		}
		if(!confirm('确认转账'+txmoney+'金币给用户'+skuid+'吗？')){layer.msg('转账取消');return;}
		var load = layer.load(1,{time: 60*1000});
		 $.ajax({
			url: Domain + 'index/api/zhuan',
			type:"post",
			dataType:"json",
			data:{'txmoney':txmoney,'skuid':skuid},
			success:function(result){
				layer.close(load);
				if(result.code==null){layer.msg('系统繁忙，请稍后再试~');return ;}
				if(result.code=='no'){layer.msg(result.message);return ;}
				if(result.code=='ok'){
					UserMoney = parseFloat(result.money).toFixed(2);
					$('.top_font_b').text(UserMoney);
					layer.msg('转账成功！',{anim:0,icon:6});
				}
				//setTimeout('window.location.reload(true)',2000);
			}
	  });
	});
	
	//代理群
	$('.funct_dailiqun').click(function(){
		if(parseFloat($('.lsyjmoney').text())>=100){
				layer.open({
					type: 1
					,title: '代理群' //不显示标题栏
					,content: $('.kefu_DOM')//DOM
					,anim:0//动画效果
					,shadeClose:true//遮罩关闭
					,id: 'LAY_kefu' //设定一个id
				});
			}else{
				layer.msg('总佣金需达到100金币，才可以加入代理交流群，领取更多福利！');
			}
	});

	$('.funnct_czkefu').click(function(){
		layer.open({
			type: 1
			,title: false //不显示标题栏
			,content: $('.czkefu_DOM')//DOM
			,anim:4//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_wanfa' //设定一个id
			,area: '300px'
		});
		$('.layui-layer').css({"background-color":"transparent","box-shadow":"0px 0px"}); 
		//$('.layui-layer-close2').css({"right":"12px","top":"0px"}); 
	});	
	
	
	function flhtml(){
		var yjfltj = [100,500,1000,3000,5000];
		var yjfljl = [28.88,66.66,128.88,228.88,388.88];
		var flist = '';
		var btntype = '';
		var btntitle = '';

		for (var i = 0; i < yjfltj.length; i++) {
			if(lsyjmoney<yjfltj[i]){
				btntype = 'layui-btn-disabled';btntitle = '未达到';
			}else{
				if(Userfuli[i]=='0'){
					btntype = 'layui-btn-danger';btntitle = '领取';
				}else{
					btntype = 'layui-btn-disabled';btntitle = '已领取';
				}
				
			}
			flist+= '\
					<blockquote class="layui-elem-quote yjfllist">\
						<span class="flcontent">总佣金满'+yjfltj[i]+'领'+yjfljl[i]+'元</span>\
						<button type="button" class="layui-btn layui-btn-sm '+btntype+' flbtn" onclick="yjfl('+(i+1)+')">'+btntitle+'</button>\
					</blockquote>\
					';
		}
		$('.flist').html(flist);
	}
	//佣金福利
	$('.funct_yjfuli').click(function(){
		layer.open({
			type: 1
			,title: false //不显示标题栏
			,content: $('.yjfuli')//DOM
			,anim:0//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_yjfuli' //设定一个id
			,area: ['320px','460px']
		});
	});

	$('.flist').on('click','.flbtn' , function() {

		var load = layer.load(1,{time: 15*1000});
		$.ajax({
		    type: 'post',
		    url: Domain + 'index/api/fuli',
		    dataType: 'json',
		    data: {"type": yjflid},
		    success: function(result) {
		        layer.close(load);
		        if (result.code == 'no') {
		            layer.msg(result.message, {time: 800});
		            return;
		        }
		        if (result.code != 'ok') {
		            layer.msg('系统错误！请刷新页面再试。');
		            return;
		        }
		        if (result.code == 'ok') {
		            UserMoney = parseFloat(result.message);
		            UserMoneyDOM.text(parseFloat(UserMoney).toFixed(2));
		            layer.msg('恭喜您，领取成功！',{time: 1000});
		            setTimeout('window.location.reload(true)',1000)
		        }

		    }
		});
	});

	$('.funct_mingxi').click(function(){
		var load = layer.load(1,{time: 60*1000});//layer.close(load);
		$.ajax({
			type: 'get',
			url: Domain + 'index/api/chamx',
			dataType: 'json',
			success: function(result){
				layer.close(load);
				if(result.code!='ok'){return ;}
				var mx_a_html = '';
				var mx_b_html = '';
				var mx_c_html = '';
				var mx_d_html = '';
				var temptext = '';
				for (var i = 0; i < result.mx_a.length; i++) {
					mx_a_html+='\
						<blockquote class="layui-elem-quote">\
							<div class="layui-card">\
								<div class="layui-card-header">\
									<span>'+result.mx_a[i].beizhu+'</span>\
									<span class="fright">'+result.mx_a[i].money+'&nbsp;金币</span>\
								</div>\
								<div class="layui-card-body">\
									<p>\
										<span>游戏时间：</span>\
										<span class="fright">'+result.mx_a[i].mxtime+'</span>\
									</p>\
								</div>\
							</div>\
						</blockquote>\
					';
				}
				$('.mx_a').html(mx_a_html);
				for (var i = 0; i < result.mx_b.length; i++) {
					if(result.mx_b[i].type==5){
						mx_b_html+='\
							<blockquote class="layui-elem-quote">\
							<div class="layui-card">\
								<div class="layui-card-header">\
									<span>金币转账</span>\
									<span class="fright">&nbsp;'+result.mx_b[i].money+'&nbsp;金币</span>\
								</div>\
								<div class="layui-card-body">\
									<p>\
										<span>转账信息</span>\
										<span class="fright">'+result.mx_b[i].beizhu+'</span>\
									</p>\
									<p>\
										<span>订单号</span>\
										<span class="fright">'+ result.mx_b[i].order +'</span>\
									</p>\
									<p>\
										<span>转账时间：</span>\
										<span class="fright">'+result.mx_b[i].mxtime+'</span>\
									</p>\
								</div>\
							</div>\
						</blockquote>\
						';
					}else{
						mx_b_html+='\
						<blockquote class="layui-elem-quote">\
							<div class="layui-card">\
								<div class="layui-card-header">\
									<span>金币充值</span>\
									<span class="fright">&nbsp;'+result.mx_b[i].money+'&nbsp;金币</span>\
								</div>\
								<div class="layui-card-body">\
									<p>\
										<span>充值结果</span>\
										<span class="fright">'+result.mx_b[i].beizhu+'</span>\
									</p>\
									<p>\
										<span>充值单号</span>\
										<span class="fright">'+result.mx_b[i].order+'</span>\
									</p>\
									<p>\
										<span>充值时间</span>\
										<span class="fright">'+result.mx_b[i].mxtime+'</span>\
									</p>\
								</div>\
							</div>\
						</blockquote>\
					';
					}

				}
				$('.mx_b').html(mx_b_html);
				for (var i = 0; i < result.mx_c.length; i++) {
					mx_c_html+='\
						<blockquote class="layui-elem-quote">\
							<div class="layui-card">\
								<div class="layui-card-header">\
									<span>微信提现</span>\
									<span class="fright">&nbsp;'+result.mx_c[i].money+'&nbsp;金币</span>\
								</div>\
								<div class="layui-card-body">\
									<p>\
										<span>提现结果</span>\
										<span class="fright">'+result.mx_c[i].beizhu+'</span>\
									</p>\
									<p>\
										<span>到账时间</span>\
										<span class="fright">'+result.mx_c[i].mxtime+'</span>\
									</p>\
								</div>\
							</div>\
						</blockquote>\
					';
				}
				$('.mx_c').html(mx_c_html);
				for (var i = 0; i < result.mx_d.length; i++) {
					if(result.mx_d[i].type==5){
						mx_d_html+='\
							<blockquote class="layui-elem-quote">\
							<div class="layui-card">\
								<div class="layui-card-header">\
									<span>金币转账</span>\
									<span class="fright">&nbsp;'+result.mx_d[i].money+'&nbsp;金币</span>\
								</div>\
								<div class="layui-card-body">\
									<p>\
										<span>转账信息</span>\
										<span class="fright">'+result.mx_d[i].beizhu+'</span>\
									</p>\
									<p>\
										<span>订单号</span>\
										<span class="fright">'+ result.mx_d[i].order +'</span>\
									</p>\
									<p>\
										<span>转账时间：</span>\
										<span class="fright">'+result.mx_d[i].mxtime+'</span>\
									</p>\
								</div>\
							</div>\
						</blockquote>\
						';
					}else if(result.mx_d[i].type==4){
						var beizhu = (result.mx_d[i].beizhu).split(","); //字符分割 
						mx_d_html+='\
							<blockquote class="layui-elem-quote">\
							<div class="layui-card">\
								<div class="layui-card-header">\
									<span>下级玩家</span>\
									<span class="fright">&nbsp;'+result.mx_d[i].money+'&nbsp;金币</span>\
								</div>\
								<div class="layui-card-body">\
									<p>\
										<span>下级等级</span>\
										<span class="fright">'+ beizhu[0] +'</span>\
									</p>\
									<p>\
										<span>佣金说明</span>\
										<span class="fright">'+beizhu[1]+'</span>\
									</p>\
									<p>\
										<span>获得时间：</span>\
										<span class="fright">'+result.mx_d[i].mxtime+'</span>\
									</p>\
								</div>\
							</div>\
						</blockquote>\
						';
					}

					
				}
				$('.mx_d').html(mx_d_html);
				layer.open({
					type: 1
					,title: false //不显示标题栏
					,content: $('.mingxi')//DOM
					,anim:0//动画效果
					,shadeClose:true//遮罩关闭
					,id: 'LAY_mingxi' //设定一个id
					,area: ['320px','460px']
				});
			}
		});
		
	});

	//下级概念------------------
	$('.funct_xiaji').click(function(){
		layer.open({
			type: 1
			,title: false //不显示标题栏
			,content: $('.xiaji_DOM')//DOM
			,anim:0//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_xiajidom' //设定一个id
			,area: ['280px','420px']
		});
	});
	//发红包------------------
	$('.fahb').click(function(){
		if(jqr_qian_time!=0 || jqr_fa_time!=0){
			layer.msg("请先关闭机器人托管~");
			return false;
		}
		layer.open({
			type: 1
			,title: false //不显示标题栏
			,content: $('.fahb_DOM')//DOM
			,anim:0//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_fahonbao' //设定一个id
		});
	});
	//发红包submit提交
	form.on('submit(fahbbtn)', function(data){
		var load = layer.load(1,{time: 60*1000});//layer.close(load);
		layer.closeAll('page');
		//红包更新
		$.ajax({
			type: 'post',
			url: Domain + 'index/api/fa',
			dataType: 'json',
			data: data.field,
			success: function(result){
				layer.close(load);
				if(result.code=='no'){layer.msg(result.message);return;}
				if(result.code!='ok'){layer.msg('系统错误！请刷新页面再试。');return;}
				if(result.code=='ok'){
					syhbid = result.hbid;
					jialei = result.hbid;
					jialeiArr = new Array();
					UserMoney = result.UserMoney;
					UserMoneyDOM.text(parseFloat(UserMoney).toFixed(2));
					layer.msg('红包发送成功！',{anim:0,icon:6,time:600});
					//hbDOM.css({"position":"relative","bottom":"-103px"});
					hbgxAjax();
					$('html,body').animate({scrollTop:document.body.scrollHeight}, 1000);
					//toBottom();//自动滑到底部
				}
			}
		});
	  
	  return false;
	});
	//机器人------------------
	$('.foot_jqr').click(function(){
		layer.open({
			type: 1
			,title: '机器人托管设置' //不显示标题栏
			,content: $('.jiqiren')//DOM
			,anim:0//动画效果
			,shadeClose:true//遮罩关闭
			,id: 'LAY_footjqr' //设定一个id
		});
	});


	var jqr;
	//机器人submit提交
	//机器人抢红包
	form.on('submit(qianbtn)', function(data){
		qianbtnDOM = $('.qianbtn');
		if(jqr_fa_time!=0){layer.msg('请先关闭发红包机器人！');return false;}
		if(qianbtnDOM.text()=='开启'){
			layer.msg('开启成功！');
			qianbtnDOM.text('关闭');
			jqr_qian_time = data.field.qian_time;
			jqr = setInterval(function() {
				jqr_qian_time--;
				if(jqr_qian_time==0){
					jqr_qian_time = data.field.qian_time;
					var qianid = 0;
					var jj = 0;
					for(var i = 0;i<HonbaoRes.honbao.length;i++){
						if(HonbaoRes.honbao[i].uid!=UserUID && HonbaoRes.honbao[i].number != 7){
							for(var j = jj;j<HonbaoRes.honbaos.length;j++){
								if(HonbaoRes.honbaos[j].hbid == HonbaoRes.honbao[i].Id && HonbaoRes.honbaos[j].uid == UserUID){
									jj=j;
									break;
								}else if(j==HonbaoRes.honbaos.length-1){
									qianid = HonbaoRes.honbao[i].Id;
								}
							}
						}else if(i==HonbaoRes.honbao.length-1){
							layer.msg('暂无可抢的红包！');
							return false;
						}
					}
					if(qianid==0){
						layer.msg('暂无可抢的红包~');
						return false;
					}
					var load = layer.load(1,{time: 60*1000});//layer.close(load);
					$.ajax({
						type: 'post',
						url: Domain + 'index/api/kai',
						dataType: 'json',
						data: {"hbid":qianid},
						success: function(result){
							layer.close(load);
							if(result.code=='no'){layer.msg(result.message,{time: 800});return;}
							if(result.code!='ok'){layer.msg('自动抢红包失败！请保存网络通畅。');return;}
							if(result.code=='ok'){

								UserMoney = result.UserMoney;
								UserMoneyDOM.text(parseFloat(UserMoney).toFixed(2));
								layer.msg('自动抢红包成功！获得'+result.money+'金币~',{anim:0,icon:6,time:600});
								hbgxAjax();
							}
						}
					});

				}
				$('.fahb ').text(jqr_qian_time+'秒后自动抢红包');
			},1000);
		}else{
			clearInterval(jqr)
			jqr_qian_time = 0;
			qianbtnDOM.text('开启');
			$('.fahb ').text('点击发送红包');
			layer.msg('关闭成功！');
		}
		return false;
	});
	//机器人发红包
	form.on('submit(fabtn)', function(data){
		fabtnDOM = $('.fabtn');
		if(jqr_qian_time!=0){layer.msg('请先关闭抢红包机器人！');return false;}
	 	if(fabtnDOM.text()=='开启'){
	 		layer.msg('开启成功！');
			fabtnDOM.text('关闭');
			jqr_fa_time = parseInt(data.field.fa_time)*60;
			jqr = setInterval(function() {
				jqr_fa_time--;
				if(jqr_fa_time==0){
					jqr_fa_time = parseInt(data.field.fa_time)*60;
					var load = layer.load(1,{time: 60*1000});//layer.close(load);
					$.ajax({
						type: 'post',
						url: Domain + 'index/api/fa',
						dataType: 'json',
						data: data.field,
						success: function(result){
							layer.close(load);
							if(result.code=='no'){layer.msg(result.message);return;}
							if(result.code!='ok'){layer.msg('自动发红包失败！请保存网络通畅。');return;}
							if(result.code=='ok'){
								UserMoney = result.UserMoney;
								UserMoneyDOM.text(parseFloat(UserMoney).toFixed(2));
								layer.msg('自动发送红包成功！',{anim:0,icon:6,time:600});
								hbDOM.css({"position":"relative","bottom":"-103px"});	
								hbgxAjax();
								toBottom();//自动滑到底部
							}
						}
					});

				}
				$('.fahb ').text(jqr_fa_time+'秒后自动发红包');
			},1000);
		}else{
			clearInterval(jqr)
			jqr_fa_time = 0;
			fabtnDOM.text('开启');
			$('.fahb ').text('点击发送红包');
			layer.msg('关闭成功！');
		}
		return false;
	});
	//机器人加减按键
	//抢包
	$('.qian_a_jia').click(function(){
		var inputDOM = $('.qian_time')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)>=1000){
			layer.msg('最高为1000秒~');
			return;
		}
		inputDOM.val(parseInt(inputNum)+10);
	})
	$('.qian_a_jian').click(function(){
		var inputDOM = $('.qian_time')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)<=10){
			layer.msg('最低为十秒哦~');
			return;
		}
		inputDOM.val(parseInt(inputNum)-10);
	})
	//发包A
	$('.fa_a_jia').click(function(){
		var inputDOM = $('.fa_money')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)>=200){
			layer.msg('最高为200金币~');
			return;
		}
		inputDOM.val(parseInt(inputNum)+10);
	})
	$('.fa_a_jian').click(function(){
		var inputDOM = $('.fa_money')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)<=10){
			layer.msg('最低为10金币哦~');
			return;
		}
		inputDOM.val(parseInt(inputNum)-10);
	})
	//发包B
	$('.fa_b_jia').click(function(){
		var inputDOM = $('.fa_leinum')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)>=9){
			layer.msg('尾数雷号0-9之间！');
			return;
		}
		inputDOM.val(parseInt(inputNum)+1);
	})
	$('.fa_b_jian').click(function(){
		var inputDOM = $('.fa_leinum')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)<=0){
			layer.msg('尾数雷号0-9之间！');
			return;
		}
		inputDOM.val(parseInt(inputNum)-1);
	})
	//发包C
	$('.fa_c_jia').click(function(){
		var timeDOM = $('.fa_time')
		var times = timeDOM.val();
		if(parseInt(times)>=60){
			layer.msg('最高为60分钟~');
			return;
		}
		timeDOM.val(parseInt(times)+1);
	})
	$('.fa_c_jian').click(function(){
		var timeDOM = $('.fa_time')
		var times = timeDOM.val();
		if(parseInt(times)<=1){
			layer.msg('最低为1分钟哦~');
			return;
		}
		timeDOM.val(parseInt(times)-1);
	})
	//--重复
	//发包A
	$('.fahb_a_jia').click(function(){
		var inputDOM = $('.fahb_money')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)>=500){
			layer.msg('最高为500金币~');
			return;
		}
		inputDOM.val(parseInt(inputNum)+10);
	})
	$('.fahb_a_jian').click(function(){
		var inputDOM = $('.fahb_money')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)<=10){
			layer.msg('最低为10金币哦~');
			return;
		}
		inputDOM.val(parseInt(inputNum)-10);
	})
	//发包B
	$('.fahb_b_jia').click(function(){
		var inputDOM = $('.fahb_leinum')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)>=9){
			layer.msg('尾数雷号0-9之间！');
			return;
		}
		inputDOM.val(parseInt(inputNum)+1);
	})
	$('.fahb_b_jian').click(function(){
		var inputDOM = $('.fahb_leinum')
		var inputNum = inputDOM.val();
		if(parseInt(inputNum)<=0){
			layer.msg('尾数雷号0-9之间！');
			return;
		}
		inputDOM.val(parseInt(inputNum)-1);
	})
	
	//机器人表单验证
	form.verify({
  	zint: function(value, item){ //value：表单的值、item：表单的DOM对象
	  	if(!/^[0-9]*[1-9][0-9]*$/.test(value) || value>1000){
	  		return '必须为小于1000的正整数！';
	  	}
	  	
  	}
	,shis: function(value, item){ //value：表单的值、item：表单的DOM对象
	  	if(value<10){
	  		return '频率太快了，最低为十秒哦~';
	  	}
	  	
  	}
  	,hbmoney: function(value, item){ //value：表单的值、item：表单的DOM对象
	  	var money = value/10;
	  	if(value>500 || value<10 || money<1 || money>500 || !/^[0-9]*[1-9][0-9]*$/.test(money)){
	  		return '红包必须为10-500之间，且为十的倍数。';
	  	}
	  	
  	}
  	,leinum: function(value, item){ //value：表单的值、item：表单的DOM对象
	  	if(value>9 || value<0){
	  		return '雷号必须在0-9之间！';
	  	}
  	}
	});
	
	

});//use结尾