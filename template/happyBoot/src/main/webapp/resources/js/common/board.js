$(function() {
    $('input[type=file]').change(function(e){
         var _this = $(this);
    	 var file = this.files[0];
         var form = new FormData();
         form.append('file', file);
         form.append('boardCode', $("#boardCode").val());
         form.append('uploadCode', $(this).data("uploadcode"));
         form.append('thumbimgExt', $("#thumbimgExt").val());
         form.append('thumbimgSize', $("#thumbimgSize").val());
         form.append('attSize', $("#attSize").val());
         form.append('attExt', $("#attExt").val());
         var uploadcode = $(this).data("uploadcode");
         var num = $(this).data("num");
         var link = $(".btn1-m-weight").attr("href");
         $(".btn1-m-weight").attr("href","javascript:alert('첨부 파일을 서버에 업로드 하고 있습니다. \\n비교적 큰 용량으로 인해 업로드에 시간이 다소 시간이 걸릴 수 있으니 \\n잠시 기다리신 후 [저장] 버튼을 클릭해주세요.');");
        $.ajax({
			url: "/happyUploadAjax.do",
			type: "POST",
			cache : false,contentType: false,
            processData: false,
			data : form,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					if(uploadcode == "img"){
						$("#thumImg"+num).val(result.fileName);
						$("#orgThumImg"+num).val(result.orgFileName);
					}else{
						$("#fileName"+num).val(result.fileName);
						$("#orgFileName"+num).val(result.orgFileName);
						$("#fileSize"+num).val(result.fileSize);
						$("#fileExt"+num).val(result.fileExt);
						$("#specId"+num).val(result.specId);
					}
				}else{
					$(_this).parent().children("input[type='file']").val(null);
					$(_this).parent().children(".btn_upload").show();
					$(_this).parent().children(".fileName").html("");
					$(_this).parent().children(".ico_.del.delete").detach();
					if(result.ajaxResult == "boardCodeFail"){
					alert("게시판이 정상작동 하지 않습니다. 새로고침 후 다시 시도해주세요.");
					}else if(result.ajaxResult == "extFail"){
						alert("확장자 형식이 맞지 않습니다. 확인 후 다시 시도해주세요.");
					}else if(result.ajaxResult == "sizeFail"){
						alert("파일크기가 맞지 않습니다. 확인 후 다시 시도해주세요.");
					}else{
						alert("저장에 실패하였습니다.");
					}
				}
				isRun = false;
				$(".btn1-m-weight").attr("href", link);
			}
		,error:function(request,status,error){
			alert("저장에 실패하였습니다.");
			isRun = false;
			$(".btn1-m-weight").attr("href", link);
			console.log("code:"+request.status+"\n"+"error:"+error);}
		});
    });
    
    $(document).on("click","#searchHashtagDel",function(){ 
    	$(this).parent().remove();
    });

});

// 리스트 - 상세보기
function goBoardView(path, boardSeq){
	$("#boardSeq").val(boardSeq);
	$("#listFrm").attr("action", path).submit();
}

// 리스트 - 등록
function goBoardReg(path){
	$("#boardSeq").val(0);
	$("#listFrm").attr("action", path).submit();
}

// 상세 - 목록
function goBoardList(path){
	$("#listFrm").attr("action", path).submit();
}

var isRun = false;

// 저장
function insertBoardAjax(ajaxPath, path){
	if(isRun == true) {
		return;
	}
	
	if($("#title").val() == ""){
		alert("제목을 입력해 주세요.");
		$("#title").focus();
		return;
	}else if($("#column3Value").val() == ""){
			alert("고객사를 입력해 주세요.");
			$("#column3Value").focus();
			return;
	}else if($("#useDateYn").val() == "Y" && $("#useDate").val() == ""){
		alert("노출일을 입력해 주세요.");
		$("#useDate").focus();
		return;
	}else if($("#editCheck").val() == "Y" && CKEDITOR.instances.content.getData() == ""){
		alert("내용을 입력해 주세요.");
		$("#editCheck").focus();
		return;
	}else if($("#thumbimgYn").val() == "Y" && $("#thumbimgCheck").val() == "Y" && $("#thumImg").val() == ""){
		alert("썸네일을 등록해 주세요.");
		return;
	}
	
	if($("#categoryYn").val() == "Y"){
		if($("#category option:selected").val() == ""){
			alert("분야를 선택해 주세요.");
			$("#category").focus();
			return;
		}
	}
	
	if($("#attYn").val() == "Y"){
		for(var i = 0; i < $("#attCount").val(); i++){
			if($("#fileSize"+i).val() == ""){
				if($("#attCheck").val() == "Y"){
					alert("첨부파일을 등록해 주세요.");
					return;
				}
				$("#fileSize"+i).val(0);
			}
		}
	}
	
	for(var i = 1; i < 4; i++){
		if($("#column"+i).val() != ""){
			if( $("#column"+i+"Check").val() == "Y" && $("#column"+i+"Value").val() == ""){
				alert($("#column"+i).val() + "을 입력해 주세요.");
				$("#column"+i+"Value").focus();
				return;
			}
			if($("#column"+i+"Value").val() != "" && $("#column1Exptext").val() != ""){
				alert(0);
				if(new RegExp($("#column"+i+"Exptext").val()).test($("#column"+i+"Value").val()) == false){
					alert(1);
				alert($("#column"+i).val() + "을 형식에 맞게 입력해 주세요.");
				$("#column"+i+"Value").focus();
				return;
				}
			}
		}
	}
	
	if(confirm("저장하시겠습니까?")){
		if($("#content").val() != undefined){
			$("#content").val(CKEDITOR.instances.content.getData());
			setImage('newImgFileList');
		}
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
function updateBoardAjax(ajaxPath, path){
	if(isRun == true) {
		return;
	}
	if($("#title").val() == ""){
		alert("제목을 입력해 주세요.");
		$("#title").focus();
		return;
	}else if($("#column3Value").val() == ""){
		alert("고객사를 입력해 주세요.");
		$("#column3Value").focus();
		return;
	}else if($("#useDateYn").val() == "Y" && $("#useDate").val() == ""){
		alert("노출일을 입력해 주세요.");
		$("#useDate").focus();
		return;
	}else if($("#editCheck").val() == "Y" && CKEDITOR.instances.content.getData() == ""){
		alert("내용을 입력해 주세요.");
		$("#editCheck").focus();
		return;
	}else if($("#thumbimgYn").val() == "Y" && $("#thumbimgCheck").val() == "Y" && $("#thumImg").val() == ""){
		alert("썸네일을 등록해 주세요.");
		return;
	}
	
	if($("#categoryYn").val() == "Y"){
		if($("#category option:selected").val() == ""){
			alert("분야를 선택해 주세요.");
			$("#category").focus();
			return;
		}
	}
	
	if($("#attYn").val() == "Y"){
		for(var i = 0; i < $("#attCount").val(); i++){
			if($("#fileSize"+i).val() == ""){
				if($("#attCheck").val() == "Y"){
					alert("첨부파일을 등록해 주세요.");
					return;
				}
				$("#fileSize"+i).val(0);
			}
		}
	}

	for(var i = 1; i < 6; i++){
		if($("#column"+i).val() != ""){
			if( $("#column"+i+"Check").val() == "Y" && $("#column"+i+"Value").val() == ""){
				alert($("#column"+i).val() + "을 입력해 주세요.");
				$("#column"+i+"Value").focus();
				return;
			}else if($("#column"+i+"Value").val() != "" && $("#column1Exptext").val() != "" && new RegExp($("#column"+i+"Exptext").val()).test($("#column"+i+"Value").val()) == false){
				alert($("#column"+i).val() + "을 형식에 맞게 입력해 주세요.");
				$("#column"+i+"Value").focus();
				return;
			}
		}
	}
	
	if(confirm("수정하시겠습니까?")){
		if($("#content").val() !== undefined){
			$("#content").val(CKEDITOR.instances.content.getData());
			setImage('newImgFileList');
		}
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
function deleteBoardAjax(ajaxPath, path, boardSeq){
	if(isRun == true) {
		return;
	}

	if(confirm("삭제하시겠습니까?")){
		isRun = true;
		var formData = "boardSeq=" + boardSeq + "&boardManagementSeq=" + $("#boardManagementSeq").val();
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

// 리스트 - 삭제
function deleteBoardListAjax(ajaxPath, path){
	if(isRun == true) {
		return;
	}
	var boardSeq = "";
	var flag = 0;
	$("input[name=checkSeq]:checked").each(function() {
		if(flag == 0)
			boardSeq += $(this).val();
		else
			boardSeq += "," + $(this).val();
		flag = 1;

	});
	if(boardSeq == ""){
		alert("삭제할 게시글을 선택해 주세요.");
		return;
	}

	if(confirm("삭제하시겠습니까?")){
		isRun = true;
		var formData = "boardSeqGroup=" + boardSeq + "&boardManagementSeq=" + $("#boardManagementSeq").val();
		$.ajax({
			url: ajaxPath,
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					alert("삭제되었습니다.");
					location.href = path;
				}else if(result.ajaxResult == "imgDelFail"){
					alert("imgDelFail 삭제에 실패하였습니다.");
				}else if(result.ajaxResult == "fileDelFail"){
					alert("fileDelFail 삭제에 실패하였습니다.");
				}else if(result.ajaxResult == "boardManagementSeqFail"){
					alert("boardManagementSeqFail 삭제에 실패하였습니다.");
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
function updateBoardUseAjax(boardSeq, useYn){
	if(isRun == true) {
		return;
	}
	if(confirm("변경하시겠습니까?")){
		isRun = true;
		var formData = "boardSeq=" + boardSeq + "&useYn=" + useYn + "&boardManagementSeq=" + $("#boardManagementSeq").val();
		$.ajax({
			url: "/updateBoardUseAjax.do",
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					if(useYn == 'Y'){
						$("#useY"+boardSeq).show();
						$("#useN"+boardSeq).hide();
					}else{
						$("#useN"+boardSeq).show();
						$("#useY"+boardSeq).hide();
					}
					alert("변경되었습니다.");
				}else if(result.ajaxResult == "FAIL"){
					alert("3개까지만 노출 가능합니다.");
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
//상태 버튼
function updateBoardUseAjax2(boardSeq,path){
	if(isRun == true) {
		return;
	}
	if(confirm("변경하시겠습니까?")){
		isRun = true;
		var formData = "boardSeq=" + boardSeq + "&useYn=" + $("#useYn").val() + "&boardManagementSeq=" + $("#boardManagementSeq").val();
		$.ajax({
			url: "/updateBoardUseAjax.do",
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
					alert("변경되었습니다.");
					location.href = path;
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

//노출순위 버튼
function updateOrderAjax(){
	if(isRun == true) {
		return;
	}
	$("#orderFrm input[type='text']").each(function() {
		if($(this).val() == "")
			$(this).val("999");
	});
	
	if(confirm("변경하시겠습니까?")){
		isRun = true;
		var formData = $("#orderFrm").serialize();
		$.ajax({
			url: "/updateOrderAjax.do",
			type: "POST",
			cache : false,
			data : formData,
			success: function (result) {
				if(result.ajaxResult == "SUCCESS"){
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

//에디터 이미지만 가져오기위해서 temp DIV이용
function setImage(tagName) {
	var content = CKEDITOR.instances.content.getData();
	var div = document.createElement('div');
	var editorImage = new Array();
	$(div).html(content);

	$("img", div).each(function() {
		var src = $(this).attr("src");
		$("#editFile").after("<input type='hidden' name='" + tagName + "' value='" + src.substring(src.lastIndexOf('=') + 1) + "' />");
	});
}