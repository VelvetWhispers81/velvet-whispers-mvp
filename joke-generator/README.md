# Random Joke Generator

A fun and interactive random joke generator that fetches jokes from an external API with filtering options and favorites management.

## Features

✨ **Core Features:**
- 🎲 Fetch random jokes from JokeAPI
- 📂 Filter by joke type (Single or Two-Part)
- 🏷️ Filter by category (General, Programming, Knock-Knock, etc.)
- ⭐ Save favorite jokes with local storage
- 📋 Copy jokes to clipboard
- 📊 Track jokes fetched counter
- 🎨 Beautiful responsive UI
- 🚀 No API key required

## How to Use

1. **Open the Application**
   - Open `index.html` in your web browser

2. **Get a Joke**
   - Click "Get Joke" button to fetch a random joke
   - Select a category (All, General, Programming, Knock-Knock)
   - Choose joke type (Any, Single, Two Part)
   - Click "Get Joke" again to fetch with your preferences

3. **Copy & Share**
   - Click "Copy Joke" to copy the joke to your clipboard
   - Share with your friends!

4. **Save Favorites**
   - Click "Add to Favorites" to save jokes you like
   - View all saved jokes in the "Favorite Jokes" section
   - Copy or remove favorites anytime
   - Favorites are saved locally in your browser

5. **Clear Favorites**
   - Click "Clear Favorites" to remove all saved jokes

## Categories Available

- **Any** - Mix of all jokes
- **General** - General humor
- **Programming** - Programming related jokes
- **Knock-Knock** - Knock-knock jokes

## Joke Types

- **Single** - One-liner jokes
- **Two Part** - Setup and delivery jokes
- **Any** - Mix of both types

## File Structure

```
joke-generator/
├── index.html      # HTML structure
├── styles.css      # Styling and animations
├── app.js          # JavaScript functionality
└── README.md       # Documentation
```

## API Information

**API Used**: [JokeAPI](https://jokeapi.dev/)
- **Endpoint**: `https://v2.jokeapi.dev/joke/`
- **No authentication required**
- **Free to use**
- **Rate limit**: Generous for personal use

### API Endpoints

```
# Get any joke
https://v2.jokeapi.dev/joke/Any

# Get joke by category
https://v2.jokeapi.dev/joke/General
https://v2.jokeapi.dev/joke/Programming
https://v2.jokeapi.dev/joke/Knock-Knock

# Filter by type
https://v2.jokeapi.dev/joke/Any?type=single
https://v2.jokeapi.dev/joke/Any?type=twopart
```

## Local Storage

Favorite jokes are automatically saved to your browser's local storage:
- Data persists between sessions
- Each favorite includes the joke and saved timestamp
- Clear favorites to remove all saved jokes

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with:
  - Fetch API support
  - localStorage support
  - ES6 JavaScript support

## Technical Details

### Data Structure
```javascript
{
  id: 1234567890,          // Unique timestamp-based ID
  joke: "Setup...\nDelivery...",  // Joke text
  type: "twopart" | "single",     // Joke type
  category: "General",     // Joke category
  savedAt: "5/28/2026"    // Saved timestamp
}
```

### Security Features

- HTML escaping to prevent XSS attacks
- Safe API error handling
- Input validation
- CORS-enabled API requests

## Customization

### Change Colors
Edit the gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Categories
Modify the category buttons in `index.html` and update the API calls in `app.js`.

### Add More Features
Consider adding:
- Search functionality
- Rate jokes (like/dislike)
- Share to social media
- Dark mode
- Different joke APIs
- Joke translations
- Random category switcher

## Troubleshooting

### Jokes won't load
- Check your internet connection
- Verify JokeAPI is accessible
- Check browser console for errors

### Favorites not saving
- Check if localStorage is enabled in your browser
- Clear browser cache and try again

### API rate limit
- Wait a moment before fetching another joke
- JokeAPI is generally very generous with rate limits

## License

This project is open source and available for personal and educational use.

JokeAPI is also free to use - see [JokeAPI License](https://jokeapi.dev/)
