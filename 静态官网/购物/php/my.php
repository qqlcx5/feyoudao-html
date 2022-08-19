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
if($pw!=1){
$tel=$nam2[2];
$carid=$nam2[3];
$mail=$nam2[4];
$qq=$nam2[5];
$sql="UPDATE usersigin SET pwd='$pw',tel='$tel',carid='$carid',mail='$mail',qq='$qq' where username='$use'";
}else{
    $sql="DELETE FROM usersigin where username='$use'";
}
if(mysqli_query($conn,$sql)){
    echo $use;
}else{
    echo "修改失败";
    // echo $nam2;
}

// 关闭连接
$conn->close();
?>