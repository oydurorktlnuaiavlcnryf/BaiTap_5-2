# Product Dashboard Project - AI Agent Instructions

## 📋 Project Overview
Build a complete Product Dashboard using the Platzi Fake Store API with full CRUD operations, search, pagination, sorting, and export functionality.

**API Endpoint:** `https://api.escuelajs.co/api/v1/products`  
**API Documentation:** https://fakeapi.platzi.com/en/rest/products/

---

## 🎯 Project Requirements

### 1. Core Features
- **Display Products Table** with columns: ID, Title, Price, Category, Images
- **Tooltip Description** - Show product description on row hover
- **Search Functionality** - Real-time search by title
- **Pagination** - Support 5, 10, 20 items per page
- **Sorting** - Sort by Price and Title (ascending/descending)
- **CSV Export** - Export current page data to CSV file
- **Detail Modal** - View full product details on row click
- **Edit Modal** - Update product using PUT API
- **Create Modal** - Add new product using POST API

### 2. Technical Stack
- **HTML5** - Semantic markup
- **Bootstrap 5.3+** - Responsive UI framework
- **Vanilla JavaScript** - No frameworks (React, Vue, etc.)
- **Font Awesome 6+** - Icons
- **Platzi Fake Store API** - Backend service

---

## 🏗️ Project Structure

```
product-dashboard/
├── index.html          # Main HTML file
├── app.js              # JavaScript logic
├── README.md           # This file
└── .gitignore          # Git ignore file (optional)
```

---

## 📝 Detailed Requirements

### HTML Structure (index.html)

#### Required Sections:
1. **Header Section**
   - Dashboard title
   - Subtitle with API reference

2. **Controls Section**
   - Search input (real-time filter by title)
   - Items per page dropdown (5, 10, 20)
   - Create new product button
   - Export CSV button

3. **Table Section**
   - Responsive Bootstrap table
   - Columns: ID, Title, Price, Category, Images
   - Sortable headers for Title and Price
   - Hover effect with tooltip for description
   - Click row to open detail modal

4. **Pagination Section**
   - Previous/Next buttons
   - Page numbers (with ellipsis for many pages)
   - Current page indicator
   - Total items count

5. **Modals**
   - **Detail Modal**: Display full product info + Edit button
   - **Edit Modal**: Form to update product (PUT request)
   - **Create Modal**: Form to create product (POST request)

#### Bootstrap Components to Use:
- `card` - For sections
- `table table-hover` - For product table
- `modal` - For detail/edit/create dialogs
- `form-control` - For inputs
- `btn` - For buttons
- `pagination` - For page navigation
- `spinner-border` - For loading state

#### Custom CSS Requirements:
- Gradient header background
- Smooth hover transitions on table rows
- Product image styling (50x50px, rounded)
- Tooltip positioning for description
- Sort icon animations
- Loading spinner overlay

---

### JavaScript Logic (app.js)

#### Global Variables:
```javascript
const API_BASE_URL = 'https://api.escuelajs.co/api/v1';
let allProducts = [];          // All fetched products
let filteredProducts = [];     // After search filter
let currentPage = 1;
let itemsPerPage = 10;
let currentSortField = null;
let currentSortOrder = 'asc';
let currentProductId = null;
```

#### Required Functions:

##### 1. Data Fetching
```javascript
async function fetchProducts()
// Fetch all products from API
// Store in allProducts array
// Initialize filteredProducts
// Handle errors gracefully
```

##### 2. Search Functionality
```javascript
function handleSearch(e)
// Filter products by title (case-insensitive)
// Update filteredProducts array
// Reset to page 1
// Re-render table
```

##### 3. Pagination
```javascript
function renderTable()
// Calculate start/end index based on currentPage
// Slice filteredProducts for current page
// Generate table rows with data
// Call updatePagination() and updatePageInfo()

function updatePagination()
// Generate pagination buttons
// Highlight current page
// Disable prev/next when appropriate
// Handle page click events

function updatePageInfo()
// Display "Showing X-Y of Z" text
```

##### 4. Sorting
```javascript
function handleSort(field)
// Toggle sort order if same field
// Sort filteredProducts by field (title or price)
// Update sort icons (up/down arrows)
// Re-render table
```

##### 5. Tooltip
```javascript
function handleTooltip(e)
// Show tooltip on row hover
// Position tooltip near cursor
// Display product description
// Hide when not hovering
```

##### 6. Detail Modal
```javascript
async function openDetailModal(productId)
// Fetch product details by ID
// Display in modal: title, price, category, description, images
// Show Edit button
// Handle image carousel if multiple images
```

##### 7. Edit Functionality
```javascript
function openEditModal()
// Load current product data into form
// Close detail modal
// Open edit modal

async function handleUpdate()
// Validate form inputs
// Send PUT request to API
// Handle success/error responses
// Refresh product list
// Close modal
```

##### 8. Create Functionality
```javascript
function openCreateModal()
// Reset form
// Open create modal

async function handleCreate()
// Validate form inputs
// Send POST request to API
// Handle success/error responses
// Refresh product list
// Close modal
```

##### 9. Export CSV
```javascript
function exportToCSV()
// Get current page products
// Format as CSV (handle commas, quotes in text)
// Create Blob and download link
// Trigger download with filename: products_page_N_timestamp.csv
```

##### 10. Loading State
```javascript
function showLoading(show)
// Show/hide loading spinner
// Use during API calls
```

---

## 🔧 API Endpoints & Methods

### GET All Products
```
GET https://api.escuelajs.co/api/v1/products
Response: Array of product objects
```

### GET Single Product
```
GET https://api.escuelajs.co/api/v1/products/:id
Response: Product object
```

### POST Create Product
```
POST https://api.escuelajs.co/api/v1/products
Headers: { 'Content-Type': 'application/json' }
Body: {
  "title": "string",
  "price": number,
  "description": "string",
  "categoryId": number,
  "images": ["url1", "url2"]
}
Response: Created product object
```

### PUT Update Product
```
PUT https://api.escuelajs.co/api/v1/products/:id
Headers: { 'Content-Type': 'application/json' }
Body: {
  "title": "string",
  "price": number,
  "description": "string",
  "categoryId": number,
  "images": ["url1", "url2"]
}
Response: Updated product object
```

---

## 🧪 Testing Checklist

### Functional Tests
- [ ] All products load on initial page load
- [ ] Search filters products correctly (case-insensitive)
- [ ] Search updates table in real-time
- [ ] Pagination displays correct items per page
- [ ] Pagination buttons work (prev/next/numbers)
- [ ] Items per page dropdown changes display (5/10/20)
- [ ] Sort by Title works (ascending/descending)
- [ ] Sort by Price works (ascending/descending)
- [ ] Sort icons update correctly
- [ ] Tooltip shows description on row hover
- [ ] Tooltip follows cursor movement
- [ ] Tooltip hides when not hovering
- [ ] Clicking row opens Detail Modal
- [ ] Detail Modal shows all product info
- [ ] Detail Modal displays images correctly
- [ ] Edit button opens Edit Modal
- [ ] Edit Modal pre-fills current data
- [ ] Update API call works (PUT request)
- [ ] Table refreshes after update
- [ ] Create button opens Create Modal
- [ ] Create API call works (POST request)
- [ ] Table refreshes after create
- [ ] Export CSV downloads file
- [ ] CSV contains only current page data
- [ ] CSV format is correct (handles special characters)

### Error Handling Tests
- [ ] API fetch failure shows user-friendly message
- [ ] Invalid product ID handled gracefully
- [ ] Form validation prevents empty submissions
- [ ] Network errors don't crash app
- [ ] Loading spinner shows during API calls

### UI/UX Tests
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Table scrolls horizontally on small screens
- [ ] Modals are centered and scrollable
- [ ] Buttons have hover effects
- [ ] Form inputs have proper labels
- [ ] Success/error messages are clear
- [ ] Images have fallback for broken URLs

---

## 🐛 Common Issues & Debug Guide

### Issue 1: Products Not Loading
**Symptoms:** Empty table, no data displayed  
**Debug Steps:**
1. Check console for API errors
2. Verify API endpoint is correct
3. Check CORS policy
4. Ensure `fetchProducts()` is called on page load
5. Log `allProducts` array to console

**Fix:** Add error handling and loading state

### Issue 2: Search Not Working
**Symptoms:** Search input doesn't filter results  
**Debug Steps:**
1. Verify event listener on search input
2. Check if `handleSearch` function is called
3. Log search term and filtered results
4. Ensure case-insensitive comparison

**Fix:** Use `.toLowerCase()` for both search term and product titles

### Issue 3: Pagination Breaks After Search
**Symptoms:** Wrong page displayed after search  
**Debug Steps:**
1. Check if `currentPage` resets to 1 on search
2. Verify `filteredProducts` is used, not `allProducts`
3. Log pagination calculations

**Fix:** Reset `currentPage = 1` in `handleSearch()`

### Issue 4: Sort Not Persisting
**Symptoms:** Sort resets after pagination  
**Debug Steps:**
1. Check if `filteredProducts` is being re-sorted
2. Verify sort is applied before slicing for pagination
3. Log sort field and order

**Fix:** Apply sort to `filteredProducts`, not page slice

### Issue 5: Modal Not Opening
**Symptoms:** Click on row does nothing  
**Debug Steps:**
1. Check if click event is attached
2. Verify Bootstrap JS is loaded
3. Log product ID on click
4. Check modal ID matches

**Fix:** Ensure Bootstrap bundle.js is loaded before app.js

### Issue 6: API Update/Create Fails
**Symptoms:** PUT/POST requests return errors  
**Debug Steps:**
1. Check request headers (Content-Type: application/json)
2. Verify request body format
3. Log request payload
4. Check API documentation for required fields
5. Test with Postman/cURL

**Fix:** Ensure all required fields are included and properly formatted

### Issue 7: CSV Export Empty/Wrong Format
**Symptoms:** CSV file is empty or garbled  
**Debug Steps:**
1. Log data being exported
2. Check CSV string format
3. Verify Blob creation
4. Test with simple data first

**Fix:** Escape quotes and commas in CSV data

### Issue 8: Images Not Displaying
**Symptoms:** Broken image icons  
**Debug Steps:**
1. Check if `product.images` is an array
2. Verify image URLs are valid
3. Check for CORS issues with images
4. Log image URLs

**Fix:** Add `onerror` handler with placeholder image

### Issue 9: Tooltip Positioning Off
**Symptoms:** Tooltip appears in wrong location  
**Debug Steps:**
1. Check if tooltip follows `mousemove` event
2. Verify pageX/pageY coordinates
3. Check CSS positioning (absolute)

**Fix:** Use `e.pageX` and `e.pageY` with offsets

### Issue 10: Mobile Responsiveness Issues
**Symptoms:** Layout breaks on mobile  
**Debug Steps:**
1. Test with browser DevTools mobile view
2. Check Bootstrap grid classes
3. Verify table is wrapped in `.table-responsive`

**Fix:** Add responsive wrapper and adjust breakpoints

---

## 🚀 Workflow for AI Agent

### Phase 1: Setup (5 minutes)
1. Create project folder structure
2. Set up `index.html` with Bootstrap CDN links
3. Create `app.js` with basic structure
4. Test basic HTML rendering in browser

### Phase 2: Core Development (30 minutes)

#### Step 1: Data Fetching & Display
- Implement `fetchProducts()` function
- Create `renderTable()` function
- Display data in Bootstrap table
- Add loading spinner
- **Test:** Products load and display correctly

#### Step 2: Pagination
- Implement pagination logic
- Create page buttons
- Handle page changes
- Add page info display
- **Test:** Navigate through pages

#### Step 3: Search
- Add search input event listener
- Implement filter logic
- Update table on search
- **Test:** Search filters correctly

#### Step 4: Sorting
- Add sort icons to headers
- Implement sort logic
- Toggle ascending/descending
- **Test:** Both columns sort properly

#### Step 5: Items Per Page
- Add dropdown change handler
- Recalculate pagination
- **Test:** Switch between 5/10/20 items

### Phase 3: Advanced Features (30 minutes)

#### Step 6: Tooltip
- Attach mousemove listener
- Position tooltip near cursor
- Show product description
- **Test:** Tooltip appears on hover

#### Step 7: Detail Modal
- Implement row click handler
- Fetch product by ID
- Display in modal
- **Test:** Modal opens with correct data

#### Step 8: Edit Functionality
- Create edit form
- Pre-fill with current data
- Implement PUT request
- Handle response
- **Test:** Update succeeds and refreshes

#### Step 9: Create Functionality
- Create create form
- Implement POST request
- Handle response
- **Test:** New product appears in table

#### Step 10: CSV Export
- Collect current page data
- Format as CSV
- Trigger download
- **Test:** CSV file downloads correctly

### Phase 4: Testing & Debugging (20 minutes)
1. Run through all test cases in checklist
2. Fix any bugs found
3. Test error scenarios
4. Verify responsive design
5. Cross-browser testing

### Phase 5: Polish & Optimization (15 minutes)
1. Add smooth transitions
2. Improve loading states
3. Enhance error messages
4. Code cleanup and comments
5. Final visual adjustments

---

## 📦 Deliverables

### Required Files:
1. **index.html** - Complete HTML structure with Bootstrap
2. **app.js** - All JavaScript functionality
3. **README.md** - This documentation file

### GitHub Repository:
- Create new repository: `product-dashboard`
- Commit files with meaningful messages
- Include .gitignore for common files
- Add live demo link (GitHub Pages or similar)

### Example Commits:
```
git init
git add .
git commit -m "Initial commit: Project structure"
git commit -m "feat: Add product fetching and table display"
git commit -m "feat: Implement pagination"
git commit -m "feat: Add search functionality"
git commit -m "feat: Implement sorting"
git commit -m "feat: Add detail and edit modals"
git commit -m "feat: Implement create product"
git commit -m "feat: Add CSV export"
git commit -m "fix: Improve error handling"
git commit -m "style: Enhance UI/UX"
git commit -m "docs: Complete README"
```

---

## 🎨 Design Guidelines

### Color Scheme:
- Primary: Purple gradient (#667eea → #764ba2)
- Background: Light gray (#f8f9fa)
- Text: Dark gray (#212529)
- Accent: Bootstrap blue (#0d6efd)
- Success: Bootstrap green (#198754)
- Danger: Bootstrap red (#dc3545)

### Typography:
- Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Headers: Bold, 1.5-2rem
- Body: Regular, 1rem
- Small text: 0.85rem

### Spacing:
- Container padding: 2rem
- Card padding: 1.5rem
- Element margins: 1rem
- Section gaps: 2rem

### Animations:
- Hover transitions: 0.3s ease
- Sort icon rotation: 0.2s
- Modal fade: 0.15s
- Tooltip delay: none

---

## ✅ Acceptance Criteria

### Functionality (70%)
- All CRUD operations work correctly
- Search filters in real-time
- Pagination calculates correctly
- Sorting works for both columns
- CSV export generates valid file
- All modals open/close properly
- API errors handled gracefully

### Code Quality (20%)
- Clean, readable code
- Proper function naming
- Comments for complex logic
- No console errors
- Follows best practices
- DRY principle applied

### UI/UX (10%)
- Responsive on all devices
- Smooth animations
- Clear user feedback
- Intuitive navigation
- Professional appearance
- Accessibility considerations

---

## 🎯 Success Metrics

- ✅ All 20+ test cases pass
- ✅ No JavaScript errors in console
- ✅ Works on Chrome, Firefox, Safari, Edge
- ✅ Mobile responsive (320px+)
- ✅ Page load time < 2 seconds
- ✅ API calls complete in < 1 second
- ✅ Code is well-documented
- ✅ GitHub repository is properly structured

---

## 🔗 Resources

- **API Documentation:** https://fakeapi.platzi.com/en/rest/products/
- **Bootstrap Docs:** https://getbootstrap.com/docs/5.3/
- **Font Awesome:** https://fontawesome.com/icons
- **MDN JavaScript:** https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## 💡 Tips for AI Agent

1. **Start Simple:** Build core features first, then add enhancements
2. **Test Often:** Test each feature immediately after implementation
3. **Handle Errors:** Add try-catch blocks and user-friendly messages
4. **Log Everything:** Use console.log during development, remove in production
5. **Read API Docs:** Understand request/response formats before coding
6. **Use DevTools:** Inspect network requests and debug JavaScript
7. **Responsive First:** Test on mobile view throughout development
8. **Commit Regularly:** Save progress with meaningful commit messages
9. **Optimize Last:** Get it working first, then optimize performance
10. **Ask Questions:** If requirements unclear, ask for clarification

---

## 🏁 Final Checklist

Before submitting, verify:
- [ ] All features implemented and tested
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Error handling in place
- [ ] Code is clean and commented
- [ ] Files committed to GitHub
- [ ] README.md is complete
- [ ] Live demo works (if applicable)
- [ ] All test cases pass
- [ ] Cross-browser tested

---

**Good luck building an amazing Product Dashboard! 🚀**

---

## 📞 Support

If you encounter issues:
1. Check the Debug Guide section
2. Review test cases
3. Verify API is operational
4. Check browser console for errors
5. Review commit history for breaking changes

---

**Project Created:** February 2026  
**Last Updated:** February 2026  
**Version:** 1.0.0
