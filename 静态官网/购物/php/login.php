<?php 
header("Content-type: text/html; charset=utf-8");
$servername="localhost";
$username="root";
$password="root";
$dbname="huiyi";

$conn=mysqli_connect($servername,$username,$password,$dbname)or die("数据库连接失败");

mysqli_set_charset($conn,'utf8');


function mydb($sql){
    global $conn;

    $result=$conn->query($sql);


    if($result!==false){
        $arr=array();
        $arr_data=$result->fetch_assoc();

        while($arr_data){
            $arr[]=$arr_data;
            $arr_data=$result->fetch_assoc();
    }
        return $arr;
    }else{
        return false;
    }
}
$sql="select * from usersigin";

$res=mydb($sql);
$res=json_encode($res);

echo $res;

// 关闭连接
$conn->close();
?>