import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Automatically turn browser tab favicon into a perfect circle
const makeFaviconCircular = () => {
  const img = new Image();
  img.src = '/2.png';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw circular mask
    ctx.beginPath();
    ctx.arc(64, 64, 64, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw image inside circle
    ctx.drawImage(img, 0, 0, 128, 128);

    // Update favicon link tags
    const iconUrl = canvas.toDataURL('image/png');
    let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = iconUrl;
  };
};

makeFaviconCircular();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
