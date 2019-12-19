//Tối ưu hóa hiểu xuất khi các truyền các state cho orderSummary (được bọc trong modal) ở dạng props nếu các state này thay đổi thì orderSummary sẽ bị render lại mặc dù điều này là không cần thiết do orderSummary chưa hiển thị => sử dụng shouldComponentUpdate hoặc react memo để kiểm tra mỗi lần component này render.
import React from 'react'
import classes from './modal.module.css';
import Aux from '../../../hoc/Wraper';
import Backdrop from '../Backdrop/Backdrop';
const Modal = React.memo((props) => {
    const { show, clicked, children } = props;
    return (
        <Aux>
            <Backdrop show={show} clicked={clicked} ></Backdrop>
            <div className={classes.Modal}
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}
            >
                {children}
            </div>
        </Aux>
    )
},
(preProps,nextProps)=> (nextProps.show===preProps.show) && (nextProps.children === preProps.children))
//React.memo nhận 2 tham số đầu vào là component và custom function compare (cũng nhận 2 tham số là preProps và nextProps) , nếu hàm compare trả về true thì không render , trả về false thì render 
export default Modal;