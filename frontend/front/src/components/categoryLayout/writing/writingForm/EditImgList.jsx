import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@emotion/styled';
import {useState} from "react";

function EditImgList({optionImg, setIsSelect, isSelect, newArray}) {

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

    return (
        <div>

            <FormControl sx={{
                marginTop: '34px', width: 250,
                '.MuiInputBase-root': {
                    height: '48px'
                },
                '.MuiSelect-select': {
                    padding: ' 10px',
                    fontSize: 16,
                    fontFamily: "Pretendard",
                    color: '#CED4DA'
                }

            }}>
                <Select
                    value={isSelect}
                    open={isOpen}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}

                >



                        <MenuItem sx={{fontSize: 16, fontFamily: "Pretendard"}} value={isSelect}>
                            <img src={isSelect} alt="초기값"
                                 style={{width: "30px", height: '30px', objectFit: 'contain', marginRight: 2}}/>
                            메인이미지입니다.
                        </MenuItem>
                



                    {newArray[0]?.map((item, index) => {
                        return <MenuItem sx={{fontSize: 16, fontFamily: "Pretendard"}} value={item.url}
                                         key={index + item.url}><img src={item.url} alt={index} style={{
                            width: "30px",
                            height: '30px',
                            objectFit: 'contain',
                            marginRight: 2
                        }}/>{`서브이미지 ${index + 1}`}</MenuItem>
                    })}
                    {optionImg.map((item, index) => {
                        return <MenuItem sx={{fontSize: 16, fontFamily: "Pretendard"}} value={item.url}
                                         key={index + item.url}><img src={item.url} alt={index} style={{
                            width: "30px",
                            height: '30px',
                            objectFit: 'contain',
                            marginRight: 2
                        }}/>{item.name}</MenuItem>
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
