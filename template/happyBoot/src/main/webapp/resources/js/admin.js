$(document).ready(function () {
  inputFileEvent(
      ".wrap_fileSearch .btn_upload"
      , ".wrap_fileSearch input[type='file']"
      , ".wrap_fileSearch .delete"
  );

  /** 패밀리 사이트 */
  /*$( ".d1" ).click( function() {
    var slideTime = 150 ;

    if ( $( this ).next().css( "display" ) == "none" ) {
      $( ".d1" ).removeClass( "open" ) ;
      $( ".depth02" ).slideUp( slideTime ) ;
      $( this ).addClass( "open" ) ;
      $( this ).next().slideDown( slideTime ) ;
    } else {
      $( ".d1" ).removeClass( "open" ) ;
      $( ".depth02" ).slideUp( slideTime ) ;
    }

    return false;
  }) ;*/

  $('#type').change(function () {
    if ($('#type').val() == '' || $('#type').val() == 'one') {
      $('.row_dim').show();
      $('.row_dim2').hide();
    } else {
      $('.row_dim').show();
      $('.row_dim2').show();
    }
  });

});

/* 팝업 새창 오픈*/
function popupOpenEvent(url, popupWidth, popupHeight) {
  winObject = window.open(
      url
      , '_blank'
      , 'top=0,left=0,width='
      + popupWidth
      + ',height='
      + popupHeight
      + ',resizable=no,scrollbars=no'
  );
}

/* input[type="file"] 이벤트 */
function inputFileEvent(btnFile, inputFile, btnDelete) {
  //파일첨부 링크 클릭 시
  $(btnFile).bind("click", function () {
    var fileId = $(this).attr("href");
    $(fileId).click();

    return false;
  });

  //파일 첨부 완료, 변경 시
  $(inputFile).change(function (e) {
    var fileObj = $(this).val()
        , Prt = $(this).parent()
        , pathHeader
        , pathMiddle
        , pathEnd
        , allFilename
        , fileName
        , extName;

    if (fileObj != "") {
      pathHeader = fileObj.lastIndexOf("\\");
      pathMiddle = fileObj.lastIndexOf(".");
      pathEnd = fileObj.length;
      fileName = fileObj.substring(pathHeader + 1, pathMiddle);
      extName = fileObj.substring(pathMiddle + 1, pathEnd);
      allFilename = fileName + "." + extName;

      $(this).parent().children(".fileName").html(allFilename);
      $(Prt).children(".btn_upload").hide();
      $(Prt).children(".delete").detach();
      $(Prt).children(".fileName").after(
          '<a href="#" class="ico_ del delete"></a>');
      $(Prt).children(".delete").fadeIn();
    }
  });

  //파일 삭제 시
  $(document).delegate(btnDelete, "click", DeleteFileEvt);

  function DeleteFileEvt() {
    var _this = $(this);
    $(_this).parent().children("input[type='file']").val(null);
    $(_this).parent().children(".btn_upload").show();
    $(_this).parent().children(".fileName").html("");
    $(_this).parent().children("input:hidden").val("");
    $(_this).parent().children(".wrap_pcimg").hide();
    $(_this).detach();

    return false;
  }

  // 레이어팝업닫기
  function closePop() {
    $('#commentPopCont').hide();
  }

}