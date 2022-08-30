import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout/Layout';
import FallStockPage from '../features/FallStockPage';

const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="fallstock" element={<FallStockPage />} />
            {/* <Route path="page2" element={<SamplePage2 />} /> */}
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterConfig;
