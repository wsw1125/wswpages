window.onload=function(){

	var divj1=document.getElementById('div1');
	var btn1=document.getElementsByTagName('input')[0];
	btn1.onclick=function(){
		divj1.innerHTML="<input type=\"hidden\"><script defer>alert('hi');<\/script>";
	}
	
}