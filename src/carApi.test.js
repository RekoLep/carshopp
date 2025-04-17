import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { getCars, deleteCar } from './carApi';

describe("Car rest api", () => {

    beforeEach(() => {
        return resetDatabase();
    });

    afterEach(() => {
        return resetDatabase();
    });

    test("fetching all cars", async () => {
        const cars = await getCars();
        expect(cars.length).toBeGreaterThan(1);
    });

    test("deleting a car", async () => {
        const carsBefore = await getCars();
        expect(carsBefore.length).toBeGreaterThan(1);

        const carToDelete = carsBefore.at(0);
        const success = await deleteCar(carToDelete);
        expect(success).toBe(true);

        const carsAfter = await getCars();

        expect(carsAfter.length).toBe(carsBefore.length - 1);
        expect(carsAfter).not.toContainEqual(carToDelete);
        expect(carsAfter.at(0)).toEqual(carsBefore.at(1));
    });
});


async function resetDatabase() {
    const response = await fetch("https://car-rest-service-carshop.2.rahtiapp.fi/reset", { method: "POST" });
    return response.ok;
}