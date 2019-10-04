import React, { Component } from 'react';
import Aux from '../../hoc/Wraper';
import classes from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSideDrawer: false//tùy chọn hiển thị cho side-drawer
    };
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
}
export default Layout;


