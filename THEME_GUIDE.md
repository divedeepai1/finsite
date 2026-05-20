# Professional Fintech SaaS Theme Guide
## Bloomberg/Stripe-Style Enterprise Dashboard

This guide provides the complete color system, component patterns, and usage guidelines for implementing the institutional-grade dark theme across all modules.

---

## 🎨 Color System

### Deep Navy Dark Theme (NOT gray-based)

```css
/* Primary Backgrounds */
--bg-main: #0B1220        /* Main background - deep navy */
--bg-section: #111827     /* Section background */
--bg-card: #162033        /* Card background */
--bg-hover: #1C2A40       /* Hover surface */
```

**Usage:**
- `bg-[#0B1220]` - Main page backgrounds
- `bg-[#111827]` - Section containers, sidebar
- `bg-[#162033]` - Cards, panels, modals
- `bg-[#1C2A40]` - Hover states on cards

### Accent Colors (Professional Fintech)

```css
/* Primary Actions & Data */
--primary-blue: #3B82F6   /* Primary CTA, links, active states */
--hover-blue: #60A5FA     /* Hover state for blue elements */
--positive-green: #22C55E /* Positive values, gains, success */
--negative-red: #EF4444   /* Negative values, losses, errors */
--warning-amber: #F59E0B  /* Warnings, alerts, attention */
--neutral-slate: #94A3B8  /* Neutral data, inactive states */
```

**Usage:**
- `text-[#3B82F6]` - Primary buttons, links, icons
- `text-[#22C55E]` - Positive percentages, growth indicators
- `text-[#EF4444]` - Negative percentages, decline indicators
- `text-[#F59E0B]` - Warning badges, alerts

### Typography (Institutional Grade)

```css
/* Text Colors */
--text-primary: #E5E7EB   /* Primary readable text */
--text-secondary: #9CA3AF /* Secondary information */
--text-muted: #6B7280     /* Labels, captions, hints */
--text-bright: #F9FAFB    /* Emphasis, headings */
```

**Usage:**
- `text-[#E5E7EB]` - Body text, descriptions
- `text-[#9CA3AF]` - Subtitles, metadata
- `text-[#6B7280]` - Form labels, small captions
- `text-[#F9FAFB]` - Headlines, emphasis text

### Borders (Subtle Definition)

```css
/* Border Colors */
--border-primary: #1F2937  /* Default borders (1px solid) */
--border-hover: #374151    /* Hover state borders */
--border-accent: #3B82F6   /* Active/focus borders */
```

**Usage:**
- `border border-[#1F2937]` - Card borders, dividers
- `hover:border-[#374151]` - Interactive element borders
- `focus:border-[#3B82F6]` - Input focus states

---

## 🃏 Card Components

### Standard Card Pattern

```tsx
<div className="bg-[#162033] border border-[#1F2937] rounded-xl p-6 
                hover:border-[#374151] transition-all duration-200">
  {/* Card content */}
</div>
```

### Card with Gradient Background

```tsx
<div className="rounded-xl p-6 border border-[#1F2937]
                hover:border-[#374151] transition-all duration-200"
     style={{ background: 'linear-gradient(145deg, #111827, #0F172A)' }}>
  {/* Card content */}
</div>
```

### Card with Hover Glow Effect

```tsx
<div className="bg-[#162033] border border-[#1F2937] rounded-xl p-6 
                transition-all duration-200
                hover:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1),0_0_24px_rgba(59,130,246,0.15)]
                hover:border-[#3B82F6]/30">
  {/* Card content */}
</div>
```

### Financial Data Card

```tsx
<div className="bg-[#162033] border border-[#1F2937] rounded-xl p-5">
  <div className="flex items-center justify-between mb-3">
    <span className="text-xs text-[#6B7280] uppercase tracking-wide">Portfolio Value</span>
    <TrendingUpIcon className="w-4 h-4 text-[#22C55E]" />
  </div>
  <div className="text-3xl font-bold text-[#E5E7EB] tracking-tight mb-1">
    £2,450,000
  </div>
  <div className="flex items-center gap-1 text-sm">
    <span className="text-[#22C55E] font-semibold">+12.5%</span>
    <span className="text-[#6B7280]">vs last month</span>
  </div>
</div>
```

---

## 📊 Chart & Data Visualization

### Chart Colors

```css
/* Trend Lines */
--chart-positive: #22C55E   /* Growth, positive trends */
--chart-negative: #EF4444   /* Decline, negative trends */
--chart-neutral: #94A3B8    /* Neutral, baseline */
--chart-grid: #1F2937       /* Grid lines, axes */
--chart-tooltip-bg: #0F172A /* Tooltip backgrounds */
```

### Recharts Configuration Example

```tsx
<LineChart>
  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
  <XAxis stroke="#6B7280" />
  <YAxis stroke="#6B7280" />
  <Tooltip 
    contentStyle={{ 
      backgroundColor: '#0F172A', 
      border: '1px solid #1F2937',
      borderRadius: '8px',
      color: '#E5E7EB'
    }} 
  />
  <Line type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={2} />
</LineChart>
```

---

## 🎯 Button Components

### Primary CTA Button

```tsx
<button className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold 
                   px-6 py-2.5 rounded-lg transition-all duration-200
                   shadow-lg shadow-blue-500/20">
  Generate Report
</button>
```

### Secondary Button

```tsx
<button className="bg-[#111827] hover:bg-[#1C2A40] text-[#E5E7EB] font-semibold 
                   px-6 py-2.5 rounded-lg border border-[#1F2937] 
                   hover:border-[#374151] transition-all duration-200">
  Cancel
</button>
```

### Outline Button

```tsx
<button className="bg-transparent border border-[#3B82F6] text-[#3B82F6] 
                   hover:bg-[#3B82F6]/10 font-semibold px-6 py-2.5 rounded-lg 
                   transition-all duration-200">
  View Details
</button>
```

### Destructive Button

```tsx
<button className="bg-[#EF4444] hover:bg-red-600 text-white font-semibold 
                   px-6 py-2.5 rounded-lg transition-all duration-200">
  Delete
</button>
```

---

## 📝 Form Elements

### Input Field

```tsx
<input 
  type="text"
  className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-2.5
             text-[#E5E7EB] placeholder-[#6B7280]
             focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20
             transition-all duration-200"
  placeholder="Enter value..."
/>
```

### Select Dropdown

```tsx
<select className="w-full bg-[#111827] border border-[#1F2937] rounded-lg px-4 py-2.5
                   text-[#E5E7EB] focus:outline-none focus:border-[#3B82F6]
                   transition-all duration-200">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Search Input

```tsx
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
  <input 
    type="search"
    className="w-full bg-[#111827] border border-[#1F2937] rounded-lg pl-10 pr-4 py-2.5
               text-[#E5E7EB] placeholder-[#6B7280]
               focus:outline-none focus:border-[#3B82F6]
               transition-all duration-200"
    placeholder="Search..."
  />
</div>
```

---

## 🏷️ Status Badges

### Active Status

```tsx
<span className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] 
                border border-[#22C55E]/20 rounded-full text-xs font-semibold">
  Active
</span>
```

### Pending Status

```tsx
<span className="px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] 
                border border-[#F59E0B]/20 rounded-full text-xs font-semibold">
  Pending
</span>
```

### Error Status

```tsx
<span className="px-3 py-1 bg-[#EF4444]/10 text-[#EF4444] 
                border border-[#EF4444]/20 rounded-full text-xs font-semibold">
  Failed
</span>
```

---

## 📊 Data Tables

### Table Structure

```tsx
<div className="bg-[#162033] rounded-xl border border-[#1F2937] overflow-hidden">
  <table className="w-full">
    <thead>
      <tr className="border-b border-[#1F2937] bg-[#111827]">
        <th className="text-left p-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
          Name
        </th>
        <th className="text-left p-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
          Value
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-[#1F2937] hover:bg-[#1C2A40] transition-colors">
        <td className="p-4 text-sm text-[#E5E7EB]">Item 1</td>
        <td className="p-4 text-sm text-[#E5E7EB]">$1,000</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 🎭 Modal/Dialog

```tsx
<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-[#162033] border border-[#1F2937] rounded-xl w-full max-w-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-[#E5E7EB]">Modal Title</h2>
      <button className="text-[#9CA3AF] hover:text-[#E5E7EB]">
        <X className="w-5 h-5" />
      </button>
    </div>
    {/* Modal content */}
  </div>
</div>
```

---

## 🧭 Navigation

### Top Navigation Bar

```tsx
<nav className="bg-[#111827] border-b border-[#1F2937] px-6 py-4">
  <div className="flex items-center justify-between">
    {/* Navigation items */}
  </div>
</nav>
```

### Sidebar Navigation

```tsx
<aside className="w-64 bg-[#111827] border-r border-[#1F2937] min-h-screen p-4">
  {/* Sidebar items */}
</aside>
```

---

## ⚠️ Important Notes

### ❌ AVOID These Colors
- ❌ Gold/yellow gradients
- ❌ Purple/violet (except for specific data viz)
- ❌ Neon effects
- ❌ Gaming-style gradients
- ❌ Overly bright colors

### ✅ DO Use
- ✅ Deep navy backgrounds
- ✅ Subtle gradients (145deg)
- ✅ Professional blue (#3B82F6)
- ✅ Financial green (#22C55E) for positive values ONLY
- ✅ Clean, minimal line icons
- ✅ Strong visual hierarchy
- ✅ Tabular numbers for financial data

---

## 📐 Spacing & Layout

### Standard Spacing Scale
- `gap-2` (0.5rem) - Tight spacing between related items
- `gap-4` (1rem) - Standard spacing between elements
- `gap-6` (1.5rem) - Section spacing
- `p-4` (1rem) - Card padding (small)
- `p-6` (1.5rem) - Card padding (standard)
- `rounded-lg` (0.5rem) - Standard border radius
- `rounded-xl` (0.75rem) - Card border radius (12px)

---

## 🎯 Quick Reference

**Main page background:** `bg-[#0B1220]`  
**Section/sidebar background:** `bg-[#111827]`  
**Card background:** `bg-[#162033]`  
**Primary text:** `text-[#E5E7EB]`  
**Secondary text:** `text-[#9CA3AF]`  
**Muted text:** `text-[#6B7280]`  
**Primary button:** `bg-[#3B82F6]`  
**Positive value:** `text-[#22C55E]`  
**Negative value:** `text-[#EF4444]`  
**Border:** `border-[#1F2937]`  
**Border radius:** `rounded-xl` (12px)

---

This theme creates a trustworthy, analytical, and modern enterprise-grade interface suitable for institutional financial applications.
