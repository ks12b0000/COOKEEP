import Alert from "../../../atomic/modal/Alert";

function CreatePopup({setCreateIsOpen,onSubmit}) {

    const Props = {
            setOpenModal:() => setCreateIsOpen(false),
            body:{
                text:'게시글을 등록하시겠습니까?',
                subText:(
                    <>
                        게시글을 등록하고 확인을 누르면 <br/>
                        게시글로 이동합니다.
                    </>
                ),
            },
            buttons:{
                btn:[
                    {
                        text:'취소',
                        onClick:() => setCreateIsOpen(false)
                    },
                    {
                        text:'등록',
                        onClick:onSubmit,
                    },
                ]
            }
    }
    return      <Alert {...Props} />
}

export default CreatePopup;