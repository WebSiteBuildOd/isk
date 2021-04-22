<?php
define('MODX_API_MODE', true);
require_once $_SERVER['DOCUMENT_ROOT'].'/index.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/config.core.php';
require_once MODX_CORE_PATH.'model/modx/modx.class.php';
$modx=new modX();
$modx->initialize('web');

// проверяем на AJAX запрос
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') { }else{return false;}

$doc = $modx->getObject('modResource', 1);
$count = $doc->getTVValue('countOrder');
if(!$count) {
    $out = array(
        'status' => false,
        'description' => 'Не такого поля'
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
}
$out = array(
    'status' => true,
    'description' => 'Успешно получено число',
    'count' => number_format($count, 0, '.', ' '),
    'date' => date('d.m.Y, H:i')
);
echo(json_encode($out, JSON_UNESCAPED_UNICODE));
return true;