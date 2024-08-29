import React from "react";
import { Icon } from "@iconify/react";

function Loader() {
  return (
    <div className="loaderClass">
      <Icon
        icon="eos-icons:bubble-loading"
        width="75"
        height="75"
        style={{ color: "#0094ff" }}
        className="loader-icon"
      />
    </div>
  );
}

export default Loader;
