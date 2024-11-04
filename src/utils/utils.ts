import { collection, Collection } from "@/utils/types";
import snapCards from "@/resources/snap_cards.json";
import tierMapping from "@/resources/tier_mapping.json";
import { CardProps } from "@/components/Card";

export const availableCards = snapCards.map((card) => card.name);

export const poolToCollection = (pool: string): Collection => {
  if (["0", "1", "2"].includes(pool)) {
    return collection[0];
  }
  return collection[Number(pool) - 2];
};

export const getTierStars = (tier?: number) => {
  switch (tier) {
    case 1:
      return "💩";
    case 2:
      return "😑";
    case 3:
      return "😯";
    case 4:
      return "🤩";
    case 5:
      return "😍";
    default:
      return "❓";
  }
};

export const groupedCards = (groupby: string, selectedCollections: Collection[]) => {
  const snapCardsWithTier = snapCards.map((card) => {
    return {
      ...card,
      tier:
        card.name in tierMapping
          ? tierMapping[card.name as keyof typeof tierMapping]
          : 0,
    };
  });
  const groupedCards = snapCardsWithTier
    .filter((card) => Number(card.pool) > 4)
    .filter((card) => selectedCollections.includes(poolToCollection(card.pool)))
    .reduce((groups, card) => {
      const groupBy = groupby === "tier" ? card.tier : card.pool;
      if (!groups[groupBy]) {
        groups[groupBy] = [];
      }
      groups[groupBy].push({
        name: card.name,
        src: card.src,
        collection: poolToCollection(card.pool),
        tier: card.tier,
      });

      return groups;
    }, {} as Record<string, CardProps[]>);
  const sortedGroups = Object.entries(groupedCards).sort(
    ([a], [b]) => Number(a) - Number(b)
  );
  return sortedGroups;
};

export const groupedCardsTitle = (groupby: string, key: string) => {
  return groupby === "tier" ? getTierStars(Number(key)) : poolToCollection(key);
};

export function getOrDefault<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
  return map.has(key) ? map.get(key)! : defaultValue;
}