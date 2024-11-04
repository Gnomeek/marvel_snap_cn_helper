import {
  CardStateEnum,
  cardStateEnumToString,
  useCardState,
} from "@/hooks/cards";
import Grid from "@mui/material/Grid2";
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
  Alert,
  Typography,
} from "@mui/material";
import { useShallow } from "zustand/shallow";
import { useMemo, useRef } from "react";
import { Collection } from "@/utils/types";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  // const [isSharing, setIsSharing] = useState(false);

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
        // justifyContent: "space-between",
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
      selectedValues: {
        ".MuiSelect-select": {
          textAlign: "left",
        },
      },
    }),
    []
  );

  // const handleShare = async () => {
  //   setIsSharing(true);
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   setIsSharing(false);
  // };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.controlBar}>
        <Box sx={styles.leftControls}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 12, md: 2.5, lg: 2.5 }}>
              <FormControl fullWidth>
                <InputLabel>分组种类</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={groupBy}
                  label="Group By"
                  onChange={(e) => setGroupBy(e.target.value)}
                  sx={styles.selectedValues}
                >
                  <MenuItem value={"collection"}>卡池</MenuItem>
                  <MenuItem value={"tier"}>评级</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4.5, lg: 4.5 }}>
              <FormControl fullWidth>
                <InputLabel>卡池</InputLabel>
                <Select
                  multiple
                  value={collections}
                  onChange={(e) =>
                    setCollections(e.target.value as Collection[])
                  }
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  sx={styles.selectedValues}
                >
                  {availableCollections.map((c) => (
                    <MenuItem key={c} value={c}>
                      <Checkbox checked={collections.includes(c)} />
                      <ListItemText primary={c} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 5, lg: 5 }}>
              <FormControl fullWidth>
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
                  sx={styles.selectedValues}
                >
                  {Object.values(CardStateEnum).map((c) => (
                    <MenuItem key={c} value={c}>
                      <Checkbox checked={selectedCardState.includes(c)} />
                      <ListItemText primary={cardStateEnumToString(c)} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box sx={styles.rightControls}>
          {/* <Tooltip title="开发中">
            <IconButton onClick={handleShare} disabled={isSharing}>
              <ShareIcon />
            </IconButton>
          </Tooltip> */}
        </Box>
      </Box>
      <Alert severity="info">
        <Typography>点击卡片来切换拥有状态</Typography>
        <Typography>
          蓝色，绿色，白色分别代表仅拥有变体，已拥有，未拥有
        </Typography>
        <Typography>
          💩😑😯🤩😍分别代表1-5星评分，评分来自B站up小橘子
        </Typography>
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
