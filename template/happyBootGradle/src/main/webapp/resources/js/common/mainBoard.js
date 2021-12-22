$(function() {
	$("#mainBasicArea").html($("#mainArea").html());
	
	$(document).on("click","span[name='notiNSpan']",function(){
		var cnt = $("#mainArea input[name='orderNumList']").length;
		var maxCount = $("#maxCount").val() * 1;
		if(cnt < maxCount){
			var mainArea = '<tr class="mainTr"><input type="hidden" id="boardSeqList" name="boardSeqList" value="' + $(this).data("seq") +'"/><input type="hidden" id="orderNumList" name="orderNumList" value="8" data-seq="' +  $(this).data("seq") + '"/>';
			mainArea += '<td>' + cnt +'</td><td class="t_fl">' + $(this).data("title") + '</td>';
			mainArea += '<td><a href="javascript:" id="mainOrderUp" data-seq="' + $(this).data("seq") +'"><span id="up" class="btn btn-outline-primary effect-5">위로</span></a> ';
	    	mainArea += '<a href="javascript:" id="mainOrderDown" data-seq="' + $(this).data("seq") +'"><span id="down" class="btn btn-outline-primary effect-5">아래로</span></a> ';
	    	mainArea += '<a href="javascript:" id="mainDel" data-seq="' + $(this).data("seq") +'" class="btn btn-outline-danger effect-5" title="삭제">삭제</a></td></tr>';
	    	
	    	$("#mainArea").append(mainArea);
	    	$(this).hide();
	    	$("#mainNot").hide();
	    	$("#notiYSpan"+$(this).data("seq")).show();
			sortOrder();
    	}else{
    		alert("최대 "+maxCount+"개까지만 선택 가능합니다.");
    	}
    });

	$(document).on("click","#mainOrderUp",function(){
		var $tr = $(this).parent().parent();
		$tr.prev().before($tr);
		sortOrder();
	});
	
	$(document).on("click","#mainOrderDown",function(){
		var $tr = $(this).parent().parent(); 
		$tr.next().after($tr); 
		sortOrder();
	});
	
	$(document).on("click","#mainDel",function(){
		$("#notiYSpan"+$(this).data("seq")).hide();
		$("#notiNSpan"+$(this).data("seq")).show();
		$(this).parent().parent().remove();
		sortOrder();
	});
});

function sortOrder(){
	var cnt = 1;
	$(".mainTr").each(function() {
		$(this).children().eq(2).text(cnt);
		cnt++;
	});
	
}

//리스트 - 페이징
function goSearchAjax(page){
	$("#currentPage").val(page);
	boardLoadAjax();
}

var isRun = false;
function mainBoardSaveAjax(){
	var maxCount = $("#maxCount").val() * 1;
	var cnt = 1;
	$("#mainArea input[name='orderNumList']").each(function() {
		$(this).val(cnt);
		cnt++;
	});
	if(cnt <= maxCount){
		alert(maxCount +"개를 선택해야 저장이 가능합니다.");
		 return;
	}
	
	if(isRun == true) {
		return;
	}
	isRun = true;
	var formData = $("#mainListFrm").serialize();

	$.ajax({
		url: "/mainBoardSaveAjax.do",
		type: "POST",
		cache : false,
		data : formData,
		success: function (result) {
			if(result.ajaxResult == "SUCCESS"){
				alert("수정하였습니다.");
			}else{
				alert(result.ajaxResult + " 실패하였습니다.");
			}
			isRun = false;
		}
	,error:function(request,status,error){
		alert("실패하였습니다.");
		isRun = false;
		console.log("code:"+request.status+"\n"+"error:"+error);}
	});
}

function boardAllLoadAjax(){
	$("#searchStartDate").val("");
	$("#searchEndDate").val("");
	$("#search").val("");
	$("#currentPage").val(1);
	
	boardLoadAjax();
}

function mainBoardReload(){
	if(confirm("선택을 초기화하시겠습니까?")){
		//$("#mainArea").html($("#mainBasicArea").html());
		$("#mainArea input[name='orderNumList']").each(function() {
			$(this).parent().remove();
		});
		boardLoadAjax();
	}
}

function boardLoadAjax(){
	if(isRun == true) {
		return;
	}
	isRun = true;
	var formData = $("#listFrm").serialize();
	console.log(formData);
	$.ajax({
		url: "/boardLoadAjax.do",
		type: "POST",
		cache : false,
		data : formData,
		success: function (result) {
			if(result.ajaxResult == "SUCCESS"){
				var boardArea = '<table class="tbl_list"><caption>게시물 관리 리스트 (번호, 제목, 등록일, 선택여부로 구성)</caption><colgroup><col width="10%"><col width="60%"><col width="15%"><col width="15%"></colgroup><thead><tr><th scope="col">번호</th><th scope="col">제목</th><th scope="col">등록일</th><th scope="col">선택여부</th></tr></thead><tbody>';
				if(result.searchBoardVO.totalRow == 0)
					boardArea += '<tr><td colspan="4">게시물이 존재하지 않습니다.</td></tr>';
				else{
					var cnt = result.searchBoardVO.endLimit;
					for(var i=0; i<result.boardList.length ; i++){
						boardArea += '<tr><td>'+ cnt +'</td><td class="t_fl">' + result.boardList[i].title + '</td><td>' + result.boardList[i].regDate.substring(0,10) + '</td>';
						boardArea += '<td>';
						boardArea += '<span name="notiYSpan" id="notiYSpan' + result.boardList[i].boardSeq + '" data-seq="' + result.boardList[i].boardSeq + '" data-title="' + result.boardList[i].title + '" style="cursor:pointer;';
						boardArea += 'display:none;';
						boardArea += '" class="btn btn-outline-primary effect-5" >Y</span>';
						boardArea += '<span name="notiNSpan" id="notiNSpan' + result.boardList[i].boardSeq + '" data-seq="' + result.boardList[i].boardSeq + '" data-title="' + result.boardList[i].title + '" style="cursor:pointer;';
						boardArea += '" class="btn btn-outline-danger effect-5">N</span>';
						boardArea += '</td></tr>';
						cnt--;
					}
				}
				boardArea += '</tbody></table><div class="paging-wrap"><div class="pagination">';
				boardArea += result.paging;
				boardArea += '</div></div>';
				
				$("#boardArea").html(boardArea);
				
				$("#mainArea input[name='orderNumList']").each(function() {
					$("#notiYSpan"+$(this).data("seq")).show();
					$("#notiNSpan"+$(this).data("seq")).hide();
				});
			}else{
				alert(result.ajaxResult + " 실패하였습니다.");
			}
			isRun = false;
		}
	,error:function(request,status,error){
		alert("실패하였습니다.");
		isRun = false;
		console.log("code:"+request.status+"\n"+"error:"+error);}
	});
}