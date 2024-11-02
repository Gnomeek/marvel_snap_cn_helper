import Accordion from "@/components/Accordion";
import AppLayout from "@/components/AppLayout";
import { useCardState } from "@/hooks/cards";
import { groupedCards, groupedCardsTitle } from "@/utils/utils";
import { Stack } from "@mui/material";
import { useShallow } from "zustand/shallow";

export default function Home() {
  const { groupBy, selectedCollections, selectedCardState } = useCardState(
    useShallow((state) => ({
      groupBy: state.groupBy,
      selectedCollections: state.selectedCollections,
      selectedCardState: state.selectedCardState,
    }))
  );
  const sortedGroups = groupedCards(groupBy, selectedCollections, selectedCardState);
  return (
    <AppLayout>
    <Stack spacing={2}>
      {sortedGroups.map(([key, cards]) => (
        <Accordion key={key} title={groupedCardsTitle(groupBy, key)} cards={cards}>
        </Accordion>
      ))}
      </Stack>
    </AppLayout>
  );
}
