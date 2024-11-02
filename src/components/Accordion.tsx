import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grid from "@mui/material/Grid2";
import Card, { CardProps } from "./Card";
import { useMemo, useState } from "react";
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

export type AccordionProps = {
  title: string;
  cards: CardProps[];
  defaultOpen?: boolean;
};

export default function Accordion({
  title,
  cards,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const { setObtained } = useCardState(
    useShallow((state) => ({
      setObtained: state.setObtained,
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
        <Stack direction="row" spacing={2}>
          <Typography fontSize={"24px"}>{title}</Typography>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setObtained(cards.map((card) => card.name), CardStateEnum.OBTAINED);
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
              setObtained(cards.map((card) => card.name), CardStateEnum.NOT_OBTAINED);
              setIsOpen(true);
            }}
          >
            删除全部
          </Button>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {cards.map((card, index) => (
            <Grid key={index} size={{ xs: 6, sm: 3, md: 2, lg: 1.5 }}>
              <Card {...card} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </MuiAccordion>
  );
}
