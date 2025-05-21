import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const tileImages = [
  {
    id: 1,
    name: 'Classic White',
    image: 'https://via.placeholder.com/300x300?text=Classic+White',
    price: 25.99,
    size: '12x12',
  },
  {
    id: 2,
    name: 'Modern Gray',
    image: 'https://via.placeholder.com/300x300?text=Modern+Gray',
    price: 29.99,
    size: '12x12',
  },
  {
    id: 3,
    name: 'Elegant Beige',
    image: 'https://via.placeholder.com/300x300?text=Elegant+Beige',
    price: 27.99,
    size: '12x12',
  },
  {
    id: 4,
    name: 'Pattern Blue',
    image: 'https://via.placeholder.com/300x300?text=Pattern+Blue',
    price: 32.99,
    size: '12x12',
  },
];

const CeramicTiles = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Ceramic Tiles Collection
      </Typography>
      
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Gallery
      </Typography>
      <Grid container spacing={3}>
        {tileImages.map((tile) => (
          <Grid item xs={12} sm={6} md={3} key={tile.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={tile.image}
                alt={tile.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {tile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Size: {tile.size}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${tile.price}/sq ft
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Pricing Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tile Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Price per sq ft</TableCell>
              <TableCell>Box Coverage</TableCell>
              <TableCell>Box Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tileImages.map((tile) => (
              <TableRow key={tile.id}>
                <TableCell>{tile.name}</TableCell>
                <TableCell>{tile.size}</TableCell>
                <TableCell>${tile.price}</TableCell>
                <TableCell>20 sq ft</TableCell>
                <TableCell>${(tile.price * 20).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CeramicTiles; 