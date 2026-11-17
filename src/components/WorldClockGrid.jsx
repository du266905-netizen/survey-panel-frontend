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

  /* The other fourteen markets behind the +14 cell. */
  { id: 'macau', zh: '澳门', en: 'Macau', timeZone: 'Asia/Macau', marker: 'macau' },
  { id: 'manila', zh: '马尼拉', en: 'Manila', timeZone: 'Asia/Manila', marker: 'philippines' },
  { id: 'ho-chi-minh', zh: '胡志明市', en: 'Ho Chi Minh City', timeZone: 'Asia/Ho_Chi_Minh', marker: 'vietnam' },
  { id: 'almaty', zh: '阿拉木图', en: 'Almaty', timeZone: 'Asia/Almaty', marker: 'kazakhstan' },
  { id: 'karachi', zh: '卡拉奇', en: 'Karachi', timeZone: 'Asia/Karachi', marker: 'pakistan' },
  { id: 'dhaka', zh: '达卡', en: 'Dhaka', timeZone: 'Asia/Dhaka', marker: 'bangladesh' },
  { id: 'colombo', zh: '科伦坡', en: 'Colombo', timeZone: 'Asia/Colombo', marker: 'sri-lanka' },
  { id: 'doha', zh: '多哈', en: 'Doha', timeZone: 'Asia/Qatar', marker: 'qatar' },
  { id: 'madrid', zh: '马德里', en: 'Madrid', timeZone: 'Europe/Madrid', marker: 'spain' },
  { id: 'rome', zh: '罗马', en: 'Rome', timeZone: 'Europe/Rome', marker: 'italy' },
  { id: 'athens', zh: '雅典', en: 'Athens', timeZone: 'Europe/Athens', marker: 'greece' },
  { id: 'brussels', zh: '布鲁塞尔', en: 'Brussels', timeZone: 'Europe/Brussels', marker: 'belgium' },
  { id: 'warsaw', zh: '华沙', en: 'Warsaw', timeZone: 'Europe/Warsaw', marker: 'poland' },
  { id: 'stockholm', zh: '斯德哥尔摩', en: 'Stockholm', timeZone: 'Europe/Stockholm', marker: 'sweden' },
];

const PRIMARY_COUNT = 21;

const isCjk = (language) => /^(zh|ja|ko)/i.test(language || '');

export default function WorldClockGrid({ onActiveMarkerChange }) {
  const { language } = useLanguage();
  const [now, setNow] = useState(() => new Date());
  const [expanded, setExpanded] = useState(false);
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

  const visible = expanded ? cities : cities.slice(0, PRIMARY_COUNT);

  return (
    <div className="home-global-clock-wrap">
    <ul className="home-global-clock" id="world-clock-grid">
      {visible.map((city, index) => {
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
            style={index >= PRIMARY_COUNT ? { animationDelay: `${(index - PRIMARY_COUNT) * 40}ms` } : undefined}
          >
            <span className="home-global-clock-city">{isCjk(language) ? city.zh : city.en}</span>
            <time className="home-global-clock-time" dateTime={now.toISOString()}>
              {time.hour}:{time.minute}
              <span className="home-global-clock-seconds">:{time.second}</span>
            </time>
          </li>
        );
      })}
      <li className="home-global-clock-more">
        <button
          type="button"
          className="home-global-clock-more-button"
          aria-expanded={expanded}
          aria-controls="world-clock-grid"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? '收起' : `${cities.length - PRIMARY_COUNT} 个市场`}
          <span aria-hidden="true" className="home-global-clock-more-arrow">{expanded ? '↑' : '→'}</span>
        </button>
      </li>
    </ul>
    </div>
  );
}
