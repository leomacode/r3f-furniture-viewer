# Interactive 3D Furniture Viewer

![Screenshot](screenshot.png)

A React Three Fiber prototype exploring 3D product-viewing patterns — finish selection, camera interaction, and UI-driven scene updates.

**Live demo:** [r3f-furniture-viewer.vercel.app](https://r3f-furniture-viewer.vercel.app)  
**Portfolio:** [kpi-dashboard-six-theta.vercel.app](https://kpi-dashboard-six-theta.vercel.app)

---

## Overview

A furniture-style 3D viewer featuring a modular sofa and coffee table. Built to explore practical product-viewer patterns in React Three Fiber — scene composition, lighting, camera controls, and connecting React state to 3D scene updates.

---

## Features

- Finish selection with live colour updates
- Orbit controls for rotation and zoom
- Reset view action
- Grab/grabbing cursor feedback
- Shadows and ambient lighting for depth

---

## Tech Stack

|           |                             |
| --------- | --------------------------- |
| Framework | React + TypeScript          |
| 3D        | React Three Fiber, Three.js |
| Helpers   | @react-three/drei           |
| Build     | Vite                        |

---

## Engineering Notes

- Scene split into focused components: `Floor`, `Sofa`, `Table`
- Static geometry wrapped in `memo` to avoid unnecessary re-renders
- `OrbitControls` constrained with `minDistance`, `maxDistance`, and `maxPolarAngle`
- Pointer events drive cursor state for natural drag feedback
- Shadows enabled via `castShadow` / `receiveShadow` per mesh

---

## Running Locally

```bash
git clone https://github.com/leomacode/r3f-furniture-viewer
cd r3f-furniture-viewer
npm install
npm run dev
```
