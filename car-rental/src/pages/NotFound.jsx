import { Alert, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Stack spacing={2} alignItems="start">
      <Alert severity="warning">Page not found.</Alert>
      <Button component={Link} to="/" variant="contained">Go Home</Button>
    </Stack>
  )
}
