import { useEffect } from 'react';

export function PreloadAssets() {
  useEffect(() => {
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Antonio:wght@100;200;300;400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

    // Enable paint holding for smoother transitions
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }, []);

  return null;
}