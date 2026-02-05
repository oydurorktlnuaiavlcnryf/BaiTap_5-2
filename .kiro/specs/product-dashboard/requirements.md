# Requirements Document

## Introduction

Product Dashboard là một ứng dụng web cho phép người dùng quản lý sản phẩm thông qua giao diện bảng dữ liệu. Ứng dụng sử dụng Platzi Fake Store API để thực hiện các thao tác CRUD, hỗ trợ tìm kiếm, phân trang, sắp xếp và xuất dữ liệu CSV.

## Glossary

- **Dashboard**: Giao diện chính hiển thị bảng sản phẩm và các điều khiển
- **Product_Table**: Bảng hiển thị danh sách sản phẩm với các cột ID, Title, Price, Category, Images
- **Search_Filter**: Bộ lọc tìm kiếm sản phẩm theo tiêu đề
- **Pagination_Controller**: Bộ điều khiển phân trang cho bảng sản phẩm
- **Sort_Handler**: Bộ xử lý sắp xếp theo cột
- **Tooltip_Display**: Hiển thị mô tả sản phẩm khi hover
- **Detail_Modal**: Modal hiển thị chi tiết sản phẩm
- **Edit_Modal**: Modal chỉnh sửa sản phẩm
- **Create_Modal**: Modal tạo sản phẩm mới
- **CSV_Exporter**: Bộ xuất dữ liệu ra file CSV
- **API_Service**: Dịch vụ gọi API Platzi Fake Store

## Requirements

### Requirement 1: Product Data Loading

**User Story:** As a user, I want to see all products loaded from the API when the page loads, so that I can view the available products.

#### Acceptance Criteria

1. WHEN the page loads, THE Dashboard SHALL fetch all products from the API endpoint `https://api.escuelajs.co/api/v1/products`
2. WHILE the API request is in progress, THE Dashboard SHALL display a loading spinner
3. WHEN products are successfully fetched, THE Product_Table SHALL display products with columns: ID, Title, Price, Category, Images
4. IF the API request fails, THEN THE Dashboard SHALL display a user-friendly error message
5. WHEN displaying product images, THE Product_Table SHALL show images at 50x50px with rounded corners
6. IF a product image URL is broken, THEN THE Product_Table SHALL display a placeholder image

### Requirement 2: Search Functionality

**User Story:** As a user, I want to search products by title in real-time, so that I can quickly find specific products.

#### Acceptance Criteria

1. WHEN a user types in the search input, THE Search_Filter SHALL filter products by title in real-time
2. THE Search_Filter SHALL perform case-insensitive matching
3. WHEN search results change, THE Product_Table SHALL update instantly without page reload
4. WHEN a search is performed, THE Pagination_Controller SHALL reset to page 1
5. WHEN the search input is cleared, THE Product_Table SHALL display all products

### Requirement 3: Pagination

**User Story:** As a user, I want to navigate through products using pagination, so that I can view products in manageable chunks.

#### Acceptance Criteria

1. THE Pagination_Controller SHALL support items per page options: 5, 10, 20
2. THE Pagination_Controller SHALL display Previous and Next navigation buttons
3. THE Pagination_Controller SHALL display page number buttons with active state highlighting
4. WHEN on the first page, THE Pagination_Controller SHALL disable the Previous button
5. WHEN on the last page, THE Pagination_Controller SHALL disable the Next button
6. THE Dashboard SHALL display "Showing X-Y of Z" information text
7. WHEN items per page changes, THE Pagination_Controller SHALL reset to page 1

### Requirement 4: Sorting

**User Story:** As a user, I want to sort products by Title or Price, so that I can organize the product list according to my preference.

#### Acceptance Criteria

1. WHEN a user clicks the Title column header, THE Sort_Handler SHALL sort products by title
2. WHEN a user clicks the Price column header, THE Sort_Handler SHALL sort products by price
3. WHEN clicking the same column header again, THE Sort_Handler SHALL toggle between ascending and descending order
4. THE Sort_Handler SHALL display visual indicators (up/down arrows) showing current sort direction
5. WHEN sorting is applied, THE Product_Table SHALL maintain the sort order across pagination

### Requirement 5: Description Tooltip

**User Story:** As a user, I want to see product descriptions when hovering over a row, so that I can get more information without opening a modal.

#### Acceptance Criteria

1. WHEN a user hovers over a product row, THE Tooltip_Display SHALL show the product description
2. THE Tooltip_Display SHALL follow the cursor position
3. WHEN the user moves the mouse away from the row, THE Tooltip_Display SHALL hide immediately

### Requirement 6: Detail Modal

**User Story:** As a user, I want to view full product details in a modal, so that I can see all product information including all images.

#### Acceptance Criteria

1. WHEN a user clicks on a product row, THE Detail_Modal SHALL open and display full product information
2. THE Detail_Modal SHALL display: title, price, category, description, and all images
3. THE Detail_Modal SHALL include an "Edit" button to open the edit form
4. THE Detail_Modal SHALL be closable by clicking outside or pressing the close button

### Requirement 7: Edit Product

**User Story:** As a user, I want to edit existing products, so that I can update product information.

#### Acceptance Criteria

1. WHEN the Edit button is clicked in Detail_Modal, THE Edit_Modal SHALL open with a pre-filled form
2. THE Edit_Modal SHALL contain fields: Title, Price, Description, Category ID, Images
3. WHEN the user submits the edit form, THE API_Service SHALL send a PUT request to update the product
4. IF the update is successful, THEN THE Product_Table SHALL refresh to show updated data
5. IF the update fails, THEN THE Edit_Modal SHALL display an error message
6. THE Edit_Modal SHALL validate that required fields are not empty before submission

### Requirement 8: Create Product

**User Story:** As a user, I want to create new products, so that I can add products to the catalog.

#### Acceptance Criteria

1. WHEN the Create button is clicked, THE Create_Modal SHALL open with an empty form
2. THE Create_Modal SHALL contain fields: Title, Price, Description, Category ID, Images
3. WHEN the user submits the create form, THE API_Service SHALL send a POST request to create the product
4. IF the creation is successful, THEN THE Product_Table SHALL refresh to show the new product
5. IF the creation fails, THEN THE Create_Modal SHALL display an error message
6. THE Create_Modal SHALL validate that required fields are not empty before submission

### Requirement 9: CSV Export

**User Story:** As a user, I want to export the current page data to CSV, so that I can use the data in other applications.

#### Acceptance Criteria

1. WHEN the Export CSV button is clicked, THE CSV_Exporter SHALL generate a CSV file containing only current page data
2. THE CSV_Exporter SHALL name the file using format: `products_page_N_timestamp.csv`
3. THE CSV_Exporter SHALL properly escape special characters (quotes, commas) in the data
4. THE CSV_Exporter SHALL trigger an automatic download of the generated file

### Requirement 10: Responsive Design

**User Story:** As a user, I want to use the dashboard on any device, so that I can manage products from mobile or desktop.

#### Acceptance Criteria

1. THE Dashboard SHALL be responsive and work on screens from 320px width and above
2. WHEN viewed on small screens, THE Product_Table SHALL scroll horizontally
3. THE Detail_Modal, Edit_Modal, and Create_Modal SHALL be mobile-friendly and scrollable

### Requirement 11: Visual Design

**User Story:** As a user, I want a professional and visually appealing interface, so that the dashboard is pleasant to use.

#### Acceptance Criteria

1. THE Dashboard SHALL use Bootstrap 5.3+ for styling
2. THE Dashboard header SHALL have a gradient background (purple: #667eea to #764ba2)
3. THE Product_Table SHALL use Bootstrap table-hover styling
4. THE Dashboard SHALL use Font Awesome 6+ for icons
5. THE Dashboard SHALL have smooth hover transitions on interactive elements
