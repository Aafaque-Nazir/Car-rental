import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { cars } from '../data/cars'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
  Alert,
} from '@mui/material'
import { useLocalStorage } from '../hooks/useLocalStorage'

function daysBetween(a, b) {
  const ms = 1000 * 60 * 60 * 24
  const start = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime()
  const end = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()
  return Math.max(0, Math.round((end - start) / ms)) || 1
}

export default function Booking() {
  const { carId } = useParams()
  const car = cars.find(c => c.id === carId)
  const [bookings, setBookings] = useLocalStorage('bookings', [])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(() => new Date(Date.now() + 86400000))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const numDays = useMemo(() => daysBetween(startDate, endDate), [startDate, endDate])
  const total = useMemo(() => car ? numDays * car.pricePerDay : 0, [car, numDays])

  if (!car) return <Alert severity="error">Car not found.</Alert>

  const onSubmit = (e) => {
    e.preventDefault()
    const record = {
      id: `${car.id}-${Date.now()}`,
      carId: car.id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      name,
      email,
      total,
    }
    setBookings(prev => [record, ...prev])
    setSubmitted(true)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="220" image={car.image} alt={`${car.brand} ${car.model}`} />
            <CardContent>
              <Typography variant="h5" gutterBottom>{car.brand} {car.model}</Typography>
              <Typography variant="body2" color="text.secondary">{car.type} • {car.transmission} • {car.seats} seats</Typography>
              <Typography sx={{ mt: 1 }}><b>${car.pricePerDay}</b> per day</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          {submitted ? (
            <Alert severity="success">Booking confirmed for {name}. Confirmation sent to {email}. Total: ${total}</Alert>
          ) : (
            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <DatePicker label="Start date" value={startDate} onChange={setStartDate} slotProps={{ textField: { fullWidth: true } }} />
                  <DatePicker label="End date" value={endDate} onChange={setEndDate} slotProps={{ textField: { fullWidth: true } }} />
                </Stack>
                <TextField required label="Full name" value={name} onChange={e => setName(e.target.value)} fullWidth />
                <TextField required type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
                <Typography>Days: {numDays} • Total: <b>${total}</b></Typography>
                <Button type="submit" variant="contained" size="large">Confirm Booking</Button>
              </Stack>
            </Box>
          )}
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}
