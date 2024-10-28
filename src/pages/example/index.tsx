import Accordion from "@/components/Accordion";
import { CardProps, Pool2Collection } from "@/components/Card";
import CardGallery from "@/components/CardGallery";
import snapCards from "@/resources/snap_cards.json";

export default function Home() {
  const groupedCards = snapCards
    .filter((card) => Number(card.pool) > 4)
    .reduce((groups, card) => {
      const pool = card.pool;
      if (!groups[pool]) {
        groups[pool] = [];
      }
      groups[pool].push({
        name: card.name,
        src: card.src,
        collection: Pool2Collection(pool),
        tier: 1,
      });

      return groups;
    }, {} as Record<string, CardProps[]>);

  const sortedGroups = Object.entries(groupedCards).sort(
    ([poolA], [poolB]) => Number(poolA) - Number(poolB)
  );

  return (
    <div className="container mx-auto px-4 space-y-4">
      {sortedGroups.map(([pool, cards]) => (
        <Accordion key={pool} title={Pool2Collection(pool)} cards={cards}>
          <CardGallery cards={cards} />
        </Accordion>
      ))}
    </div>
  );
}
