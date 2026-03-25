# 3D Furniture Viewer

![Screenshot](screenshot.png)

A React Three Fiber prototype exploring **3D furniture shopping experiences** — focusing on how users inspect, configure, and understand products in a spatial interface.

Designed to simulate real-world e-commerce scenarios where 3D visualisation helps reduce uncertainty before purchase.

**Live demo:** [r3f-furniture-viewer.vercel.app](https://r3f-furniture-viewer.vercel.app)  
**Portfolio:** [kpi-dashboard-six-theta.vercel.app](https://kpi-dashboard-six-theta.vercel.app)

---

## Overview

A simplified 3D product viewer where users can inspect furniture from multiple angles, evaluate finish options in real time, and maintain spatial awareness through controlled camera interaction.

The goal was to explore how React state can drive real-time 3D scene updates while keeping interactions intuitive and performant.

---

## Key Features

- **Real-time finish selection** — material updates driven by React state, propagated to 3D meshes without full re-renders
- **User-controlled camera** — OrbitControls tuned for a natural viewing experience with bounded zoom and constrained angles
- **Interaction feedback** — cursor state reflects interaction mode (grab / grabbing) to match native app expectations
- **Modular scene composition** — sofa, table, and floor isolated into focused components to support extensibility
- **Lighting and depth** — ambient and shadow setup to enhance realism without heavy performance cost

---

## Engineering Highlights

- **React ↔ 3D state sync** — UI state directly drives scene updates, avoiding imperative mutations where possible
- **Performance-conscious structure** — static geometry memoised to prevent unnecessary reconciliation in the render loop
- **Controlled camera constraints** — tuned `minDistance`, `maxDistance`, and `maxPolarAngle` to prevent disorienting user states
- **Event-driven interaction** — pointer events mapped to cursor feedback for a more tactile experience

---

## Tech Stack

- **Framework:** React + TypeScript
- **3D:** React Three Fiber, Three.js
- **Helpers:** @react-three/drei
- **Build:** Vite

---

## Future Improvements

- Progressive asset loading for large models
- Mobile interaction support (touch gestures)
- Accessibility considerations for non-pointer input
- Integration into a full product page (pricing, cart, recommendations)

---

## Running Locally

```bash
git clone https://github.com/leomacode/r3f-furniture-viewer
cd r3f-furniture-viewer
npm install
npm run dev
```
