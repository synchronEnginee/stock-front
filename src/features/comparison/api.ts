import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { ComparisonStockInfo } from './type/type';

const url = 'http://localhost:5000';

/**
 * 比較データ取得メソッド
 * @returns data {@link ComparisonStockInfo}
 */
export const fetchComparison = async () => {
  const options: AxiosRequestConfig = {
    url: `${url}/compare`,
    method: 'GET',
  };
  const data = await axios(options)
    .then((res: AxiosResponse<ComparisonStockInfo[]>) => res.data)
    .catch((e: AxiosError<{ error: string }>) => {
      console.log(`比較データ取得でエラーが発生しました：${e.message}`);
      throw e;
    });
  return data;
};
