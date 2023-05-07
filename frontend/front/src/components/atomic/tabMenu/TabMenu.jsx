import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styled from "@emotion/styled";
import SearchHttp from "../../../http/searchHttp";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";


const TableBox = styled.div`
  position: absolute;
  top:56px;
  box-sizing: border-box;
  z-index: 5;
  padding:15px 15px 20px;
  width: 534px;
  height: 261px;
  background:#ffffff;
  border:1px solid  #FF4122;
  border-radius: 5px;
  .MuiBox-root{
    border-bottom:  none;
  }
  .MuiTabs-flexContainer{
    gap:10px;
  }
  .Mui-selected{
   color: #FF4122 !important;
  }
 .MuiButtonBase-root{
   width:240px;
   border-radius: 0;
   border-bottom:2px solid #CBCBCB;
   background:#ffffff;
   font-weight: 700;
   font-size: 18px;
   line-height: 22px;
   color: #CBCBCB;
   
 }
 
  
`


const TabMenuList =styled.ul`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap:10px;

  li{
 
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;
    color: #B0B0B0;
    
    &:hover{
      background:#eee;
    }
    &.active{
      font-weight:700;
      color:#FF4122;
      span{
        font-weight:700;
        color:#FF4122;
      }
    }
    span{
     position: static;
      font-size: 18px;
      line-height: 22px;
      color: #B0B0B0;
      padding-right: 8px;
    }
  }
`
const client = new SearchHttp();
 function TabMenu() {
     const navigation = useNavigate();
     const [value, setValue] = React.useState('1');
     const [topActive,setTopActive] = useState('테스트');
     const [tagActive,setTagActive] = useState('태그1');
     const [top,setTop] = useState([]);
     const [tag,setTag] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
     const TopNav = (keyword) => {
         navigation(`/search/${keyword}`)
         setTopActive(keyword)
     }

     const TagNav = (keyword) => {
         navigation(`/searchTag/${keyword}`)
         setTagActive(keyword)
     }

     useEffect(() => {
         ( async () =>{
             const result = await Promise.allSettled([client.getTopList(),client.getTopTag()]);
             const [topList,tagList] = result.filter((res) => res.status = 'fulfilled').map((res) => res.value);

             if(topList.data.code !== 1000 || tagList.data.code !== 1000) {
                 alert('잘못된 요청입니다.');
                     return false;
             }

             setTop(topList.data.result.top10SearchLists);
             setTag(tagList.data.result.top10TagLists);

         })()
     },[])

     let tagData1 = tag.slice(0,5)
     let tagData2 = tag.slice(5,10)
     let topData1 = top.slice(0,5)
     let topData2 = top.slice(5,10)


    return (
        <TableBox >
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}  TabIndicatorProps={{
                        sx: { backgroundColor: "#FF4122" }
                    }} >
                        <Tab label="인기 검색어" value="1" />
                        <Tab label="인기 태그" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{padding:"25px 0 0",display:'flex',gap:5 }} >
                   <TabMenuList>
                       {topData1.map((item,index) => (
                           <li key={index} onClick={() => TopNav(item.keyword)} className={topActive === item.keyword && 'active'}><span>{index+1}.</span>{item.keyword}</li>
                       ))}
                   </TabMenuList>
                    <TabMenuList>
                        {topData2.map((item,index) => (
                            <li key={index} onClick={() => TopNav(item.keyword)} className={topActive === item.keyword && 'active'} ><span>{index+6}.</span>{item.keyword}</li>
                        ))}
                    </TabMenuList>
                </TabPanel>
                <TabPanel value="2" sx={{padding:" 0",display:'flex',gap:5 }}>
                    <TabMenuList>
                        {tagData1.map((item,index) => (
                            <li key={index} onClick={() => TagNav(item.tag_name)} className={tagActive === item.tag_name && 'active'}><span>{index+1}.</span>{item.tag_name}</li>
                        ))}
                    </TabMenuList>
                    <TabMenuList>
                        {tagData2.map((item,index) => (
                            <li key={index} onClick={() => TagNav(item.tag_name)} className={tagActive === item.tag_name && 'active'}><span>{index+6}.</span>{item.tag_name}</li>
                        ))}
                    </TabMenuList>
                </TabPanel>
            </TabContext>
        </TableBox>
    );
}

export  default TabMenu;