import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import onChangeSearch from '../../../asset/image/onchangeSeaarch.png'
import SearchHttp from "../../../http/searchHttp";

const OnChangeBox = styled.div`
  position: absolute;
  top:56px;
  box-sizing: border-box;
  z-index: 4;
  padding:20px 15px 20px;
  width: 534px;
  height: 261px;
  background:#ffffff;
  border:1px solid  #FF4122;
  border-radius: 5px;
  `

const List = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 18px;
   height: 23px;
  color: #5A5C5F;
  margin-bottom: 18px;
  cursor: pointer;
  &:hover{
    background:rgba(0,0,0,.02);
  }
  img{
    width:17px;
    height: 17px;
    margin-right: 8px;
  }
`
const client = new SearchHttp();
function OnChangeMenu({value,tag}) {
    const [autoList,setAutoList] =useState([])
    const tagData = async () => {
        try {
            const res = await client.getAutoTag(value);
            setAutoList(res.data.result.searchList);
        }
        catch (err) {
            console.log(err);
        }
    }

    const listData = async () => {
        try {
            const res = await client.getAutoSearch(value);
            setAutoList(res.data.result.autoSearchLists);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        tag ? tagData() : listData()
    },[value,tag])
    return(
        <OnChangeBox>
            { !tag ? autoList.map((item,index) => (
                <List key={index}> <div><img src={onChangeSearch} alt=""/></div>{item.keyword}</List>
            ))
            : autoList.map((item,index) => (
                    <List key={index}> <div><img src={onChangeSearch} alt=""/></div>{item.title}</List>
                ))
            }

        </OnChangeBox>
    )
}
export default OnChangeMenu;