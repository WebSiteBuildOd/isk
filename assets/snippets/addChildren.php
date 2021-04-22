<?php
define('MODX_API_MODE', true);
require_once $_SERVER['DOCUMENT_ROOT'].'/index.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/config.core.php';
require_once MODX_CORE_PATH.'model/modx/modx.class.php';
$modx=new modX();
$modx->initialize('web');

if($_GET['event'] != 'add-children') {
    return false;
}

$out = $modx->getChunk('tpl.add-children');

echo $out;