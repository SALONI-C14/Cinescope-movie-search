# 🎬 CineScope — Week 6: Performance, Responsiveness, and Accessibility

## 📌 Project Overview

CineScope is a React + Vite movie search application that uses the OMDb API to search for movies and display results as interactive movie cards. Users can search for movies, view movie information, and access detailed movie views.

This Week 6 update focuses on optimizing the existing application for better performance, improving responsiveness across different screen sizes, and enhancing accessibility according to modern web accessibility practices.

---

## 🚀 Week 6 Objectives

The main objectives of Week 6 were:

- Improve application performance.
- Implement code splitting and lazy loading.
- Reduce unnecessary loading of components.
- Improve responsive design for different screen sizes.
- Enhance accessibility using semantic HTML and ARIA attributes.
- Ensure keyboard navigation usability.
- Analyze the application using Lighthouse.
- Test the optimized application using automated tests, linting, and production builds.

---

## ⚡ Performance Optimization

### Code Splitting and Lazy Loading

The Movie Details component was optimized using lazy loading and dynamic imports.

This allows the component to be loaded only when it is required instead of including it in the initial application bundle.

```jsx
const MovieDetails = React.lazy(() =>
  import('./components/MovieDetails/MovieDetails')
)