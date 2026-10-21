/* The three reward cards, extracted from the homepage so they can be dropped
   into another page unchanged. Cards receive the [kicker, title, body] triples
   from publicCopy.home.rewardCards. Styles live in HomeLegacySections.css,
   which the homepage imports. */

function GiftSketch() {
  return (
    <div className="home-reward-sketch" aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none">
        <g className="home-gift-sparkles"><path d="M48 72v18M39 81h18M172 77v14M165 84h14" /><path d="m64 51 5 9 9 5-9 5-5 9-5-9-9-5 9-5 5-9Z" /></g>
        <path className="home-gift-fill" d="M65 94h94v58H65z" />
        <path className="home-sketch-line" d="M65 93h94v59H65zM111 94v58" />
        <g className="home-gift-lid"><path className="home-gift-lid-fill" d="M57 79h110v19H57z" /><path className="home-sketch-line" d="M57 79h110v19H57zM111 79v19" /><path className="home-sketch-line" d="M109 79c-19-2-31-13-28-25 16-2 27 6 30 25Zm4 0c19-2 31-13 28-25-16-2-27 6-30 25Z" /></g>
        <path className="home-sketch-line" d="M65 98h94M111 98v54" />
        <path className="home-gift-shadow" d="M50 160c31 8 88 8 120 0" />
      </svg>
    </div>
  );
}

function TokenSketch() {
  return (
    <div className="home-reward-sketch" aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none">
        <path className="home-token-orbit" d="M48 118c12-43 93-72 133-34 28 26-2 61-43 70" />
        <g className="home-token-dot"><circle cx="166" cy="69" r="8" /></g>
        <g className="home-token-coin"><ellipse className="home-token-fill" cx="111" cy="110" rx="43" ry="25" /><path className="home-sketch-line" d="M68 110v18c0 14 86 14 86 0v-18M68 110c0 14 86 14 86 0s-86-14-86 0Z" /><path className="home-sketch-line home-token-mark" d="M95 108h32M111 95v26" /></g>
      </svg>
    </div>
  );
}

function CartSketch() {
  return (
    <div className="home-reward-sketch" aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none">
        <g className="home-cart-breeze"><path d="M14 76h31c9 0 15 4 19 11" /><path d="M8 97h39c9 0 15 4 19 11" /><path d="M19 118h28c9 0 15 4 19 11" /></g>
        <g className="home-cart-motion"><circle className="home-cart-accent" cx="165" cy="61" r="25" /><path className="home-cart-line" d="M63 56h27c8 0 13 5 15 15l15 68c3 13 10 20 24 20h39c14 0 22-6 25-20l13-57H105" /><path className="home-cart-line" d="M108 139h76" /><path className="home-cart-line home-cart-handle" d="M42 56h21" /><g className="home-cart-wheel"><circle className="home-cart-line" cx="127" cy="177" r="13" /><path className="home-cart-spoke" d="M114 177h26M127 164v26" /></g><g className="home-cart-wheel home-cart-wheel-right"><circle className="home-cart-line" cx="181" cy="177" r="13" /><path className="home-cart-spoke" d="M168 177h26M181 164v26" /></g><path className="home-cart-ground" d="M83 187c36 5 90 5 126 0" /></g>
      </svg>
    </div>
  );
}

export default function HomeRewardCards({ cards }) {
  const sketches = [GiftSketch, TokenSketch, CartSketch];
  const variants = ['gift', 'token', 'panel'];
  return (
    <div className="home-reward-grid">
      {cards.map(([kicker, title, body], index) => {
        const Sketch = sketches[index];
        return (
          <article className={`home-reward-card home-reward-${variants[index]}`} key={title}>
            <div className="home-reward-art"><Sketch /></div>
            <div className="home-reward-copy"><span>{kicker}</span><h3>{title}</h3><p>{body}</p></div>
          </article>
        );
      })}
    </div>
  );
}
