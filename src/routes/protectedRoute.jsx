// import packages
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rootPath } from "./routePaths";

// component
const ProtectedRoute = () => {
  return <Outlet />;
};

export default ProtectedRoute;
