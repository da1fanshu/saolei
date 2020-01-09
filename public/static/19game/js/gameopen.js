$(".dbnum").click(function(){
    $(this).addClass('on').siblings('div').removeClass('on');
});
$(".jia").click(function(){
    x = $("#dbshou").text();
  	x++;
    if (x > 50) { return false; };
  	$("#dbshou").text(x);
  	$(".yjsy").text(x*4);
  	$(".jcjine").text(x*2);
});
$(".jian").click(function(){
    x = $("#dbshou").text();
  	x--;
    if (x < 1) { return false; };
  	$("#dbshou").text(x);
  	$(".yjsy").text(x*4);
  	$(".jcjine").text(x*2);
});