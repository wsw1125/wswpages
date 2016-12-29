$(function(){
		$('.member, .logout').hide();
	
		if ($.cookie('user')) {
			$('.member, .logout').show();
			$('.regbt, .loginbt').hide();
			$('.member span').html($.cookie('user'));
		} else {
			$('.member, .logout').hide();
			$('.regbt, .loginbt').show();
		}

	$('.logout').click(function () {
		$.removeCookie('user');
		window.location.href = '/jquery/';
	});

	$('#loading').dialog({
		autoOpen :false,
		modal : true,
		closeOnEscape : false,
		resizable : false,
		draggable : false,
		width : 180,
		height : 50,
	}).parent().parent().find('.ui-widget-header').hide();
	$('.regbt').click(function () {
		$('#reg').dialog('open');
		
	});
	 $("#reg").dialog({
			autoOpen:false,
			width:340,
			height:450,
			title:"会员注册",
			buttons:{
				"提交":function(){
					$(this).submit();
				},
				"取消":function(){
					$(this).dialog("close");
				}
			},
			show:true,
			hide:true,
			resizable:false,
			modal:true,
			closeText:"关闭",
		 }).buttonset().validate({
		 		submitHandler : function (form) {
					$(form).ajaxSubmit({
						url : 'add.php',
						type : 'POST',
						beforeSubmit : function (formData, jqForm, options) {
							$('#loading').dialog('open');
							$('#reg').dialog('widget').find('button').eq(1).button('disable');
						},
						success : function (responseText, statusText) {
							// alert(responseText);
							if(responseText){
								$('#reg').dialog('widget').find('button').eq(1).button('enable');
								$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('数据新增成功...');
								$.cookie('user', $('#user').val());
								setTimeout(function (){
									$('#loading').dialog('close');
									$('#reg').dialog('close');
									$('#reg').resetForm();
									$('#reg span.star').html('*').removeClass('succ');
									$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
									$('.member, .logout').show();
									$('.regbt, .loginbt').hide();
									$('.member span').html($.cookie('user'));
								},1000);
							}
						},
					});
				},
			
				showErrors : function (errorMap, errorList) {
					var errors = this.numberOfInvalids();
					
					if (errors > 0) {
						$('#reg').dialog('option', 'height', errors * 20 + 340);
					} else {
						$('#reg').dialog('option', 'height', 360);
					}
					
					this.defaultShowErrors();
				},
				
				highlight : function (element, errorClass) {
					$(element).css('border', '1px solid #630');
					$(element).parent().find('span').html('*').removeClass('succ');
				},
				
				unhighlight : function (element, errorClass) {
					$(element).css('border', '1px solid #ccc');
					$(element).parent().find('span').html('&nbsp;').addClass('succ');
				},
		
		 		errorLabelContainer : 'ol.reg_error',
				wrapper : 'li',
			 	rules : {
				user : {
					required : true,
					minlength : 2,
					remote : {
						url : 'is_user.php',
						type : 'POST',
					},
				},
				pass : {
					required : true,
					minlength : 6,
				},
				email : {
					required : true,
					email : true
				},
				date : {
					date : true,
				},
			},
			messages : {
				user : {
					required : '帐号不得为空！',
					minlength : jQuery.format('帐号不得小于{0}位！'),
					remote : '帐号被占用！',
				},
				pass : {
					required : '密码不得为空！',
					minlength : jQuery.format('密码不得小于{0}位！'),
				},
				email : {
					required : '邮箱不得为空！',
					minlength : '请输入正确的邮箱地址！',
				},	
			}
		 });

		$('#date').datepicker({
			changeMonth : true,
			changeYear : true,
			yearSuffix : '',
			maxDate : 0,
			yearRange : '1950:2020',
		});
	
	$("#email").autocomplete({
		delay : 0,
		autoFocus : true,
		 source:function(request, response){
		 	var hosts = ['qq.com', '163.com', '263.com', 'sina.com.cn','gmail.com', 'hotmail.com'],
			term = request.term,		//获取用户输入的内容
			name = term,				//邮箱的用户名
			host = '',					//邮箱的域名
			ix = term.indexOf('@'),		//@的位置
			result = [];				//最终呈现的邮箱列表
		 		
		 	result.push(term);
			//当有@的时候，重新分别用户名和域名
			if (ix > -1) {
				name = term.slice(0, ix);
				host = term.slice(ix + 1);
			}

			if (name) {
			//如果用户已经输入@和后面的域名，
			//那么就找到相关的域名提示，比如bnbbs@1，就提示bnbbs@163.com
			//如果用户还没有输入@或后面的域名，
			//那么就把所有的域名都提示出来
				
			var findedHosts = (host ? $.grep(hosts, function (value, index) {
					return value.indexOf(host) > -1
				}) : hosts),
				findedResult = $.map(findedHosts, function (value, index) {
				return name + '@' + value;
				});
				
			result = result.concat(findedResult);
		}
			response(result);
		},
	 });

	//登录
	
	$('.loginbt').click(function () {
		$('#login').dialog('open');
		
	});

	$('#login').dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		width : 320,
		height : 260,
		closeText:"关闭",
		buttons : {
			'登录' : function () {
				$(this).submit();
			}
		}
	}).validate({
	
		submitHandler : function (form) {
			$(form).ajaxSubmit({
				url : 'login.php',
				type : 'POST',
				beforeSubmit : function (formData, jqForm, options) {
					$('#loading').dialog('open');
					$('#login').dialog('widget').find('button').eq(1).button('disable');
				},
				success : function (responseText, statusText) {
					if (responseText) {
						$('#login').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('登录成功...');
						if ($('#expires').is(':checked')) {
							$.cookie('user', $('#login_user').val(), {
								expires : 7,
							});
						} else {
							$.cookie('user', $('#login_user').val());
						}
						setTimeout(function () {
							$('#loading').dialog('close');
							$('#login').dialog('close');
							$('#login').resetForm();
							$('#login span.star').html('*').removeClass('succ');
							$('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
							$('.member, .logout').show();
							$('.regbt, .loginbt').hide();
							$('.member span').html($.cookie('user'));
						}, 1000);
					}
				},
			});
		},
	
		showErrors : function (errorMap, errorList) {
			var errors = this.numberOfInvalids();
			
			if (errors > 0) {
				$('#login').dialog('option', 'height', errors * 20 + 260);
			} else {
				$('#login').dialog('option', 'height', 260);
			}
			
			this.defaultShowErrors();
		},
		
		highlight : function (element, errorClass) {
			$(element).css('border', '1px solid #630');
			$(element).parent().find('span').html('*').removeClass('succ');
		},
		
		unhighlight : function (element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
	
		errorLabelContainer : 'ol.login_error',
		wrapper : 'li',
	
		rules : {
			login_user : {
				required : true,
				minlength : 2,
			},
			login_pass : {
				required : true,
				minlength : 6,
				remote : {
					url : 'login.php',
					type : 'POST',
					data : {
						login_user : function () {
							return $('#login_user').val();
						},
					},
				},
			},
		},
		messages : {
			login_user : {
				required : '帐号不得为空！',
				minlength : jQuery.format('帐号不得小于{0}位！'),
			},
			login_pass : {
				required : '密码不得为空！',
				minlength : jQuery.format('密码不得小于{0}位！'),
				remote : '帐号或密码不正确！',
			}
		}
	});



	//轮播器动画
	var i=0;
	$(".cardimg li").eq(i).fadeIn(500).siblings().fadeOut(500);
	//鼠标经过控制
	$(".num li").mouseover(function(){
		
		 $(this).addClass('active').siblings().removeClass();
		var index=$(this).index();
		i=index;
		$(".cardimg li").eq(index).fadeIn(500).siblings().fadeOut(500);

		// $(".cardimg li").eq(i).stop().fadeIn(700).siblings().stop().fadeOut(700);
		

	});
	var t=setInterval(move,2000);
	function move(){
		i++;
		if (i==5) {
			i=0;
		};
		
		$(".num li").eq(i).addClass('active').siblings().removeClass();
		
		$(".cardimg li").eq(i).fadeIn(500).siblings().fadeOut(500);
	};
	function moveL(){
		i--;
		if (i==-1) {
			i=4;
		};
		$(".num li").eq(i).addClass('active').siblings().removeClass();
		
		$(".cardimg li").eq(i).fadeIn(500).siblings().fadeOut(500);
	};

	//鼠标经过
	$(".card").hover(function(){
		clearInterval(t);
		$(".card .butn").fadeIn(500)
	},function(){
		t=setInterval(move,2000)
		$(".card .butn").fadeOut(500)
	});

	//鼠标点击左右键盘
	$(".next").click(function(){
		move();
	});
	$(".prev").click(function(){
		moveL();
	});

	//右边明星专区
	$(".areatitle li").mouseover(function(){
		$(this).addClass('act').siblings().removeClass('act');
		var j=$(this).index();
		$(".areatext li").eq(j).show().siblings().hide();
	});

	//返回顶部
	$(window).scroll(function(){
		if ($(window).scrollTop()>100){
			$('#backtop').fadeIn(1000);  
		}else{
			$('#backtop').fadeOut(1000);  
		}
	});
	$('#backtop').click(function(){
		$('body,html').animate({scrollTop:0},500);  
        return false; 
	});
        
    //鼠标经过图片放大
    var textimg=$('.textimg img');
    var phtShow=$('#phtShow img');
    textimg.mouseover(function(){
    	phtShow.attr("src", this.src).show(); 
    });
    textimg.mousemove(function(e){
    	var pointX = e.pageX-$(document).scrollLeft()+20;
    	var pointY = e.pageY-$(document).scrollTop()-phtShow.height()/2;
    	phtShow.css({"left": pointX, "top": pointY});
    	//phtShow.css("top",pointY);
    	// var temp =  e.pageX;
    });
   
   

    textimg.mouseout(function(){
    	$('#phtShow img').hide();
    });  
  
})