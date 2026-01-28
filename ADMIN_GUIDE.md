# 🎮 NexPlayy Admin Panel - Complete Guide

## 🔐 Accessing the Admin Panel

### Step 1: Open Admin Panel
Navigate to: **`/admin.html`** or click the ⚙️ icon in the top-right corner of the website.

### Step 2: Login
- **Default Password**: `admin123`
- Enter the password and click "Login"

---

## 📋 Admin Dashboard Features

### 1. **Hero Section** 🎯
Control the main banner and headline on your homepage
- **Main Title**: Edit the big headline (supports HTML)
- **Subtitle**: Edit the description text below the title
- Changes appear immediately on the website

### 2. **Website Banners** 🖼️
Add promotional banners that display between the hero and featured sections
- Click **"+ Add Banner"**
- Fill in:
  - **Banner Title**: Main heading (e.g., "Summer Sale")
  - **Banner Description**: Details about the promotion
  - **Banner Link** (optional): URL when users click the banner
- Click "Save Banner"
- **To Remove**: Click "Delete" on any banner

### 3. **Price Ranges** 💰
Manage the price tiers for filtering games
- Example: Add 149, 199, 249, 299, etc.
- Add a new range:
  1. Enter value in the input field (e.g., "249")
  2. Click "Add Range"
- **To Remove**: Click the "✕" button on any range tag
- These appear as filter buttons on the games page

### 4. **Featured Carousel** 🔥
Create a rotating banner of your best games
- Click **"+ Add Featured"**
- Select a game from the dropdown
- Add an optional note (e.g., "New Release", "Best Seller")
- Click "Add to Featured"
- Games display in a rotating carousel on the featured section
- **Note**: Carousel auto-rotates every 5 seconds (configurable in Site Settings)

### 5. **Game Bundles** 🎁
Create curated game packages (e.g., "Horror Games Bundle")
- Click **"+ Add Bundle"**
- Enter:
  - **Bundle Name**: e.g., "Action Games Pack"
  - **Bundle Description**: What's included and why it's great
  - **Select Games**: Check boxes for games to include
- Click "Create Bundle"
- Bundles appear in the "Game Bundles" section on the main page

### 6. **Game Inventory** 🎮
Add, edit, or remove games from your catalog
- Click **"+ Add Game"**
- Fill in all required fields:
  - **Game Name**: Full title
  - **Price (₹)**: Current selling price
  - **Original Price (₹)**: Original/discounted price (optional)
  - **Price Range**: Select which range tier this game belongs to
  - **Platform**: e.g., "PC / PS5 / Xbox"
  - **Image URL**: Direct link to game cover image
  - **Badge** (optional): "NEW", "HOT", "POPULAR", "BEST SELLER", etc.
  - **Description**: Game details (optional)
- Click "Save Game"
- **To Remove**: Click "Delete" on any game

### 7. **Site Settings** ⚙️
Configure overall site behavior
- **Carousel Autoplay**: Enable/disable featured carousel rotation
- **Autoplay Interval (ms)**: Speed of carousel rotation (default: 5000ms = 5 seconds)

---

## 💾 How Data is Saved

All data is saved to your **browser's localStorage**:
- Changes are instant and reflect immediately on the website
- Data persists across browser sessions
- **⚠️ Clearing browser cache/cookies will delete all data!**
- For production, consider backing up localStorage

### Backup Your Data:
Open browser DevTools (F12) → Application → Local Storage → nexplayy_*
- Copy all `nexplayy_` entries to a text file

---

## 🎨 Image URL Requirements

- Use direct image URLs (must end with `.jpg`, `.png`, etc.)
- **Best Sources**:
  - Wikipedia: `https://upload.wikimedia.org/wikipedia/en/...`
  - Steam CDN: `https://shared.fastly.steamstatic.com/...`
  - Official game websites
- **Avoid**: Social media links (often don't load)
- Test URLs before saving to ensure they load properly

---

## 📱 Real-Time Updates

When you make changes in the admin panel:
- Changes sync across all browser tabs instantly
- Website updates immediately without refresh
- Other admin users see changes in real-time

---

## 🚀 Example Workflow

### Setting Up Your First Promotion:

1. **Add Price Ranges**:
   - Add: 99, 199, 299, 399, 499

2. **Add Games**:
   - Add 5-10 games in the 199 range
   - Add 5-10 games in the 299 range

3. **Create Featured Games**:
   - Add your 3 best sellers to featured carousel

4. **Create Bundles**:
   - Create "Bestsellers Bundle" with your top 5 games
   - Create "New Releases Bundle" with latest games

5. **Add Banner**:
   - Title: "🔥 Summer Sale - 50% Off!"
   - Description: "Grab your favorite games at unbeatable prices"
   - Link: (optional)

6. **Customize Hero**:
   - Update main title to match promotion
   - Update subtitle with call-to-action

---

## ❓ Troubleshooting

**Problem**: Changes don't appear on website
- **Solution**: Refresh the website (F5)
- Check if you're on the main site, not admin panel

**Problem**: Images not showing
- **Solution**: Verify the image URL is accessible in a new tab
- Use PNG/JPG/WEBP formats only

**Problem**: Lost all data
- **Solution**: 
  - Check if you cleared browser cache
  - Use browser restore function if available
  - Contact support to recover from backups

**Problem**: Can't login to admin
- **Solution**: Default password is `admin123`
- Check caps lock is off
- Clear browser cookies and try again

---

## 🔒 Security

- Admin panel uses simple localStorage authentication
- **For production**, implement proper authentication:
  - Use proper backend authentication
  - Add HTTPS
  - Implement user accounts
  - Never store credentials in code

**Current**: Demo mode with hardcoded password (safe for development)

---

## 📞 Quick Reference

| Feature | Default | Notes |
|---------|---------|-------|
| Admin Password | admin123 | Change in admin.html (line ~200) |
| Carousel Speed | 5000ms | Editable in Site Settings |
| Max Games | Unlimited | No limit imposed |
| Image Format | JPG, PNG, WEBP | No HEIC or SVG |
| Banners | Unlimited | Add as many as needed |
| Price Ranges | Unlimited | Create custom tiers |

---

## 📝 Notes

- All changes are saved locally in your browser
- To share data between devices, use localStorage export/import
- The website works offline once cached
- For production deployment, use a proper database (Firebase, MongoDB, etc.)

---

**Happy Game Store Managing! 🎮✨**
