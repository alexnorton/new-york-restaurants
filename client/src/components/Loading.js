import React, { useState, useEffect } from 'react';

function Loading({ delay }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay || 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div>{show && 'Loading...'}</div>;
}

export default Loading;
