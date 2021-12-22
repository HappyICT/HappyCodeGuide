$(function() {
	$('#accountId').focus();
	
	//최초 쿠키에 id 라는 쿠키값이 존재하면
	var id = $.cookie('accountIdIct');
	if(id != undefined){
		$('#accountId').val(id); //아이디에 쿠키값 담아주고
		$('#id_save').prop('checked', true); //체크박스 체크
	}
	
	//로그인 엔터
	$('#accountPassword').on('keyup', function(e){
		if(e.keyCode == 13){
			actionloginAjax();
		}
	});
});

var isRun = false;

// 관리자 로그인 버튼
function actionloginAjax(){
	if(isRun == true) {
        return;
    }
	
	var uid = $.trim($("input[name=accountId]").val());
    var pwd = $.trim($("input[name=accountPassword]").val());
    
    if(uid == ""){
      alert("아이디를 입력해 주세요.");
      $("input[name=accountId]").focus();
      return false;
    }
    if(pwd == ""){
      alert("비밀번호를 입력해 주세요.");
      $("input[name=accountPassword]").focus();
      return false;
    }
	
	isRun = true;
	var formData = $("#loginFrm").serialize();
	$.ajax({
		url: "/login/actionLoginAjax.do",
		type: "POST",
		cache : false,
		data : formData,
		success: function (result) {
			var code = result.code;
			console.log(code);
			if(result.code == 200){
				location.href = "/" + result.loginUrl;
			}else if(result.code == 210){
				alert(result.message);
			} else{
				alert(result.message);
			}
			isRun = false;
		}	
		,error:function(request,status,error){
			alert("로그인 오류입니다.");
			isRun = false;
			console.log("code:"+request.status+"\n"+"error:"+error);
		}
	});
}
