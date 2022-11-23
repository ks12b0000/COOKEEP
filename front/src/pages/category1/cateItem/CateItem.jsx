import styled from "@emotion/styled";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
    text-align: center;
    span {
        width: 90%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
        font-weight: 500;
    }
`;
function CateItem() {
    const categoryItem = useSelector((state) => state.listReducer.item);

    return (
        <>
            <Ul>
                {categoryItem.length > 0 &&
                    categoryItem.map((category) => (
                        <li key={category.id}>
                            <Link to={`/category1/${category.id}`}>
                                <Thumbnail>
                                    <img src={category.img} alt="" />
                                </Thumbnail>
                                <TextBox>
                                    <span>{category.mainTitle}</span>
                                    <span>{category.subTitle}</span>
                                </TextBox>
                            </Link>
                        </li>
                    ))}
            </Ul>
        </>
    );
}
export default CateItem;
