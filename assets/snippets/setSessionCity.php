<?php

define('MODX_API_MODE', true);
require_once $_SERVER['DOCUMENT_ROOT'].'/index.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/config.core.php';
require_once MODX_CORE_PATH.'model/modx/modx.class.php';
$modx=new modX();
$modx->initialize('web');

// проверяем на AJAX запрос
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') { }else{return false;}

if(empty($_GET['type'])) {
    $out = array(
        'status' => false,
        'description' => 'Нет type'
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
}
$token = $modx->getOption('dadata-api');
$secret = $modx->getOption('dadata-secret');
// определяем автоматом город
if($_GET['type'] == 'auto' || ($_GET['type'] == 'manually' && $_GET['cityName'] == '' )) {
    
    // определяем ip 
    function getIp() {
      $keys = [
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'REMOTE_ADDR'
      ];
      foreach ($keys as $key) {
        if (!empty($_SERVER[$key])) {
          $ip = trim(end(explode(',', $_SERVER[$key])));
          if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
          }
        }
      }
    }
    
    $ip = getIp();
    
    /* ================= */
    // ip москвы
    
    $ip = '178.219.186.12'; // временная для теста
    
    /* ================= */
    
    $url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip='.$ip.'&token='.$token;
    
    $res = file_get_contents($url);
    
    if( $res = $modx->fromJson($res) ){
        // если не определили, или не Россия
        if(!$res['location']) {
            // временно указываем по умолчанию Москву
            $city = 'Москва';
            $country = '';
            // включаем popup окно с определением страны и города
            $_SESSION['openPopupSelectSity'] = f;
            unset($_SESSION['openPopupSelectSity']);
        } else {
            $city = $res['location']['data']['city'];
            $country = $res['location']['data']['country'];
            
            $_SESSION['cityUser'] = $city;
            $_SESSION['countryUser'] = $country;
            
            unset($_SESSION['openPopupSelectSity']);
        }
        //var_dump($res);
    } else {
         $out = array(
            'status' => false,
            'description' => 'Ваш город не определился'
        );
        echo(json_encode($out, JSON_UNESCAPED_UNICODE));
        return false;
    }
    
    $out = array(
        'status' => true,
        'description' => 'Ваш город определен успешно',
        'city-name' => $city
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
    
} else if(($_GET['type'] == 'manually' && $_GET['cityName'] != '' )) {
    
    require_once $_SERVER['DOCUMENT_ROOT'].'core/components/guzzle6/vendor/autoload.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'assets/libs/Dadata/Settings.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'assets/libs/Dadata/ClientBase.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'assets/libs/Dadata/CleanClient.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'assets/libs/Dadata/ProfileClient.php';    
    require_once $_SERVER['DOCUMENT_ROOT'].'assets/libs/Dadata/SuggestClient.php';
    require_once $_SERVER['DOCUMENT_ROOT'].'assets/libs/Dadata/DadataClient.php';
    
    $dadata = new \Dadata\DadataClient($token, $secret);
    $result = $dadata->clean("address", $_GET['cityName']);
    
    if(!empty($result) && !empty($result['region'])) {
        $_SESSION['cityUser'] = $result['region'];
        $_SESSION['countryUser'] = $result['country'];
        unset($_SESSION['openPopupSelectSity']);
    }
    
    $out = array(
        'status' => true,
        'description' => 'Ваш город определен успешно',
        'city-name' => $result['region']
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
    
} else {
    $out = array(
        'status' => false,
        'description' => 'Ваш город не определился'
    );
    echo(json_encode($out, JSON_UNESCAPED_UNICODE));
    return false;
}






