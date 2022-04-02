import React from "react";

const PhoneMessage = ({ errorMsg, msgColor }) => {
  if (errorMsg === null) return null;
  return msgColor ? (
    <div className="error-red">{errorMsg}</div>
  ) : (
    <div className="error-green">{errorMsg}</div>
  );
};

export default PhoneMessage;
