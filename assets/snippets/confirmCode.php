<?php
define('MODX_API_MODE', true);
require_once $_SERVER['DOCUMENT_ROOT'].'/index.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/config.core.php';
require_once MODX_CORE_PATH.'model/modx/modx.class.php';
$modx=new modX();
$modx->initialize('web');

// проверяем на AJAX запрос
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') { }else{return false;}

unset($_SESSION['sessionConfirmCode']);
// если пустой номер телелфона
$code = $_GET['code'];
// если пусто
if(empty($code) || strlen($code) != 6) {
    $out = array(
        'status' => false,
        'description' => 'Не полный / пустой код подтверждения'
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
}

$codeSession = $_SESSION['sessionRandNumber'];

/* 

    временная переменная

*/

if($codeSession != $code) {
    $out = array(
        'status' => false,
        'description' => 'Не верный проверочный код. Повторите попытку.'
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
}

unset($_SESSION['sessionRandNumber']);

$out = array(
    'status' => true,
    'description' => 'Проверочный код совпадает.'
);

// записываем в сессию статус проверки
$_SESSION['sessionConfirmCode'] = true;

echo(json_encode($out, JSON_UNESCAPED_UNICODE));

