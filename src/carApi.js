

export async function getCars() {
    const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data._embedded.cars;
};

export async function deleteCar(car) {
    const response = await fetch(car._links.car.href, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
};
//add funktio
export async function addCar(car){
    const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
        method: 'POST', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(car),
    });
    if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
}
export async function updateCar(url,car){
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(car),
    });
    if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
}