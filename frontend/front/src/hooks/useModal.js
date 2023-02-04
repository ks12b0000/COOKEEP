import React, { useEffect, useState } from "react";
const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const controller = () => {
        setIsOpen(!isOpen);
    };
    return { isOpen, controller, setIsOpen };
};
export default useModal;
