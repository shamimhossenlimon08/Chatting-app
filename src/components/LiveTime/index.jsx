import React, { useState, useEffect } from "react";
import moment from "moment";

const LiveTime = ({ date }) => {
  const [now, setNow] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000); // par 1 second update

    return () => clearInterval(interval);
  }, []);

  const secondsDiff = now.diff(moment(date), "seconds");

  return (
    <span className="text-sm text-gray-500">
      {secondsDiff < 10 ? "Sent just now" : `Sent ${moment(date).from(now)}`}
    </span>
  );
};

export default LiveTime;
