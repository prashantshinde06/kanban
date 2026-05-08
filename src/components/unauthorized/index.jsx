import React from "react";
import { useNavigate } from "react-router-dom";

import userAccessImg from "@assets/images/icons/user-access-img.svg";

const UnAuthorized = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="user-access-wrapper">
        <div className="user-access-container">
          <img src={userAccessImg} alt="user-access-img" className="img-fluid" />
          <h5 className="user-access-heading mb-0">Unauthorized Access</h5>
          <p className="user-access-para">You are not authorized to accesS this page</p>
          <button
            type="button"
            className="btn btn-primary save-btn"
            onClick={() => {
              navigate(`/home`);
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default UnAuthorized;
