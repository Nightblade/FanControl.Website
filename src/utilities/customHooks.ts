import React, { useEffect, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

const useInterval = (delay: number, callback: () => void) => {
  const savedCallback = React.useRef(() => {});

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

const useTimeoutBooleanState = (
  defaultValue: boolean,
  delay: number
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [state, setState] = useState(defaultValue);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (state) {
      timerRef.current = setTimeout(() => {
        setState(false);
      }, delay);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [state, delay]);

  return [state, setState];
};

const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          image
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

const useRefreshState = (): [number, () => void] => {
  const [refreshCount, setRefreshCount] = useState(0);
  return [refreshCount, () => setRefreshCount(refreshCount + 1)];
};

export {
  useInterval,
  useTimeoutBooleanState,
  useSiteMetadata,
  useRefreshState,
};
