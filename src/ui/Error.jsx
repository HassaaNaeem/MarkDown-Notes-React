import React from "react";
import { useRouteError } from "react-router";

function Error() {
  const error = useRouteError();
  return <div>{error.data || error.message}</div>;
}

export default Error;
