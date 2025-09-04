import { Box, Container, Link as MuiLink, Typography } from '@mui/material'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 4, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">© {year} SwiftRent</Typography>
        <MuiLink href="https://react.dev" target="_blank" rel="noreferrer" underline="hover">
          Built with React + MUI
        </MuiLink>
      </Container>
    </Box>
  )
}
