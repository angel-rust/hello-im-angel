'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ConsoleEasterEgg() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  useEffect(() => {
    // Fun console messages
    const styles = [
      'color: #00a3ff',
      'font-size: 16px',
      'font-weight: bold',
    ].join(';');

    console.log('%c👋 Hey there, curious developer!', styles);
    console.log(
      '%cLooks like you\'re checking under the hood. I like that!',
      'color: #D3D3D3; font-size: 14px;'
    );
    console.log(
      '%c🚀 This portfolio is built with Next.js, React Three Fiber, and a Rust backend.',
      'color: #D3D3D3; font-size: 14px;'
    );
    console.log(
      '%c💡 Try pressing ⌘K (or Ctrl+K) to open the command palette!',
      'color: #00a3ff; font-size: 14px; font-weight: bold;'
    );
    console.log(
      '%c🎮 Psst... Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A',
      'color: #fbbf24; font-size: 14px;'
    );
    console.log(
      '%c📧 Want to chat? Reach out at angel@angelmedina.io',
      'color: #D3D3D3; font-size: 14px;'
    );

    // Konami code handler
    const handleKeyPress = (e: KeyboardEvent) => {
      setKonamiIndex((prevIndex) => {
        const nextIndex =
          e.key === konamiCode[prevIndex] ? prevIndex + 1 : 0;

        if (nextIndex === konamiCode.length) {
          activateKonamiCode();
          return 0;
        }

        return nextIndex;
      });
    };

    const activateKonamiCode = () => {
      toast.success('🎮 Konami Code Activated!', {
        description: 'You found the secret! 30 extra lives granted! 🎉',
        duration: 5000,
      });

      // Add fun visual effect
      document.body.classList.add('konami-active');
      setTimeout(() => {
        document.body.classList.remove('konami-active');
      }, 3000);

      console.log(
        '%c🎮 KONAMI CODE ACTIVATED! 🎉',
        'color: #00ff00; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);'
      );
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return null;
}
