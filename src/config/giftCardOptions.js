import amazonImage from '../assets/giftcards/amazon.jpg';
import appleImage from '../assets/giftcards/apple.jpg';
import googlePlayImage from '../assets/giftcards/googleplay.jpg';
import lowesImage from '../assets/giftcards/lowes.jpg';

export const giftCardOptions = [
  { id: 'amazon', name: 'Amazon', image: 'amazon.jpg', region: 'global' },
  { id: 'apple', name: 'Apple', image: 'apple.jpg', region: 'global' },
  { id: 'googleplay', name: 'Google Play', image: 'googleplay.jpg', region: 'global' },
  { id: 'lowes', name: "Lowe's", image: 'lowes.jpg', region: 'global' },
];

export const giftCardImageSources = {
  'amazon.jpg': amazonImage,
  'apple.jpg': appleImage,
  'googleplay.jpg': googlePlayImage,
  'lowes.jpg': lowesImage,
};
