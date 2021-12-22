<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta http-equiv="content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <title>행복ICT</title>

    <link rel="stylesheet" href="/resources/css/layout.css"/>
    <link rel="stylesheet" href="/resources/css/animate.css"/>
    <link rel="stylesheet" href="/resources/css/common.css"/>
    <link rel="stylesheet" href="/resources/css/materialdesignicons.css"/>
    <link rel="stylesheet" href="/resources/css/admin.css"/>
    <link rel="stylesheet" href="/resources/css/jquery-ui.css"/>
    <link rel="shortcut icon" href="/resources/img/common/favicon.ico" type="image/x-icon">
    <script src="/resources/js/jquery-1.9.1.min.js"></script>
    <script src="/resources/js/admin.js"></script>
    <script src="/resources/js/perfect-scrollbar.min.js"></script>
    <script src="/resources/js/common/jquery.cookie.js"></script>
    <script src="/resources/js/common/jquery-ui.min.js"></script>
  </head>
  <body>
    <div class="wrap">
      <tiles:insertAttribute name="body"/>
    </div>
  </body>
</html>
