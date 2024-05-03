import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  // 이곳에 인증을 검증할 방법을 적으면 된다

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (isAuthenticated) {
    // 인증이 반드시 필요한 페이지
    return <Outlet />;
  }
  // 미로그인 유저가 이동할 곳
  return <Navigate replace to="/LoginPage" />;
}