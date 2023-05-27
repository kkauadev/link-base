export const loadingCards = () => {
  const cards = [];
  for (let i = 0; i < 3; i++) {
    cards.push(
      <li
        key={i}
        className="h-28 max-w-5xl w-full bg-tertiary p-4 rounded animate-pulse"
      />
    );
  }
  return cards;
};
