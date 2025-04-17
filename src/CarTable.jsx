import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import AddCar from "./AddCar";
import { addCar, updateCar } from "./carApi";
import EditCar from "./EditCar";

ModuleRegistry.registerModules([AllCommunityModule]);

export function CarTable({ cars, removeCar, loadCars }) {

  const colDefs = useMemo(() => [
    { field: "brand" },
    { field: "model" },
    { field: "color" },
    { field: "fuel" },
    { field: "modelYear" },
    { field: "price" },
    {
      cellRenderer: (params) => <EditCar
      updateCar={updateCar}
      params= {params}
      />
    },
    {
      cellRenderer: (params) => {
        const car = params.data;
        return <Button
          variant="outlined" size="small" color="error"
          onClick={() => removeCar(car)}
        >
          Delete
        </Button>
      },
      width: 120,
    },
  ], []);

  return (
    <Stack sx={{ display: "flex", flexGrow: 1, flexDirection: "column", gap: 2, padding: 2 }}>
      <Typography variant="h6">Cars ({cars.length})</Typography>
      <AddCar addCar={addCar} loadCars = {loadCars}/>
      <Box sx={{ flexGrow: 1, width: "100%", height: 100 }}>
        
        <AgGridReact rowData={cars} columnDefs={colDefs} />
      </Box>
    </Stack >
  );
}