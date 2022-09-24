/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { css } from '@emotion/react';
import { useErrorHandler } from 'react-error-boundary';
import { OperateStockInfoStore } from '../../../hooks/useStockInfoStore';
import { OperateStockInfoContext } from '../../../hooks/StockInfoStoreProvider';

const stockUrl = 'http://127.0.0.1:5000/compare/';

// 項目に欠けがあった場合でもエラーが出るよう外部で定義
type StockGetResponse = AxiosResponse & {
  data: ComparisonStockInfo;
};

// TODO: numberを4桁のリテラル型にする
// typesファイルに切り出す
export type ComparisonStockInfo = {
  name: string;
  per: number;
  pbr: number;
  dividendYield: number;
  dividendPayoutRatio: number;
};

export type ComparisonStockProps = {
  code: number;
};

// 株の数が増えるとレンダリングコストが増えるのでメモ化
/**
 * 株比較のための1行データ
 * @param props
 * @returns
 */
// eslint-disable-next-line react/display-name
const ComparisonStock: React.FC<ComparisonStockProps> = React.memo(
  (props: ComparisonStockProps) => {
    const { code } = props;
    const [stockInfo, setStockInfo] = useState<ComparisonStockInfo>({
      name: '---',
      per: 0,
      pbr: 0,
      dividendYield: 0,
      dividendPayoutRatio: 0,
    });
    // エラーハンドリング
    const handleError = useErrorHandler();
    // チャート比較用に詳細情報を保管
    const operateStockInfoStore = useContext<
      OperateStockInfoStore<ComparisonStockInfo>
    >(OperateStockInfoContext);
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (async () => {
        try {
          const res = await axios.get<ComparisonStockProps, StockGetResponse>(
            stockUrl + code.toString(),
          );
          if (res.status !== 200 || !('data' in res)) {
            throw new AxiosError('statusが200じゃない');
          }
          console.log('ComparisonStockのuseEffect');
          console.log(res.data);
          setStockInfo(res.data);
          operateStockInfoStore.addStockInfoStore(code.toString(), res.data);
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.status);
            console.log(error.message);
            handleError(error);
          }
        }
      })();
    }, [code, operateStockInfoStore, handleError]);
    const styles = css({
      p: {
        fontSize: 26,
      },
    });
    return (
      <tr css={styles}>
        <td>{code}</td>
        <td>{stockInfo.name}</td>
        <td>{stockInfo.per}</td>
        <td>{stockInfo.pbr}</td>
        <td>{stockInfo.dividendYield}</td>
        <td>{stockInfo.dividendPayoutRatio}</td>
      </tr>
    );
  },
);

export default ComparisonStock;
