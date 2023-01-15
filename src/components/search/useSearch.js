import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BaseUrl } from "../../utils/BaseUrl";


export const useSearch = (searchText) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncer = useCallback(function (callback, delay) {
    let timeoutId;
    return function debounced(...args) {
      clearTimeout(timeoutId);
      let context = this;
      timeoutId = setTimeout(() => {
        callback.apply(context, args);
      }, delay);
    };
  }, []);

  // const getSearchResult = useCallback(async (searchText) => {
  //   if (searchText !== "") {
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `${BaseUrl}/users/search?text=${searchText}`
  //     );
  //     if (data.success) {
  //       setResult(data.users);
  //     }
  //     setLoading(false);
  //   }
  // }, []);

  const debouncedFunction = useCallback(debouncer(getSearchResult, 3000), [
    searchText,
  ]);

  useEffect(() => {
    setResult([]);
    debouncedFunction(searchText);
  }, [searchText]);

  return { loading, result };
};