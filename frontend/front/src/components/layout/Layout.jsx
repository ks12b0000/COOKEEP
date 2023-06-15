import Header from '../../components/layout/header/Header';
import Footer from './footer/Footer';
import { color } from '../../constants/color';
import React from 'react';
function Layout({ children }) {
  return (
    <>
      <Header color={color.falseMainColor} />
      {children}
      <Footer />
    </>
  );
}
export default React.memo(Layout);
