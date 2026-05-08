<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

<h1 align="center">
  🛡️ NexusVision
</h1>

<p align="center">
  <strong>AI-Powered Security Surveillance Dashboard</strong>
</p>

<p align="center">
  A professional, real-time security monitoring dashboard featuring AI-powered object detection visualization, live camera feeds simulation, and intelligent alert management. Built with modern web technologies for optimal performance and scalability.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

### 🎯 Real-Time AI Detection Visualization
- **Live Detection Boxes** — Dynamic bounding boxes with confidence scores, tracking IDs, and object classification
- **Multi-Class Detection** — Support for Person, Vehicle, Package, Animal, and Face detection classes
- **Smooth Animations** — Realistic object movement simulation with velocity-based tracking
- **Professional YOLO-style UI** — Corner brackets, confidence bars, and scanning animations

### 📊 Comprehensive Dashboard
- **Live Metrics** — Real-time FPS, GPU usage, inference time, and detection statistics
- **Detection Logs** — Chronological feed of all detected objects with status indicators
- **Alert Management** — Smart notification system with dismissible alerts
- **System Monitoring** — CPU, memory, and system health indicators

### 🎨 Modern UI/UX
- **Dark Mode Design** — Professional dark theme optimized for security operations
- **Responsive Layout** — Fully responsive design that works on all screen sizes
- **Glassmorphism Effects** — Modern backdrop blur and transparency effects
- **Micro-interactions** — Smooth hover states, transitions, and loading animations

### 🔧 Technical Features
- **Type-Safe** — Full TypeScript implementation with strict type checking
- **Performance Optimized** — React hooks optimization with useCallback and proper state management
- **Real-Time Updates** — Simulated live data streaming with configurable intervals
- **Accessible** — ARIA labels and semantic HTML for screen reader support

---

## 🎬 Demo

### Live Preview
> 🚀 **[View Live Demo](https://nexus-vision.vercel.app)** *(Deploy your own to see it in action)*

### Screenshots

<details>
<summary>📸 Click to view screenshots</summary>

#### Main Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│  🛡️ NexusVision                    │    AI Detection Center    │
├─────────────────────────────────────────────────────────────────┤
│                                     │                           │
│  ▣ Live Overview                    │  ┌─────────────────────┐  │
│  ▣ Camera Feeds                     │  │   LIVE FEED         │  │
│  ▣ Detection Logs                   │  │   ┌──┐    ┌──┐      │  │
│  ▣ API Status                       │  │   │👤│    │👤│      │  │
│  ▣ Settings                         │  │   └──┘    └──┘      │  │
│                                     │  │   PERSON  PERSON    │  │
│  ────────────────                   │  │   97.2%   94.8%     │  │
│                                     │  └─────────────────────┘  │
│  System Status                      │                           │
│  ● Operational                      │  Recent Detections        │
│  CPU: ████░░░░░░ 34%                │  ● Person - Main Entrance │
│  MEM: ██████░░░░ 62%                │  ● Vehicle - Parking Lot  │
│                                     │  ● Package - Back Door    │
└─────────────────────────────────────────────────────────────────┘
```

</details>

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | [Next.js 16](https://nextjs.org/) with App Router |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **UI Components** | Custom components with [Lucide React](https://lucide.dev/) icons |
| **State Management** | React Hooks (useState, useEffect, useCallback) |
| **Font** | [Geist Font](https://vercel.com/font) by Vercel |
| **Deployment** | [Vercel](https://vercel.com/) (recommended) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nexus-vision-dashboard.git
   cd nexus-vision-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Architecture

### Project Structure

```
nexus-vision-dashboard/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Dashboard/       # Dashboard-specific components
│   │   ├── Detection/       # Detection visualization components
│   │   └── ui/              # Base UI components
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── public/                  # Static assets
├── .github/                 # GitHub templates & workflows
├── package.json
├── tsconfig.json
└── README.md
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        RootLayout                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    NexusVision                        │  │
│  │  ┌─────────────┐  ┌─────────────────────────────────┐ │  │
│  │  │   Sidebar   │  │           MainContent           │ │  │
│  │  │  ┌───────┐  │  │  ┌─────────┐  ┌─────────────┐  │ │  │
│  │  │  │ Nav   │  │  │  │ Header  │  │   Metrics   │  │ │  │
│  │  │  │ Items │  │  │  └─────────┘  └─────────────┘  │ │  │
│  │  │  └───────┘  │  │  ┌─────────────────────────────┐│ │  │
│  │  │  ┌───────┐  │  │  │      LiveFeed              ││ │  │
│  │  │  │System │  │  │  │  ┌──────────────────────┐  ││ │  │
│  │  │  │Status │  │  │  │  │  DetectionBoxes     │  ││ │  │
│  │  │  └───────┘  │  │  │  └──────────────────────┘  ││ │  │
│  │  └─────────────┘  │  └─────────────────────────────┘│ │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Patterns

- **Component Composition** — Small, reusable components composed into larger features
- **Custom Hooks** — Logic extraction for data simulation and state management
- **Type Safety** — Comprehensive TypeScript interfaces for all data structures
- **Performance** — Memoization with useCallback and optimized re-renders

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Slate 950 | `#020617` | Primary background |
| Slate 900 | `#0f172a` | Secondary background |
| Blue 500 | `#3b82f6` | Primary accent |
| Emerald 400 | `#34d399` | Success/Online states |
| Red 400 | `#f87171` | Alerts/Errors |
| Purple 400 | `#a78bfa` | Vehicle detection |
| Orange 400 | `#fb923c` | Package detection |

### Detection Classes

| Class | Color | Icon |
|-------|-------|------|
| Person | `#34d399` (Emerald) | 🚶 |
| Vehicle | `#8b5cf6` (Purple) | 🚗 |
| Package | `#fb923c` (Orange) | 📦 |
| Animal | `#3b82f6` (Blue) | 🐾 |
| Face | `#ec4899` (Pink) | 👤 |

---

## 🔮 Roadmap

- [ ] **Backend Integration** — Connect to real YOLO/TensorFlow models
- [ ] **WebSocket Support** — Real-time data streaming from cameras
- [ ] **Multi-camera Grid** — View multiple camera feeds simultaneously
- [ ] **Analytics Dashboard** — Historical data visualization with charts
- [ ] **User Authentication** — Role-based access control
- [ ] **Mobile App** — React Native companion app
- [ ] **Docker Support** — Containerized deployment
- [ ] **API Documentation** — OpenAPI/Swagger specs

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Quick Start for Contributors

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Imad Nidal Hawara**

- GitHub: [@imadnidalhawara](https://github.com/imadnidalhawara)
- LinkedIn: [Imad Hawara](https://linkedin.com/in/imad-hawara)

---

## 🙏 Acknowledgments

- [Lucide](https://lucide.dev/) for the beautiful icon set
- [Vercel](https://vercel.com/) for the Geist font family
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Unsplash](https://unsplash.com/) for the demo images

---

<p align="center">
  Made with ❤️ and ☕ by <a href="https://github.com/imadnidalhawara">Imad Hawara</a>
</p>

<p align="center">
  <sub>If you found this project helpful, please consider giving it a ⭐</sub>
</p>