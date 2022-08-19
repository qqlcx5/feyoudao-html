<?php
header("Content-type: text/html; charset=utf-8");

//设置数据库
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "huiyi";
$conn = mysqli_connect($servername, $username, $password, $dbname) or die("数据库连接失败");
mysqli_set_charset($conn, 'utf8');

$nam=file_get_contents('php://input');
// $nam="username=q12344&psd=a123123&tel=18398968975&carid=513723201010101010&mail=&qq=";
$nam=explode('&',$nam);
$nam2=array();
foreach($nam as $k=>$v){
    $nam=explode("=",$v);
    $nam2[$k]=$nam[1];
}
$use=$nam2[0];
$pw=$nam2[1];
$tel=$nam2[2];
$carid=$nam2[3];
$mail=$nam2[4];
$qq=$nam2[5];
$sql="insert into usersigin (username,pwd,tel,carid,mail,qq) values('$use','$pw','$tel','$carid','$mail','$qq')";
// $kk=$_POST['datastr'];
// print_r("fsa".file_get_contents('php://input'));

// if($nam){
//     echo "这".$nam[0];
// }else{
//     echo "为空";
// }
// echo $use;
if(mysqli_query($conn,$sql)){
    // echo "插入成功";
    // print_r($use);
    echo $use;
}else{
    echo "插入失败";
}

// 关闭连接
$conn->close();
?>