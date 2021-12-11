import React, { useEffect, useState } from "react";

const Loading = () => {
  const loading = ["Loading.", "Loading..", "Loading..."];
  const [loadStatus, setLoadStatus] = useState(loading[0]);
  useEffect(() => {
    let index = loading.indexOf(loadStatus);
    setTimeout(() => {
      if (index == loading.length - 1) {
        index = 0;
      }else{
        index += 1;
      }
      setLoadStatus(loading[index]);
    }, 500);
  }, [loading]);

  return <b>{loadStatus}</b>;
};

export default Loading;