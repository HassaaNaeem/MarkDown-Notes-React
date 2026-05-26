import React from "react";
import { Toaster } from "react-hot-toast";

function ToasterUi() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "#ffffff",
          color: "#0f0f0f",
        },
      }}
    />
  );
}

export default ToasterUi;
