$(function() {

});


var isRun = false;

//저장
function insertBoardManagementAjax(ajaxPath, path){
	if($("#boardCode").val() == ""){
		alert("게시판을 입력해 주세요.");
		$("#boardCode").focus();
		return;
	}else if($("#boardName").val() == ""){
		alert("게시판명을 입력해 주세요.");
		$("#boardName").focus();
		return;
	}else if($("#pageRow").val() == ""){
		alert("게시판로우를 입력해 주세요.");
		$("#pageRow").focus();
		return;
	}else if($("#pageBlock").val() == ""){
		alert("게시판블락을 입력해 주세요.");
		$("#pageBlock").focus();
		return;
	}
	if($('input:radio[name=noticeYn]').is(':checked') == false){
		alert("공지여부를 체크해 주세요.")
		return;
	}
	
	if($('input:radio[name=editYn]').is(':checked') == false){
		alert("에디터여부를 체크해 주세요.")
		return;
	}else if($("input:radio[name=editYn]:checked").val() == "Y"){
		if($("#editExt").val() == ""){
			alert("에디터 이미지 확장자를 입력해 주세요.");
			$("#editExt").focus();
			return;
		}else if($("#editSize").val() == ""){
			alert("에디터 이미지 제한사이즈를 입력해 주세요.");
			$("#editSize").focus();
			return;
		}else if($("input:radio[name=useDateYn]:checked").val() != "Y"){
			alert("에디터를 사용할 경우 노출일 여부를 사용함으로 설정해 주세요.");
			$("#useDateY").focus();
			return;
		}
	}else if($("input:radio[name=editYn]:checked").val() == "N"){
		$("#editSize").val(0);
	}
	
	if($('input:radio[name=thumbimgYn]').is(':checked') == false){
		alert("썸네일여부를 체크해 주세요.")
		return;
	}else if($("input:radio[name=thumbimgYn]:checked").val() == "Y"){
		if($("#thumbimgExt").val() == ""){
			alert("썸네일 이미지 확장자를 입력해 주세요.");
			$("#thumbimgExt").focus();
			return;
		}else if($("#thumbimgSize").val() == ""){
			alert("썸네일 이미지 제한사이즈를 입력해 주세요.");
			$("#thumbimgSize").focus();
			return;
		}
	}else if($("input:radio[name=thumbimgYn]:checked").val() == "N"){
		$("#thumbimgSize").val(0);
	}
	
	if($('input:radio[name=attYn]').is(':checked') == false){
		alert("첨부파일여부를 체크해 주세요.")
		return;
	}else if($("input:radio[name=attYn]:checked").val() == "Y"){
		if($("#attCount").val() == ""){
			alert("첨부파일 개수를 입력해 주세요.");
			$("#attCount").focus();
			return;
		}
		if($("#attCount").val() < 1){
			alert("첨부파일 갯수를 1개 이상 입력해 주세요.");
			$("#attExt").focus();
			return;
		}else if($("#attExt").val() == ""){
			alert("첨부파일 확장자를 입력해 주세요.");
			$("#attExt").focus();
			return;
		}else if($("#attSize").val() == ""){
			alert("첨부파일 제한사이즈를 입력해 주세요.");
			$("#attSize").focus();
			return;
		}
	}else if($("input:radio[name=attYn]:checked").val() == "N"){
		$("#attCount").val(0);
		$("#attSize").val(0);
	}
	
	if(isRun == true) {
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
				if(result.msg == "SUCCESS"){
					alert("저장되었습니다.");
					location.href = path;
				}else{
					alert(result.msg+" 저장에 실패하였습니다.");
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
function updateBoardManagementAjax(ajaxPath, path){
	if($("#boardCode").val() == ""){
		alert("게시판을 입력해 주세요.");
		$("#boardCode").focus();
		return;
	}else if($("#boardName").val() == ""){
			alert("게시판명을 입력해 주세요.");
			$("#boardName").focus();
			return;
	}else if($("#pageRow").val() == ""){
		alert("게시판로우를 입력해 주세요.");
		$("#pageRow").focus();
		return;
	}else if($("#pageBlock").val() == ""){
		alert("게시판블락을 입력해 주세요.");
		$("#pageBlock").focus();
		return;
	}
	if($('input:radio[name=noticeYn]').is(':checked') == false){
		alert("공지여부를 체크해 주세요.")
		return;
	}
	
	if($('input:radio[name=editYn]').is(':checked') == false){
		alert("에디터여부를 체크해 주세요.")
		return;
	}else if($("input:radio[name=editYn]:checked").val() == "Y"){
		if($("#editExt").val() == ""){
			alert("에디터 이미지 확장자를 입력해 주세요.");
			$("#editExt").focus();
			return;
		}else if($("#editSize").val() == ""){
			alert("에디터 이미지 제한사이즈를 입력해 주세요.");
			$("#editSize").focus();
			return;
		}else if($("input:radio[name=useDateYn]:checked").val() != "Y"){
			alert("에디터를 사용할 경우 노출일 여부를 사용함으로 설정해 주세요.");
			$("#useDateY").focus();
			return;
		}
	}else if($("input:radio[name=editYn]:checked").val() == "N"){
		$("#editSize").val(0);
	}
	
	if($('input:radio[name=thumbimgYn]').is(':checked') == false){
		alert("썸네일여부를 체크해 주세요.")
		return;
	}else if($("input:radio[name=thumbimgYn]:checked").val() == "Y"){
		if($("#thumbimgExt").val() == ""){
			alert("썸네일 이미지 확장자를 입력해 주세요.");
			$("#thumbimgExt").focus();
			return;
		}else if($("#thumbimgSize").val() == ""){
			alert("썸네일 이미지 제한사이즈를 입력해 주세요.");
			$("#thumbimgSize").focus();
			return;
		}
	}else if($("input:radio[name=thumbimgYn]:checked").val() == "N"){
		$("#thumbimgSize").val(0);
	}
	
	if($('input:radio[name=attYn]').is(':checked') == false){
		alert("첨부파일여부를 체크해 주세요.")
		return;
	}else if($("input:radio[name=attYn]:checked").val() == "Y"){
		if($("#attCount").val() == ""){
			alert("첨부파일 개수를 입력해 주세요.");
			$("#attCount").focus();
			return;
		}
		if($("#attCount").val() < 1){
			alert("첨부파일 갯수를 1개 이상 입력해 주세요.");
			$("#attExt").focus();
			return;
		}else if($("#attExt").val() == ""){
			alert("첨부파일 확장자를 입력해 주세요.");
			$("#attExt").focus();
			return;
		}else if($("#attSize").val() == ""){
			alert("첨부파일 제한사이즈를 입력해 주세요.");
			$("#attSize").focus();
			return;
		}
	}else if($("input:radio[name=attYn]:checked").val() == "N"){
		$("#attCount").val(0);
		$("#attSize").val(0);
	}
	
	if(isRun == true) {
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
				if(result.msg == "SUCCESS"){
					alert("수정되었습니다.");
					location.href = path;
				}else{
					alert(result.msg+" 수정에 실패하였습니다.");
				}
				isRun = false;
			}
		,error:function(request,status,error){
			alert(result.msg+" 수정에 실패하였습니다.");
			isRun = false;
			console.log("code:"+request.status+"\n"+"error:"+error);}
		});
	}
}

// 삭제
function deleteBoardManagementAjax(ajaxPath, path){
	var seqGroup = "";
	var flag = 0;
	$("input[name=checkSeq]:checked").each(function() {
		if(flag == 0)
			seqGroup += $(this).val();
		else
			seqGroup += "," + $(this).val();
		flag = 1;

	});
	if(seqGroup == ""){
		alert("삭제할 게시판을 선택해 주세요.");
		return;
	}
	if(isRun == true) {
		return;
	}

	if(confirm("삭제하시겠습니까?")){
		isRun = true;
		var formData = "boardManagementSeqGroup=" + seqGroup;
		$.ajax({
			url: ajaxPath,
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.msg == "SUCCESS"){
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