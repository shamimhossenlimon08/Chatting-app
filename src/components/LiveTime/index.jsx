import React, { useState, useEffect } from "react";
import moment from "moment";

const LiveTime = ({ date }) => {
  const [now, setNow] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000); // প্রতি 1 সেকেন্ডে আপডেট

    return () => clearInterval(interval);
  }, []);

  const secondsDiff = now.diff(moment(date), "seconds");

  return (
    <span className="text-sm text-gray-500">
      {secondsDiff < 30 ? "Sent just now" : `Sent ${moment(date).from(now)}`}
    </span>
  );
};

export default LiveTime;
