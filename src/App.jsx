import { useEffect, useState } from "react";
import { CarTable } from "./CarTable";
import { AppBar, Toolbar, Typography, CssBaseline, Stack } from '@mui/material';
import { getCars, deleteCar } from "./carApi";
import DeleteDialog from "./DeleteDialog";


export default function App() {
  const [cars, setCars] = useState([]);

  // when a car is being deleted, it is temporarily store here
  const [rmCar, setRmCar] = useState(null);

  async function confirmDelete(car) {
    const success = await deleteCar(car);
    if (!success) {
      console.error("removing failed");
    }
    setRmCar(null);
    setCars(await getCars());
  }

  async function loadCars() {
    setCars(await getCars());
  }
  useEffect(() => {
    getCars().then(carArray => setCars(carArray))
  }, []);

  return <>
    <CssBaseline />
    <Stack flexDirection="column" minHeight="100vh">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" component="h1">
            Car shop 🛻
          </Typography>
        </Toolbar>
      </AppBar>

      <CarTable cars={cars} removeCar={car => setRmCar(car) }loadCars={loadCars} />

      {rmCar && <DeleteDialog car={rmCar} ok={confirmDelete} cancel={() => setRmCar(null)} />}
    </Stack>
  </>
}
