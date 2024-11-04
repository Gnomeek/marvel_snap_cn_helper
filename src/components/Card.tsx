import { Collection } from "@/utils/types";
import { getOrDefault, getTierStars } from "@/utils/utils";
import {
  Card as MuiCard,
  CardActionArea,
  CardContent,
  CardMedia,
  SxProps,
  Theme,
  Typography,
  Chip,
} from "@mui/material";
import { useCallback, useMemo, useEffect, useState } from "react";
import { blue, green } from "@mui/material/colors";
import { CardStateEnum, useCardState } from "@/hooks/cards";
import { useShallow } from "zustand/shallow";

export type CardProps = {
  name: string;
  src: string;
  collection: Collection;
  tier?: number;
};

export default function Card({ name, src, collection, tier }: CardProps) {
  const [isClient, setIsClient] = useState(false);
  const { cardStates, setCardState } = useCardState(
    useShallow((state) => ({
      cardStates: state.cardStates,
      setCardState: state.setCardState,
    }))
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const status = useMemo(() => {
    return getOrDefault(cardStates, name, CardStateEnum.NOT_OBTAINED);
  }, [cardStates, name]);

  const backgroundColor = isClient
    ? status === CardStateEnum.OBTAINED
      ? green[300]
      : status === CardStateEnum.VARIANT_ONLY
      ? blue[300]
      : "white"
    : "white";

  const greyScale = isClient
    ? status === CardStateEnum.NOT_OBTAINED
      ? "grayscale(100%)"
      : "none"
    : "none";

  const styles: { [key: string]: SxProps<Theme> } = useMemo(
    () => ({
      container: {
        backgroundColor: backgroundColor,
      },
      cardContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
      },
      cardMedia: {
        filter: greyScale,
      },
    }),
    [backgroundColor, greyScale]
  );

  const tierStars = useMemo(() => getTierStars(tier), [tier]);

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
    <MuiCard sx={styles.container}>
      <CardActionArea onClick={() => onClickHandler(name)}>
        <CardMedia
          component="img"
          image={src}
          alt={name}
          sx={styles.cardMedia}
        ></CardMedia>
        <CardContent sx={styles.cardContent}>
          <Chip label={collection} size="small" color="primary" />
          <Typography fontSize={"20px"}>{tierStars}</Typography>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
}
