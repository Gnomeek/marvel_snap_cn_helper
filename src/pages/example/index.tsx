import Accordion from "@/components/Accordion";
import CardGallery from "@/components/CardGallery";
import { groupedCards, groupedCardsTitle } from "@/utils/utils";
import { useState } from "react";

export default function Home() {
  const [groupBy, setGroupBy] = useState("tier");
  const sortedGroups = groupedCards(
    groupBy
  );

  return (
    <div className="container mx-auto px-4 space-y-4">
      {sortedGroups.map(([key, cards]) => (
        <Accordion key={key} title={groupedCardsTitle(groupBy, key)} cards={cards}>
          <CardGallery cards={cards} />
        </Accordion>
      ))}
    </div>
  );
}
