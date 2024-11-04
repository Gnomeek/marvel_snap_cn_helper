import {
  CardStateEnum,
  cardStateEnumToString,
  useCardState,
} from "@/hooks/cards";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  SxProps,
  OutlinedInput,
  ListItemText,
  Checkbox,
  Tooltip,
  Alert,
  Typography,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useMemo, useRef, useState } from "react";
import { Collection } from "@/utils/types";
import ShareIcon from "@mui/icons-material/Share";
import { IconButton } from "@mui/material";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

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

  const handleShare = async () => {
    setIsSharing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSharing(false);
  };

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
          <Tooltip title="开发中">
            <IconButton onClick={handleShare} disabled={isSharing}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Alert severity="info">
        <Typography>蓝色代表仅拥有变体，绿色代表已拥有，灰色代表未拥有</Typography>
        <Typography>点击卡片来切换拥有状态</Typography>
        <Typography>💩😑😯🤩😍分别代表1-5星评分，评分来自B站up小橘子</Typography>
      </Alert>
      <Box ref={contentRef}>{children}</Box>
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
