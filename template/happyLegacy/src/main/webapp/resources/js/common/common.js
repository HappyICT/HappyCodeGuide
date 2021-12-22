
//logout
function actionLogout(){
	if(confirm("로그아웃하시겠습니까?")){
		location.href = "/login/actionLogout.do";
	}
}
// 리스트 - 페이징
function goSearch(page){
	$("#currentPage").val(page);
	$("form[name='listFrm']").submit();
}

function setDatepicker(inputID, buttonID, dateType){
	var textBoxID = "#" + inputID;
	var _dateType = "yy-mm-dd";
	if(dateType){_dateType = dateType;}
	jQuery(textBoxID).datepicker({
		showMonthAfterYear : true
		,yearSuffix : '년'
		,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
		,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
		,dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] // 요일의 한글 형식.
		,dateFormat: _dateType
		,prevText: '이전 달'
		,nextText: '다음 달'
	});
	jQuery(textBoxID).css("cursor","pointer");
	if(buttonID){
		jQuery("#" + buttonID).css("cursor","pointer");
		jQuery("#" + buttonID).click(function(){
			jQuery(textBoxID).datepicker("show");
			return false;
		});
	}
}

$(document).ready(function() {	
	$('.sidebar_container, .popup-wrap, .info-comm').perfectScrollbar();

	$('.box-survey').perfectScrollbar();

	$('.sidebar_container .nav > li').each(function() {		
		$(this).find('a').on('click', function() {
			$(this).parent().siblings().removeClass('is-active');
			$(this).parent().toggleClass('is-active');
		});
	});
	
	$('.btn_menu').on('click', function() {
		if(!$('.btn_menu').hasClass('is-active')) {
			$('.btn_menu').addClass('is-active');
			$('#sidebar').addClass('is-active');
			if ($(window).width() <= 1024) {
				$('body').css('overflow-y', 'hidden');
			} else {
				$('body').css('overflow-y', 'scroll');
			}
			$(window).resize(function() {
				if ($(window).width() <= 1024) {
					$('body').css('overflow-y', 'hidden');
				} else {
					$('body').css('overflow-y', 'scroll');
				}
			});
		} else {
			$('.btn_menu').removeClass('is-active');
			$('#sidebar').removeClass('is-active');
			if ($(window).width() <= 1024) {
				$('body').css('overflow-y', 'scroll');
			} else {
				$('body').css('overflow-y', 'scroll');
			}
			$(window).resize(function() {
				if ($(window).width() <= 1024) {
					$('body').css('overflow-y', 'scroll');
				} else {
					$('body').css('overflow-y', 'scroll');
				}
			});
			
		}	
	});
		
	$('.overlay').on('click', function() {
		$('.btn_menu').removeClass('is-active');
		$('#sidebar').removeClass('is-active');
		$('body').css('overflow-y', 'scroll');
	});

	$('.has-arrow').on('click', function() {
		$('.ps-scrollbar-y-rail').animate({top: '0'}, 200);
		$('.ps-scrollbar-y').animate({top: '0'}, 200);
	});

	$('.login_info > a').on('click', function() {
		 $(this).toggleClass('is-active');	
	});

	$('body').on('click', function(e) {
		if($('.login_info > a').hasClass('is-active')) {
			if (!$('.login_info').has(e.target).length) {
				$('.login_info > a').removeClass('is-active');
			}
		}
	});

	$('#checkbox-table').each(function() {
		$('#check-all').click(function() {
			var isChecked = $(this).prop("checked");
			$(this).closest('table').find('tr:has(td)').find('input[type="checkbox"]').prop('checked', isChecked);
		});

		$(this).find('tr:has(td)').find('input[type="checkbox"]').click(function() {
			var isChecked = $(this).prop("checked");
			var isHeaderChecked = $("#check-all").prop("checked");
			if (isChecked == false && isHeaderChecked)
				$("#check-all").prop('checked', isChecked);
			else {
				$(this).closest('table').find('tr:has(td)').find('input[type="checkbox"]').each(function() {
					if ($(this).prop("checked") == false)
						isChecked = false;
				});
				$('#check-all').prop('checked', isChecked);
			}
		});		
		$(this).find('input[type="checkbox"]').click(function() {
			if ($(this).closest('table').find('tr:has(td)').find('input[type="checkbox"]:checked').length > 0) {
				var table = $(this).closest('table');
				var checkedLength = table.find('tr:has(td)').find('input[type="checkbox"]:checked').length;
				table.addClass('is-checked');
				table.find('th.select-th span').text(checkedLength);
			} else {
				$(this).closest('table').removeClass('is-checked');			
			}
		});
	});

	$('.s_domain').change(function() {
		$(this).find('option:selected').each(function () {
			var input = $(this).closest('td').find('input:last');
			if($(this).val()== '1') { 
				input.val('');
				input.attr("disabled", false);
				input.focus();
			} else { 
				input.val($(this).text());
				input.attr("disabled", true);
			} 
		}); 
	});

	$('#sortable-table').each(function() {
		var $this = $(this);
		$(this).find('tbody').sortable({
			update: function (event, ui) {
				$(this).children().each(function(index) {
					$(this).find('td').first().html(index + 1);
				});
				$('.save_list').addClass('is-active');
			}
		});
		$(this).on('click', 'button.btn-outline-primary', function() {
			$(this).parent().siblings().not('td:first').each(function() {
				if ($(this).find('input').length) {
					$(this).text($(this).find('input').val());					
					$(this).parent().find('button.btn-outline-primary').removeClass('btn-outline-success').html('<i class="mdi mdi-pencil-outline"></i> 수정');
				}
				else {
					var t = $(this).text();
					$(this).text('').append($('<input type="text" class="wf-100" />',{'value' : t}).val(t));
					$(this).parent().find('button.btn-outline-primary').addClass('btn-outline-success').html('<i class="mdi mdi-pencil-outline"></i> 저장');
				}
			});
		});
		$(this).on('click', 'button.btn-outline-danger', function() {
			var result = confirm('해당 메뉴를 삭제하시겠습니까?');
			if(result) {
				$(this).parents('tr').remove();
				$('.save_list').addClass('is-active');
				$this.find('tbody tr').each(function() {
					$index = $(this).index() + 1;
					$(this).find('td:first').text($index);
				});
			} 
		});
		$('#add-row').click(function() {
			var $tr = $this.find('tbody tr').length + 1;
			var $append = 
			'<tr>\n'
			+ '		<td data-title="정렬순서">'+ $tr + '</td>\n' 
			+ '		<td data-title="코드"><input type="text" class="wf-100" /></td>\n'
			+ '		<td data-title="메뉴명"><input type="text" class="wf-100" /></td>\n'
			+ '		<td data-title="설정">\n'
			+ '			<button class="btn btn-outline-primary effect-5 btn-outline-success"><i class="mdi mdi-pencil-outline"></i> 저장</button>\n'
			+ '			<button class="btn btn-outline-danger effect-5"><i class="mdi mdi-close-octagon-outline"></i> 삭제</button>\n'
			+ '		</td>\n'
			+ '</tr>\n';

			$this.find('tbody:last').append($append);
		});
	});

	/*$('.btn_upload').each(function() {
		var label = $(this).attr('for');
		$(this).prev('#'+label).change(function(e){
			var fileName = e.target.files[0].name;
			$('#file-name-' + label).attr('value', fileName);
		});
	});*/
});