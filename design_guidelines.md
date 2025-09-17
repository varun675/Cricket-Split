# Cricket Team Expense Sharing App - Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from modern financial and sports management apps like Splitwise, TeamSnap, and Notion for clean, functional interfaces that prioritize usability and clear information hierarchy.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 34 85% 47% (Cricket Green)
- Dark Mode: 34 60% 35%
- Background Light: 0 0% 98%
- Background Dark: 220 13% 9%

**Supporting Colors:**
- Success: 142 76% 36% (for paid amounts)
- Warning: 45 93% 47% (for pending payments)
- Neutral: 220 9% 46% (for unpaid players)

### B. Typography
- **Primary Font:** Inter via Google Fonts
- **Headers:** 600-700 weight, sizes from text-lg to text-3xl
- **Body Text:** 400-500 weight, text-sm to text-base
- **Numbers/Currency:** 600 weight for emphasis

### C. Layout System
**Tailwind Spacing Units:** Consistently use 2, 4, 6, and 8 units
- Small spacing: p-2, m-2, gap-2
- Medium spacing: p-4, m-4, gap-4
- Large spacing: p-6, m-6, gap-6
- Extra large: p-8, m-8, gap-8

### D. Component Library

**Navigation:**
- Clean header with app title "Team Split" and minimal navigation
- Breadcrumb navigation for match history

**Forms:**
- Rounded input fields with subtle borders
- Clear labels and helper text
- Currency input with rupee symbol prefix
- Player count controls with +/- buttons

**Data Display:**
- Card-based layout for player sections
- Color-coded payment amounts
- Progress indicators for fee distribution
- Summary cards showing totals

**Player Management:**
- Drag-and-drop reordering capabilities
- Badge indicators for player types
- Quick action buttons for adding/removing players

**Core Sections:**
1. **Match Setup** - Compact form at top with match name and total fees
2. **Core Players** - Expandable section with player management
3. **Self-Paid Players** - Simple list with payment indicators
4. **Unpaid Players** - Clearly marked section with zero amounts
5. **Fee Breakdown** - Summary card showing distribution logic

### E. Animations
Minimal and purposeful:
- Subtle fade-ins for new players added
- Smooth transitions for expanding sections
- Number counter animation for fee calculations

## Visual Treatment
- **Clean, utility-focused design** emphasizing clarity over decoration
- **High contrast** between different player types using color coding
- **Generous whitespace** to prevent information overload
- **Mobile-first responsive** design for on-field usage
- **Consistent shadows** using shadow-sm and shadow-md for depth

## Key Interactions
- Real-time fee calculation as players are added/removed
- Instant visual feedback when adjusting core player count
- Clear visual distinction between paying and non-paying players
- One-click match creation and fee distribution

This design prioritizes functionality and clarity, ensuring team managers can quickly set up matches and understand fee distributions at a glance.