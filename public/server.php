<?php
// 定义CMF根目录,可更改此目录
define('CMF_ROOT', __DIR__ . '/../');
define('APP_PATH', CMF_ROOT . 'app/');
define('BIND_MODULE','push/Worker');
// 加载框架引导文件
require __DIR__ . '/thinkphp/start.php';