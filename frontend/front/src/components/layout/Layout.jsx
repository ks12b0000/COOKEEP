import Header from "../../components/layout/header/Header";
import { Outlet } from "react-router";

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
export default Layout;
