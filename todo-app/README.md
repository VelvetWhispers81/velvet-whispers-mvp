# To-Do List Application

A fully functional to-do list web application with local storage persistence, built with vanilla HTML, CSS, and JavaScript.

## Features

✨ **Core Features:**
- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as completed/uncompleted
- ✅ Filter tasks (All, Active, Completed)
- ✅ Local storage persistence (data saved between sessions)
- ✅ Task statistics (total, active, completed)
- ✅ Clear completed tasks
- ✅ Clear all tasks with confirmation

🎨 **User Experience:**
- Modern, responsive design
- Beautiful gradient background
- Smooth animations and transitions
- Mobile-friendly interface
- Input validation and confirmation dialogs
- XSS protection with HTML escaping

## How to Use

1. **Open the Application**
   - Open `index.html` in your web browser

2. **Add a Task**
   - Type in the input field
   - Click "Add Task" or press Enter
   - Maximum 100 characters per task

3. **Manage Tasks**
   - **Check checkbox** to mark as completed
   - **Click Edit** to modify a task
   - **Click Delete** to remove a task

4. **Filter Tasks**
   - Click **All** to see all tasks
   - Click **Active** to see incomplete tasks
   - Click **Completed** to see finished tasks

5. **Clear Tasks**
   - **Clear Completed** removes all finished tasks
   - **Clear All** removes everything (requires confirmation)

## Local Storage

All tasks are automatically saved to your browser's local storage. Your tasks will persist even after:
- Closing the browser
- Closing the tab
- Refreshing the page
- Restarting your computer

To clear data, use the "Clear All" button or clear your browser's local storage.

## File Structure

```
todo-app/
├── index.html      # HTML structure
├── styles.css      # Styling and animations
├── app.js          # JavaScript functionality
└── README.md       # Documentation
```

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with localStorage support

## Technical Details

### Local Storage Implementation
```javascript
// Save data
localStorage.setItem('todos', JSON.stringify(this.todos));

// Load data
const stored = localStorage.getItem('todos');
this.todos = JSON.parse(stored);
```

### Data Structure
Each todo object contains:
```javascript
{
    id: 1234567890,           // Unique timestamp-based ID
    text: "Task description", // Task text
    completed: false,         // Completion status
    createdAt: "5/28/2026"   // Creation date
}
```

## Security Features

- HTML escaping to prevent XSS attacks
- Input validation and length limits
- Confirmation dialogs for destructive actions
- Safe JSON parsing with error handling

## Customization

### Change Colors
Edit the gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Storage Key
Modify in `app.js`:
```javascript
localStorage.setItem('todos', ...); // Change key name if needed
```

### Add More Features
Consider adding:
- Task priority levels
- Due dates
- Categories/tags
- Task notes
- Search functionality
- Dark mode

## License

This project is open source and available for personal and educational use.
