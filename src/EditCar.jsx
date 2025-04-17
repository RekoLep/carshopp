
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

export default function EditCar(props) {

    //state variable where you put car data
    const [car, setCar] = useState(props.params.data);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        console.log("save");
        console.log(car._links.car.href);
        await props.updateCar(car._links.car.href, car);
        setOpen(false);
        props.loadCars();
    }
    return (
        <>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>

                
                <DialogTitle>Update Car</DialogTitle>

                <DialogContent>

                    <TextField label="Brand" value={car.brand} onChange={(event) => setCar({ ...car, brand: event.target.value })}>

                    </TextField>
                    <TextField label="Model" value={car.model} onChange={(event) => setCar({ ...car, model: event.target.value })}>

                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
