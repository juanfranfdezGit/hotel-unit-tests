import Room from "./Room";

export default class Booking {
    name: string;
    email: string;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    room: Room;

    constructor(
        name: string,
        email: string,
        checkIn: Date,
        checkOut: Date,
        discount: number,
        room: Room
    ) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }

    get fee(): number {
        const nights =
        (this.checkOut.getTime() - this.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
        let base = this.room.rate * nights;
        base -= base * (this.room.discount / 100);
        base -= base * (this.discount / 100);
        return base / 100;
    }
}