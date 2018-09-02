<?php
header('Content-type:text/html; charset="utf-8"');

/*
API:
	getPics.php

		参数
		data : 查询字段
*/
$data = isset($_GET['data']) ? $_GET['data'] : 1;

$url = 'https://music.douban.com/j/subject_suggest?q=' . $data;

$content = file_get_contents($url);
$content = iconv('gbk', 'utf-8', $content);

echo $content;

?>