Dưới đây là bản mô tả chức năng phân bố rõ ràng theo từng trang:

Chức năng các trang Web — Dự án BASILICO
Chức năng Dùng chung (Toàn bộ 6 trang)
Trước khi đi vào từng trang riêng biệt, có một tầng chức năng nền chạy thống nhất trên toàn bộ website:

Màn chờ tải trang (Preloader): Khi trang bắt đầu tải, một màn hình chờ đè lên toàn bộ giao diện với một thanh tiến trình (Progress Bar) chạy từ 0% đến 100%. JavaScript sử dụng setInterval() để tăng giá trị ngẫu nhiên mỗi 150ms, tạo cảm giác hệ thống đang hoạt động nhanh và chuyên nghiệp. Khi sự kiện window.load kích hoạt, màn chờ mờ dần và biến mất.

Thanh điều hướng thông minh (Smart Header): Khi thực khách cuộn trang xuống quá 80px, JavaScript lắng nghe sự kiện scroll và bổ sung class .scrolled vào thanh Header. Class này kích hoạt hiệu ứng CSS làm nền Header đặc hơn và bóng đổ sâu hơn — giúp menu điều hướng luôn nổi rõ trên mọi nền nội dung bên dưới mà không che khuất thông tin.

Nút tắt trang mobile (Mobile Sidebar): Trên màn hình điện thoại, menu điều hướng ngang sẽ ẩn đi và thay bằng nút Hamburger. Khi bấm, JavaScript thêm class .open vào Sidebar khiến nó trượt từ phải sang trái, đồng thời class .open trên lớp mờ (Overlay) được kích hoạt để chặn tương tác với nội dung phía sau. Bấm vào Overlay hoặc nhấn phím Escape sẽ đóng Sidebar lại.

Hiệu ứng cuộn trang (Scroll Reveal): IntersectionObserver theo dõi tất cả các phần tử có class .reveal-up, .reveal-left… Khi một phần tử lọt vào vùng nhìn thấy của màn hình, JavaScript gắn class .revealed vào phần tử đó, kích hoạt hiệu ứng CSS đã được định nghĩa sẵn giúp nội dung trượt lên và hiện dần. Sau khi hiệu ứng chạy xong, Observer ngừng theo dõi phần tử đó để tiết kiệm tài nguyên.

Hiệu ứng làn sóng nút bấm (Button Ripple): Mỗi khi thực khách click vào bất kỳ nút nào, JavaScript tạo ra một thẻ <span> tại đúng vị trí ngón tay chạm vào, áp dụng animation CSS khiến nó lan ra như vòng sóng nước rồi tự xóa khỏi DOM — mang lại cảm giác phản hồi tương tác tức thì, giống ứng dụng di động native.

3.4.1. Trang Thực Đơn — Chức năng Hiển thị và Lọc món ăn
Đây là trang phức tạp nhất về logic JavaScript, được điều khiển bởi hai hàm trung tâm: renderMenu() và filterItems().

Nguyên lý hoạt động: Toàn bộ 30 món ăn được lưu trữ trong một mảng JavaScript thuần (menuItems) ngay trong mã nguồn, mỗi phần tử là một Object chứa tên, danh mục, nhãn đặc tính, giá và đường dẫn ảnh. Khi trang tải lên, hàm filterItems() được gọi lần đầu tiên, nó đọc trạng thái bộ lọc hiện tại, chạy qua mảng bằng phương thức Array.filter() và chuyển kết quả cho hàm renderMenu().

Hàm renderMenu(items): Nhận vào một mảng món ăn đã được lọc, sử dụng phương thức .map() để chuyển đổi từng Object dữ liệu thành một chuỗi HTML hoàn chỉnh (thẻ card), sau đó .join('') ghép tất cả lại và gán vào innerHTML của lưới hiển thị. Toàn bộ quá trình tái tạo giao diện xảy ra trong một thao tác DOM duy nhất để đạt hiệu suất tốt nhất.

Bộ lọc kép (Danh mục + Đặc tính): Hệ thống lưu trạng thái bộ lọc vào hai biến activeCat (danh mục đang chọn) và activeTag (nhãn đặc tính đang chọn). Mỗi khi thực khách bấm vào một tab danh mục hoặc nhãn đặc tính, JavaScript cập nhật biến trạng thái tương ứng rồi gọi lại filterItems(). Hai bộ lọc có thể hoạt động đồng thời — ví dụ hiển thị chỉ những "Món Chính" thuộc nhóm "Hải sản". Khi không tìm thấy kết quả nào, trạng thái rỗng (Empty State) được hiển thị thay vì một trang trắng.

3.4.2. Trang Chi tiết Món ăn — Chức năng Định tuyến bằng URL
Trang chi-tiet.html hoạt động như một trang động dù không có máy chủ xử lý.

Cơ chế định tuyến: Khi thực khách bấm vào một card món ăn ở trang Thực Đơn, trình duyệt điều hướng đến chi-tiet.html?id=3 — trong đó số 3 là chỉ số (index) của món ăn trong mảng. JavaScript của trang Chi tiết đọc tham số này qua URLSearchParams, tra cứu vào đúng phần tử trong mảng menuItems và dùng DOM Manipulation để điền toàn bộ thông tin lên trang — hình ảnh lớn, mô tả đầy đủ, nguyên liệu, ghi chú đầu bếp và các món đề xuất đi kèm.

3.4.3. Trang Giới Thiệu — Chức năng Đếm số Thống kê
Thuật toán: Khi khối thống kê cuộn vào màn hình (được IntersectionObserver phát hiện tại ngưỡng 50%), hàm animateCounter() được kích hoạt cho từng con số. Hàm này sử dụng requestAnimationFrame() — API của trình duyệt cho phép thực thi code đồng bộ với tần số làm mới màn hình (60 lần/giây) — thay vì setInterval() thông thường để đảm bảo hoạt ảnh mượt mà tuyệt đối.

Hiệu ứng Ease-out: Vị trí của con số không tăng tuyến tính. Thay vào đó, hàm áp dụng công thức toán học Ease-out Cubic: 1 - (1 - ratio)³. Kết quả là con số tăng rất nhanh ở đầu, sau đó giảm tốc và dừng chính xác — tạo ra cảm giác "va chạm mềm" cực kỳ thỏa mãn thị giác.

3.4.4. Trang Đặt Bàn — Chức năng Kiểm duyệt và Xác nhận
Hệ thống Validation dựa trên quy tắc (Rule-based): Thay vì viết điều kiện kiểm tra rải rác, toàn bộ logic kiểm tra được đóng gói trong một mảng rules[] — mỗi phần tử định nghĩa trường cần kiểm tra, hàm kiểm tra (check) và hàm trả về thông báo lỗi (err). Khi form được gửi, JavaScript duyệt qua mảng này, gọi check(value) cho từng trường và hiển thị lỗi ngay bên dưới ô nhập liệu tương ứng.

Luồng xác nhận hai bước: Khi tất cả thông tin hợp lệ, thay vì gửi dữ liệu ngay, hệ thống kích hoạt Bootstrap Modal — một hộp thoại nổi lên giữa màn hình tóm tắt lại đầy đủ: họ tên, ngày giờ, số khách, khu vực ngồi. Thực khách có cơ hội đọc lại lần cuối trước khi bấm xác nhận — giảm triệt để tỷ lệ đặt bàn sai thông tin.

3.4.5. Trang Liên Hệ — Chức năng Form và Thông báo Toast
Validation tức thì: Form Liên Hệ áp dụng cùng kiến trúc rules[] như trang Đặt Bàn. Khi ô nhập liệu sai, viền chuyển đỏ và thông báo lỗi xuất hiện ngay bên dưới. Khi đúng, viền chuyển xanh lá như tín hiệu xác nhận.

Thông báo Toast tự xây dựng: Sau khi form gửi thành công, hệ thống tạo động một thẻ <div class="toast-item success"> và chèn vào khu vực góc trên bên phải màn hình. Toast tự động biến mất sau 5 giây hoặc khi người dùng bấm nút đóng — toàn bộ logic này được viết thuần bằng Vanilla JavaScript, không cần bất kỳ thư viện Toast nào bên ngoài.