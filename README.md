# Getting Started

## Toolkit Url
```
http://research.cuningham.com/circular-economy/
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# Notes on Functionality of App

### Frameworks and Libraries
- Vue and Vuetify are used as the primary framework for the application and the majority of the UI components
- d3 is used to construct the interactive diagram on the main page
- Vuex is used to manage interactions across views / components


### Design Patterns
- The application uses common practices with Vue / Vue Router / Vuex to handle modularization and reactivity
- The d3 component uses a general update pattern that is called whenever the Vue module identifies a relevant change in the application's data or window's dimensions

