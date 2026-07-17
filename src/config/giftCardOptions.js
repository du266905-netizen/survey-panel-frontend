import amazonImage from '../assets/giftcards/amazon.jpg';
import appleImage from '../assets/giftcards/apple.jpg';
import googlePlayImage from '../assets/giftcards/googleplay.jpg';
import grubhubImage from '../assets/giftcards/grubhub.jpg';
import instacartImage from '../assets/giftcards/instacart.jpg';
import lowesImage from '../assets/giftcards/lowes.jpg';
import starbucksImage from '../assets/giftcards/starbucks.jpg';
import uberImage from '../assets/giftcards/uber.jpg';

export const giftCardOptions = [
  { id: 'amazon', name: 'Amazon', image: 'amazon.jpg', region: 'global', amounts: [10, 25, 50] },
  { id: 'apple', name: 'Apple', image: 'apple.jpg', region: 'global', amounts: [10, 25, 50] },
  { id: 'googleplay', name: 'Google Play', image: 'googleplay.jpg', region: 'global', amounts: [10, 25, 50] },
  { id: 'lowes', name: "Lowe's", image: 'lowes.jpg', region: 'global', amounts: [10, 25, 50] },
  { id: 'starbucks', name: 'Starbucks', image: 'starbucks.jpg', region: 'global', amounts: [10, 25, 50] },
  { id: 'grubhub', name: 'Grubhub', image: 'grubhub.jpg', region: 'global', amounts: [25, 50, 75] },
  { id: 'uber', name: 'Uber', image: 'uber.jpg', region: 'global', amounts: [25, 50, 75] },
  { id: 'instacart', name: 'Instacart', image: 'instacart.jpg', region: 'global', amounts: [25, 50, 75] },
];

export const giftCardImageSources = {
  'amazon.jpg': amazonImage,
  'apple.jpg': appleImage,
  'googleplay.jpg': googlePlayImage,
  'grubhub.jpg': grubhubImage,
  'instacart.jpg': instacartImage,
  'lowes.jpg': lowesImage,
  'starbucks.jpg': starbucksImage,
  'uber.jpg': uberImage,
};
