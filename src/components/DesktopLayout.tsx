import { AppBar, Typography, Toolbar, Box } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh"
    }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Snap</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: "12px", flexGrow: 1, overflow: "auto" }}>
        {children}
      </Box>
    </Box>
  );
}
