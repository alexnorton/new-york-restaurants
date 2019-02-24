import React, { useState, useEffect } from 'react';

const DEFAULT_DELAY = 2000;

function Loading({ delay }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay || DEFAULT_DELAY);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div>{show && 'Loading...'}</div>;
}

export default Loading;
