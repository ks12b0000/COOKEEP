import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';

function ImgList({optionImg,setIsSelect,isSelect}) {



    const handleChange = (event) => {
        setIsSelect(event.target.value);
    };

    return (
        <div>

            <FormControl sx={{ marginTop:'34px', width:250,
                '.MuiInputBase-root':{
                height:'48px'
                },
                '.MuiSelect-select':{
                  padding:' 10px',
                  fontSize:16,
                  fontFamily:"Pretendard",
                  color:'#CED4DA'
                }

            }}>
                <Select
                    value={isSelect}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}

                >
                    <MenuItem value="0" >
                        썸네일을 등록해주세요
                    </MenuItem>}
                    { optionImg.map((item,index) => {
                       return  <MenuItem sx={{fontSize:16 ,fontFamily:"Pretendard"}} value={item.url} key={index + item.url}><img src={item.url} alt={index} style={{height:'30px',marginRight:2}} />{item.name}</MenuItem>
                    })}

                </Select>

            </FormControl>
        </div>
    );
}
export default ImgList;