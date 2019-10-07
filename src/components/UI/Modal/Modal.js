import React, { Component } from 'react'
import classes from './modal.module.css';
import Aux from '../../../hoc/Wraper';
import Backdrop from '../Backdrop/Backdrop';
export default class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {//Tối ưu hóa hiểu xuất khi các truyền các state cho orderSummary (được bọc trong modal) ở dạng props nếu các state này thay đổi thì orderSummary sẽ bị render lại mặc dù điều này là không cần thiết do orderSummary chưa hiển thị => sử dụng shouldComponentUpdate để kiểm tra mỗi lần component này render.
       return(nextProps.show!==this.props.show)||
       nextProps.children !== this.props.children
       ;
    }
    render() {
        return (
            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.clicked} ></Backdrop>
         <div className={classes.Modal}
              style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}
        >
         {this.props.children}
        </div>   
        </Aux>
        )
    }
}
