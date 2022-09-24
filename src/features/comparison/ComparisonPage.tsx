/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

import useStockInfoStore, {
  StockInfoStore,
} from '../../hooks/useStockInfoStore';
import StockInfoStoreProvider, {
  StockInfoContext,
} from '../../hooks/StockInfoStoreProvider';
import ComparisonStock, {
  ComparisonStockInfo,
} from './components/ComparisonStock';
import ComparisonChart from './components/ComparisonChart';

// チャートコンポーネントに渡す用の値管理
// キーのcodeは銘柄コード
export type StocksInfoForChartStore = StockInfoStore<ComparisonStockInfo>;

// TODO:比較チャートを表示するページへ変更
// 機能的にrechart.js予定
const styles = css({
  width: '60%',
  height: '100%',
  margin: '0 auto',
  fontSize: '30px',
  border: '1px solid black',
  // nth-childだとemotionのwariningが出る
  'tr:nth-of-type(odd)': {
    backgroundColor: 'rgb(255, 255, 128)',
  },
  'tr th': {
    fontWeight: 'bold',
    background: '#fff5e5',
    border: '1px double black',
  },
});

// compareStockInfo
// export const StocksInfoContext = createContext({});

const ComparisonPage = () => {
  // リスト表示・グラフ切替
  const [isList, setIsList] = useState(true);
  // 銘柄コードリスト
  const [codeList, setCodeList] = useState<Set<number>>(
    new Set([8316, 8306, 8473]),
  );
  // 銘柄コードinput
  const inputRef = useRef<HTMLInputElement>(null);
  // チャートコンポーネントに渡す用の銘柄の詳細情報保管
  const [stockInfoStore, operateStockInfoStore] =
    useStockInfoStore<ComparisonStockInfo>();
  // 銘柄コードリスト追加
  const addCodeList = (input: typeof inputRef.current) => {
    if (input === null) return;
    setCodeList(
      (prevCodeList) =>
        new Set([...Array.from(prevCodeList), parseInt(input.value, 10)]),
    );
  };
  console.log('ComparisonPageのレンダリング');
  return (
    <>
      <Link to="/">トップへ</Link>
      <StockInfoStoreProvider
        store={stockInfoStore}
        operateStore={operateStockInfoStore}
      >
        {/* リストとグラフ表示切替 */}
        {isList ? (
          <>
            <table css={styles}>
              <tbody>
                <tr>
                  <th>銘柄コード</th>
                  <th>銘柄名</th>
                  <th>PER</th>
                  <th>PBR</th>
                  <th>利回り</th>
                  <th>配当性向</th>
                </tr>
                {/* warning回避のためにkey付与 */}
                {Array.from(codeList).map((code) => (
                  <ComparisonStock code={code} key={code} />
                ))}
              </tbody>
            </table>
            <div>
              <input ref={inputRef} type="number" />
              <button
                type="button"
                onClick={() => {
                  addCodeList(inputRef.current);
                }}
              >
                株追加
              </button>
            </div>
          </>
        ) : (
          <StockInfoContext.Consumer>
            {(stockDatas: StocksInfoForChartStore) => (
              <ComparisonChart stockDatas={stockDatas} />
            )}
          </StockInfoContext.Consumer>
        )}
      </StockInfoStoreProvider>
      <button type="button" onClick={() => setIsList(!isList)}>
        表示切替
      </button>
    </>
  );
};

export default ComparisonPage;
