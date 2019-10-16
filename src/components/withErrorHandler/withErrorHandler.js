//Chức năng của withErrorHandler là một HOC , đầu vào nó nhận 2 tham số componentChild và instanceAxios của componentChild, sư hoạt động của BurderBuilder(componetChild) liên quan mật thiết đến HOC của nó , quan trong hơn mô hình này áp dụng rất nhiều vào trong react, một HOC có thể tái sử dụng rất nhiều lần, lồng ghép vào nhau. 
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Wraper';
export default function withErrorHandler(WrapperComponent,axios) {
    return class extends Component {
        state = {
         error:null
        };
        componentWillMount() {//Khi component được render trong lần đầu tiên thì nó sẽ gọi componentWillMount (không tính contructor) và chỉ được gọi duy nhất một lần , các lần sau khi component bị render lại thì componentWillUpdate sẽ được gọi đầu tiên.
           this.reqInterceptor = axios.interceptors.request.use(req=>{//Khi withErrorHandler nhận đầu vào là các instanceAxios của componetChild của nó , mỗi khi các component này gửi và nhận HTTP-request thông qua instanceAxios thì các các HTTP-request-response phải đi qua các interceptors này, các interceptors hiểu đơn giản như các middleware nhưng ở phía fron-ent, dùng để catch lỗi liên quan đến axios (HTTP-req-res); 
               this.setState({error:null});
               return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res=>res,error=>{
              this.setState({error});
            });
        };
        componentWillUnmount() {
            //Vấn đề phát sinh khi tái sử dụng nhiều lần với withErrorHandler sẽ tạo ra càng này càng nhiều các interceptors (hiểu đơn giản nó như những middleware) gây lãng phí bộ nhớ memory-leak (bởi vì chúng ta khởi tạo các interceptors trong lifecycle componentWillMount)
            //=> Giải pháp mỗi khi component  unmount thì sẽ xóa interceptors  instanceAxios của componentChild của nó đi.
            axios.interceptors.request.eject(this.reqInterceptor);//Hủy các interceptors này khi component bị unmount
            axios.interceptors.response.eject(this.resInterceptor);
        };
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
