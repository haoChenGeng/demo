/*
 *name:dtt
 *time:2014.12.01
 *content:注册页
 */
seajs.config({
    // 别名配置
    alias: {
        'head':'../../../module/head/js/init.js',
		'service':'../../../module/service/js/init.js',
		'rightTips':'../../../module/rightTips/js/init.js',
		'dialog':'../../../module/dialog/js/init.js'
    }
});
define(function(require, exports, module) {
    require('head');
	require('service');
    require('rightTips');
	require('dialog');

	//弹窗
	var dialog = require('dialog');
	exports.dialog = function(id,title,content,width,height,closeFun){
        dialog({
            id:id,
            title:title,
            fixed:true,
            width:width,
            height:height,
            lock: true,
            opacity: 0.9,
            background:'#000',
            max:false,
            min:false,
            close:closeFun || function(){},
            content:content
        });
    };

	//手机验证
	var phone=function(tmp){
		var $th=tmp,$val=$th.val(),
			$leb=$th.parents("div.wbor").siblings("span.po"),
			$ibor = tmp.parent("div.ibor");
		$leb.removeClass("err");
		$leb.removeClass("err2");
		$leb.removeClass("succ");
		$leb.removeClass("onload");
		$(".send-modle .send-vcode").removeClass("clk-bg");
		if(/(^[1][34587][0-9]{9}$)/g.test($val)){
			$th.parents("div.wbor").siblings("span.po").removeClass("lh").addClass("onload").html("正在进行合法性校验，请稍候...");
			var status = false;
			$.ajax({
				async:false,
				url:$th.attr("data-checkphoneurl")+$val,
				type:"get",
				dataType:"json",
				success:function(data){
					switch(data){
						case "1":
							$leb.addClass("succ").html("");
							$(".send-modle .send-vcode").addClass("clk-bg");
							$ibor.removeClass("wrong");
							break;
						case "22":
							$leb.addClass("err2").removeClass("lh").html("手机号码为空");
							$ibor.addClass("wrong");
							break;
						case "6":
							$leb.addClass("err2").removeClass("lh").html("注册手机号重复");
							$ibor.addClass("wrong");
							break;
						case "8":
							$leb.addClass("err2").removeClass("lh").html("手机号码格式错误");
							$ibor.addClass("wrong");
							break;
						case "29":
							$leb.addClass("err2").removeClass("lh").html("验证码的发送时间间隔为60秒，请稍后再试");
							$ibor.addClass("wrong");
							break;
					}
					if(data != "1"){
						status = false;
					}else{
						status = true;
					}
				},
				error:function(){
					$leb.addClass("err2").removeClass("lh").html("服务器没有返回数据，可能服务器忙");
					$ibor.addClass("wrong");
				}
			});
			return status;
		}else{
			$leb.addClass("err lh").html($th.attr("data-err"));
		}
	}

	//失去焦点为空报红
	var check_empty=function(tmp,msg){
		var $leb=tmp.parents("div.wbor").siblings("span.po"),
			$ibor=tmp.parent("div.ibor");
		if(tmp.val()==""){
			$leb.addClass("err2").removeClass("lh").html(msg);
			return false;
		}
		return true;
	}

	//输入框
	var $form=$("form[name='register']"),ref=false;

	var checkRefferee = function(){
		var $th=$form.find("input[name='refferee']"),
		$val=$th.val(),
		$leb=$th.parents("div.wbor").siblings("span.po");
		$ibor=$th.parent("div.ibor");
		$.ajax({
			async:false,
			url:$th.attr("data-url")+encodeURI(encodeURI($val)),
			type:"get",
			dataType:"json",
			success:function(data){
				switch(data){
					case "20":
						$leb.addClass("succ").html("");ref=true;
						break;
					case "21":
						$leb.addClass("err2").removeClass("lh").html("该推荐人不存在");ref=false;
						$ibor.addClass("wrong");
						break;
				}
			},
			error:function(){
				$leb.addClass("err2").removeClass("lh").html("服务器验证推荐人出现错误");ref=false;
				$ibor.addClass("wrong");
			}
		});
		return ref;
	}

	var refferee=function(){//推荐人判断
		var $th=$form.find("input[name='refferee']"),
		$leb=$th.parents("div.wbor").siblings("span.po");
		if($th.val()==""){
			$leb.html("");ref=true;
		}
	}

	$form.find("input").blur(function(){
		var $th=$(this),
			$val=$th.val(),
			$leb=$th.parents("div.wbor").siblings("span.po"),
			$ibor = $th.parent("div.ibor");
		$form.find("div.wbor").removeClass("cur");
		$leb.removeClass("err");
		$leb.removeClass("err2");
		$leb.removeClass("succ");
		switch($th.attr("name")){
			case "userName"://用户名
				var length=$val.replace(/[\u2E80-\u9FFF]/g,"aa").length;
				if(length == 0){
					$leb.addClass("err2").removeClass("lh").html("请使用手机号码或自定义用户名注册账号");
					$ibor.addClass("wrong");
				}else {
					if(/^[1][34587][0-9]{9}$/g.test($val)){
						$(".ipt-phone").hide();
						$leb.addClass("succ").html("");
					}else{
						$(".ipt-phone").show().find("input").focus();
						if(/[\u4e00-\u9fa5]/.test($val)){
							$leb.addClass("err2").removeClass("lh").html("请不要使用中文字符");
							$ibor.addClass("wrong");
						}else if(length>=1&&!/^[a-zA-Z0-9_]+$/g.test($val)){
							$leb.addClass("err").addClass("lh").html("用户名限定6-16个字符，可包含英文，数字和下划线。请填写正确的手机号码或用户名");
							$ibor.addClass("wrong");
						}else if(length>=6&&!/^[a-zA-Z0-9_]+$/g.test($val)){
							$leb.addClass("err").addClass("lh").html("用户名限定6-16个字符，可包含英文，数字和下划线。请填写正确的手机号码或用户名");
							$ibor.addClass("wrong");
						}else if(length<6||length>16||!/^[a-zA-Z0-9_]+$/g.test($val)){
							$leb.addClass("err").addClass("lh").html($th.attr("data-err"));
							$ibor.addClass("wrong");
						}else if(length>=6&&/^[0-9]/g.test($val)){
							$leb.addClass("err2").removeClass("lh").html("用户名不能以数字开头");
							$ibor.addClass("wrong");
						}else if(length>=6&&/^xnw/g.test($val)){
							$leb.addClass("err2").removeClass("lh").html("用户名不能以 xnw 开头");
							$ibor.addClass("wrong");
						}else{
							$leb.addClass("onload").removeClass("lh").html("正在进行校验，请稍候...");
							$.ajax({
								url:$th.attr("data-url")+encodeURI(encodeURI($val)),
								type:"get",
								dataType:"json",
								success:function(data){
									switch(data){
										case "1":
											$leb.addClass("succ").html("");
											break;
										case "3":
											$leb.addClass("err2").removeClass("lh").html("该用户名已被使用，请更换用户名");
											$ibor.addClass("wrong");
											break;
										case "9":
											$leb.addClass("err").addClass("lh").html($th.attr("data-err"));
											$ibor.addClass("wrong");
											break;
									}
								},
								error:function(){
									$leb.addClass("err2").removeClass("lh").html("服务器没有返回数据，可能服务器忙");
									$ibor.addClass("wrong");
								}
							});
						}
					}
				}
			break;
			case "password"://密码
				var length=$val.length,
					sibLeb=$leb.addClass("err2").removeClass("lh");
				if(length==0){
					sibLeb.html("登录密码不能为空");
					$ibor.addClass("wrong");
				}else if(length<8||length>20){
					sibLeb.html($th.attr("data-err"));
					$ibor.addClass("wrong");
				}else if(length>=8&&/^[0-9]+$/g.test($val)){
					sibLeb.html("密码不能为纯数字");
					$ibor.addClass("wrong");
				}else if(length>=8&&/^[A-Z]+$/g.test($val)){
					sibLeb.html("密码不能为纯大写字母");
					$ibor.addClass("wrong");
				}else if(length>=8&&/^[a-z]+$/g.test($val)){
					sibLeb.html("密码不能为纯小写字母");
					$ibor.addClass("wrong");
				}else if(length>=8&&/^\W+$/g.test($val)){
					sibLeb.html("密码不能为纯符号");
					$ibor.addClass("wrong");
				}else if(length>=8&&/\s+/g.test($val)){
					sibLeb.html("密码不能包含空格");
					$ibor.addClass("wrong");
				}else{
					$leb.removeClass("err2").addClass("succ").html("");
				}
			break;
			case "confirmPassword"://重复密码
				var pwdOne=$form.find("input[name='password']").val();
				if($val.length==0){
					$leb.addClass("err2").html("确认密码不能为空");
					$ibor.addClass("wrong");
				}else if($val.length<8){
					$leb.addClass("err2").html($th.attr("data-err"));
					$ibor.addClass("wrong");
				}else if(pwdOne.length>=8&&pwdOne!=$val&&$val.length>=8){
					$leb.addClass("err2").html("两次密码输入不一致");
					$ibor.addClass("wrong");
				}else if(pwdOne.length>=8&&pwdOne==$val){
					$leb.addClass("succ").html("");
				}else{
					$leb.html("");
				}
			break;
			case "verifyCode"://验证码
				if($val==""){
					$leb.addClass("err2").html($th.attr("data-err"));
					$ibor.addClass("wrong");
				}else{
					$leb.removeClass("err2").html("");
				}
			break;
			case "refferee"://推荐人
				refferee();
			break;
			case "mobile"://手机号
				check_empty($th,"请输入您的手机号码");
				if(/^[1][34587][0-9]{9}$/g.test($val)){
					$leb.addClass("succ").html("");
				}else{
					$leb.addClass("err").addClass("lh").html("请输入13、14、15、18或17开头的11位手机号码");
					$ibor.addClass("wrong");
				}
			break;
			case "phoneCode"://手机验证码
				//check_empty($th,"请输入验证码");
			break;
		}

	}).focus(function(){
		var $th=$(this),
			$leb=$th.parents("div.wbor").siblings("span.po"),
			$ibor=$th.parent("div.ibor");
		$ibor.removeClass("wrong");
		$th.parents("div.wbor").addClass("cur");
		$leb.removeClass("err");
		$leb.removeClass("err2");
		$leb.removeClass("succ");
		$leb.removeClass("onload");
		if($th.attr("name")=="userName"||$th.attr("name")=="password"){
			$leb.addClass("lh").html($th.attr("data-po"));
			code($th.val());
		}else if($th.attr("name")=="mobile"){
			//$leb.addClass("lh");
		}else{
			$th.parents("div.wbor").siblings("span.po").html($th.attr("data-po"));
		}
	});


	(function ($) {
	/*
	 * 0-弱
	 * 1-中
	 * 2-强
	 */
	var pswstrength = function () {}
	pswstrength.prototype = {
		constructor: pswstrength,
		//Unicode 编码区分数字，字母，特殊字符
		CharMode: function (iN) {
			if (iN >= 48 && iN <= 57) //数字（U+0030 - U+0039）
				return 1; //二进制是0001
			if (iN >= 65 && iN <= 90) //大写字母（U+0041 - U+005A）
				return 2; //二进制是0010
			if (iN >= 97 && iN <= 122) //小写字母（U+0061 - U+007A）
				return 4; //二进制是0100
			else //其他算特殊字符
				return 8; //二进制是1000
		},
		bitTotal: function (num) {
			modes = 0;
			for (i = 0; i < 4; i++) {
				if (num & 1) //num不是0的话
					modes++; //复杂度+1
				num >>>= 1; //num右移1位
			}
			return modes;
		},
		check: function (sPW) {
			if (sPW.length < 6) //小于7位，直接“弱”
				return 0;
			Modes = 0;
			for (i = 0; i < sPW.length; i++) { //密码的每一位执行“位运算 OR”
				Modes |= this.CharMode(sPW.charCodeAt(i));
			}
			return this.bitTotal(Modes);
		}
	}
	window.pswstrength=new pswstrength();
	})(jQuery);

	var code=function(val){
		var a=pswstrength.check(val);
		$(".tab span.po span").removeClass("cl");
		$(".tab span.po span:lt("+a+")").addClass("cl");
	}

	//密码强、中、弱
	$form.find("input[name='password']").keyup(function(){
		var $th=$(this),$val=$th.val();
		code($val);
	});
	//验证回调提示
	var fnbreak=function(leb,info){
		if(leb.is("span.msgbox")){
			leb.html(info).show();
			$('ul.but .r a.next').removeClass("no-push").html('下一步');
		}else{
			$('ul.but .r a.next').removeClass("no-push").html('下一步');
			leb.addClass("wrong");
			var $po = leb.parents("div.wbor").siblings(".po");
			$po.removeClass("err succ onload lh").addClass("err2").html(info);
		}
	}

	//第一步提交
	var register=true;
	var registerPush=function(){
		$("span.msgbox").hide();

		for(var i=0;i<$form.find("input.ipt:visible").length;i++){
			if($form.find("input.ipt:visible").eq(i).val()==""){
				$form.find("input.ipt:visible").eq(i).focus();
				return false;
			}
		}

		//设置密码加密
		var username = $("input[name='userName']").val();
		var pwdval=$("input[name='password']").val();

		if(/^[1][34587][0-9]{9}$/g.test(username)){
			$(".ipt-username input").attr("name","mobile");
			$(".ipt-phone input").attr("name","");
		}

		//校验手机号
		var $mobile = $("input[name='mobile']");
		if(!phone($mobile)){
			return false;
		}

		//校验推荐人
		var $refferee=$("input[name='refferee']");
		if($refferee.val()!=""){
			if($refferee.is(":visible") && !checkRefferee()){
				return false;
			}
		}
		if(register){
			register=false;
			$('ul.but .r a.next').addClass("no-push").html('提交中...');

			if(pwdval.length<=20){
				pwdval=RSAUtils.pwdEncode($("input[name='password']").val());
			}
			$form.find("input[name='password']").val(pwdval);

			var mobile=$("input[name='mobile']").val();
			var param=$form.serialize();
			$.ajax({
				url:$form.attr("data-url"),
				data:param,
				type:"POST",
				dataType: "json",
				success: function(data){
					register=true;
					switch(data){
						case "1":
							//成功状态
							registerNextSucc(mobile);
							$('ul.but .r a.next').addClass("no-push").html('提交中...');
						break;
						case "13":
							fnbreak($form.find("input[name='userName']"),"用户名为空");
							break;
						case "14":
							fnbreak($form.find("input[name='password']"),"密码为空");
							break;
						case "15":
							fnbreak($form.find("input[name='confirmPassword']"),"密码不匹配");
							break;
						case "17":
							fnbreak($form.find("input[name='verifyCode']"),"验证码为空");
							break;
						case "18":
							fnbreak($form.find("input[name='verifyCode']"),"验证码错误");
							break;
						case "3":
							fnbreak($form.find("input[name='userName']"),"该用户名已被使用，请更换用户名");
							break;
						case "9":
							fnbreak($form.find("input[name='userName']"),"用户名格式错误");
							break;
						case "22":
							fnbreak($form.find("input[name='mobile']"),"手机号为空");
							break;
						case "29":
							fnbreak($form.find("span.msgbox"),"短信验证码发送时间间隔为60秒");
							break;
						case "27":
							fnbreak($form.find("span.msgbox"),"短信验证码发送失败");
							break;
						case "30":
							fnbreak($form.find("input[name='verifyCode']"),"请重新获取验证码");
							break;
					}
					if(data != "1"){
						$(".ipt-username input").attr("name","userName");
						$(".ipt-phone input").attr("name","mobile");
					}
				}
			});
		}
	}

	//验证码弹窗
	function registerNextSucc(mobile){
		var tmp = $("#getcodepop").find(".phoneNum").html(mobile).end().html();
		exports.dialog('dialogz','验证身份信息',tmp,530,330,function(){
			$('ul.but .r a.next').removeClass("no-push").html('下一步');
			$("ul.ipt-code a.cd-a").trigger("click");
			$(".ipt-username input").attr("name","userName");
			$(".ipt-phone input").attr("name","mobile");
			$("input[name='password']").val('').parents("li").find('span.po').removeClass("succ");
			location.reload();
		});
		//$(".getCode").addClass("sended");
		//timeDown($(".getCode"),60);
	}

	//第二步提交
	var registerTwo=true;
	var registerPushTwo=function(){
		$("li.msgbox").hide();

		var btn = $('.getcodepop .btn:visible'),
			url = btn.data('url'),
			resultUrl = btn.data('resulturl');
		if(registerTwo){
			registerTwo=false;
			var param = {};
			param.userName=$("input[name='userName']").val();
			param.password=$("input[name='password']").val();
			param.refferee=$("input[name='refferee']").val();
			param.refferee_source=$("input[name='refferee_source']").val();
			param.mobile=$("input[name='mobile']").val();
			param.phoneCode=$("input[name='phoneCode']").val();
			param.channelType=$("input[name='channelType']").val();
			param.openId=$("input[name='openId']").val();
			param.nickName=$("input[name='nickName']").val();
			param['ooh.token.name']=$("input[name='ooh.token.name']").val();
			param['ooh.token.value']=$("input[name='ooh.token.value']").val();
			if(param.phoneCode == ''){
				registerTwo=true
				showMsg("请输入手机验证码");
				return;
			}
			//推广链接带#号时，将#号后面的参数以参数形式提交到后台
			var socuceUrl = location.href,
				queryString = function(item){
					var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
					return svalue ? svalue[1] : svalue;
				};
			if(socuceUrl.indexOf("channelIndex") > -1){
				param.ci = queryString("channelIndex");
			}else if(socuceUrl.indexOf("ci") > -1){
				param.ci = queryString("ci");
			}else if(socuceUrl.indexOf("#") > -1){
				param.ci = socuceUrl.substr(socuceUrl.indexOf("#")+1);
			}
			btn.addClass("disabled").html('提交中...');

			$.ajax({
				url:url,
				data:param,
				type:"POST",
				dataType: "json",
				success: function(data){
					registerTwo=true;
					switch(data){
						case "1":
							//成功状态
							$("#registerResultForm:visible").submit();
						break;
						case "22":
							showMsg("手机号码为空");
							break;
						case "23":
							showMsg("手机验证码为空");
							break;
						case "28":
							showMsg("服务器没有返回数据，请重发短信");
							break;
						case "24":
							showMsg("手机验证码不匹配");
							break;
						case "25":
							showMsg("手机号码不匹配");
							break;
						case "2":
							showMsg("您所注册的用户名已存在,请重新注册");
							break;
						case "6":
							showMsg("手机号码已被使用，请更换手机号码");
							break;
					}
					if(data != "1"){
						btn.removeClass("disabled").html('确 认');
					}
				}
			});
			return status;
		}
	}
	//注册第一步提交
	var subutNext=function(){
		$(".no-push").length<=0
		&& $(".btn-one").length
		&& $(".color-agre input[name='agre']").is(":checked")
		&& !$("span.err:visible").length>0
		&& !$("span.err2:visible").length>0
		&& registerPush();
	}
	$("ul.but .r").delegate("a.next","click",function(event){
		event.preventDefault();
		if($(this).hasClass("btn-three")){//qq登陆
			login();
		}else{
			subutNext();
		}
		return false;
	});

	//注册确认
	$(document).delegate("#confirmReg:visible","click",function(){
		registerPushTwo();
	});

	//更换号码
	$(document).delegate(".changePhone","click",function(){
		dialog.list['dialogz'].close();
		location.reload();
		if($("input[name='mobile']:visible").length){
			$("input[name='mobile']").focus();
		}else{
			$("input[name='userName']").focus();
		}
		$("ul.ipt-code a.cd-a").trigger("click");
	});

	//处理键盘的回车键登录
	$(document).keydown(function(event){
		if(event.keyCode==13){
			if($(".btn-three").length>0&&$(".btn-three").colsest(".reg-qq-box").hasClass("reg-qq-show")){//qq登陆
				login();
			}else{
				subutNext();
			}
		}
	});
	//选中使用条款及隐私条款
	$(".color-agre").delegate("input[name='agre']","click",function(){
		if($(this).is(":checked")){
			registerTwo=true;
			$('ul.but .r a.next').removeClass("no-push");
		}else{
			registerTwo=false;
			$('ul.but .r a.next').addClass("no-push");
		}
	});

	//使用条款及隐私条款
	$("ul.color-agre").delegate("a.info","click",function(event){
		event.preventDefault();
		var $th=$(this),til=$th.index()==1?"使用条款":"隐私条款";
		var urlCen=$th.attr("data-url");
		$.dialog({
			title:til,
			width:800,
			height:600,
			lock: true,
			opacity: 0.5,
			background:'#000',
			max: false,
			padding:0,
    		min: false,
			content:'<iframe class="iframe-height" src="'+urlCen+'" marginheight="0" marginwidth="0" frameborder="0" width="800" height="600"></iframe>'
		});
		return false;
	});

	//选择有或无推荐人选项
	$(".name-h ul").delegate("li","click",function(){
		var $th=$(this),$leb=$th.parent("ul").siblings("span.po");;
		$leb.html("");
		$leb.siblings(".wbor").find("input").val("");
		$leb.removeClass("err2");
		$leb.removeClass("succ");
		$leb.removeClass("onload");
		if(!$th.hasClass("check")){
			$th.addClass("check").siblings().removeClass("check");
		}
		if($th.index()==1&&$th.hasClass("check")){
			$(".name-h .wbor").addClass("bor-show");
		}else{
			$(".name-h .wbor").removeClass("bor-show");
			$(".name-h .ibor").removeClass("wrong");
		}
	}).delegate("li","mouseover",function(){
		$(this).addClass("ckcur");
	}).delegate("li","mouseout",function(){
		$(this).removeClass("ckcur");
	});


	//注册成功互动方式鼠标滑过加背景
	$(".start-suc").delegate("li","mouseover",function(){
		$(this).addClass("bg");
	}).delegate("li","mouseout",function(){
		$(this).removeClass("bg");
	})
	//注册成功微信二维码显示
	$(".start-suc li").delegate("i.i01","mouseover",function(){
		$(".start-suc li i.i02").show("fast");
	}).delegate("i.i01","mouseout",function(){
		$(".start-suc li i.i02").hide("fast");
	})


	var switchCode=function(tmp){
		var timenow =eval(+(new Date));
		var imgUrl=tmp.siblings("img").attr("data-img");
		tmp.parent("li").find("input").val("");
		tmp.parent("li").find("img").attr("src", imgUrl+"?" + timenow);
	}

	//刷新验证码
	$("ul.ipt-code").delegate("a.cd-a","click",function(event){
		event.preventDefault();
		var $th=$(this);
		switchCode($th);
		return false;
	});
	$("ul.ipt-code").delegate("img","click",function(){
		var $th=$(this);
		var timenow =eval(+(new Date));
		var imgUrl=$th.attr("data-img");
		$th.attr("src", imgUrl+"?" + timenow);
	});
	var stopTimer=function(leb){
		leb.removeClass("sended").html("获取验证码");
		$("div.voiceBox2").hide();
		$("div.voiceBox1").show();
	}

	var timeLefts;
	var timeDown=function(leb,time){
		leb.html("重发验证码("+time+")");
		if(!time--){
			stopTimer(leb);
		}else{
			timeLefts = setTimeout(function(){timeDown(leb,time)},1000);
		}
	}

	//错误提示
	function showMsg(msg){
		var errBox = $(".ui_content").find(".getCode").parents("li").siblings("li.msgbox");
		errBox.find("p").html(msg).end().fadeIn();
	}
	var pushCode=function(type){
		var getCodeBtn = $(".ui_content").find(".getCode"),
			pvoiceBtn = $(".ui_content").find(".voiceCode");
		//前端控制短信验证码
		if($(".getcodepop").length>0 && $(".getcodepop").data("type")<3 || !($(".getcodepop").length)){
			$.ajax({
				url:getCodeBtn.attr("data-url"),
				type:"post",
				data:{"mobile":$form.find("input[name='mobile']").val(),"type":type},
				dataType:"json",
				success:function(data){
					switch(data){
						case "1":
							timeDown(getCodeBtn.addClass("sended"),60);
							$(".getcodepop").data("type",$(".getcodepop").data("type")+1);
							if(type == "pvoice"){
								pvoiceBtn.parents("div.voiceBox1").hide().next("div.voiceBox2").show();
							}else{
								pvoiceBtn.parents("div.voiceBox1").show().next("div.voiceBox2").hide();
							}
							break;
						case "26":
							stopTimer(getCodeBtn);
							showMsg("发送验证码失败，请刷新后重试");
							break;
						case "27":
							stopTimer(getCodeBtn);
							showMsg("发送验证码失败");
							break;
						case "22":
							stopTimer(getCodeBtn);
							showMsg("手机号码为空");
							break;
						case "29":
							timeDown($(".send-vcode"),$('.send-vcode i').html());
							showMsg("验证码的发送时间间隔为60秒，请稍后再试");
							break;
					}
				}
			});
		}else if($(".getcodepop").length>0 && $(".getcodepop").data("type")>=3){
			stopTimer(getCodeBtn);
			$(".value .getCode").addClass("sended");
			showMsg("今天该手机号码已超过接收验证码上限");
		}
	}

	//发送验证码
	$(document).delegate(".getCode,.voiceCode","click",function(){
		var _t = $(this);
		$("li.msgbox").hide();
		if(!_t.is(".sended")){
			clearTimeout(timeLefts);
			_t.is(".getCode") ? pushCode("sms") : pushCode("pvoice");
		}
	});

	//QQ接入登录
	if($(".reg-qq").length>0){
		$(".reg-qq").delegate("li","click",function(){
			var $th=$(this);
			$(".reg-qq li").removeClass("cur");
			$(".reg-qq-box").removeClass("reg-qq-show");
			$th.addClass("cur");
			$(".reg-qq-box").eq($th.index()).addClass("reg-qq-show");
		})
	}

	/*QQ登陆*/
	//输入框验证
	var yzInput=function(tmp){
		var $th=tmp;
		switch($th.attr("name")){
			case "username":
				if($th.val()==""){
					$th.parent().addClass("wrong");
					$th.parents("div.wbor").next().addClass("err2").html($th.attr("data-err")).show();
					return false;
				/*}else if(/^xnw/g.test($th.val())){
					$th.parents("div.wbor").next().addClass("err2").html("您填写的账号不可进行绑定操作，如有疑问请联系客服").show();
					$th.parent().addClass("wrong");
					return false;*/
				}else{
					$th.parents("div.wbor").next().removeClass("err2").hide();
					$th.parent().removeClass("wrong");
					return true;
				}
				break;
			case "password":
				if($th.val()==""){
					$th.parent().addClass("wrong");
					$th.parents("div.wbor").next().addClass("err2").html($th.attr("data-err")).show();
					return false;
				}else{
					$th.parents("div.wbor").next().removeClass("err2").hide();
					$th.parent().removeClass("wrong");
					return true;
				}
				break;
			case "code":
				if($th.val()==""){
					$th.parent().addClass("wrong");
					$th.parents("div.wbor").next().addClass("err2").html($th.attr("data-err")).show();
					return false;
				}else{
					$th.parents("div.wbor").next().removeClass("err2").hide();
					$th.parent().removeClass("wrong");
					return true;
				}
				break;
			default:
				return true;
				break;
		}
	}
	//获取焦点事件
	$(".log").focus(function(){
		var $th=$(this);
		$th.parents("div.wbor").addClass("cur");
	}).blur(function(){
		var $th=$(this);
		$th.parents("div.wbor").removeClass("cur");
		yzInput($th);
	}).keyup(function(){
		var $th=$(this);
		yzInput($th);
	});

	var logTip=function(msg){
		$(".log_tip").show();
		$(".login_tip").html(msg);
	}
	var loginBtn=true;
	var login=function(){
		var r1 = yzInput($(".log:eq(0)"));
		var r2 = yzInput($(".log:eq(1)"));
		var r3 = yzInput($(".log:eq(1)"));
		if(r1==false || r2==false || r3==false){
			return;
		}else if(loginBtn){
			loginBtn=false;
			//设置密码加密
			var pwdval=$("form[name='login'] input[name='password']").val();
			if(pwdval.length<=20){
				pwdval=RSAUtils.pwdEncode($("form[name='login'] input[name='password']").val());
			}
			$("form[name='login'] input[name='password']").val(pwdval);
			var param=$("form[name='login']").serialize();
			$.post($("form[name='login']").attr("data-url"), param,function(data) {
				console.log(data);
				loginBtn=true;
				switch(data.resultCode){
					case "0":
						//默认跳回首页
						window.location.href =$("form[name='login']").attr("data-jump-url");
					break;
					case "1":
						logTip("验证码为空！");
					break;
					case "2":
						logTip("验证码错误！");
					break;
					case "3":
						logTip("用户名为空！");
					break;
					case "4":
						logTip("密码为空！");
					break;
					case "5":
						var untime=parseInt(data.maxErrorTimes)-parseInt(data.errorTimes);
						if(data.errorTimes >= parseInt(data.maxErrorTimes)) {
							logTip("密码已锁定，请明日再登陆。");
						} else {
						logTip("用户名或密码错误。今日再输错"+untime+"次，账户将锁定。<a style='color:#0077d2' href='"+$('.reg-qq-show form').attr('data-jump-url')+"/user/forgetpassword'>忘记密码？</a>");
						$("input[name='username']").val("");
						$("input[name='password']").val("");
						}
					break;
					case "6":
						logTip("用户名被禁用！");
					break;
					case "-1":
						logTip("系统忙,请稍候再试！");
					break;
					case "7":
						logTip("QQ接入绑定错误！");
					break;
					case "8":
						logTip("QQ接入参数异常！");
					break;
					case "9":
						logTip("您填写的账号已有QQ绑定，不可重复绑定！");
					break;
					case "10":
						logTip("密码已锁定，请明日再登陆。");
					break;
				}
			});
		}
	}

	//背景切换
	var bgRandom = ["1","2"],
		randomClass = "bg" + bgRandom[Math.floor(Math.random() * bgRandom.length)];
	$(".register").addClass(randomClass);

});

