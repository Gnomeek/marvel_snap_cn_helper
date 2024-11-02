import Accordion from "@/components/Accordion";
import { groupedCards, groupedCardsTitle } from "@/utils/utils";
import { Stack } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [groupBy, setGroupBy] = useState("tier");
  const sortedGroups = groupedCards(
    groupBy
  );

  return (
    <Stack spacing={2}>
      {sortedGroups.map(([key, cards]) => (
        <Accordion key={key} title={groupedCardsTitle(groupBy, key)} cards={cards}>
        </Accordion>
      ))}
    </Stack>
  );
}
