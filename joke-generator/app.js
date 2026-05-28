// Random Joke Generator with External API
class JokeGenerator {
    constructor() {
        this.currentJoke = null;
        this.jokeCount = 0;
        this.favorites = [];
        this.selectedCategory = 'any';
        this.selectedType = 'any';
        this.jokeAPI = 'https://v2.jokeapi.dev/joke';
        this.init();
    }

    init() {
        this.loadFavorites();
        this.setupEventListeners();
        this.renderFavorites();
    }

    setupEventListeners() {
        // Get joke button
        document.getElementById('getJokeBtn').addEventListener('click', () => this.fetchJoke());
        
        // Copy button
        document.getElementById('copyBtn').addEventListener('click', () => this.copyJoke());
        
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedCategory = e.target.dataset.category;
            });
        });

        // Joke type select
        document.getElementById('jokeType').addEventListener('change', (e) => {
            this.selectedType = e.target.value;
        });

        // Clear favorites button
        document.getElementById('clearFavoritesBtn').addEventListener('click', () => this.clearFavorites());
    }

    async fetchJoke() {
        const btn = document.getElementById('getJokeBtn');
        const container = document.getElementById('jokeContainer');
        
        btn.disabled = true;
        container.innerHTML = '<p class="loading">Loading a funny joke... 😄</p>';

        try {
            // Build API URL
            let url = this.jokeAPI;
            
            if (this.selectedCategory !== 'any') {
                url += `/${this.selectedCategory}`;
            } else {
                url += '/Any';
            }
            
            // Add parameters
            const params = new URLSearchParams();
            if (this.selectedType !== 'any') {
                params.append('type', this.selectedType);
            }
            params.append('format', 'json');
            
            const response = await fetch(`${url}?${params}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }

            const data = await response.json();
            
            if (data.error) {
                container.innerHTML = '<p class="error">No jokes found for this category. Try another! 😅</p>';
                return;
            }

            this.currentJoke = data;
            this.jokeCount++;
            this.updateStats();
            this.displayJoke(data);
            document.getElementById('copyBtn').disabled = false;

        } catch (error) {
            console.error('Error fetching joke:', error);
            container.innerHTML = `<p class="error">Oops! Something went wrong. Please try again. 😕</p>`;
        } finally {
            btn.disabled = false;
        }
    }

    displayJoke(joke) {
        const container = document.getElementById('jokeContainer');
        container.innerHTML = '';

        if (joke.type === 'single') {
            container.innerHTML = `<p>${this.escapeHtml(joke.joke)}</p>`;
        } else if (joke.type === 'twopart') {
            container.innerHTML = `
                <p class="joke-setup">${this.escapeHtml(joke.setup)}</p>
                <p class="joke-delivery">${this.escapeHtml(joke.delivery)}</p>
            `;
        }
    }

    copyJoke() {
        if (!this.currentJoke) return;

        let jokeText = '';
        if (this.currentJoke.type === 'single') {
            jokeText = this.currentJoke.joke;
        } else if (this.currentJoke.type === 'twopart') {
            jokeText = `${this.currentJoke.setup}\n${this.currentJoke.delivery}`;
        }

        navigator.clipboard.writeText(jokeText).then(() => {
            this.showToast('Joke copied to clipboard! 📋');
        }).catch(() => {
            this.showToast('Failed to copy joke', 'error');
        });
    }

    addToFavorites() {
        if (!this.currentJoke) return;

        const jokeObj = {
            id: Date.now(),
            joke: this.currentJoke,
            savedAt: new Date().toLocaleString()
        };

        // Check if already in favorites
        const isDuplicate = this.favorites.some(fav => 
            JSON.stringify(fav.joke) === JSON.stringify(this.currentJoke)
        );

        if (isDuplicate) {
            this.showToast('Already in favorites! ⭐', 'info');
            return;
        }

        this.favorites.unshift(jokeObj);
        this.saveFavorites();
        this.renderFavorites();
        this.showToast('Added to favorites! ⭐');
    }

    removeFromFavorites(id) {
        this.favorites = this.favorites.filter(fav => fav.id !== id);
        this.saveFavorites();
        this.renderFavorites();
        this.showToast('Removed from favorites');
    }

    clearFavorites() {
        if (this.favorites.length === 0) {
            this.showToast('No favorites to clear', 'info');
            return;
        }

        if (confirm('Are you sure you want to clear all favorites?')) {
            this.favorites = [];
            this.saveFavorites();
            this.renderFavorites();
            this.showToast('Favorites cleared');
        }
    }

    renderFavorites() {
        const list = document.getElementById('favoritesList');
        const clearBtn = document.getElementById('clearFavoritesBtn');
        
        if (this.favorites.length === 0) {
            list.innerHTML = '<p class="empty-favorites">No favorite jokes yet!</p>';
            clearBtn.style.display = 'none';
            return;
        }

        clearBtn.style.display = 'block';
        list.innerHTML = this.favorites.map(fav => {
            const joke = fav.joke;
            let jokePreview = '';
            
            if (joke.type === 'single') {
                jokePreview = joke.joke.substring(0, 50) + (joke.joke.length > 50 ? '...' : '');
            } else {
                jokePreview = joke.setup.substring(0, 50) + '...';
            }

            return `
                <div class="favorite-item">
                    <span class="favorite-text" title="${this.getFullJoke(joke)}">${this.escapeHtml(jokePreview)}</span>
                    <div class="favorite-actions">
                        <button class="favorite-btn favorite-copy" onclick="app.copyFavorite(${fav.id})">Copy</button>
                        <button class="favorite-btn favorite-remove" onclick="app.removeFromFavorites(${fav.id})">Remove</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    getFullJoke(joke) {
        if (joke.type === 'single') {
            return joke.joke;
        } else {
            return `${joke.setup}\n${joke.delivery}`;
        }
    }

    copyFavorite(id) {
        const favorite = this.favorites.find(fav => fav.id === id);
        if (!favorite) return;

        const jokeText = this.getFullJoke(favorite.joke);
        navigator.clipboard.writeText(jokeText).then(() => {
            this.showToast('Joke copied to clipboard! 📋');
        });
    }

    saveFavorites() {
        localStorage.setItem('jokesFavorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const stored = localStorage.getItem('jokesFavorites');
        if (stored) {
            try {
                this.favorites = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading favorites:', e);
                this.favorites = [];
            }
        }
    }

    updateStats() {
        document.getElementById('jokeCount').textContent = this.jokeCount;
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        if (type === 'error') {
            toast.style.background = '#f44336';
        } else if (type === 'info') {
            toast.style.background = '#2196F3';
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new JokeGenerator();
});
