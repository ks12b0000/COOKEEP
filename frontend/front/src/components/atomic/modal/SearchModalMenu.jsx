
import * as React from "react";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";


function SearchModalMenu({top,topActive,tag,tagActive}) {


    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <TabMenuWrap>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} TabIndicatorProps={{
                        sx: {backgroundColor: "#FF4122"}
                    }}>
                        <Tab label="인기 검색어" value="1"/>
                        <Tab label="인기 태그" value="2"/>
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{padding: "15px 0 0", display: 'flex', gap: 5}}>
                    <TabMenuList>
                        {top.map((item, index) => (
                            <li key={index}
                                className={topActive === item.keyword && 'active'}>
                               {index + 1}.  {item.keyword}</li>))
                        }
                    </TabMenuList>

                </TabPanel>
                <TabPanel value="2" sx={{padding: "  0", display: 'flex', gap: 5}}>
                    <TabMenuList>
                        {tag.map((item, index) => (
                            <li key={index}  className={tagActive === item.tag_name && 'active'}>{index+1}.   {item.tag_name}</li>
                            ))
                        }
                    </TabMenuList>

                </TabPanel>
            </TabContext>
        </TabMenuWrap>
    )
}

export default SearchModalMenu;

const TabMenuWrap = styled.div`
  margin-top: 24px;

  .MuiButtonBase-root {
    width: 50%;
  }
  
`
const TabMenuList = styled.ul`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {

    font-weight: 500;
    line-height: 1.5;
    font-size: 18px;
    cursor: pointer;
    color: #B0B0B0;

    &:hover {
      background: #eee;
    }


  }
`