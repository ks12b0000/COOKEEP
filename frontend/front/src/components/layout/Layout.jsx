import Header from "../../components/layout/header/Header";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import {color} from "../../constants/color";

function Layout({children }) {

    return (
        <>
            <Header isMain={false} color={color.falseMainColor} />
                {children}
            <Footer/>
        </>
    );
}
export default Layout;
