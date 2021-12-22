<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="card w-100">
  <section class="sect-t01 accountList">
    <!--//wrap_btn 리스트 상단 버튼-->
    <table class="tbl_list">
      <caption>테스트</caption>
      <colgroup>
        <col width="10%">
        <col width="25%">
        <col width="30%">
        <col width="10%">
        <col width="25%">
      </colgroup>
      <thead>
      <tr>
        <th scope="col">사원번호</th>
        <th scope="col">생년월일</th>
        <th scope="col">이름</th>
        <th scope="col">성별</th>
        <th scope="col">입사일</th>
      </tr>
      </thead>
      <tbody>
      <c:forEach items="${list}" var="list">
        <tr>
          <td>${list.empNo}</td>
          <td>${list.birthDate}</td>
          <td>${list.firstName} ${list.lastName}</td>
          <td>${list.gender}</td>
          <td>${list.hireDate}</td>
        </tr>
      </c:forEach>
      </tbody>
    </table>
  </section>
</div>
