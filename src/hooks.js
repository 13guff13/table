import React, { useEffect, useState } from 'react';

import {CONFIG_URL, ITEMS_URL} from './constants'

export function useTableData() {

  const [ state, setState ] = useState({
    dataIsLoaded: false,
    payload: null,
    error: false,
  });

  const loadArticle = () => {
    return Promise.all([fetch(ITEMS_URL), fetch(CONFIG_URL)])
      .then((response) => Promise.all(response.map((it) => it.json())))
      .then((data) => {
        const [ items, config] = data

        setState({
          dataIsLoaded: true,
          payload: {
            config: config.config,
            items: items.items
          }
        });
      })
      .catch((err) => {
        console.error(err)
        setState({
          dataIsLoaded: true,
          error: true,
        });
      });
  };

  useEffect(() => {
    loadArticle(ITEMS_URL, CONFIG_URL);
  }, []);

  return state;
};