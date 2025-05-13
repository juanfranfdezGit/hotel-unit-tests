import Booking from "./Booking";

export default class Room {

    name: string;
    rate: number;
    discount: number;
    bookings: Booking[];

    constructor(name: string, rate: number, discount: number) {
        this.name = name;
        this.rate = rate;
        this.discount = discount;
        this.bookings = [];
    }

    isOccupied(date: Date): boolean {
        return this.bookings.some(
            (booking) => date >= booking.checkIn && date <= booking.checkOut
        );
     }

    occupancyPercentage(startDate: Date, endDate: Date): number {

        const totalDays =
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
        let occupiedDays = 0;

        for (
            let d = new Date(startDate);
            d <= endDate;
            d.setDate(d.getDate() + 1)
        ) {
            if (this.isOccupied(new Date(d))) {
                occupiedDays++;
            }
        }

        return Math.round((occupiedDays / totalDays) * 100);
    }

    static totalOccupancyPercentage(
        rooms: Room[],
        startDate: Date,
        endDate: Date
    ): number {
        const total = rooms.reduce((sum, room) => sum + room.occupancyPercentage(startDate, endDate), 0);
        return Math.round(total / rooms.length);
    }

    static availableRooms(
        rooms: Room[],
        startDate: Date,
        endDate: Date
    ): Room[] {
        return rooms.filter((room) => {
        for (
            let d = new Date(startDate);
            d <= endDate;
            d.setDate(d.getDate() + 1)
        ) {
            if (room.isOccupied(new Date(d))) return false;
        }
            return true;
        });
    }
}