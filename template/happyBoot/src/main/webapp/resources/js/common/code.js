
// 리스트 - 상세보기
function goCodeView(path, codeSeq){
	$("#codeSeq").val(codeSeq);
	$("#listFrm").attr("action", path).submit();
}

// 상세 - 목록
function goCodeList(path){
	$("#listFrm").attr("action", path).submit();
}

var isRun = false;
function validateEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
}

// 저장
function insertCodeAjax(ajaxPath, path){
	if(isRun == true) {
		return;
	}
	
	if($("#detailCode").val() == ""){
		alert($("#pageNm").val() + " 입력해 주세요.");
		$("#detailCode").focus();
		return;
	}else if($("#detailDesc").val() == ""){
			alert("담당자이메일을 입력해 주세요.");
			$("#detailDesc").focus();
			return;
	}else if($("#detailDesc").val() != "None" && !validateEmail($("#detailDesc").val())){
		alert("담당자이메일을 확인해 주세요.");
		$("#detailDesc").focus();
		return;
	}
	
	if(confirm("저장하시겠습니까?")){
		isRun = true;
		var formData = $("#regFrm").serialize();

		$.ajax({
			url: ajaxPath,
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					alert("저장되었습니다.");
					location.href = path;
				}else{
					alert(result.ajaxResult + " 저장에 실패하였습니다.");
				}
				isRun = false;
			}
		,error:function(request,status,error){
			alert("저장에 실패하였습니다.");
			isRun = false;
			console.log("code:"+request.status+"\n"+"error:"+error);}
		});
	}
}

// 수정
function updateCodeAjax(ajaxPath, path){
	if(isRun == true) {
		return;
	}

	if($("#detailCode").val() == ""){
		alert("해시태그를 입력해 주세요.");
		$("#detailCode").focus();
		return;
	}else if($("#detailDesc").val() == ""){
		alert("담당자이메일을 입력해 주세요.");
		$("#detailDesc").focus();
		return;
	}
	
	if(confirm("수정하시겠습니까?")){
		isRun = true;
		var formData = $("#regFrm").serialize();
		$.ajax({
			url: ajaxPath,
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					alert("수정되었습니다.");
					location.href = path;
				}else{
					alert(result.ajaxResult+" 수정에 실패하였습니다.");
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


// 상세 - 삭제
function deleteCodeAjax(ajaxPath, path, codeSeq){
	if(isRun == true) {
		return;
	}

	if(confirm("삭제하시겠습니까?")){
		isRun = true;
		var formData = $("#regFrm").serialize();
		$.ajax({
			url: ajaxPath,
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					alert("삭제되었습니다.");
					location.href = path;
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


//상태 버튼
function updateCodeUseAjax(codeSeq, useYn){
	if(isRun == true) {
		return;
	}
	
	if(confirm("변경하시겠습니까?")){
		isRun = true;
		var formData = "codeSeq=" + codeSeq + "&useYn=" + useYn;
		$.ajax({
			url: "/updateCodeUseAjax.do",
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					if(useYn == 'Y'){
						$("#useY"+codeSeq).show();
						$("#useN"+codeSeq).hide();
					}else{
						$("#useN"+codeSeq).show();
						$("#useY"+codeSeq).hide();
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
