<?php
define('MODX_API_MODE', true);
require_once $_SERVER['DOCUMENT_ROOT'].'/index.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/config.core.php';
require_once MODX_CORE_PATH.'model/modx/modx.class.php';
$modx=new modX();
$modx->initialize('web');

$pol = $_GET['pol'];
$events = $_GET['events'];
$childrens = $_GET['childrens'];

$out = array(
  'status' => 1,
  'text' => ''
);

$confirm = $_SESSION['sessionConfirmCode'];
if(empty($confirm) || !$confirm) {
    $out['status'] = false;
    $out['description'] = 'Не верный проверочный код';
    echo json_encode($out, JSON_UNESCAPED_UNICODE);
    return false;
}

$siteUrl = $modx->getOption('site_url');

$out1 = '<p>В соответствии с законодательством РФ
    развод <b>возможен только по инициативе супруги</b>.
    </p>
    <p>Статья 17 Семейного Кодекса РФ ограничивает право мужчины требовать по своей инициативе развода с женой во время ее беременности, а также после рождения ребенка в период времени до одного года.</p>
    <p>Если Ваша супруга согласна расторгнуть брак, иск может быть составлен супругой с помощью портала <a href="'.$siteUrl.'" target="_blank">ВАШ-ИСК.РФ</a></p>
';

$out2 = '<p>В соответствии с законодательством РФ
развод <b>возможен через органы ЗАГС</b> (статья 19 Семейного Кодекса РФ).
    </p>
    <p>Подать документы на развод можно в отдел ЗАГС по месту жительства или по месту регистрации брака.
    </p>
';

$out3 = '<p>В соответствии с&nbsp;законодательством РФ
            <br><strong class="css-color-green">вы имеете право на&nbsp;расторжение брака.</strong>
        </p>
        <p><a href="'.$modx->makeUrl(8).'" target="_blank" class="css-color-blue">Заполните форму заявления </a>для&nbsp;подготовки документов в&nbsp;суд.</p>
        <ul>
            <li>Готовое заявление в&nbsp;суд можно будет отправить почтой.</li>
            <li>На заседание можно не приходить.</li>
            <li>Вы получите развод дистанционно.</li>
        </ul>';

if(empty($pol) || empty($events) || empty($childrens)){
    $out['status'] = false;
    $out['text'] = 'Не все поля заполнены';
    echo json_encode($out, JSON_UNESCAPED_UNICODE);
    return '';
}

$eventsEx = explode('|', $events);

if(is_int(array_search('g_2_1', $eventsEx))
    || is_int(array_search('g_2_2', $eventsEx))
    || is_int(array_search('g_2_3', $eventsEx))
    || is_int(array_search('g_3_1', $eventsEx))
    || is_int(array_search('g_3_2', $eventsEx))
    || is_int(array_search('g_3_3', $eventsEx))){
    $out['text'] = $out2;
    $out['type'] = 2;
}

if(is_int(array_search('g_2_4', $eventsEx)) 
    || is_int(array_search('g_2_5', $eventsEx))){
    $out['text'] = $out1;
    $out['type'] = 1;
}

if(is_int(array_search('g_3_4', $eventsEx))
    || is_int(array_search('g_2_6', $eventsEx))){
    $out['text'] = $out3;
    $out['type'] = 3;
}

$out['status'] = true;
echo json_encode($out, JSON_UNESCAPED_UNICODE);

