
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import styled from '@emotion/styled';
import {useState} from "react";

function EditImgList({optionImg,setIsSelect,isSelect,inital}) {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleChange = (event) => {
        setIsSelect(event.target.value);
    };
  console.log(isOpen);
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
                    open={isOpen}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}

                >



                            <MenuItem sx={{fontSize:16 ,fontFamily:"Pretendard"}} value={0}>
                                <Dander dangerouslySetInnerHTML={{ __html: inital}} />
                            </MenuItem>




                    { optionImg.map((item,index) => {
                        return  <MenuItem sx={{fontSize:16 ,fontFamily:"Pretendard"}} value={item.url} key={index + item.url}><img src={item.url} alt={index} style={{height:'30px',marginRight:2}} />{item.name}</MenuItem>
                    })}

                </Select>

            </FormControl>
        </div>
    );
}
export default EditImgList;

const Dander = styled.div`
  img{
    height:30px
  }
`
