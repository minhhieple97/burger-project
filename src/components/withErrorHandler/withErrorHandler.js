import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Wraper';
export default function withErrorHandler(WrapperComponent,axios) {
    return class extends Component {
        state = {
         error:null
        };
        componentDidMount() {
            axios.interceptors.request.use(req=>{
               this.setState({error:null});
               return req;
            });
            axios.interceptors.response.use(res=>res,error=>{
              this.setState({error});
            });
        }
        errorHandler = ()=>{
            this.setState({error:null});
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} clicked={this.errorHandler}>{this.state.error?this.state.error.message:''}</Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            )
        };
    }
}
