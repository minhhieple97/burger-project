Cấu trúc dự án Burder project
- Giao diện chia làm 3 phần chính
+ Menu (trên cùng)
+ Content (Buger) 
+ Footer (dưới cùng)

*Tổng quát

=> Thư mục component sẽ là thư mục chính chứa các component của project
- Mỗi thư mục trong thư mục component sẽ có:
+ một thư mục chứa subcomponent và css của subcomponent đó (element)
+ một primarycomponent (list)

=> Thư mực container sẽ chứa file(BurgerBuilder.js) lắp ghép các component 

=> Thư mục hoc là nơi chứa các HigherOrderComponent File Wrapper

*Chi tiết 
Thư mục components
+ BuildControl : Xây dựng nên phần Foooter,các button dùng để add thêm các thành phần của burger.
+ Burger : Tạo nên các thành phần của Burger (mead,chesse...)
+ Layout : Component bao bọc tất cả component trong ứng dụng
+ Logo : Component chứa logo để ở phần trên
+ Navigation (cần chú ý) : trong navigation chứa các component 
  - navigationItems render ra danh sách các ô text của navigation  (không bao gồm Logo) 
  - sideDrawer đây chính là navigation nhưng khi ở hiển thị trên phone thì mới được render, sideDrawer không có Menu(text) 
  - toolbar là component đại diện cho toàn bộ navigation khi ở giao diện desktop, nói dễ hiểu hơn thì sideDrawer và toolbar có vai trò hóan đổi cho nhau khi ở giao diện desktop hoặc mobile
+ Chi tiết về cấu trúc của toolBar và sideDrawer , tổng quát thì 2 component này dùng làm phần header cho page bao gồm cả naviagtion và logo.
- Cả toolBar và sideDrawer được đặt bên trong Layout
- Nhưng điểm khác biệt là bên trong sideDrawer có backdrop còn toolBar thì không 
- Backdrop trong sideDrawer sẽ hiển thị tùy chọn dựa vào props mà sideDrwaer truyền cho => Layout=> sideDrawer => backDrop. 

+ OrderSummary : đây là component dựng build nên hóa đơn . orderSumary sẽ được lồng vào trong component Modal để hiển thị như một modal.

+ UI : thư mục chứa các copmonent nhỏ như Button, Modal , Backdrop
 - Backdrop : là một nền đen , hiện thị tùy chọn lúc nào Modal hiển thị lên thì Backdrop sẽ hiển thị.


<!-- Chi tiết về cách xây dựng thanh điều hướng -->
- Ở giao diện mobile : trong component Layout (bao bọc thanh điều hướng)
- Có DrwaerToggle 


=================================================
Một số điều cần nhớ khi hiểu cách Redux hoạt động khi ánh xạ sang mô hình của công ty bảo hiểm,
* Tất cả dữ liệu của các Department đều được lưu ở một nơi gọi là Store.

* Mỗi khi một user tạo ra form thì Người Phân Phối Form (Form Receviver) sẽ gửi cho từng Department form (nó không quyết định được Department có xử lý form đó hay không ?)

* Cách hoạt động của các Department chỉ xoay quanh việc xử lý dữ liệu input(oldData+form)=> Processing....=>output(newData) , cách hoạt động của Department không liên quan đến vệc lưu trữ dữ liệu. 

* Mỗi form có thành phần gồm type+payload
+ FormReceiver không có chức năng phân loại form, nó chỉ có chức năng phân phối form cho tất cả các phòng ban
+ Tùy vào type mà mỗi department quyết định có xử lý form hay không.
+ Sau khi có được (form mà FormReceiver phân phối + old data từ Store cung cấp) thì Department căn cứ vào type của form mà có xử lý nó hay không ?
ngay cả khi Department không xử lý form thì nó cũng sẽ trả dữ liệu về cho Store (Khi nhận được form thì trong bất cứ trường hợp nào dù có xử lý hay không thì cuối cùng Department đều tiến hành đồng bộ hóa dữ liệu đầu vào với dữ liệu sẵn có của Department đó trong Store ))
+ Cần chú ý rằng với mô hình một công ty bảo hiểm thì tất cả các trường hợp đều xảy ra xảy ra theo kiểu một form nhưng có thể xử lý bởi nhiều Department cùng một lúc (Policy+Accountting) hoặc (Claim+Acccounting.) 
VD một yêu cầu bồi thường (type=Claim) thì nó sẽ được xử lý đồng thời bởi 
+ Claim Department : thêm vào danh sách các Claims
+ Acccount : trừ tiền số tiền trong store cho payload trong form.(số tiền mà công ty phải bồi thường cho user)

======================================================
Ánh xạ mô hình của công ty bảo hiểm => Mô hình của redux (Redux cycle)
Action Creator=>Action=>Dispatch=>Reducers=>State
User create form=>the form=>form receiver=>departments=>compiled department data
+ Trên giao diện người dùng rõ ràng nơi phát ra sự kiện chính là người dùng => việc này ánh xạ sang mô hình công ty khi cũng action đó chính là (user muốn tạo một form)
+ Mỗi action mà người dùng tạo ra nó cũng tương tự như một form mà user trong company tạo ra
có payload và type.
=> Nói rõ ràng hơn thì mục đích của mỗi Action được tạo ra là mô tả rõ sự thay đổi của dữ liệu (state) mà người dùng muốn trong ứng dụng của chúng ta cũng giống như form trong mô hình của công ty bảo hiểm, form mô tả rõ ràng với phòng ban yêu cầu của user.
+ Khi Action được tạo ra nó sẽ được gửi cho dispatch (function) để tạo ra các bản sao => ánh xạ sang mô hình company thì khi form được tạo ra nó cũng được trao cho formReceiver để tạo ra các bản sao.
+ Dispatch sẽ phân phối các Action đến các Reducers , mỗi reducers có nhiệm vụ xử lý dữ liệu đầu và để cho ra kết quả => Ánh xạ sang mô hình công ty khi formReceiver gửi form cho mỗi department xử lý.
+ Sau khi xử lý xong data đầu vào reducers sẽ tiến hành đồng bộ với dữ liệu trên store, 
+ Chú ý rằng mỗi lần reducers nhận được form và old data => thì nó đều trả về một dữ liệu mới, không liên quan gì đến old data => suy ra một điều rằng qua mỗi lần nhận được Action thì state trả về từ các reducers đều mới hoàn toàn, không liên quan gì đến state cũ, chúng ta luôn tránh so sánh trực tiếp old data vs new data trong reducers
+ Không nên khởi tạo giá trị ban đầu cho các state là undefine.
+ Chỉ có thể thay đổi state bằng cách tạo ra một action và truy cập trực tiếp vào state trong Reducers đó là luật cần tuân thủ nghiêm ngặt.

======================================================
* Mô tả luồng hoạt động của Redux

const createPolicy = (name,amount)=>{//Action creator
  return {//Action
    type:'CREATE_POLICY',
    payload:{
      name,
      amount
    }
  }
}
const deletePolicy = (name)=>{//Action creator
  return {//Action
    type:'DELETE_POLICY',
    payload:{
      name
    }
  }
};
const creataClaim = (name,amount)=>{//Action creator
   return {//Action
     type:'CREATE_CLAIM',
     payload:{
       name,
       amount
     }
   }
};
+ Reducers
const accounting = (bagOfMoney=100,action)=>{
    if(action.type==='CREATE_CLAIM'){
      return bagOfmoney - action.payload.amount;
    };
    if(action.type==='CREATE_POLICY'){
      return bagOfmoney + action.payload.amount;
    };
    return bagOfMoney
};
const claimsHistory = (oldListOfClaims=[],action)=>{
   if(action.type==='CREATE_CLAIM'){
      return [...oldListOfClaims,action.payload];
   };
     return oldListOfClams;
};
const policies = (listOfPolicies=[],action)=>{
   if(action.type==='CREATE_POLICY'){
      return [...listOfPolicies,action.payload.name];
   };
  else if(action.type==='DELETE_POLICY'){
    return listOfPolicies.filter(name=>name!==action.payload.name);
  };
  return listOfPolicies;
};
+ Dispatch
const {createStore,combineReducers} = Redux;
const ourDepartments = combineReducers({//Nhóm các reducers lại với nhau.
   accounting:accounting,
   claimsHistory:claimsHistory,
   policies:policies
});//Mỗi key trong đây đại diện cho state ở mỗi component, có thể đổi tên tùy ý không nhất thiết phải để tên giống với các reducers của nó.
const store = createStore(ourDepartments);//Tạo store để  quản lý các state
const action = createPolicy('Alex',20);//Tạo một action
store.dispatch(action);//Sử dụng hàm dispatch của Store để phân phối các action đến tất cả các Reducers
store.getState()//trả về dữ liệu trong store.
