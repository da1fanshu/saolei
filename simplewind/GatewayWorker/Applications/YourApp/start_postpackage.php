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
$worker->name = '神秘科技codes5.com：禁止赌博，只供提供娱乐，本游戏是个人开发娱乐。采用网上代码进行二次修改，禁止用非法用途，如果发现，报警处理！S5源码网www.codes5.com';
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
		
         Timer::add(0.5, function() use($db1){
         $hongbao_buy=array();
         $hongbaoarr=array();	
         $openlist = $db1->query("select * from cmf_newopen order by id desc limit 16");	
            foreach ($openlist as $value){
      		$msarr=array();
      		$hongnbao_user=$db1->query("select * from cmf_user where id='" .$value['user']. "'")[0];
      		$msarr['Id']=$value['id'];
      		$msarr['uid']=$hongnbao_user['user_login'];
      		$msarr['nickname']=$hongnbao_user['user_nickname'];
      		$msarr['userimg']=$hongnbao_user['avatar'];
      		$msarr['type']=$value['type'];
      		$msarr['money']=$value['money'];
      		$msarr['moneys']=$value['moneys'];
      		$msarr['lei']=$value['lei'];
      		$msarr['number']=$value['num'];
      		$msarr['fatime']=date('Y-m-d H:i:s',$value['addtime']);
      		$paylogs=$db1->query("select * from cmf_neworders where lid='".$value['id']."'order by id desc");
      		foreach ($paylogs as $value){
	      		$hbsarr=array();
	      		$hongnbao_user=$db1->query("select * from cmf_user where id='" . $value['user']. "'")[0];
	      		$hbsarr['uid']=$hongnbao_user['user_login'];
	      		$hbsarr['nickname']=$hongnbao_user['user_nickname'];
	      		$hbsarr['userimg']=$hongnbao_user['avatar'];
	      		$hbsarr['money']=$value['money'];
	      		$hbsarr['hbid']=$value['lid'];
	      		$hbsarr['lqtime']=$value['addtime'];
	      		$hbsarr['Id']=$value['id'];
		      	$hbsarr['zlei']=$value['zl'];
		      	array_push($hongbao_buy,$hbsarr);
	      	}
      		array_push($hongbaoarr,$msarr);
      	}
    	$hongbaoarr = array_reverse($hongbaoarr); 
		$hongbao_buy = array_reverse($hongbao_buy); 
	    $msg=array();
	    $msg['code']='ok';
	    $msg['honbao']=$hongbaoarr;
	    $msg['honbaos']=$hongbao_buy;
	    GateWay::sendToAll(json_encode($msg,true));
         //echo json_encode($msg,true);	
         	
         });
    }
};


	
// 如果不是在根目录启动，则运行runAll方法
if(!defined('GLOBAL_START'))
{
    Worker::runAll();
}

