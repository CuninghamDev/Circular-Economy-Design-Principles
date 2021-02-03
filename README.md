# Circular-Economy-Design-Principles

This repo contains a simple client side html/js based interactive diagram that communicates various Circular Economy (CE) design principles, where they exist in a typical project lifecycle, and how they interact with one another. This diagram is meant to be used for external communication with clients and partners to discuss which CE principles may best apply to their projects, and what the lifecycle impacts of those design decisions may be.

## Design Notes

This diagram was built primarily using d3. It uses a combination of svg and dom elements with data bindings to create the final chart. It is meant to be drawn within an existing div that has preset dimensions which can be inherited by the diagram. These preset dimensions form the basis of many calculations for area and position.

The d3 portion of the code is separated into a class for convenience and flexibility purposes, and likely could be repurposed into more sophisticated web apps and frameworks


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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
