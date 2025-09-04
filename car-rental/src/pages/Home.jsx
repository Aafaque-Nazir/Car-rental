import { useMemo, useState } from 'react'
import { brands, cars, types } from '../data/cars'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Button,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SortIcon from '@mui/icons-material/Sort'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Home() {
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState('price-asc')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    let list = cars
    if (query) {
      const q = query.toLowerCase()
      list = list.filter(c => `${c.brand} ${c.model}`.toLowerCase().includes(q))
    }
    if (brand) list = list.filter(c => c.brand === brand)
    if (type) list = list.filter(c => c.type === type)
    const sorted = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.pricePerDay - b.pricePerDay
      if (sort === 'price-desc') return b.pricePerDay - a.pricePerDay
      return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
    })
    return sorted
  }, [query, brand, type, sort])

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField fullWidth label="Search cars" value={query} onChange={e => setQuery(e.target.value)} />
        <Box sx={{ minWidth: 160 }}>
          <InputLabel id="brand-label">Brand</InputLabel>
          <Select fullWidth labelId="brand-label" value={brand} label="Brand" onChange={e => setBrand(e.target.value)}>
            <MenuItem value=""><em>Any</em></MenuItem>
            {brands.map(b => (
              <MenuItem key={b} value={b}>{b}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ minWidth: 160 }}>
          <InputLabel id="type-label">Type</InputLabel>
          <Select fullWidth labelId="type-label" value={type} label="Type" onChange={e => setType(e.target.value)}>
            <MenuItem value=""><em>Any</em></MenuItem>
            {types.map(t => (
              <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ minWidth: 180 }}>
          <InputLabel id="sort-label"><SortIcon sx={{ mr: 1, verticalAlign: 'middle' }} />Sort</InputLabel>
          <Select fullWidth labelId="sort-label" value={sort} label="Sort" onChange={e => setSort(e.target.value)}>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {filtered.map(car => {
          const isFav = favorites.includes(car.id)
          return (
            <Grid key={car.id} item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia component="img" height="160" image={car.image} alt={`${car.brand} ${car.model}`} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="start">
                    <Box>
                      <Typography variant="h6">{car.brand} {car.model}</Typography>
                      <Typography variant="body2" color="text.secondary">{car.transmission} • {car.seats} seats</Typography>
                    </Box>
                    <Chip color="primary" label={`$${car.pricePerDay}/day`} />
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip size="small" label={car.type} />
                  </Stack>
                </CardContent>
                <CardActions>
                  <IconButton color={isFav ? 'error' : 'default'} onClick={() => toggleFavorite(car.id)}>
                    {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <Button size="small" component={RouterLink} to={`/booking/${car.id}`} variant="contained">Book</Button>
                  <Button size="small" onClick={() => navigate(`/booking/${car.id}`)}>Details</Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
