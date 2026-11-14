import { useRef, useState } from 'react';
import { ArrowUp, Sprout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, withLanguage } from './LanguageContext';
import { pick } from '../content/projectStatus';
import AtlasTypewriter from './AtlasTypewriter';

/* One AI prompt, shared by Home and the research catalogue. The submit path is
   still the same: /business/ai-brief with initialPrompt. */
export default function BusinessAiPrompt() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) {
      inputRef.current?.focus();
      return;
    }
    setQuery('');
    navigate(withLanguage('/business/ai-brief', language), { state: { initialPrompt: value } });
  };

  return (
    <section className="business-ai-prompt" aria-labelledby="business-ai-prompt-title">
      <header className="business-ai-prompt-head">
        <Sprout size={22} strokeWidth={1.55} aria-hidden="true" />
        <div>
          <h2 id="business-ai-prompt-title">{pick(language, '用 AI 助手开始', 'Start with the AI assistant', '用 AI 助手開始')}</h2>
        </div>
      </header>
      <form className="business-ai-prompt-form" onSubmit={submit}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={pick(language, '直接描述你的研究问题，AI 会帮你整理成研究简报…', 'Describe your research question; AI will shape it into a brief…', '直接描述你的研究問題，AI 會幫你整理成研究簡報…')}
          aria-label={pick(language, '用 AI 助手开始', 'Start with the AI assistant', '用 AI 助手開始')}
        />
        <button type="submit" disabled={!query.trim()} aria-label={pick(language, '发送给 AI', 'Send to AI', '發送給 AI')}>
          <ArrowUp size={18} strokeWidth={1.9} aria-hidden="true" />
        </button>
      </form>
      <div className="business-ai-prompt-examples">
        <AtlasTypewriter
          begin={pick(language, '例如：', 'Try:', '例如：')}
          prompts={[
            pick(language, '年轻人为什么开始重新重视线下社交？', 'Why are younger people returning to in-person socialising?', '年輕人為什麼開始重新重視線下社交？'),
            pick(language, '城市通勤如何影响人们的消费选择？', 'How does commuting shape what people buy?', '城市通勤如何影響人們的消費選擇？'),
            pick(language, '消费者如何理解“可持续”这个词？', 'How do consumers understand the word “sustainable”?', '消費者如何理解「可持續」這個詞？'),
            pick(language, '一款个人理财应用，如何测试它的广告创意？', 'How should we test ad concepts for a finance app?', '一款個人理財應用，如何測試它的廣告創意？'),
          ]}
        />
      </div>
    </section>
  );
}
