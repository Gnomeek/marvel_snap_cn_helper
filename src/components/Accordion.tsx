import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grid from "@mui/material/Grid2";
import Card, { CardProps } from "./Card";
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { CardStateEnum, useCardState } from "@/hooks/cards";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  SxProps,
  Theme,
  Typography,
  Stack,
} from "@mui/material";
import { getOrDefault } from "@/utils/utils";

export type AccordionProps = {
  title: string;
  cards: CardProps[];
  defaultOpen?: boolean;
};

export default function Accordion({
  title,
  cards,
  defaultOpen = true,
}: AccordionProps) {
  const [isClient, setIsClient] = useState(false);

  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { setObtained, cardStates, selectedCardState } = useCardState(
    useShallow((state) => ({
      setObtained: state.setObtained,
      cardStates: state.cardStates,
      selectedCardState: state.selectedCardState,
    }))
  );

  const styles: { [key: string]: SxProps<Theme> } = useMemo(
    () => ({
      titleContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "12px",
      },
    }),
    []
  );

  const obtainedCount = useMemo(() => {
    if (!isClient) return 0;
    let cnt = 0;
    cardStates.forEach((v, k) => {
      if (
        v === CardStateEnum.OBTAINED &&
        cards.map((c) => c.name).includes(k)
      ) {
        cnt++;
      }
    });
    return cnt;
  }, [cardStates, cards, isClient]);
  const variantCount = useMemo(() => {
    if (!isClient) return 0;
    let cnt = 0;
    cardStates.forEach((v, k) => {
      if (
        v === CardStateEnum.VARIANT_ONLY &&
        cards.map((c) => c.name).includes(k)
      ) {
        cnt++;
      }
    });
    return cnt;
  }, [cardStates, cards, isClient]);

  return (
    <MuiAccordion
      expanded={isOpen}
      onChange={(_, expanded) => {
        setIsOpen(expanded);
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        id={`${title}-header`}
        sx={styles.titleContainer}
      >
        <Stack direction="row" spacing={2} className="control-buttons">
          <Typography fontSize={"24px"}>{title}</Typography>
          <Typography fontSize={"24px"}>{`${obtainedCount}/${variantCount}/${
            cards.length - obtainedCount - variantCount
          }`}</Typography>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setObtained(
                cards.map((card) => card.name),
                CardStateEnum.OBTAINED
              );
              setIsOpen(true);
            }}
          >
            添加全部
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setObtained(
                cards.map((card) => card.name),
                CardStateEnum.NOT_OBTAINED
              );
              setIsOpen(true);
            }}
          >
            删除全部
          </Button>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {cards.map((card, index) => {
            const status = getOrDefault(
              cardStates,
              card.name,
              CardStateEnum.NOT_OBTAINED
            );
            const isSelected = selectedCardState.includes(status);
            return (
              isSelected && (
                <Grid key={index} size={{ xs: 4, sm: 3, md: 2, lg: 1 }}>
                  <Card {...card} />
                </Grid>
              )
            );
          })}
        </Grid>
      </AccordionDetails>
    </MuiAccordion>
  );
}
