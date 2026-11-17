import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';

/* 21 cities of the 34 markers on the globe. Beijing leads: it is where we are.
   Then the network runs west to east, so reading the grid left to right and
   top to bottom walks through one day. */
const cities = [
  { id: 'beijing', zh: '北京', en: 'Beijing', timeZone: 'Asia/Shanghai' },
  { id: 'new-york', zh: '纽约', en: 'New York', timeZone: 'America/New_York' },
  { id: 'london', zh: '伦敦', en: 'London', timeZone: 'Europe/London' },
  { id: 'paris', zh: '巴黎', en: 'Paris', timeZone: 'Europe/Paris' },
  { id: 'berlin', zh: '柏林', en: 'Berlin', timeZone: 'Europe/Berlin' },
  { id: 'zurich', zh: '苏黎世', en: 'Zurich', timeZone: 'Europe/Zurich' },
  { id: 'amsterdam', zh: '阿姆斯特丹', en: 'Amsterdam', timeZone: 'Europe/Amsterdam' },
  { id: 'cairo', zh: '开罗', en: 'Cairo', timeZone: 'Africa/Cairo' },
  { id: 'johannesburg', zh: '约翰内斯堡', en: 'Johannesburg', timeZone: 'Africa/Johannesburg' },
  { id: 'riyadh', zh: '利雅得', en: 'Riyadh', timeZone: 'Asia/Riyadh' },
  { id: 'nairobi', zh: '内罗毕', en: 'Nairobi', timeZone: 'Africa/Nairobi' },
  { id: 'istanbul', zh: '伊斯坦布尔', en: 'Istanbul', timeZone: 'Europe/Istanbul' },
  { id: 'dubai', zh: '迪拜', en: 'Dubai', timeZone: 'Asia/Dubai' },
  { id: 'bangkok', zh: '曼谷', en: 'Bangkok', timeZone: 'Asia/Bangkok' },
  { id: 'jakarta', zh: '雅加达', en: 'Jakarta', timeZone: 'Asia/Jakarta' },
  { id: 'kuala-lumpur', zh: '吉隆坡', en: 'Kuala Lumpur', timeZone: 'Asia/Kuala_Lumpur' },
  { id: 'singapore', zh: '新加坡', en: 'Singapore', timeZone: 'Asia/Singapore' },
  { id: 'hong-kong', zh: '香港', en: 'Hong Kong', timeZone: 'Asia/Hong_Kong' },
  { id: 'shanghai', zh: '上海', en: 'Shanghai', timeZone: 'Asia/Shanghai' },
  { id: 'tokyo', zh: '东京', en: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { id: 'seoul', zh: '首尔', en: 'Seoul', timeZone: 'Asia/Seoul' },
];

const isCjk = (language) => /^(zh|ja|ko)/i.test(language || '');

export default function WorldClockGrid() {
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

  const formatter = (timeZone) =>
    new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      calendar: 'gregory',
      numberingSystem: 'latn',
    });

  const parts = (timeZone) =>
    Object.fromEntries(
      formatter(timeZone)
        .formatToParts(now)
        .filter((part) => part.type !== 'literal')
        .map((part) => [part.type, part.value]),
    );

  return (
    <ul className="home-global-clock">
      {cities.map((city) => (
        <li key={city.id} className="home-global-clock-cell">
          <span className="home-global-clock-city">{isCjk(language) ? city.zh : city.en}</span>
          <time className="home-global-clock-time" dateTime={now.toISOString()}>
            {(() => {
              const t = parts(city.timeZone);
              return (
                <>
                  {t.hour}:{t.minute}
                  <span className="home-global-clock-seconds">:{t.second}</span>
                </>
              );
            })()}
          </time>
        </li>
      ))}
    </ul>
  );
}
