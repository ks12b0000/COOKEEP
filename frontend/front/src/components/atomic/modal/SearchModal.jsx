import styled from '@emotion/styled';

import SearchModalMenu from "./SearchModalMenu";
import {useEffect, useState} from "react";
import SearchHttp from "../../../http/searchHttp";
import MobileTabInput from "../tabMenu/MobileTabInput";


const client = new SearchHttp();

function SearchModal({isOpen, setOpen,contents,tagContents,navOpen,navSetOpen}) {



    const [topActive, setTopActive] = useState(null);
    const [tagActive, setTagActive] = useState(null);
    const [top, setTop] = useState([]);
    const [tag, setTag] = useState([])




    useEffect(() => {
        (async () => {
            const result = await Promise.allSettled([client.getTopList(), client.getTopTag()]);
            const [topList, tagList] = result.filter((res) => res.status = 'fulfilled').map((res) => res.value);

            if (topList.data.code !== 1000 || tagList.data.code !== 1000) {
                alert('잘못된 요청입니다.');
                return false;
            }

            setTop(topList.data.result.top10SearchLists);
            setTopActive(topList.data.result.top10SearchLists[0].keyword)
            setTag(tagList.data.result.top10TagLists);
            setTagActive(tagList.data.result.top10TagLists[0].tag_name)

        })()
    }, [])
    const Props = {
        top,
        topActive,
        tag,
        tagActive,
        setOpen,
        navSetOpen,
        input:{
            contents,
            tagContents,

        }

    }
    const SearchModalWrap = styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: #ffffff;
      z-index: 100;

      &.hide {
        transform: scale(0);
      }

      &.show {
        animation: SearchOn .3s;
      }

      @keyframes SearchOn {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }


      }


    `
    return (
        <SearchModalWrap className={isOpen ? 'show' : 'hide'}>
            <SearchContents>
                <SearchHeader>
                    <li>
                        <div onClick={() => setOpen(false)}>
                            <img src={`${process.env.PUBLIC_URL}/image/back.png`} alt=""/>
                        </div>
                    </li>
                    <InputBox>
                            <MobileTabInput  {...Props.input} />

                    </InputBox>
                </SearchHeader>

                <SearchModalMenu {...Props}/>
            </SearchContents>

        </SearchModalWrap>
    )

}

export default SearchModal ;

const SearchContents = styled.div`
  padding: 24px 16px;

  .Mui-selected {
    color: #FF4122 !important;
  }

  .MuiButtonBase-root {
    border-radius: 0;
    border-bottom: 2px solid #CBCBCB;
    background: #ffffff;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #CBCBCB;
  }
`
const SearchHeader = styled.ul`
  display: flex;
  align-items: center;
  gap: 12px;
`
const InputBox = styled.li`
  position: relative;
  flex-grow: 1;

  input {
    padding: 0 30px;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    border: 1px solid #FFA590;
    border-radius: 5px;
    height: 48px;
  }

  ul {
    display: flex;
    position: absolute;
    top: 4px;
    right: 16px;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`
