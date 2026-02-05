# 🤖 AI AGENT PROMPT - Product Dashboard Project

## YOUR MISSION
You are an expert full-stack developer. Build a complete Product Dashboard application using HTML, CSS (Bootstrap), and Vanilla JavaScript that interacts with the Platzi Fake Store API.

---

## 📋 QUICK REFERENCE

**API Base URL:** `https://api.escuelajs.co/api/v1/products`  
**Tech Stack:** HTML5 + Bootstrap 5.3 + Vanilla JS + Font Awesome 6  
**Deliverables:** `index.html`, `app.js`, working application

---

## 🎯 CORE REQUIREMENTS

### Must-Have Features (Priority Order):

1. **Product Table Display**
   - Columns: ID, Title, Price, Category, Images
   - Bootstrap table-hover styling
   - Fetch from API on page load
   - Loading spinner during fetch

2. **Search Functionality**
   - Real-time filter by product title
   - Case-insensitive search
   - Updates table instantly

3. **Pagination**
   - Items per page: 5, 10, 20 (dropdown)
   - Previous/Next buttons
   - Page numbers with active state
   - Show "Displaying X-Y of Z" info

4. **Sorting**
   - Sort by Title (ascending/descending)
   - Sort by Price (ascending/descending)
   - Visual indicators (up/down arrows)
   - Toggle on header click

5. **Description Tooltip**
   - Show on row hover
   - Follow cursor position
   - Hide when not hovering

6. **Detail Modal**
   - Opens on row click
   - Shows full product info
   - Displays all images
   - Has "Edit" button

7. **Edit Modal**
   - Form with: Title, Price, Description, Category ID, Images
   - Pre-filled with current data
   - PUT API call on save
   - Refreshes table after update

8. **Create Modal**
   - Form with: Title, Price, Description, Category ID, Images
   - POST API call on create
   - Refreshes table after creation

9. **CSV Export**
   - Exports current page data only
   - Filename: `products_page_N_timestamp.csv`
   - Handles special characters (quotes, commas)

---

## 🏗️ IMPLEMENTATION GUIDE

### Step 1: Setup HTML Structure
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <!-- Bootstrap 5.3 CDN -->
    <!-- Font Awesome 6 CDN -->
    <!-- Custom CSS in <style> -->
</head>
<body>
    <!-- Header with gradient -->
    <!-- Search + Controls card -->
    <!-- Product table -->
    <!-- Pagination -->
    <!-- 3 Modals: Detail, Edit, Create -->
    <!-- Tooltip element -->
    <!-- Bootstrap JS + app.js -->
</body>
</html>
```

### Step 2: Core JavaScript Functions
```javascript
// Global state
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let itemsPerPage = 10;

// Main functions to implement:
1. fetchProducts() - GET all products
2. renderTable() - Display current page
3. handleSearch() - Filter by title
4. handleSort() - Sort by field
5. updatePagination() - Generate page buttons
6. openDetailModal() - Show product details
7. openEditModal() - Edit form
8. handleUpdate() - PUT request
9. handleCreate() - POST request
10. exportToCSV() - Download CSV
```

### Step 3: API Integration

**GET All Products:**
```javascript
const response = await fetch('https://api.escuelajs.co/api/v1/products');
const products = await response.json();
```

**GET Single Product:**
```javascript
const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
const product = await response.json();
```

**POST Create:**
```javascript
const response = await fetch('https://api.escuelajs.co/api/v1/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: "Product Name",
        price: 100,
        description: "Description",
        categoryId: 1,
        images: ["https://example.com/image.jpg"]
    })
});
```

**PUT Update:**
```javascript
const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, price, description, categoryId, images })
});
```

---

## ✅ TESTING WORKFLOW

After implementing each feature, test:

1. **Data Loading**
   - Open browser console
   - Check for errors
   - Verify products display in table

2. **Search**
   - Type in search box
   - Verify table filters
   - Check case-insensitivity

3. **Pagination**
   - Change items per page
   - Click page numbers
   - Verify correct data shows

4. **Sorting**
   - Click Title header → check sort
   - Click again → check reverse sort
   - Same for Price

5. **Tooltip**
   - Hover over row
   - Verify description appears
   - Move mouse → tooltip follows

6. **Detail Modal**
   - Click any row
   - Verify modal opens
   - Check all data displays

7. **Edit**
   - Click Edit in detail modal
   - Modify form
   - Save → verify API call
   - Check table updates

8. **Create**
   - Click Create button
   - Fill form
   - Save → verify API call
   - Check new product appears

9. **Export**
   - Click Export CSV
   - Verify file downloads
   - Open CSV → check format

---

## 🐛 DEBUGGING CHECKLIST

If something doesn't work:

**Products not loading?**
- Check console for errors
- Verify API URL is correct
- Check network tab for 200 response

**Search not filtering?**
- Log search term to console
- Check if event listener attached
- Verify filteredProducts updates

**Pagination broken?**
- Log currentPage value
- Check slice calculations
- Verify page buttons generate

**Sort not working?**
- Log sort field and order
- Check if filteredProducts is sorted
- Verify icons update

**Modal not opening?**
- Check Bootstrap JS loaded
- Verify modal ID matches
- Log product ID on click

**API calls failing?**
- Check request headers
- Log request body
- Verify JSON format
- Test in Postman first

---

## 🎨 STYLING REQUIREMENTS

### Colors:
- Header gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Background: `#f8f9fa`
- Hover: `#f0f0f0`

### Layout:
- Container: Bootstrap `.container`
- Cards: `.card` with shadow
- Table: `.table .table-hover`
- Buttons: `.btn .btn-primary` etc.

### Responsive:
- Works on mobile (320px+)
- Table scrolls horizontally if needed
- Modals are mobile-friendly

---

## 🚀 EXECUTION PLAN

**Phase 1: Core (30 min)**
1. Set up HTML with Bootstrap
2. Fetch and display products
3. Implement pagination
4. Add search functionality
5. TEST: Basic features work

**Phase 2: Enhanced (30 min)**
6. Add sorting
7. Implement tooltip
8. Create detail modal
9. Add edit functionality
10. TEST: All read/update works

**Phase 3: Final (30 min)**
11. Implement create functionality
12. Add CSV export
13. Error handling
14. UI polish
15. TEST: All features complete

**Phase 4: Quality (15 min)**
16. Cross-browser test
17. Mobile test
18. Fix any bugs
19. Code cleanup
20. Final verification

---

## ⚠️ COMMON PITFALLS TO AVOID

1. ❌ Don't use jQuery or other libraries
2. ❌ Don't forget error handling
3. ❌ Don't skip loading states
4. ❌ Don't ignore mobile responsive
5. ❌ Don't forget to refresh table after API calls
6. ❌ Don't use console.log in final code (remove after debug)
7. ❌ Don't forget to reset page to 1 after search
8. ❌ Don't export all products (only current page)
9. ❌ Don't forget fallback for broken images
10. ❌ Don't ignore validation in forms

---

## 📊 SUCCESS CRITERIA

Your implementation is complete when:

✅ All products load and display  
✅ Search filters in real-time  
✅ Pagination works (5/10/20 items)  
✅ Sorting works on Title and Price  
✅ Tooltip shows description on hover  
✅ Detail modal opens on row click  
✅ Edit updates product via API  
✅ Create adds new product via API  
✅ CSV export downloads correctly  
✅ No console errors  
✅ Works on mobile devices  
✅ All API calls have error handling  

---

## 💻 CODE QUALITY STANDARDS

### JavaScript:
- Use `async/await` (not promises)
- Use `const` and `let` (not `var`)
- Use arrow functions where appropriate
- Add comments for complex logic
- Handle errors with try-catch
- Validate user inputs

### HTML:
- Semantic elements
- Proper Bootstrap classes
- Accessibility attributes
- Clean indentation

### CSS:
- Mobile-first approach
- Use CSS variables for colors
- Smooth transitions
- No !important unless necessary

---

## 🎯 YOUR TASK

1. **Read** this entire prompt carefully
2. **Implement** all features following the guide
3. **Test** each feature as you build
4. **Debug** any issues using the checklist
5. **Verify** all success criteria are met
6. **Deliver** clean, working code

---

## 📝 FINAL DELIVERABLES

Submit to GitHub:
```
product-dashboard/
├── index.html      (Complete HTML with Bootstrap)
├── app.js          (All JavaScript functionality)
├── README.md       (Documentation)
└── .gitignore      (Standard ignores)
```

Repository setup:
```bash
git init
git add .
git commit -m "Initial commit: Complete Product Dashboard"
git remote add origin [your-repo-url]
git push -u origin main
```

---

## 🏆 BONUS POINTS (If Time Permits)

- Add delete functionality (DELETE API)
- Implement category filter dropdown
- Add price range filter
- Create image carousel in detail modal
- Add animation transitions
- Implement local storage for preferences
- Add dark mode toggle
- Create print-friendly view

---

## 🆘 NEED HELP?

1. **Check README.md** - Detailed debugging guide
2. **Test API** - Use Postman or browser
3. **Check Console** - Look for JavaScript errors
4. **Check Network** - Verify API responses
5. **Review Code** - Compare with requirements

---

**NOW BUILD AN AMAZING DASHBOARD! 🚀**

Remember: Test early, test often, commit frequently!
