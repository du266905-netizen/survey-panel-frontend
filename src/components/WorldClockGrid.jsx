import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';

/* 21 cities of the 34 markers on the globe. Beijing leads: it is where we are.
   Then the network runs west to east, so reading the grid left to right and
   top to bottom walks through one day. `marker` ties each city to the country
   dot on the globe; hovering a cell lights that dot up. */
const cities = [
  { id: 'beijing', zh: '北京', en: 'Beijing', timeZone: 'Asia/Shanghai', marker: 'china-mainland' },
  { id: 'new-york', zh: '纽约', en: 'New York', timeZone: 'America/New_York', marker: 'united-states' },
  { id: 'london', zh: '伦敦', en: 'London', timeZone: 'Europe/London', marker: 'united-kingdom' },
  { id: 'paris', zh: '巴黎', en: 'Paris', timeZone: 'Europe/Paris', marker: 'france' },
  { id: 'berlin', zh: '柏林', en: 'Berlin', timeZone: 'Europe/Berlin', marker: 'germany' },
  { id: 'zurich', zh: '苏黎世', en: 'Zurich', timeZone: 'Europe/Zurich', marker: 'switzerland' },
  { id: 'amsterdam', zh: '阿姆斯特丹', en: 'Amsterdam', timeZone: 'Europe/Amsterdam', marker: 'netherlands' },
  { id: 'cairo', zh: '开罗', en: 'Cairo', timeZone: 'Africa/Cairo', marker: 'egypt' },
  { id: 'johannesburg', zh: '约翰内斯堡', en: 'Johannesburg', timeZone: 'Africa/Johannesburg', marker: 'south-africa' },
  { id: 'riyadh', zh: '利雅得', en: 'Riyadh', timeZone: 'Asia/Riyadh', marker: 'saudi-arabia' },
  { id: 'nairobi', zh: '内罗毕', en: 'Nairobi', timeZone: 'Africa/Nairobi', marker: 'kenya' },
  { id: 'istanbul', zh: '伊斯坦布尔', en: 'Istanbul', timeZone: 'Europe/Istanbul', marker: 'turkiye' },
  { id: 'dubai', zh: '迪拜', en: 'Dubai', timeZone: 'Asia/Dubai', marker: 'united-arab-emirates' },
  { id: 'bangkok', zh: '曼谷', en: 'Bangkok', timeZone: 'Asia/Bangkok', marker: 'thailand' },
  { id: 'jakarta', zh: '雅加达', en: 'Jakarta', timeZone: 'Asia/Jakarta', marker: 'indonesia' },
  { id: 'kuala-lumpur', zh: '吉隆坡', en: 'Kuala Lumpur', timeZone: 'Asia/Kuala_Lumpur', marker: 'malaysia' },
  { id: 'singapore', zh: '新加坡', en: 'Singapore', timeZone: 'Asia/Singapore', marker: 'singapore' },
  { id: 'hong-kong', zh: '香港', en: 'Hong Kong', timeZone: 'Asia/Hong_Kong', marker: 'hong-kong' },
  { id: 'shanghai', zh: '上海', en: 'Shanghai', timeZone: 'Asia/Shanghai', marker: 'china-mainland' },
  { id: 'tokyo', zh: '东京', en: 'Tokyo', timeZone: 'Asia/Tokyo', marker: 'japan' },
  { id: 'seoul', zh: '首尔', en: 'Seoul', timeZone: 'Asia/Seoul', marker: 'south-korea' },
];

const isCjk = (language) => /^(zh|ja|ko)/i.test(language || '');

export default function WorldClockGrid({ onActiveMarkerChange }) {
  const { language } = useLanguage();
  const [now, setNow] = useState(() => new Date());
  const locale = isCjk(language) ? 'zh-CN' : 'en-GB';

  useEffect(() => {
    /* One timer for the whole grid: the wall clock only needs to move once a
       minute, and every cell reads the same instant. */
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [language]);

  const parts = (timeZone) =>
    Object.fromEntries(
      new Intl.DateTimeFormat(locale, {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
        calendar: 'gregory',
        numberingSystem: 'latn',
      })
        .formatToParts(now)
        .filter((part) => part.type !== 'literal')
        .map((part) => [part.type, part.value]),
    );

  return (
    <ul className="home-global-clock">
      {cities.map((city) => {
        const time = parts(city.timeZone);
        const hour = Number(time.hour);
        /* 9 to 18 local is "at their desk". Everything else stays readable but
           recedes, so the grid answers "who is awake" at a glance. */
        const awake = hour >= 9 && hour < 18;
        return (
          <li
            key={city.id}
            className={`home-global-clock-cell${awake ? '' : ' is-away'}`}
            onMouseEnter={() => onActiveMarkerChange?.(city.marker)}
            onMouseLeave={() => onActiveMarkerChange?.(null)}
            onFocus={() => onActiveMarkerChange?.(city.marker)}
            onBlur={() => onActiveMarkerChange?.(null)}
            tabIndex={0}
          >
            <span className="home-global-clock-city">{isCjk(language) ? city.zh : city.en}</span>
            <time className="home-global-clock-time" dateTime={now.toISOString()}>
              {time.hour}:{time.minute}
              <span className="home-global-clock-seconds">:{time.second}</span>
            </time>
          </li>
        );
      })}
    </ul>
  );
}
