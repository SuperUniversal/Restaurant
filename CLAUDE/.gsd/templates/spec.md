# SPEC.md — OP03_RoomHandoverAtCheckIn (Biên bản Nhận phòng)

> **Status**: `FINALIZED`
>
> ⚠️ **Planning Lock**: No code may be written until this spec is marked `FINALIZED`.

## Vision
Màn hình Biên bản Bàn giao Phòng khi Nhận phòng (Check-in Handover Form) là một quy trình nghiệp vụ trọng tâm trong hệ thống quản lý bất động sản cho thuê. Mục đích của màn hình là ghi nhận chính xác tình trạng phòng, chỉ số điện nước tại thời điểm khách thuê (Tenant) chuẩn bị nhận phòng, và cuối cùng tạo ra một bản ghi pháp lý được ký số xác nhận đồng thuận bởi cả Quản lý tòa nhà và Khách thuê.

## Goals
1. **Quản lý Thông tin Bàn giao (Read-only)** — Hiển thị chính xác các thông tin cơ bản: Contract ID, Room Number, Move-in Date, Inspector.
2. **Ghi nhận Chỉ số Tiện ích** — Cho phép nhập chỉ số điện, nước hiện tại và tải lên ảnh đồng hồ điện nước làm bằng chứng.
3. **Kiểm kê Tình trạng Tài sản** — Quản lý danh sách tài sản (Inventory), phân loại theo khu vực, đánh giá trạng thái (Excellent, Damaged...), kèm ghi chú và hình ảnh chứng minh.
4. **Đánh giá Thiết bị & Tiêu chuẩn** — Thu thập đánh giá chuẩn vệ sinh (A/B/C) và kiểm tra tình trạng bật/tắt (Toggle) của các thiết bị có sẵn (Wi-Fi, Smoke Detectors, v.v.).
5. **Chữ ký số Pháp lý** — Cung cấp khu vực ký số (Signature Canvas) cho cả Landlord/Agent và Tenant để xác nhận biên bản.

## Non-Goals (Out of Scope)
- Không xử lý thanh toán, cọc hay tính tiền thuê (đây là trách nhiệm của màn hình Contract/Billing).
- Không tạo mới Hợp đồng ở giao diện này (Màn hình Handover xử lý logic bàn giao của hợp đồng hiện có).
- Không chỉnh sửa danh sách cư dân hay thông tin cư dân.

## Constraints
- **Trải nghiệm thao tác hiện trường**: Ứng dụng phải hỗ trợ tốt trên Tablet/Mobile browser vì Agent có tiến hành nghiệm thu trực tiếp tại phòng.
- **Tính pháp lý chặt chẽ**: Bắt buộc yêu cầu chữ ký số điện tử của 2 bên. Không có chữ ký của Tenant sẽ gọi cảnh báo rủi ro.
- **Chứng cứ hình ảnh**: Bắt buộc upload hình ảnh đồng hồ điện nước mới cho phép xác nhận.

## Success Criteria
- [ ] Giao diện (UI) hiển thị đúng chuẩn "Pro Max", dark mode support theo design system hiện tại.
- [ ] "Save Draft" cho phép lưu tạm dữ liệu mà không cần xác nhận hoàn thành biên bản.
- [ ] Input chỉ số điện, nước hoạt động chuẩn, upload ảnh render được thumbnail nhanh chóng.
- [ ] Table kiểm kê tài sản (Room Inventory & Condition) xử lý nhạy các tuỳ chọn trạng thái và mở form thêm ảnh, ghi chú mà không bị lag.
- [ ] Tích hợp tính năng kí tên (Canvas Signature) mượt mà cho 2 bên, có tính năng Clear kí lại.
- [ ] Nút "Xác nhận bàn giao" (Submit) thực hiện validate toàn bộ điều kiện tối thiểu rồi mới gọi API submit.

## User Stories

### As a Inspector / Property Manager
- I want to lưu nháp (Save Draft) biên bản khi đang đi kiểm tra dở dang
- So that tôi không bị mất các dữ liệu tôi đã ghi nếu trình duyệt load lại.

### As a Inspector / Property Manager
- I want to chụp & tải ảnh trực tiếp vào bảng kiểm kê tài sản 
- So that cả hai bên có bằng chứng rõ ràng nếu có tranh chấp hư hỏng xảy ra ở giai đoạn Check-out.

### As a Tenant
- I want to xem lại các chỉ số điện nước cuối cùng và tự tay chữ kí điện tử trên chính màn hình
- So that tôi đảm bảo biên bản minh bạch và đồng thuận pháp lý.

## Technical Requirements

| Requirement | Priority | Notes |
|-------------|----------|-------|
| Signature Pad Integration | Must-have | Sử dụng Canvas API hoặc thư viện kiểu `react-signature-canvas`. |
| Image Upload Preview | Must-have | Convert File object sang ObjectURL để preview tức thời UI. |
| Status Toggle & Radio | Should-have | Nút A/B/C Cleanliness phải là controlled state. |
| Auto-save (Drafting) | Nice-to-have | Auto-save mỗi N giây khi giá trị inputs thay đổi. |

---

*Last updated: 2026-04-10*
