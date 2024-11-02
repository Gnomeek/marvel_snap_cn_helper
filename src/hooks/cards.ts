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
  setObtained: (cardNames: string[], state: CardStateEnum) => void;
  setGroupBy: (groupBy: string) => void;
  setCollections: (collections: Collection[]) => void;
  setSelectedCardState: (selectedCardState: CardStateEnum[]) => void;
  reset: () => void;
};

export type CardState = cardState & cardActions;

const STORAGE_KEY = 'card-states';

const getInitialState: () => Map<string, CardStateEnum> = () => {
  if (typeof window === 'undefined') return new Map<string, CardStateEnum>();
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return new Map<string, CardStateEnum>();
  
  try {
    const parsed = JSON.parse(saved);
    return new Map(parsed);
  } catch (e) {
    console.error('Failed to parse card states:', e);
    return new Map<string, CardStateEnum>();
  }
};

const initialState: cardState = {
  cardStates: getInitialState(),
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
          (state) => {
            const newStates = new Map(state.cardStates).set(cardName, cardState);
            if (typeof window !== 'undefined') {
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(Array.from(newStates.entries()))
              );
            }
            return {
              cardStates: newStates,
            };
          },
          undefined,
          "setCardState"
        );
      },
      setObtained: (cardNames: string[], s: CardStateEnum) => {
        set(
          (state) => {
            const res = new Map(state.cardStates);
            cardNames.forEach((cardName) => {
              res.set(cardName, s);
            });
            if (typeof window !== 'undefined') {
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(Array.from(res.entries()))
              );
            }
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
