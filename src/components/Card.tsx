import Image from "next/image";
import CollectionTag from "@/components/CollectionTag";
import { CardStateEnum, useCardState } from "@/hooks/cards";
import { useShallow } from "zustand/shallow";
import { useCallback, useMemo } from "react";

const collection = ["新手", "一池", "二池", "三池", "四池", "五池"];

export type Collection = (typeof collection)[number];

export const Pool2Collection = (pool: string): Collection => {
  if (["0", "1", "2"].includes(pool)) {
    return collection[0];
  }
  return collection[Number(pool) - 2];
};

export type CardProps = {
  name: string;
  src: string;
  collection: Collection;
  tier?: number;
};

export default function Card({ name, src, collection, tier }: CardProps) {
  const { cardStates, setCardState } = useCardState(
    useShallow((state) => ({
      cardStates: state.cardStates,
      setCardState: state.setCardState,
    }))
  );

  const status = useMemo(() => {
    if (!cardStates.has(name)) {
      return CardStateEnum.NOT_OBTAINED;
    }
    return cardStates.get(name);
  }, [cardStates, name]);

  const getStatusColor = () => {
    switch (status) {
      case CardStateEnum.OBTAINED:
        return "bg-green-300";
      case CardStateEnum.VARIANT_ONLY:
        return "bg-blue-300";
      default:
        return "bg-white";
    }
  };

  const getTierStars = useCallback((tier?: number) => {
    if (!tier) return "";
    return "⭐".repeat(tier);
  }, []);

  const onClickHandler = useCallback(
    (cardName: string) => {
      if (cardStates.get(cardName) === CardStateEnum.OBTAINED) {
        setCardState(cardName, CardStateEnum.VARIANT_ONLY);
      } else if (cardStates.get(cardName) === CardStateEnum.VARIANT_ONLY) {
        setCardState(cardName, CardStateEnum.NOT_OBTAINED);
      } else {
        setCardState(cardName, CardStateEnum.OBTAINED);
      }
    },
    [cardStates, setCardState]
  );

  return (
    <div
      className={`w-full max-w-[180px] rounded-lg overflow-hidden shadow-lg ${getStatusColor()}`}
    >
      <div
        className="aspect-[3/4] relative"
        onClick={() => onClickHandler(name)}
      >
        <div
          className={`w-full h-full relative ${
            status === CardStateEnum.NOT_OBTAINED ? "grayscale" : ""
          }`}
        >
          <Image
            src={src}
            alt={name}
            fill={true}
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="p-2 flex justify-between items-center">
        <div className="text-sm">
          <CollectionTag collection={collection} />
        </div>
        <div className="text-sm text-right">{getTierStars(tier)}</div>
      </div>
    </div>
  );
}
