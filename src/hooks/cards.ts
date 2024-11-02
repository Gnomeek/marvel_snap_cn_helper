import { Collection } from "@/utils/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum CardStateEnum {
  OBTAINED = "OBTAINED",
  VARIANT_ONLY = "VARIANT_ONLY",
  NOT_OBTAINED = "NOT_OBTAINED",
}

export function cardStateEnumToString(cardState: CardStateEnum) {
  return cardState === CardStateEnum.OBTAINED ? "已拥有" : cardState === CardStateEnum.VARIANT_ONLY ? "仅拥有变体" : "未拥有";
}

type cardState = {
  cardStates: Map<string, CardStateEnum>;
  groupBy: string;
  selectedCollections: Collection[];
  selectedCardState: CardStateEnum[];
};

export type cardActions = {
  setCardState: (cardName: string, state: CardStateEnum) => void;
  setObtained: (cardNames: string[]) => void;
  setGroupBy: (groupBy: string) => void;
  setCollections: (collections: Collection[]) => void;
  setSelectedCardState: (selectedCardState: CardStateEnum[]) => void;
  reset: () => void;
};

export type CardState = cardState & cardActions;

const initialState: cardState = {
  cardStates: new Map<string, CardStateEnum>(),
  groupBy: "collection",
  selectedCollections: ["三池", "四池", "五池"],
  selectedCardState: [CardStateEnum.OBTAINED, CardStateEnum.VARIANT_ONLY, CardStateEnum.NOT_OBTAINED],
};

export const useCardState = create<CardState>()(
  devtools(
    (set) => ({
      ...initialState,
      setCardState: (cardName: string, cardState: CardStateEnum) => {
        set(
          (state) => ({
            cardStates: new Map(state.cardStates).set(cardName, cardState),
          }),
          undefined,
          "setCardState"
        );
      },
      setObtained: (cardNames: string[]) => {
        set(
          (state) => {
            const res = new Map(state.cardStates);
            cardNames.forEach((cardName) => {
              res.set(cardName, CardStateEnum.OBTAINED);
            });
            return {
              cardStates: res,
            };
          },
          undefined,
          "setObtained"
        );
      },
      setGroupBy: (groupBy: string) => {
        set({ groupBy: groupBy }, undefined, "setGroupBy");
      },
      setCollections: (collections: Collection[]) => {
        set({ selectedCollections: collections }, undefined, "setCollections");
      },
      setSelectedCardState: (selectedCardState: CardStateEnum[]) => {
        set({ selectedCardState: selectedCardState }, undefined, "setSelectedCardState");
      },
      reset: () => set(initialState, undefined, "reset"),
    }),
    {
      name: "CardState",
      store: "CardState",
      enabled: process.env.NODE_ENV !== "production",
    }
  )
);
