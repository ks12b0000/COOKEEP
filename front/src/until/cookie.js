<<<<<<< HEAD
// import Cookies from "universal-cookie";
//
// const cookies = new Cookies();
//
// export const setCookie = (name: string, value: string, option?: any) => {
//     return cookies.set(name, value, { ...option });
// };
//
// export const getCookie = (name: string) => {
//     return cookies.get(name);
// };
//
// export const removeCookie = (name: string) => {
//     return cookies.remove(name);
// };
=======
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: any) => {
    return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
    return cookies.get(name);
};

export const removeCookie = (name: string) => {
    return cookies.remove(name);
};
>>>>>>> c895c0ef131ad3c7e020e886707b505ecbb5cbed
