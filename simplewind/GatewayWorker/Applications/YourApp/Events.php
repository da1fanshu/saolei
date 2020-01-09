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
 * @link http:www.workerman.net/
 * @license http:www.opensource.org/licenses/mit-license.php MIT License
 */

/**
 * 用于检测业务代码死循环或者长时间阻塞等问题
 * 如果发现业务卡死，可以将下面declare打开（去掉注释），并执行php start.php reload
 * 然后观察一段时间workerman.log看是否有process_timeout异常
 */
//declare(ticks=1);

use \GatewayWorker\Lib\Gateway;
use \GatewayWorker\Lib\Db;
use \Config\Db as database;
use \Workerman\Lib\Timer;

/**
 * 主逻辑
 * 主要是处理 onConnect onMessage onClose 三个方法
 * onConnect 和 onClose 如果不需要可以不用实现并删除
 */

class Events
{
    /**
     * 当客户端连接时触发
     * 如果业务不需此回调可以删除onConnect
     * 
     * @param int $client_id 连接id
     * 
     */
       
       
        public static function onWorkerStart($businessWorker)
    {


    }
    
    
    public static function onConnect($client_id)
    {

    $_SESSION["is_member"]=$_SESSION["is_member"]+1;
    echo "当前用户在线数[".$_SESSION["is_member"]."]\r\n";
    }
    
   /**
    * 当客户端发来消息时触发
    * @param int $client_id 连接id
    * @param mixed $message 具体消息
    */
   public static function onMessage($client_id, $message)
   {
   	
   }
   
   /**
    * 当用户断开连接时触发
    * @param int $client_id 连接id
    */
   public static function onClose($client_id)
   {
    $_SESSION["is_member"]=$_SESSION["is_member"]-1;
    echo "当前用户在线数[".$_SESSION["is_member"]."]\r\n";
    
     if($_SESSION["is_member"]<=0){
				 	$db1 = Db::instance('db3');
				 	echo "执行数据库清空  \r\n";
				 	$newloding = $db1->query("select count(*) from cmf_newloding")[0]['count(*)'];
				 	$newopen = $db1->query("select count(*) from cmf_newopen")[0]['count(*)'];
				 	$neworders = $db1->query("select count(*) from cmf_neworders")[0]['count(*)'];
				 	if($newloding>5000) {
				 		$db1->query("delete from cmf_newloding where 1=1 limit 3000");
				 		echo "清空cmf_newloding  \r\n";
				 	}
				 	if($newopen>5000) {
				 		$db1->query("delete from cmf_newopen where 1=1 limit 3000");
				 		echo "清空cmf_newopen  \r\n";
				 	}
				 	if($neworders>5000) {
				 		$db1->query("delete from cmf_neworders where 1=1 limit 4000");
				 		echo "清空cmf_neworders  \r\n";
				 	}

     }
    
    

    
    
    
    
    
    
    
    
    
    
    
   }
}
