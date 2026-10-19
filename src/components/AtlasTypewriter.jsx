import { useEffect, useState } from 'react';

function AtlasTypewriter({ prompts, begin }) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activePrompt = prompts[promptIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let delay = 52;
    let update;

    if (!isDeleting && characterCount < activePrompt.length) {
      update = () => setCharacterCount((currentCount) => currentCount + 1);
    } else if (!isDeleting) {
      delay = 1800;
      update = () => setIsDeleting(true);
    } else if (characterCount > 0) {
      delay = 30;
      update = () => setCharacterCount((currentCount) => currentCount - 1);
    } else {
      delay = 260;
      update = () => {
        setPromptIndex((currentIndex) => (currentIndex + 1) % prompts.length);
        setIsDeleting(false);
      };
    }

    const timeoutId = window.setTimeout(update, delay);
    return () => window.clearTimeout(timeoutId);
  }, [activePrompt.length, characterCount, isDeleting, prefersReducedMotion]);

  const visiblePrompt = prefersReducedMotion ? activePrompt : activePrompt.slice(0, characterCount);

  return (
    <div className="atlas-map-typewriter" aria-label={`${begin} ${activePrompt}`}>
      <span>{begin}</span>
      <strong>{visiblePrompt}</strong>
      <i aria-hidden="true" />
    </div>
  );
}


export default AtlasTypewriter;
