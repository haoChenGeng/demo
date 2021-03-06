/*
 *name:dtt
 *time:2014.9.30
 *content:登录页js
*/
seajs.config({
    // 别名配置
    alias: {
        'head':'../../../module/head/js/init.js',
		'service':'../../../module/service/js/init.js'
    }
});

define(function(require, exports, module) {
    require('head');
	require('service');

	//登录提示
	var lgPo=function(tmp){
		//$(".login ul").css("paddingTop","42px");
		$("li.po-input").css({"height":"auto","line-height":"24px","display":"block"}).html(tmp);
	}

	//输入框验证
	var yzInput=function(tmp){
		var $th=$(tmp);
		$("li.po-input").css("display","none");
		$th.closest("ul").removeAttr("style");
		var pre=$th.closest("li").prevAll("li");
		for(var i=pre.length;i>=0;i--){
			if(pre.eq(i).find(".leb").find("input").val()==""&&!pre.eq(i).find(".leb").hasClass("cur")){
				lgPo("请输入"+pre.eq(i).find(".leb").find("input").attr("placeholder")+"！");
				return false;
			}
		}
		if(!$("span.leb").hasClass("cur")){
			$("span.leb").each(function(index, element) {
				if($("input.leb").eq(index).find("input").val()==""){
					lgPo("请输入"+$("span.leb").eq(index).find("input").attr("placeholder")+"！");
					return false;
				}
            });
		}
	}
	var focusObj={"username":"nameFocus","password":"pwdFocus","code":"codeFocus"}
	//获取焦点事件
	$(".txt input").focus(function(){
		var $th=$(this);
		$th.parent(".txt").addClass("cur");
		var t_name=this.name;
		$th.parent().addClass(focusObj[t_name]);
		yzInput(this);
	}).blur(function(){
		$(this).parent(".txt").removeClass("cur");
		var t_name=this.name;
		$(this).parent().removeClass(focusObj[t_name]);
		yzInput(this);
	});

	var switchCode=function(tmp){
		var timenow =eval(+(new Date));
		var imgUrl=$("li.mg img").attr("data-img");
		//tmp.parent("li").find(".txt").val("").focus();
		tmp.parent("li").find(".txt").find("input").val("");
		tmp.parent("li").find("img").attr("src", imgUrl+"?" + timenow);
	}

	//刷新验证码
	$("div.login").delegate("a.cd-a","click",function(event){
		event.preventDefault();
		var $th=$(this);
		switchCode($th);
		return false;
	});
	$("div.login").delegate("img","click",function(){
		var $th=$(this);
		var timenow =eval(+(new Date));
		var imgUrl=$("li.mg img").attr("data-img");
		$th.attr("src", imgUrl+"?" + timenow);
	});

	//读取coolie用户名
	var cook=unescape(document.cookie).split("; ");
	for(var i=0;i<cook.length;i++){
		var name=cook[i].split("=");
		if(name[0]=="xiaoniu88Name"){
			$("span.name input").val(unescape(name[1]));
		}
	}

	//提交返回错误时验证码刷新
	var codeSucc=function(tokenName,tokenValue){
		var timenow =eval(+(new Date));
		var imgUrl=$("li.mg img").attr("data-img");
		$("li.mg .txt input").val("");
		$("li.mg img").attr("src", imgUrl+"?" + timenow);
		$("input[name='ooh.token.name']").val(tokenName);
		$("input[name='ooh.token.value']").val(tokenValue);
	}

	var loginBtn=true;
	var login=function(){
		yzInput($(".login .leb:eq(3)"));
		if($("li.po-input:visible").length>0){
			return false;
		}else if(loginBtn){
			loginBtn=false;
			$('.login input.sub').val('登录中...');
			//设置密码加密
			var pwdval=$("input[name='password']").val();
			if(pwdval.length<=20){
				pwdval=RSAUtils.pwdEncode($("input[name='password']").val());
			}
			$("form[name='login'] input[name='password']").val(pwdval);
			var param=$("form[name='login']").serialize();
			$.post($("form[name='login']").attr("data-url"), param,function(data) {
				loginBtn=true;
				$('.login input.sub').val('立即登录');
				switch(data.resultCode){
					case "0":
						if($(".login input[type='checkbox']:checked").length){
							expire =";expires=" + (new Date((new Date()).getTime() + 30*24*60*60*1000)).toGMTString();
							document.cookie ="xiaoniu88Name=" + escape($("span.name input").val()) + expire;
						}else{
							var cookDet=unescape(document.cookie).split("; ");
							for(var i=0;i<cookDet.length;i++){
								var name=cookDet[i].split("=");
								if(name[0]=="xiaoniu88Name"){
									var exp = new Date();
								    exp.setTime(exp.getTime() - 1);
								    document.cookie = name[0] + "=; expires=" + exp.toGMTString();
								}
							}
						}
						var urlHref=window.location.href;
						if (urlHref.indexOf("?url=")!=-1) {//带参数的URL跳转
							urlHref=urlHref.split("?url=");
							if(urlHref[1]==""||urlHref[1].indexOf("user/forgetpassword")!=-1||urlHref[1].indexOf("xiaoniu88.com")==-1){
								window.location.href =$(".lg-til").attr("data-url");
							}else{
								window.location.href =unescape(urlHref[1]);
							}
						} else {//默认跳回首页
							window.location.href =$(".lg-til").attr("data-url");
						}
					break;
					case "1":
						lgPo("验证码为空！");
						codeSucc(data.tokenName, data.tokenValue);
					break;
					case "2":
						lgPo("验证码错误！");
						switchCode($("a.cd-a"));
						codeSucc(data.tokenName, data.tokenValue);
					break;
					case "3":
						lgPo("用户名为空！");
						codeSucc(data.tokenName, data.tokenValue);
					break;
					case "4":
						lgPo("密码为空！");
						codeSucc(data.tokenName, data.tokenValue);
					break;
					case "5":
						var untime=parseInt(data.maxErrorTimes)-parseInt(data.errorTimes);
						if(data.errorTimes >= parseInt(data.maxErrorTimes)) {
							lgPo("密码已锁定，请明日再登陆。");
						} else {
					    //$(".login ul").css("paddingTop","52px");
						$("li.po-input").css({"height":"auto","line-height":"18px","display":"block"}).html("用户名或密码错误。今日再输错"+untime+"次，账户将锁定。<a href='"+$('.lg-til').attr('data-url')+"/user/forgetpassword'>忘记密码？</a>");
						$("input[name='username']").val("");
						$("input[name='password']").val("");
						}
						codeSucc(data.tokenName, data.tokenValue);
					break;
					case "6":
						lgPo("用户名被禁用！");
						codeSucc(data.tokenName, data.tokenValue);
					break;
					case "-1":
						lgPo("系统忙,请稍候再试！");
						codeSucc(data.tokenName, data.tokenValue);
					break;
					case "10":
						lgPo("密码已锁定，请明日再登陆。");
						codeSucc(data.tokenName, data.tokenValue);
					break;
				}
			});
		}
	}

	//提交登录
	$("form[name='login']").delegate("input.sub","click",function(){
		login();
	});
	//处理键盘的回车键登录
	$(document).keydown(function(event){
		if(event.keyCode==13){
			login();
		}
	});

	//超时是登录框文字提示
	if($("#timeout").val()=="timeout"){
		lgPo("登录超时，请重新登录！");
	}


});


