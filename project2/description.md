# Web Development Project Documentation  
**Student:** Priboi Luca Mihai  
**Course:** Web Technologies  
**Project:** Personal Portfolio Website  

---

## 1. Introduction
This project is a personal website designed to serve as an online portfolio and CV.  
The goal was to create a responsive, modern platform using **native HTML5 and CSS3**, without relying on JavaScript frameworks or external libraries (Bootstrap, Tailwind).  
This approach ensures a deeper understanding of core web technologies.

---

## 2. File Structure & Organization
To ensure maintainability and clean code, the project uses a modular directory structure:

```
Root/
│── index.html
│
├── pages/
│ ├── cv.html
│ ├── portfolio.html
│ └── contact.html
│
├── css/
│ ├── style.css
│ ├── home.css
│ ├── cv.css
│ ├── contact.css
│ └── portfolio.css
│
├── scripts/
│ └── contact.js
│
└── images/
  ├── profile.jpeg
  └── logo.svg
```

- **Root** contains the entry point `index.html`.  
- **/pages** holds all secondary pages, keeping the root clean.  
- **/css** contains global + page-specific styles for better separation of concerns.  
- **/scripts** used for a better contact form experience.
- **/images** stores all assets, including the custom SVG logo.

---

## 3. Design Philosophy & Implementation

### **Visual Style**
The design follows a **“Modern Architectural”** aesthetic—clean, sharp, technical.

### **HTML Construction**
HTML was built manually using semantic elements:
- `header`, `nav`, `main`, `article`, `footer`

This improves accessibility, SEO, and code organization.

### **CSS & Graphic Design**
- **Dark Mode** theme: `#1a1a1a`  
- **Accent Color**: `#FD6726` (orange)  
- **Typography**: *Poppins* (weights 100–300) for an airy, minimalist feel  

### **Use of AI Tools**
AI (Google Gemini) was used to speed up CSS creation, especially for:
- complex gradients  
- responsive layout patterns  
- pseudo-element animations  

Examples of prompts:
- *"Make the headers white, thinner, with a gradient underscore using the ::after pseudo-element."*  
- *"Create a CSS-only masonry grid for the portfolio that collapses to one column on mobile."*

---

## 4. Key Features

### **Mobile Responsiveness — No JavaScript**
Built using a **Mobile-First** philosophy.

#### **Hamburger Menu (Checkbox Hack)**
A hidden `<input type="checkbox">` toggles the mobile navigation using CSS only.  
No JavaScript required.

#### **Responsive Layout**
- Flexbox  
- CSS Grid  
- Automatic collapse into vertical stacking on smaller screens  

### **Icons & SVG**
- Custom geometric SVG logo matching the thin typographic style  
- FontAwesome icons for social and UI components  

---


The project demonstrates a solid understanding of **native HTML5**, **CSS3**, and **responsive design principles**.
