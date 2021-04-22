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
$phone = $_GET['phone'];
// если пусто
if(empty($phone)) {
    $out = array(
        'status' => false,
        'description' => 'Номер телефона не заполнен'
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
}

// проверяем номер телефона на правильность (11 символов) 
// + форматируем номер телефона
$phone = str_replace(array('+',' ','(',')','-','_'), '',$phone);
if(strlen($phone) != 11) {
    $out = array(
        'status' => false,
        'description' => 'Не верный формат номера телефона'
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
}

// отправляем запрос на сервис smsc.ru
$loginSMSC = $modx->getOption('smsc_login');
$passSMSC = $modx->getOption('smsc_pass');

/* ==========================
    временно меняем телефона на мой +380996167482
*/
//$phone = '380996167482';

/* 
    =========================
*/

// отправляем код на номер телефона и получаем в ответ сгенерированное число (в формате JSON)
/*$url = 'https://smsc.ru/sys/send.php?login='.$loginSMSC.'&psw='.$passSMSC.'&phones=+'.$phone.'&mes=code&call=1&fmt=3';

$res = file_get_contents($url);*/

$res = '{
"id": 3,
"cnt": 5,
"code": "111111"
}';

if(empty($res)) {
    $out = array(
        'status' => false,
        'description' => 'Сервис не отвечает. Попробуете позже.'
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
}

// обрабатываем ответ от сервиса
$resJson = $modx->fromJson($res);

if(empty($resJson['id']) || empty($resJson['code'])) {
    $out = array(
        'status' => false,
        'description' => 'Сервис не отвечает. Попробуете позже.'
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
}

$code = $resJson['code']; // наш проверочный код

// работаем с сессией

unset($_SESSION['sessionRandNumber']);
$_SESSION['sessionRandNumber'] = $code; // записываем в сессию код

$out = array(
    'status' => true,
    'description' => 'Код для продтверждения отправлен.'
);
echo(json_encode($out, JSON_UNESCAPED_UNICODE));

