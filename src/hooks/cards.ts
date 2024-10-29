import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum CardStateEnum {
  OBTAINED = "OBTAINED",
  VARIANT_ONLY = "VARIANT_ONLY",
  NOT_OBTAINED = "NOT_OBTAINED",
}

type cardState = {
  cardStates: Map<string, CardStateEnum>;
};

export type cardActions = {
  setCardState: (cardName: string, state: CardStateEnum) => void;
  setObtained: (cardNames: string[]) => void;
  reset: () => void;
};

export type CardState = cardState & cardActions;

const initialState: cardState = {
  cardStates: new Map<string, CardStateEnum>(),
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
      reset: () => set(initialState, undefined, "reset"),
    }),
    {
      name: "CardState",
      store: "CardState",
      enabled: process.env.NODE_ENV !== "production",
    }
  )
);
