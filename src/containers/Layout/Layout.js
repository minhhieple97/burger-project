import React, { Component } from 'react';
import Aux from '../../hoc/Wraper';
import classes from './layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
class Layout extends Component {
    state = {
        showSideDrawer: false//tùy chọn hiển thị cho side-drawer và backdrop , tức là sự hiện thị của SideDrwaer và Backdrop là đồng thời và phụ thuộc và duy nhất state showSideDrwaer
    };
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });//Đóng SideDrwaer và Backdrop đồng thời bằng cách invoked hàm sideDrawerClosedHandler một cách gián tiếp ở BackDrop
    };
    sideDrawerToggleHandler = () => {
        this.setState((preState) => ({ showSideDrawer: !preState.showSideDrawer }));//Một dạng khác của hàm setState nhận đầu vào là một hàm có tham số là state trước thời điểm gọi hàm sideDrawerToggleHandler
    };
    // Cùng một state showSideDrwaer nhưng sẽ có 2 hàm cùng tác động đến giá trị của nó.
    // truyền state showSideDrwaer xuống các component con theo thứ tự
    // Layout => Toolbar =>DrawToggle
    // Invoked gián tiếp hàm sideDrawerToggleHandler  ở DrawToggle để change state showSideDrawer
    // Thay đổi state => Layout render lại => props open mà Layout truyền cho SideDrwaer cũng bị thay đổi giá trị.
    //=> Tùy chọn hiển thị cho SideDrawer dựa vào việc xự ký sự kiện trên DrwaerToggle
    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated}  drawerToggleClicked={this.sideDrawerToggleHandler} />
                {/* Toolbar là thanh naviagtion component hiển thị  ở màn hình desktop */}
                <SideDrawer isAuth={this.props.isAuthenticated}  
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                {/* SideDrawer là thanh naviagtion component hiểu thị ở màn hình mobile */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps, null)(Layout);


