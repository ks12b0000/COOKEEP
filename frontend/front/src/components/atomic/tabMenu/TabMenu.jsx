import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styled from "@emotion/styled";
import SearchHttp from "../../../http/searchHttp";
import {useEffect, useState} from "react";


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
  
  li{
    padding-top:10px;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #B0B0B0;
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
 function TabMenu({bottom}) {
    const [value, setValue] = React.useState('1');
     const [top,setTop] = useState([]);
     const [tag,setTag] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
     console.log(top)


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
                <TabPanel value="1" sx={{padding:"7px 0 0",display:'flex',gap:5 }} >
                   <TabMenuList>
                       {top.map((item,index) => (
                           <li key={index}><span>{index+1}.</span>{item.keyword}</li>
                       ))}
                   </TabMenuList>
                    <TabMenuList>
                        {top.map((item,index) => (
                            <li key={index}><span>{index+6}.</span>{item.keyword}</li>
                        ))}
                    </TabMenuList>
                </TabPanel>
                <TabPanel value="2" sx={{padding:" 0 0",display:'flex',gap:5 }}>
                    <TabMenuList>
                        {tagData1.map((item,index) => (
                            <li key={index}><span>{index+1}.</span>{item.tag_name}</li>
                        ))}
                    </TabMenuList>
                    <TabMenuList>
                        {tagData2.map((item,index) => (
                            <li key={index}><span>{index+6}.</span>{item.tag_name}</li>
                        ))}
                    </TabMenuList>
                </TabPanel>
            </TabContext>
        </TableBox>
    );
}

export  default TabMenu;