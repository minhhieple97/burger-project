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