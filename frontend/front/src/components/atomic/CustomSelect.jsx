import styled from '@emotion/styled';

import {useState} from "react";

function CustomSelect({setAllText,currentPage}) {
    const [currentValue, setCurrentValue] = useState("최신순");
    const [showOptions, setShowOptions] = useState(false);




    const handleOnChangeSelectValue = (e) => {
        const {innerText} = e.target;

        setAllText(e.target.ariaValueText)
        setCurrentValue(innerText);
    };

    return (
        <div style={{display:'flex', justifyContent:'flex-end'}}>
            <SelectBox   show={showOptions} onClick={() => setShowOptions((prev) => !prev)}>
                <Label>{currentValue}
                    <div><img src={`${process.env.PUBLIC_URL}/image/down.png`} alt=""/></div>
                </Label>
                <SelectOptions show={showOptions}>
                    <Option onClick={handleOnChangeSelectValue} aria-valuetext={`page=${currentPage}`}>최신순</Option>
                    <Option onClick={handleOnChangeSelectValue} aria-valuetext={`sort=commented,desc&page=${currentPage}`}>좋아요순</Option>
                    <Option onClick={handleOnChangeSelectValue} aria-valuetext={`sort=liked,desc&page=${currentPage}`}>댓글순</Option>

                </SelectOptions>
            </SelectBox>
        </div>
    );
}

export default CustomSelect;


const SelectBox = styled.div`
  position: relative;
  width: 100px;
  padding: 8px;
  border-radius: 5px;
  border: ${(props) => (props.show ? "1px solid #FF4122" : "1px solid #CED4DA")} ;
  background: #FFF;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;


`;
const Label = styled.label`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
  font-weight: bold;
  color: #FF4122;
`;
const SelectOptions = styled.ul`
  position: absolute;
  text-align: center;
  display: ${(props) => (props.show ? "block" : "none")};;
  list-style: none;
  top: 45px;
  left: 0;
  width: 100%;
  overflow: hidden;
  padding: 6px 0;
  border-radius: 8px;
  background: #ffffff;
  font-weight: 400;
  border: 1px solid #FF4122;
  color: #3E4145;
  z-index: 10;
`;
const Option = styled.li`
  font-size: 14px;
  padding: 10px;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: #FF4122;
    color: #ffffff;
  }
`;