# 📁 DANH MỤC HỆ THỐNG TỆP TRONG THƯ MỤC CLAUDE

> [!NOTE]
> **Tổng quan:** Tài liệu này bản đồ hóa toàn bộ cấu trúc thư mục `CLAUDE/`, giải thích chi tiết chức năng của từng tệp, đồng thời cung cấp chiến lược và quy trình 4 bước để **Phân tích Data Flow & UI/UX** trong dự án một cách chuyên nghiệp nhất.

---

## 🌟 PHẦN 1 — CATALOG TẤT CẢ TỆP TRONG CLAUDE/

### 1. 📂 Thư mục gốc (`CLAUDE/`)
> Chứa các quy chuẩn và luật lệ tối cao mà mọi thực thể AI (Agents) & Lập trình viên đều phải tuân thủ tuyệt đối.

* **`PROJECT_RULES.md`**
  * **Mô tả gốc:** Quy tắc vàng của toàn dự án: `SPEC` → `PLAN` → `EXECUTE` → `VERIFY` → `COMMIT`. Định nghĩa Planning Lock (không code nếu SPEC chưa FINALIZED), Wave Execution, Context Hygiene, Token Efficiency.
  * **Chi tiết & Ví dụ:** Khóa an toàn ngăn chặn việc "code bậy" khi chưa có bản thiết kế.
    ```bash
    # Ví dụ hành vi Agent khi vi phạm PROJECT_RULES:
    > "LỖI: Trạng thái SPEC hiện đang là DRAFT. Yêu cầu chuyển sang FINALIZED trước khi yêu cầu viết code."
    ```
* **`GSD-STYLE.md`**
  * **Mô tả gốc:** Chuẩn viết code & tài liệu: File conventions, XML tag conventions (`<task>`, `<role>`, `<action>`), UX patterns cho banners & decision gates. Định nghĩa rõ các anti-patterns bị cấm.
  * **Chi tiết & Ví dụ:** Thống nhất ngôn ngữ giao tiếp hệ thống.
    ```xml
    <!-- Ví dụ chuẩn XML giao tiếp được định nghĩa: -->
    <task effort="high">
       <action>Phân tích API luồng đăng nhập</action>
       <verify>Đảm bảo không lưu Token vào text thường</verify>
    </task>
    ```
* **`model_capabilities.yaml`**
  * **Mô tả gốc:** Khả năng từng model AI: So sánh Flash vs Pro, context window, use case phù hợp.
  * **Chi tiết & Ví dụ:** File cấu hình để luân chuyển thông minh giữa các model AI rẻ & đắt tiền.

### 2. 📂 Tùy chỉnh AI (`CLAUDE/adapters/`)
> Chứa các thiết lập tối ưu hoá cho từng nền tảng Trí tuệ nhân tạo cụ thể.

* **`GEMINI.md`**
  * **Mô tả gốc:** Tối ưu hoá cho Google Gemini: Model selection, context loading pattern với XML tags, khi nào dùng grounding, code execution sandbox. Anti-patterns: loading entire codebase.
  * **Chi tiết & Ví dụ:** Giúp Gemini tránh ảo giác (hallucination) bằng cách ép buộc đọc file theo mục tiêu (Targeted read).
* **`CLAUDE.md` / `GPT_OSS.md`**
  * **Mô tả gốc:** Tối ưu tương tự nhưng dành cho hệ thống Claude (Anthropic) và OpenAI/Open Source Models.

### 3. 📂 Mạng lưới Workflows (`CLAUDE/.agent/workflows/`)
> Bao gồm **35 workflows** hoạt động như các lệnh slash (`/command`). Mỗi workflow khởi chạy một quy trình quản lý dự án hoàn chỉnh.

> [!TIP]
> **Các luồng (Workflows) Cốt lõi quan trọng nhất:**

* 🗺️ **`/map` (`map.md`)**
  * **Mô tả gốc:** Phân tích codebase: quét thư mục, phụ thuộc, data flow (grep axios, fetch), technical debt (TODO/FIXME) → Xuất ra `ARCHITECTURE.md` + `STACK.md`.
  * **Ví dụ:** Tạo ra sơ đồ phân bổ Component và API ngầm.
* ✅ **`/verify` (`verify.md`)**
  * **Mô tả gốc:** Kiểm tra must-haves theo từng phase: chạy lệnh, chụp screenshot UI, so sánh spec → Xuất `VERIFICATION.md` (nếu fail → tạo fix plan).
  * **Ví dụ:** `npm run test -- OP12` để lấy bằng chứng thực nghiệm (Empirical proof).
* 📋 **`/plan` (`plan.md`)**
  * **Mô tả gốc:** Phân rã phase thành tasks có `<files>`, `<action>`, `<verify>`. Dùng context từ `ARCHITECTURE.md`.
* ⚙️ **`/execute` (`execute.md`)**
  * **Mô tả gốc:** Thực thi tasks từ plan theo mô hình sóng (wave), commit từng atomic task triệt để.
* 🐛 **`/debug` (`debug.md`)**
  * **Mô tả gốc:** Quy trình debug 4 bước: `Reproduce` → `Isolate` → `Fix` → `Verify`.

> **Các luồng Tiện ích và Điều hướng:**
* **`resume.md` (▶️), `pause.md` (⏸️):** Lưu trữ / Phục hồi Context Session vào `STATE.md`.
* **`update.md` (🔄), `sprint.md` (🏃), `progress.md` (📊):** Quản trị vòng đời Roadmap, cập nhật Spec, đẩy nhanh tiến trình chạy Task.
* **`add-phase.md`, `add-todo.md`, `audit-milestone.md`, `check-todos.md`, `complete-milestone.md`, `discuss-phase.md`, `insert-phase.md`, `remove-phase.md`, `new-milestone.md`, `plan-milestone-gaps.md`, `list-phase-assumptions.md`, `research-phase.md`, `web-search.md`, `whats-new.md`, `help.md`, `new-project.md`, `install.md`:** Các nghiệp vụ Micro-management của Project Manager.

> **Các luồng Siêu năng lực (Superpowers):**
* Chạy agent đa nhiệm mạnh mẽ: `superpowers-execute-plan-parallel.md` (⚡ Chạy task song song), `superpowers-execute-plan.md`, `superpowers-write-plan.md`, `superpowers-review.md`, `superpowers-brainstorm.md`, `superpowers-finish.md`, `superpowers-debug.md`, `superpowers-reload.md` (♻️ Reload context nhanh).

### 4. 📂 Kỹ năng Chuyên sâu (`CLAUDE/.agents/core-skills/`)
> Gồm **11 skills** kích hoạt bộ vi xử lý logic của AI Agent rẽ nhánh xử lý chuyên gia.

| Tên Kỹ năng (Skill) & Thư mục | Mô tả gốc | Phân tích chi tiết & Mục đích |
|-------------------------|-----------|------------------|
| `codebase-mapper` | Scan cấu trúc, phụ thuộc, patterns (naming, error, state), integrations. Đầu ra: `ARCHITECTURE.md`. | Nhìn xuyên thấu hệ thống như tia X, tìm ra các function rác hoặc API chết. |
| `verifier` | Kiểm tra 3 tầng: (1) Tồn tại? (2) Nội dung thực? (3) Wired/Kết nối? Bắt lỗi Stub React. | Đội cảnh sát phát hiện Dev làm giả UI: chặn việc `return <div>Coming soon</div>`. |
| `planner` / `executor` | Lập kế hoạch XML task format / Thực thi theo wave & Commit. | Module cơ bắp đóng vai trò gõ code và phân chia milestones. |
| `debugger` | Bắt buộc phải Tái hiện (Reproduce) trước khi Sửa (Fix). | Chống lại thói quen "Đoán mò lỗi" của AI sinh tạo. |
| `empirical-validation` | Cần Screenshot, Command output làm bằng chứng. | Xác minh không tin vào lời hứa "Trust me bro" của hệ thống. |
| `context-compressor`, `context-fetch`, `context-health-monitor` | Nén context, đọc file targeted, theo dõi token usage. | Hệ thống tuần hoàn, giữ AI không bị tràn RAM bộ nhớ. |
| `plan-checker` / `token-budget` | Validator trước khi execute / Quản lý ngân sách Token (PEAK->DEGRADING). | Các chốt chặn đảm bảo tính kinh tế và an toàn kỹ thuật. |

### 5. 📂 Siêu Kĩ Năng (`CLAUDE/.agent/superpower-skills/`)
> **9 kỹ năng** cho phép Agent tiếp quản các luồng cấp cao vĩ mô:
> `superpowers-plan`, `superpowers-review`, `superpowers-workflow`, `superpowers-tdd` (Test-Driven Development), `superpowers-brainstorm`, `superpowers-debug`, `superpowers-finish`, `superpowers-python-automation`, `superpowers-rest-automation`.

### 6. 📂 Quy tắc Hành vi (`CLAUDE/.agent/rules/`)
> **6 quy tắc sắt** định hình ranh giới đạo đức/an toàn của Agent:
* `context-management.md`: Suy nghĩ trước khi quét file, ưu tiên search.
* `debugging.md`: Không bao giờ fix mò nếu không hiểu rễ lỗi (Root cause).
* `security.md`: Rào chắn cấm in Token/Password ra log.
* `superpowers.md`: Giới hạn ngưỡng sử dụng sức mạnh.
* `terminal-policy.md`: Lệnh nào cần user Verify, lệnh nào chạy ngầm.
* `testing.md`: Test code là bắt buộc, không được skip.

### 7. 📂 Template Hệ thống (`CLAUDE/.gsd/templates/` & `examples/`)
* **24 Templates Mẫu (`templates/`):** Khung sườn cho `spec.md`, `state.md`, `roadmap.md`, `PLAN.md`, `VERIFICATION.md`, `DEBUG.md`, `SUMMARY.md`, `architecture.md`, `stack.md`,...
* **4 Ví dụ Thực chiến (`examples/`):** `quick-reference.md`, `multi-wave-workflow.md`, `workflow-example.md`, `cross-platform.md` (Xử lý Windows PowerShell & Linux Bash).

### 8. 📂 Tài liệu Vận hành (`CLAUDE/docs/`)
> Chứa các hướng dẫn vận hành và tối ưu hoá dành cho cả AI Agent lẫn Developer.

* **`model-selection-playbook.md`**
  * **Mô tả:** Chiến lược chọn model AI phù hợp (Flash vs Pro) theo từng loại task. Hướng dẫn cân đối chi phí/chất lượng.
* **`runbook.md`**
  * **Mô tả:** Sổ tay vận hành quy trình GSD — hướng dẫn thực hành từng bước cho các tình huống thường gặp.
* **`token-optimization-guide.md`**
  * **Mô tả:** Kỹ thuật tối ưu hoá token usage: khi nào nén context, khi nào tải lại, ngưỡng cảnh báo tràn.

### 9. 📂 Scripts Tiện ích (`CLAUDE/scripts/` & Khác)
* **12 Scripts (`scripts/`):**
  * Script Tìm kiếm: `search_repo.ps1` / `search_repo.sh`, `setup_search.ps1` / `setup_search.sh`.
  * Script Validator hệ thống: `validate-all.ps1` / `.sh`, `validate-skills.ps1` / `.sh`, `validate-templates.ps1` / `.sh`, `validate-workflows.ps1` / `.sh`.
  * *(Mỗi script đều có 2 phiên bản cross-platform: `.ps1` cho Windows PowerShell và `.sh` cho Linux/macOS Bash).*
* **Cấu hình Local IDE:**
  * `.gemini/GEMINI.md`: Hook setting riêng ép Gemini đọc đúng `PROJECT_RULES.md`.
  * `.vscode/settings.json`: Tinh chỉnh môi trường Visual Studio Code đồng bộ với file GSD.

---

## 💎 PHẦN 2 — CHIẾN LƯỢC: PHÂN TÍCH DATA FLOW & KIỂM TRA UI/UX

> [!IMPORTANT]
> Đây là bộ công cụ tối thượng dùng để quét và chẩn đoán toàn diện xem ứng dụng có đang bị thiếu hụt dữ liệu thật, hay UI/UX chỉ là "bình phong" (Stub/Mock-ups). Phân loại theo 3 Nhóm ưu tiên.

### 🥇 TIER 1 — Khai hỏa ngay (Vũ khí phân tích chính)
**Mục tiêu: Đánh giá tức thì xem UI/UX giả lập (Stubs) đang nằm ở đâu.**

1. **`verifier/SKILL.md`**: Radar quét 3 lớp:
   - File `.tsx` có tồn tại ở đúng thư mục không?
   - Form có state management (e.g. `useState`, `useEffect`) không hay chỉ là input chết?
   - Cắm API có truyền `prop` để render dữ liệu thật không?
2. **`verify.md` (Workflow)**: Bóc tách `must-haves` từ SPEC và chạy test.
3. **`map.md` (Workflow)**: Vẽ lưới Data Flow. Ai gọi ai? API chọc vào Service nào?
4. **`codebase-mapper/SKILL.md`**: Dùng Regex Scripts lùng sục toàn cõi Source Code để bắt các cụm từ "hardcode".

### 🥈 TIER 2 — Lên phương án Tác chiến (Kế hoạch sửa chữa)
1. **`VERIFICATION.md` (Template)**: Điền báo cáo nghiệm thu cho từng Module (Ví dụ OP10, OP12).
2. **`plan.md` & `PLAN.md`**: Phát hiện lỗi xong thì lập Work Breakdown Structure (WBS) để sửa.
3. **`superpowers-review.md`**: Thả AI Agent vào phân tích UX sâu hơn (Độ tương phản, layout shift...).
4. **`UAT.md` (Template)**: Lên kịch bản nghiệm thu cho User thật click thử.

### 🥉 TIER 3 — Hệ quy chiếu (Context tham chiếu)
1. Dùng **`PROJECT_RULES.md`** & **`GSD-STYLE.md`** để tham chiếu, phán xét code mới viết ra có vi phạm rule cấm không.
2. Dùng **`security.md`** rà soát lỗ hổng XSS/Injection.
3. Dùng **`docs/token-optimization-guide.md`** & **`docs/model-selection-playbook.md`** để tối ưu chi phí & hiệu suất AI.

---

## ⚙️ PHẦN 3 — QUY TRÌNH THỰC THI CHUẨN: BẮT BỆNH UI/UX GIẢ LẬP

> Tuân thủ 4 bước sau bằng cách sử dụng các tệp tin trong hệ sinh thái `CLAUDE/`, không vi phạm nguyên tắc truy cập codebase bừa bãi.

### 📍 BƯỚC 1: Sử dụng `/map` để rà soát dòng chảy dữ liệu (Data Flow)
* **Vũ khí:** `.agent/workflows/map.md` + `.agents/core-skills/codebase-mapper/SKILL.md`
* **Hành động:** Sử dụng PowerShell Grep patterns để theo dấu dòng dữ liệu.
* **Đầu ra:** Bản đồ tĩnh `ARCHITECTURE.md` và danh mục `STACK.md`.

### 📍 BƯỚC 2: Truy quét Code ảo (Auto-Detect Stubs)
* **Vũ khí:** `.agents/core-skills/verifier/SKILL.md` (Step 7: Anti-Pattern Scan)
* **Hành động:** Chạy lệnh Terminal để tóm gọn các Component giả dối.
  ```powershell
  # Tìm các component đang code dở dang
  Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse | Select-String -Pattern "placeholder|coming soon|Đây là Component"
  
  # Tìm nợ kĩ thuật
  Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse | Select-String -Pattern "TODO|FIXME"
  
  # Tìm Fragment trống hoặc Null returns
  Get-ChildItem -Path "src" -Filter "*.tsx" -Recurse | Select-String -Pattern "return null|return <></>"
  ```
* **Đầu ra:** Danh sách các Modules mỏng/rỗng cần tu bổ khẩn cấp.

### 📍 BƯỚC 3: Triển khai `/verify` — Sát hạch từng Module
* **Vũ khí:** `.agent/workflows/verify.md` + file báo cáo `.gsd/templates/VERIFICATION.md`
* **Hành động:** Chấm điểm khắc nghiệt qua 3 vòng gửi xe:
  - **Level 1:** File vật lý có ở đó không? (Pass/Fail)
  - **Level 2:** Có Logic React Hooks xử lý Data gốc chưa? (Pass/Fail)
  - **Level 3:** Nút bấm có tương tác nảy State và đẩy lên Data Flow chưa? (Pass/Fail)
* **Đầu ra:** File `.md` báo cáo kết quả `[ PASS / PARTIAL / FAIL ]`. 

### 📍 BƯỚC 4: `/plan` — Lập đồ án chỉnh trang (Fix Gaps)
* **Vũ khí:** `.agent/workflows/plan.md` + `.gsd/templates/PLAN.md`
* **Hành động:** Từ list báo `FAIL` ở Bước 3, AI Agent sẽ chẻ nhỏ việc.
  ```xml
  <!-- Ví dụ cấu trúc Task để fix lỗi -->
  <task>
     <files>OP12_ParkingLotManagement.tsx</files>
     <action>Thay thế mockData bằng hàm fetch thật gọi từ /api/parking</action>
     <verify>Giao diện render đủ xe và Click mở đúng ID Xe</verify>
  </task>
  ```
* **Đầu ra:** Kế hoạch thực thi chuẩn xác, sẵn sàng truyền lệnh cho `/execute` cày nốt phần việc.

---
*(Tài liệu chuẩn hóa dựa trên kho tàng quy luật của hệ thống CLAUDE GSD)*