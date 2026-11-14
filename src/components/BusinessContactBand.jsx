import { Clock, Globe2, MapPin, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, withLanguage } from './LanguageContext';
import { pick } from '../content/projectStatus';
import './BusinessContactBand.css';

/* Closing band on the research workspace: the same job as the panel's
   "looking for more" block — a short invitation on the left, four facts on the
   right, then one help card. No figures we cannot stand behind: the region and
   country counts come from the globe markers on the public site, the 12-hour
   reply is our working promise, and the sample line is a claim about process,
   not a number. */
export default function BusinessContactBand() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const copy = {
    title: pick(language, '还有需要证实的问题？', 'Still have a question to settle?', '還有需要證實的問題？'),
    sub: pick(
      language,
      '把你的决定和目标人群告诉我们，研究员会在 12 小时内回复。',
      'Tell us the decision and the audience. A researcher replies within 12 hours.',
      '把你的決定和目標人群告訴我們，研究員會在 12 小時內回覆。',
    ),
    cta: pick(language, '与研究人谈', 'Talk to a researcher', '與研究人談'),
    facts: [
      { icon: Globe2, text: pick(language, '大中华、亚太、中东、欧洲、北美 5 个区域', 'Five regions: Greater China, Asia-Pacific, the Middle East, Europe, North America', '大中華、亞太、中東、歐洲、北美 5 個區域') },
      { icon: MapPin, text: pick(language, '34 个国家与地区', '34 countries and territories', '34 個國家與地區') },
      { icon: Clock, text: pick(language, '12 小时内响应', 'A reply within 12 hours', '12 小時內回覆') },
      { icon: ShieldCheck, text: pick(language, '严格把关的样本质量', 'Sample quality checked by hand', '嚴格把關的樣本品質') },
    ],
    helpTitle: pick(language, '帮助中心', 'Help centre', '幫助中心'),
    helpBody: pick(language, '账户、付款和研究服务的问题，这里都有答案。', 'Answers on your account, payments and research.', '帳戶、付款和研究服務的問題，這裡都有答案。'),
    helpCta: pick(language, '浏览帮助文章', 'Browse the articles', '瀏覽幫助文章'),
  };

  return (
    <div className="business-contact-block">
      <section className="business-contact-band" aria-labelledby="business-contact-band-title">
        <div className="business-contact-band-copy">
          <h2 id="business-contact-band-title">{copy.title}</h2>
          <p className="business-contact-band-sub">{copy.sub}</p>
          <button type="button" className="business-contact-band-cta" onClick={() => navigate(withLanguage('/business/access', language))}>
            {copy.cta}
          </button>
        </div>
        <ul className="business-contact-band-facts">
          {copy.facts.map(({ icon: Icon, text }) => (
            <li key={text}>
              <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="business-help-card" aria-labelledby="business-help-card-title">
        <div>
          <h3 id="business-help-card-title">{copy.helpTitle}</h3>
          <p>{copy.helpBody}</p>
        </div>
        <button type="button" className="business-help-card-cta" onClick={() => navigate(withLanguage('/help', language))}>
          {copy.helpCta}
        </button>
      </section>
    </div>
  );
}
