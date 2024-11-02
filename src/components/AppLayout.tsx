import {
  CardStateEnum,
  cardStateEnumToString,
  useCardState,
} from "@/hooks/cards";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  SxProps,
  OutlinedInput,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useMemo } from "react";
import { Collection } from "@/utils/types";
import ShareIcon from "@mui/icons-material/Share";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const {
    groupBy,
    setGroupBy,
    collections,
    setCollections,
    selectedCardState,
    setSelectedCardState,
  } = useCardState(
    useShallow((state) => ({
      groupBy: state.groupBy,
      setGroupBy: state.setGroupBy,
      collections: state.selectedCollections,
      setCollections: state.setCollections,
      selectedCardState: state.selectedCardState,
      setSelectedCardState: state.setSelectedCardState,
    }))
  );

  const styles: { [key: string]: SxProps<Theme> } = useMemo(
    () => ({
      container: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        padding: "12px",
        gap: "12px",
        border: "2px solid #e0e0e0",
        height: "90%",
      },
      controlBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
      },
      leftControls: {
        display: "flex",
        gap: "12px",
      },
      rightControls: {
        display: "flex",
        gap: "12px",
      },
    }),
    []
  );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.controlBar}>
        <Box sx={styles.leftControls}>
          <FormControl sx={{ width: 100 }}>
            <InputLabel>分组种类</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={groupBy}
              label="Group By"
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <MenuItem value={"collection"}>卡池</MenuItem>
              <MenuItem value={"tier"}>评级</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 200 }}>
            <InputLabel>卡池</InputLabel>
            <Select
              multiple
              value={collections}
              onChange={(e) => setCollections(e.target.value as Collection[])}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {availableCollections.map((c) => (
                <MenuItem key={c} value={c}>
                  <Checkbox checked={collections.includes(c)} />
                  <ListItemText primary={c} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 200 }}>
            <InputLabel>拥有状态</InputLabel>
            <Select
              multiple
              value={selectedCardState}
              onChange={(e) =>
                setSelectedCardState(e.target.value as CardStateEnum[])
              }
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) =>
                selected.map(cardStateEnumToString).join(", ")
              }
              MenuProps={MenuProps}
            >
              {Object.values(CardStateEnum).map((c) => (
                <MenuItem key={c} value={c}>
                  <Checkbox checked={selectedCardState.includes(c)} />
                  <ListItemText primary={cardStateEnumToString(c)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={styles.rightControls}>
          <ShareIcon />
        </Box>
      </Box>
      <Divider />
      <Box>{children}</Box>
    </Box>
  );
}

const availableCollections = ["三池", "四池", "五池"];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
