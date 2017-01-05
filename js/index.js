$(window).load(function (){ 
/* $(function(){ */
	//切换页面
	$('#load').hide();
	switchpage();
	/*首页*/
	/*首页的轮播*/
	var ofigprev=$('.figprev');
	var ofignext=$('.fignext');
	var aLifigimg=$('#figimg li');
	var oDivfigimg=$('#figimg');
	carousel(ofignext,ofigprev,aLifigimg,oDivfigimg);
	
	/*第二页*/
	tocenter($('.binlist'));
	tocenter($('#canvas'));
	/*第三页*/
	var oDivcaseul=$('.caseul');
	var oDivprev=$('.prev');
	var oDivnext=$('.next');
	var aLicaseul=$('.caseul li');
	//第三页的轮播
	carousel(oDivprev,oDivnext,aLicaseul,oDivcaseul);
	//让元素居中显示
	tocenter(oDivcaseul);
	
	//第四页切换文字
	switext();
	//鼠标移动移动背景
	movebg();
	//鼠标经过显示联系方式
	contact();



	//切换页面函数
	function switchpage(){
			var now=0;
			var conlist=$('.content .cont');
			var navlist=$('#nav li:gt(0)');
			var contop;
			navlist.click(function(){
				if (now==$(this).index()) {
					return false;
				};
				
				var index=$(this).index()
				now=index;
				var winHeight=$(window).height();
				var bol=true;
				conlist.each(function(){
					contop=$(this).offset().top;
					if (contop==winHeight-conlist.height()-145) {
						bol=false;
					};
				});

				conlist.stop(true,true).eq(now).siblings().animate({bottom:'-450px'},500)
								.queue(function(){
									conlist.stop(true,true).eq(now).animate({bottom:'145px'},500,fnmove);
								});

				if(bol) {
					conlist.stop(true,true).eq(now).animate({bottom:'145px'},500,fnmove);
					return false;
				};
			});

			$('.content .btn,#nav .act').click(function(){
				conlist.stop(true,true).eq(now).animate({bottom:'-450px'},500);
				now=0;
				$('#header .side').stop().animate({left:'160px'},200);
				circle(false);
			});
			//回调函数
			function fnmove(){
				$('#contactform').css({top:'-100px',opacity:0});
				$('#code').css({left:'300px',opacity:0});;
				$('#information').css({opacity:0});
				if(now==4){
					$('#contactform').stop(true,true).animate({top:'30px',opacity:1},300)
						.queue(function(){
							$('#code').animate({left:'700px',opacity:1},500);
							$('#information').animate({opacity:1},1000);
						});
				};
				//动态画圆
				if(now==1){
					circle(true);
				}else{
					circle(false);
				}
				
			}
		//鼠标点击和经过菜单
		$('#nav li').mouseover(function(){
			var innum=$(this).index();
			var sideLeft=160+innum*90;
			$('#header .side').stop().animate({left:sideLeft},200);
		});
		$('#nav').mouseleave(function(){
			var sideLeft=160+now*90;
			$('#header .side').stop().animate({left:sideLeft},200);
		});
	};


	function tocenter(obj){
		//让元素居中显示
		var leftval=($(window).width()-obj.width())/2;
		obj.css("left", leftval+"px");
		$(window).resize(function() {
			winWidth=$(window).width();
			leftval=(winWidth-obj.width())/2;
			obj.css("left", leftval+"px");
		});
	};


	//第四页的轮播器
	function switext(){
		var aLimenu=$('.menu li');
		var ulmenulist=$('.menulist ul');
		var limenulist=$('.menulist ul li');
		var i=0;
		var ulleft;
		var t=setInterval(stmove,6000)
		
		aLimenu.mouseover(function(){
			i=$(this).index();
			ulleft=-limenulist.width()*i;
			aLimenu.eq(i).addClass('active').siblings().removeClass('active');
			ulmenulist.animate({left: ulleft},200)
			clearInterval(t);
		});
		
		aLimenu.mouseout(function(){
			t=setInterval(stmove,6000)
		});
		function stmove(){
			i++;
			if(i<0)
			{
				i=2;
			}
			if(i>=limenulist.length)
			{
				i=0;
			}
			ulleft=-limenulist.width()*i;
			aLimenu.eq(i).addClass('active').siblings().removeClass('active');
			ulmenulist.animate({left: ulleft},200)
		};
	}
	//轮播器
	function carousel(oPrev,oNext,aLi,oDiv){
		var arr=[];
		aLi.each(function(i){
				arr.push([aLi.eq(i).position().left, aLi.eq(i).position().top, aLi.eq(i).css('opacity'),
				aLi.eq(i).width(), aLi.eq(i).height(), aLi.eq(i).css('font-size')]);
				//alert(aLicaseul.eq(i).css('font-size'));
		});
			
		oPrev.click(function(){
				
			arr.push(arr[0]);
			arr.shift();
			switchMove();
		});
		oNext.click(function(){
			arr.unshift(arr[arr.length-1]);
			arr.pop();
			switchMove();
				
		});
			
		var time=setInterval(move,3000);
		oDiv.mouseover(function(){
			clearInterval(time);
				
		});
		oDiv.mouseout(function(){
			time=setInterval(move,3000)
		});
		//自动轮播函数
		function move(){
			arr.push(arr[0]);
			arr.shift();
			switchMove();
		};
		function switchMove(){
			aLi.each(function(i){
				aLi.eq(i).animate({left:arr[i][0], top:arr[i][1], opacity:arr[i][2],
				width:arr[i][3], height:arr[i][4], fontSize:arr[i][5]},500);
			});
		}
	}
	
	//动态画圆
	function circle(bool){
		var c=$('#canvas')[0];
		var cxt=c.getContext("2d");
		var drawtime=setInterval(function(){
			draw(bool);
		},30)
		var sp=0;
		function draw(bool){
			if(bool==true){
				sp+=0.1;
			}
			if(bool==false){
				sp=0;
				cxt.clearRect(0,0,1150,180);
				clearInterval(drawtime);
			}
			if(sp>2){
				sp=2;
				clearInterval(drawtime);
			}
			cxt.lineWidth=4;
			cxt.strokeStyle="#084363";
			cxt.fillStyle="#fff";
			
			cxt.beginPath();
			cxt.clearRect(0,0,1150,180);
			cxt.arc(146,90,80,0,Math.PI*sp,false);
			cxt.stroke();
			cxt.beginPath();
			cxt.arc(430,90,80,0,Math.PI*sp,false);
			cxt.stroke();
			cxt.beginPath();
			cxt.arc(718,90,80,0,Math.PI*sp,false);
			cxt.stroke();
			cxt.beginPath();
			cxt.arc(1001,90,80,0,Math.PI*sp,false);
			cxt.stroke();
		};
	};

	//鼠标移入移出显示联系方式
	
	function contact(){
		var aLifollow=$('.followmeLi li');
		var aLifollowBox=$('.follow_box li');
		aLifollow.mouseover(function(){
			var index=$(this).index();
			aLifollowBox.eq(index).css("z-index",1).siblings().css("z-index",0);
			aLifollowBox.stop(true,true).eq(index).siblings().animate({left:'230px',opacity:0},400)
											.queue(function(){
												aLifollowBox.stop(true,true).eq(index).animate({left:'0px',opacity:1},400);
											});
		
			});
			$('#followme').mouseleave(function(){
				aLifollowBox.stop(true,true).animate({left:'230px',opacity:0},400);
			});	
	}
//alert($(document).scrollLeft());
	//鼠标移动移动背景
	movebg()
	function movebg(){
		$(document).mousemove(function(e){
			var pointX=e.pageX/50;
			var pointY=-e.pageY/50;
			//alert(pointX);
			$('#bg1 img').css({'left':pointX, 'top':pointY});
		
		});
	}
	
	
})
	
