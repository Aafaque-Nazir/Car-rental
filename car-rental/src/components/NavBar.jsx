import { AppBar, Badge, Box, Container, IconButton, Toolbar, Typography } from '@mui/material'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function NavBar() {
  const [favorites] = useLocalStorage('favorites', [])

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <DirectionsCarFilledIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}
            >
              SwiftRent
            </Typography>
          </Box>
          <IconButton component={Link} to="/" color="inherit" aria-label="favorites">
            <Badge badgeContent={favorites.length} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
