import { AppBar, Typography, Toolbar, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Snap Tracker
          </Typography>
          <a 
            href="https://github.com/Gnomeek/marvel_snap_cn_helper"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit' }}
          >
            <GitHubIcon />
          </a>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: "12px", flexGrow: 1, overflow: "auto" }}>
        {children}
      </Box>
    </Box>
  );
}
