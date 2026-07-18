import amazonImage from '../assets/giftcards/amazon.png';
import appleImage from '../assets/giftcards/apple.png';
import googlePlayImage from '../assets/giftcards/googleplay.png';
import grubhubImage from '../assets/giftcards/grubhub.png';
import instacartImage from '../assets/giftcards/instacart.png';
import lowesImage from '../assets/giftcards/lowes.png';
import starbucksImage from '../assets/giftcards/starbucks.png';
import uberImage from '../assets/giftcards/uber.png';

export const giftCardOptions = [
  { id: 'amazon', name: 'Amazon', image: 'amazon.png', region: 'global', amounts: [10, 25, 50] },
  { id: 'apple', name: 'Apple', image: 'apple.png', region: 'global', amounts: [10, 25, 50] },
  { id: 'googleplay', name: 'Google Play', image: 'googleplay.png', region: 'global', amounts: [10, 25, 50] },
  { id: 'lowes', name: "Lowe's", image: 'lowes.png', region: 'global', amounts: [10, 25, 50] },
  { id: 'starbucks', name: 'Starbucks', image: 'starbucks.png', region: 'global', amounts: [10, 25, 50] },
  { id: 'grubhub', name: 'Grubhub', image: 'grubhub.png', region: 'global', amounts: [25, 50, 75] },
  { id: 'uber', name: 'Uber', image: 'uber.png', region: 'global', amounts: [25, 50, 75] },
  { id: 'instacart', name: 'Instacart', image: 'instacart.png', region: 'global', amounts: [25, 50, 75] },
];

export const giftCardImageSources = {
  'amazon.png': amazonImage,
  'apple.png': appleImage,
  'googleplay.png': googlePlayImage,
  'grubhub.png': grubhubImage,
  'instacart.png': instacartImage,
  'lowes.png': lowesImage,
  'starbucks.png': starbucksImage,
  'uber.png': uberImage,
};
