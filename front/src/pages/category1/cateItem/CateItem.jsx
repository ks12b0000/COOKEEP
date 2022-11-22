import styled from "@emotion/styled";
import { useState } from "react";
import { categoryList1 } from "../../../data/category1/categoryList1";
import { Link } from "react-router-dom";

const Ul = styled.ul`
    margin: 20px 0 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    li {
        margin-top: 20px;
        width: 23%;
        height: 250px;
        cursor: pointer;
    }
`;
const Thumbnail = styled.div`
    width: 250px;
    height: 200px;
    border-radius: 4px;
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`;

const TextBox = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
        font-size: 16px;
        font-weight: 500;
    }
`;
function CateItem() {
    const [items, setItems] = useState(categoryList1);
    return (
        <>
            <Ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <Link to={`/category1/${item.id}`}>
                            <Thumbnail>
                                <img src={item.img} alt="" />
                            </Thumbnail>
                            <TextBox>
                                <span>{item.mainTitle}</span>
                                <span>{item.subTitle}</span>
                            </TextBox>
                        </Link>
                    </li>
                ))}
            </Ul>
        </>
    );
}
export default CateItem;
