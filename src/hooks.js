import { useEffect, useState } from "react";

export function useApi(url) {
  const [state, setState] = useState({});
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setState(data));
  }, [url]);
  return state;
}
