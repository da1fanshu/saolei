<?php 
/**
 * This file is part of workerman.
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the MIT-LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @author walkor<walkor@workerman.net>
 * @copyright walkor<walkor@workerman.net>
 * @link http://www.workerman.net/
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */
use \Workerman\Worker;
use \Workerman\WebServer;
use \GatewayWorker\BusinessWorker;
use \Workerman\Autoloader;
use \GatewayWorker\Lib\Db;
use \Config\Db as database;
use \Workerman\Lib\Timer;
use \GatewayWorker\Lib\Gateway;

// 自动加载类
require_once __DIR__ . '/../../vendor/autoload.php';

// bussinessWorker 进程
$worker = new BusinessWorker();
// worker名称
$worker->name = '神秘科技www.codes5.com启动游戏';
// bussinessWorker进程数量
$worker->count = 1;
// 服务注册地址
$worker->registerAddress = '127.0.0.1:1239';

$worker->onWorkerStart = function($worker)
{
    // 只在id编号为0的进程上设置定时器，其它1、2、3号进程不设置定时器
    if($worker->id === 0)
    {
        $db1 = Db::instance('db3');
		
         Timer::add(1, function() use($db1){
         	$systime = $db1->query("select * from `cmf_option` where option_name = 'site_info' ");
	    	$res=$systime[0]['option_value'];
	    	$confres=json_decode($res,true);
           //机器人发包
			$rotob=rand(1,$confres['robotfa']);
			if($rotob==2){
				$moneys=array(10,20,10,20,10,20,10,20,10,20,10,20,50,100,200,300,400,500,30,40,80,70,60,120,150,180,120,90,10,20,10,20);
				shuffle($moneys);
				$fa_lei=rand(0,9);
				$fa_money=$moneys[1];
				$fa_moneys=0;
				$fa_addtime=time();
				$fa_user=rand(100,999);
				$fa_num=0;
				$red_list=hongbao($fa_money,7);
				$fa_str=json_encode($red_list);
				$fa_note=json_encode($red_list);
				$fa_isrobot=1;
				$fa_oredr=time().rand(111,999);
				$fa_type=2;
				$fa_iss=0;
				$sql = "insert into cmf_newopen(lei,money,moneys,addtime,user,num,type,note,str,ornum,isrobot,isreal) 
                    values('".$fa_lei."','".$fa_money."','".$fa_moneys."','".$fa_addtime."','".$fa_user."','".$fa_num."','".$fa_type."','".$fa_note."','".$fa_str."','".$fa_oredr."','".$fa_isrobot."','".$fa_iss."')";
                $pointId = $db1->query($sql);
                ////echo $pointId;
			}
			$uid=1;
			//抢包随机
			$qiangbao=rand(1,$confres['robotqb']);
			if($qiangbao==2){
					$open_kai_arr=array();
				    $dai_qiang = $db1->query("select * from `cmf_newopen` where num <= 6 ");
				    if(count($dai_qiang)>=2){
				    	foreach ($dai_qiang as $key=>$value){
								array_push($open_kai_arr,$value['id']);
						}
						if(count($dai_qiang)<=5){
							shuffle($open_kai_arr);
							$rand_arr_kai[0]=$open_kai_arr[0];
							$rand_arr_kai[1]=$open_kai_arr[1];
						}else{
							shuffle($open_kai_arr);
							$rand_arr_kai[0]=$open_kai_arr[0];
							$rand_arr_kai[1]=$open_kai_arr[1];
							$rand_arr_kai[2]=$open_kai_arr[2];
							$rand_arr_kai[3]=$open_kai_arr[3];
							$rand_arr_kai[4]=$open_kai_arr[4];
						}
						$qianng_sum_num=count($rand_arr_kai)-1;
						//echo "\n";
						for($i=0;$i<=$qianng_sum_num;$i++){
							$kai_hbid=$rand_arr_kai[$i];
							//print_r($rand_arr_kai);
							$kai_hb = $db1->query("select * from `cmf_newopen` where id = $kai_hbid ");
							$ok_moeny=get_result($kai_hb[0],0);
							   if($ok_moeny>=0){
									//中雷
									$buy_wei=bcmod($ok_moeny*100,10);
									if($kai_hb[0]['lei']==$buy_wei){
										$zhoglei=1;
										$peikuan=$kai_hb[0]['money']*1.5;
										$uid=1;
										$db1->query("update cmf_user set balance = balance-".$peikuan." where id = $uid");
										//中雷了给发包用户加钱并增加记录
										$qiang_bao_pei_user=$kai_hb[0]['user'];
										$qiang_bao_pei_hbid=$kai_hb[0]['id'];
										$qiang_bao_pei_cuser=$uid;
										$qiang_bao_pei_time=time();
										$qiang_bao_pei_money=$peikuan;
										$qiang_user=$kai_hb[0]['user'];
										//echo "\n";
										//echo 1;
										//echo "\n";
										$sql = "insert into cmf_newloding(user,hbid,cuser,time,money) 
                    					values('".$qiang_bao_pei_user."','".$qiang_bao_pei_hbid."','".$qiang_bao_pei_cuser."','".$qiang_bao_pei_time."','".$qiang_bao_pei_money."')";
                    					$pointId = $db1->query($sql);
										$db1->query("update cmf_user set balance = balance+".$peikuan." where id = $qiang_user");
										$lei_new_id=$kai_hb[0]['id'];
										$db1->query("update cmf_newopen set moneys = moneys+".$peikuan." where id = $lei_new_id");
									}else{
										$peikuan=0;
										$zhoglei=0;
									}
									$db1->query("update cmf_user set balance = balance+".$ok_moeny." where id = $uid");
								}
								
								
								$fa_sql_log_user=rand(100,999);
								$fa_sql_log_account=$peikuan;
								$fa_sql_log_lid=$kai_hb[0]['id'];
								$fa_sql_log_state=1;
								$fa_sql_log_money=$ok_moeny;
								$fa_sql_log_addtime=date('Y-m-d H:i:s');
								$fa_sql_log_orders="L".date('YmdHis').rand(1111,9999);
								$fa_sql_log_ip="sysrobot";
								$fa_sql_log_times=time();
								$fa_sql_log_zl=$zhoglei;
								$fa_sql_log_term=$kai_hb[0]['id'];
								
								
								$sql = "insert into cmf_neworders(user,account,lid,state,money,addtime,orders,ip,times,zl,term) 
				                    values('".$fa_sql_log_user."','".$fa_sql_log_account."','".$fa_sql_log_lid."','".$fa_sql_log_state."','".$fa_sql_log_money."','".$fa_sql_log_addtime."','".$fa_sql_log_orders."','".$fa_sql_log_ip."','".$fa_sql_log_times."','".$fa_sql_log_zl."','".$fa_sql_log_term."')";
				                $pointId = $db1->query($sql);
								
							//echo $ok_moeny;
							//echo "\n";
						}
				    }
			}
			
       });
        
    }
};

function ganrao($dat='',$uid)
    {
    	$db1 = Db::instance('db3');
    	$conf=100;
    	$red_array=json_decode($dat['str'],true);
    	$xx=count($red_array)-1;//最后一个数
    	////如果包是机器产生的
    	$systime = $db1->query("select * from `cmf_option` where option_name = 'site_info' ");
    	$res=$systime[0]['option_value'];
    	$confres=json_decode($res,true);
    	if ($dat['isrobot']==1) {	
    		if ($dat['user']>0 && $dat['isreal']==0) {
    		  $rand_nom=mt_rand(1,100);
    		  if($rand_nom<=$confres['hbzb']){
    		  		$red_array=dan_lei($dat['money'],$dat['lei']);
    		  }
	          //$red_array=set_lei($red_array,$dat['lei']);
	          $wid=$dat['id'];
	          $db1->query("update cmf_newopen set isreal = 1 where id = $wid");
           }
       }else{
          //保证机器人不中雷
         if ($uid==0) {
             //机器人先抢没雷的包
             foreach ($red_array as $kx => $vx) {
                $wei=bcmod($vx*100,10);
                if ($wei!=$dat['lei']) {
                   $red_array[$kx]=$red_array[$xx];
                   $red_array[$xx]=$vx;
                   break;
                }else{
                   if ($kx!=$xx) {
                     $red_array[$kx]=$vx;
                   }
                }
             }
         }
       }
       
       if($uid>0) {
          $rand_nom=mt_rand(1,100);
          if ($rand_nom<=$confres['hbzb']) {
             //用户保证中雷
             //把中雷位和最后一个调换--保证中雷
             foreach ($red_array as $kk => $vv) {
              $wei=bcmod($vv*100,10);
              if ($wei==$dat['lei']) {
                 $red_array[$kk]=$red_array[$xx];
                 $red_array[$xx]=$vv;
                 break;
              }else{
                 if ($kk!=$xx) {
                   $red_array[$kk]=$vv;
                 }
              }
            }
          } 
       }
       
       return $red_array;
    		
}

function get_result($dat=0,$uid=0){
		 $db1 = Db::instance('db3');
		 //系统虚拟产生的订单
		  $red_array=json_decode($dat['str'],true);
		  $xx=count($red_array)-1;//最后一个数
		  //干扰程序开始----------------------------------
		  $uid=0;
		  $red_array=ganrao($dat,$uid);
		  //干扰程序结束----------------------------------
		  
		  $money=0;
		  if($xx>=0) {
		    $money=$red_array[$xx];
		    unset($red_array[$xx]);
		    $wid=$dat['id'];
		    $info=1;
		    $json_str=json_encode($red_array);
			$db1->query("update cmf_newopen set num = num+".$info." where id = $wid");
			$db1->query("UPDATE cmf_newopen SET str = '".$json_str."' where id = $wid");
		  }
		  return $money;
	
}

function hongbao($money, $number, $ratio = 0.5)
    {
        if ($money * 100 < $number) {
            ////echo "max number:".$money*100;
            $map['state'] = 0;
            $map['msg'] = "max number:" . $money * 100;
            return $map;
            exit;
        }
        $tmep_money = $money;
        $res = array(); //结果数组
        $min = ($money / $number) * (1 - $ratio);   //最小值
        $max = ($money / $number) * (1 + $ratio);   //最大值
        /*--- 第一步：分配低保 ---*/
        for ($i = 0; $i < $number; $i++) {
            $res[$i] = $min;
        }
        $money = $money - $min * $number;
        /*--- 第二步：随机分配 ---*/
        $randRatio = 100;
        $randMax = ($max - $min) * $randRatio;
        for ($i = 0; $i < $number; $i++) {
            //随机分钱
            $randRes = mt_rand(0, $randMax);
            $randRes = $randRes / $randRatio;
            if ($money >= $randRes) { //余额充足
                $res[$i] += $randRes;
                $money -= $randRes;
            } elseif ($money > 0) {     //余额不足
                $res[$i] += $money;
                $money -= $money;
            } else {                   //没有余额
                break;
            }
        }
        /*--- 第三步：平均分配上一步剩余 ---*/
        if ($money > 0) {
            $avg = $money / $number;
            for ($i = 0; $i < $number; $i++) {
                $res[$i] += $avg;
            }
            $money = 0;
        }
        /*--- 第四步：打乱顺序 ---*/
        shuffle($res);
        /*--- 第五步：格式化金额(可选) ---*/
        foreach ($res as $k => $v) {
            //两位小数，不四舍五入
            preg_match('/^\d+(\.\d{1,2})?/', $v, $match);
            $match[0] = number_format($match[0], 2);
            $res[$k] = $match[0];
        }
        /*--- 第五步半：修复金额 ---*/
        $res = fixdata($tmep_money, $res);
        return $res;
	}
	




function set_lei($ff='',$lei_wei){
	$iflei=0;
	  if (count($ff)) {
	       foreach ($ff as $key => $value) {
	            $wei=bcmod($value*100,10);
	            if ($wei==$lei_wei) {
	               $iflei=1;
	            }
	         $big_ff[$key]=100*$value;//扩大100倍
	       }
	       //随机金额不存在雷的情况下
	       if ($iflei==0) {
	              $now_wei=bcmod($big_ff[0],10);
	              if ($now_wei>$lei_wei) {
	                 $cha=$now_wei-$lei_wei;
	                 $big_ff[0]=$big_ff[0]-$cha;
	                 $dec_inc=1;
	              } else {
	                 $cha=$lei_wei-$now_wei;
	                 $big_ff[0]=$big_ff[0]+$cha;
	                 $dec_inc=0;
	              }
	              foreach ($big_ff as $kx => $vx) {
	                 if ($kx>0) {
	                    $sec=bcmod($vx,10);
	                    if ($dec_inc==1) {
	                       if(($sec+$cha)<=9){
	                        $big_ff[$kx]=$vx+$cha;
	                        break;
	                       }
	                    } else {
	                       if(($sec-$cha)>=1){
	                        $big_ff[$kx]=$vx-$cha;
	                        break;
	                       }
	                    }
	                 }        
	              }
	
	       }
	 //缩小100倍
	   foreach ($big_ff as $bk => $bv) {
	     $ff[$bk]=''.sprintf("%.2f",round(($bv/100),2));//扩大100倍
	   }
	   shuffle($ff);
	  }
	 
	  return $ff;
}


	function fixdata($tmep_money, $res){
      $sum=0;
        foreach ($res as $key => $vo) {
            if ($vo == 0) {
                $res[$key] = 0.01;
                $cha -= 0.01;
                $sum += 0.01;
            } else {
                $sum += $vo;
            }
        }
        $cha = round($tmep_money) - round($sum, 2);

        if ($cha > 0 && $cha < 0.01) {
            $cha = 0.01;
        }
        if ($sum != $tmep_money) {
            while ($cha != 0 && abs($cha) >= 0.01) {
                $n = mt_rand(0, count($res) - 1);
                if ($cha != 0 && abs($cha) >= 0) {
                    if ($cha > 0) {
                        $res[$n] += 0.01;
                        $cha -= 0.01;
                    } else {
                        if ($res[$n] > 0.01) {
                            $res[$n] -= 0.01;
                            $cha += 0.01;
                        }
                    }

                } else {
                    break;
                }
                $cha = round($cha, 2);
            }
        }
        return $res;
    }
	
  function pai_lei($money,$lei_wei){
	  do{
	    $red_list=hongbao($money,7);
	    $iflei=0;
	    foreach ($red_list as $key => $value) {
	     $wei=bcmod($value*100,10);
	      if ($wei==$lei_wei) {
	         $iflei=1;
	      }
	    }
	  }while($iflei==1);
	  return $red_list;
	}
	
	function two_leu($money,$lei_wei){
		do{
		    $red_list=hongbao($money,7);
		    $iflei=0;
		    foreach ($red_list as $key => $value) {
		     $wei=bcmod($value*100,10);
		      if ($wei==$lei_wei) {
		         $iflei+=1;
		      }
		    }
		 }while($iflei<=2);
		 return $red_list;
	}
	function dan_lei($money,$lei_wei){
		do{
		    $red_list=hongbao($money,7);
		    $iflei=0;
		    foreach ($red_list as $key => $value) {
		     $wei=bcmod($value*100,10);
		      if ($wei==$lei_wei) {
		         $iflei+=1;
		      }
		    }
		 }while($iflei<1);
		 return $red_list;
	}
	
// 如果不是在根目录启动，则运行runAll方法
if(!defined('GLOBAL_START'))
{
    Worker::runAll();
}

