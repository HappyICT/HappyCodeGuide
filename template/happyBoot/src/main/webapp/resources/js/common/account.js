$(function() {
	// 영문만 입력
	$("#accountId").keyup(function(event){
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
		}
	});
	
	$("input:checkbox").change(function(){
		if($(this).data("par") == "0"){
			$(this).parent().find("input:checkbox").prop('checked', this.checked);
		}else{
			if($(this).is(":checked")){
			}else
				$(this).parent().parent().parent().find("input:checkbox").eq(0).prop('checked', false);
		}
	});
});

function goAccountView(accountSeq){
	$("#accountSeq").val(accountSeq);

	$("#accountFrm").submit();
}

var isRun = false;

// 아이디 중복 체크 버튼
function checkAccountIdAjax(){
	if(isRun == true) {
        return;
    }
	$("#idFlag").val("0");
	
	if($("#accountId").val() == ""){
		alert("아이디를 입력해주세요.");
		$("#accountId").focus();
		return;
	}else if($("#accountId").val().length < 2){
		alert("아이디는 최소 2자이상 입니다.");
		$("#accountId").focus();
		return;
	}
	
	isRun = true;
	var formData = "accountId=" + $("#accountId").val();
	$.ajax({
		url: "/account/checkAccountIdAjax.do",
		type: "POST",
		cache : false,
		data : formData,
		success: function (result) {
			if(result.ajaxResult == "SUCCESS"){
				alert("사용가능한 아이디입니다.");
				$("#idFlag").val("1");
			}else if(result.ajaxResult == "FAIL"){
				alert("이미 등록된 아이디입니다.");
				$("#accountId").focus();
			}else{
				alert("아이디 중복확인에 실패하였습니다.");
			}
			isRun = false;
		}	
		,error:function(request,status,error){
			alert("아이디 중복확인에 실패하였습니다.");
			isRun = false;
			console.log("code:"+request.status+"\n"+"error:"+error);
		}
	});
}

// 등록 버튼
function insertAccountAjax(path){
	if(isRun == true) {
     return;
	}		
	
	if($("#accountId").val() == ""){
		alert("아이디를 입력해 주세요.");
		$("#accountId").focus();
		return;
	}else if($("#accountId").val().length < 2){
		alert("아이디는 최소 2자이상 입니다.");
		$("#accountId").focus();
		return;
	}else if($("#idFlag").val() == "0"){
		alert("아이디 중복확인을 해주세요.");
		return;
	}else if($("#accountName").val() == ""){
		alert("이름을 입력해 주세요.");
		$("#accountName").focus();
		return;
	}else if($("#accountName").val().length < 2){
		alert("이름은 최소 2자이상 입니다.");
		$("#accountName").focus();
		return;
	}else if($("#accountPassword").val() == ""){
		alert("비밀번호를 입력해 주세요.");
		$("#accountPassword").focus();
		return;
	}else if($("#accountPassword2").val() == ""){
		alert("비밀번호 확인을 입력해 주세요..");
		$("#accountPassword2").focus();
		return;
	}else if($("#accountPassword").val().length < 8){
		alert("비밀번호는 최소 8자이상 입니다.");
		$("#accountPassword").focus();
		return;
	}else if($("#accountPassword").val() != $("#accountPassword2").val()){
		alert("비밀번호를 다시 확인해 주세요.");
		$("#accountPassword").val("");
		$("#accountPassword2").val("");
		$("#accountPassword").focus();
		return;
	}

	$("#accountAuths").val("");
	var i = 0;
	$('input:checkbox').each(function() {
		if($(this).is(":checked")){
			if(i == 0)
				$("#accountAuths").val($(this).data("name"));
			else
				$("#accountAuths").val($("#accountAuths").val()+ ", " + $(this).data("name"));
			i++;
		}
	});	
	if($("#accountAuths").val() == ""){
		alert("사용가능 메뉴를 체크해 주세요.");
		return;
	}
	
	if(confirm("등록하시겠습니까?")){
		isRun = true;
		var formData = $("#accountFrm").serialize();
		$.ajax({
			url: "/account/insertAccountAjax.do",
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.code == "200"){
					alert(result.message);
					location.href = "/" + path + ".do";
				}else if(result.code == "380"){
					alert(result.message);
				}else{
					alert(result.message);
				}
				
				isRun = false;
			}	
		,error:function(request,status,error){
			alert("등록에 실패하였습니다.");
			isRun = false;
			console.log("code:"+request.status+"\n"+"error:"+error);}
		});
	}
}

// 수정 버튼
function updateAccountAjax(path){
	if(isRun == true) {
		return;
	}
	
	if($("#accountName").val() == ""){
		alert("이름을 입력해 주세요.");
		$("#accountName").focus();
		return;
	}else if($("#accountName").val().length < 2){
		alert("이름은 최소 2자이상 입니다.");
		$("#accountName").focus();
		return;
	}else if($("#accountPassword").val() == ""){
		alert("비밀번호를 입력해 주세요.");
		$("#accountPassword").focus();
		return;
	}else if($("#accountPassword2").val() == ""){
		alert("비밀번호 확인을 입력해 주세요..");
		$("#accountPassword2").focus();
		return;
	}else if($("#accountPassword").val().length < 8){
		alert("비밀번호는 최소 8자이상 입니다.");
		$("#accountPassword").focus();
		return;
	}else if($("#accountPassword").val() != $("#accountPassword2").val()){
		alert("비밀번호를 다시 확인해 주세요.");
		$("#accountPassword").val("");
		$("#accountPassword2").val("");
		$("#accountPassword").focus();
		return;
	}

	$("#accountAuths").val("");
	var i = 0;
	$('input:checkbox').each(function() {
		if($(this).is(":checked")){
			if(i == 0)
				$("#accountAuths").val($(this).data("name"));
			else
				$("#accountAuths").val($("#accountAuths").val()+ ", " + $(this).data("name"));
			i++;
		}
	});	
	if($("#accountAuths").val() == ""){
		alert("사용가능 메뉴를 체크해 주세요.");
		return;
	}
	
	if(confirm("수정하시겠습니까?")){
		isRun = true;
		var formData = $("#accountFrm").serialize();
		$.ajax({
			url: "/account/updateAccountAjax.do",
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.code == "200"){
					alert(result.message);
					location.href = "/" + path + ".do";
				}else{
					alert(result.message);
				}
				isRun = false;
			}	
		,error:function(request,status,error){
			alert("수정에 실패하였습니다.");
			isRun = false;
			console.log("code:"+request.status+"\n"+"error:"+error);}
		});
	}
}

// 삭제 버튼
function deleteAccountAjax(accountSeq, path){
	if(isRun == true) {
		return;
	}
	
	if(confirm("삭제하시겠습니까?")){
		isRun = true;
		var formData = "accountSeq=" + accountSeq;
		$.ajax({
			url: "/account/deleteAccountAjax.do",
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					alert("삭제되었습니다.");
					location.href = "/" + path + ".do";
				}else{
					alert("삭제에 실패하였습니다.");
				}
				isRun = false;
			}	
		,error:function(request,status,error){
			alert("삭제에 실패하였습니다.");
			isRun = false;
			console.log("code:"+request.status+"\n"+"error:"+error);}
		});
	}
}

// 상태 버튼
function updateAccountUseAjax(accountSeq, useYn){
	if(isRun == true) {
		return;
	}
	
	if(confirm("변경하시겠습니까?")){
		isRun = true;
		var formData = "accountSeq=" + accountSeq + "&useYn=" + useYn;
		$.ajax({
			url: "/account/updateAccountUseAjax.do",
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					if(useYn == 'Y'){
						$("#useY"+accountSeq).show();
						$("#useN"+accountSeq).hide();
					}else{
						$("#useN"+accountSeq).show();
						$("#useY"+accountSeq).hide();
					}
					alert("변경되었습니다.");
				}else{
					alert("변경에 실패하였습니다.");
				}
				isRun = false;
			}	
		,error:function(request,status,error){
			alert("변경에 실패하였습니다.");
			isRun = false;
			console.log("code:"+request.status+"\n"+"error:"+error);}
		});
	}
}
