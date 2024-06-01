module.exports = () => {
    let data = {}

    data = {
        ...data,
        users: [],
        trips: [
            {
                id: 0,
                destination: 'Sofia',
                departureDate: new Date(2024, 7, 15),
                returnDate: new Date(2024, 7, 15),
            },
            {
                id: 1,
                destination: 'Sofia',
                departureDate: new Date(2024, 7, 15),
                returnDate: new Date(2024, 7, 15),
            },
            {
                id: 2,
                destination: 'Sofia',
                departureDate: new Date(2024, 7, 15),
                returnDate: new Date(2024, 7, 15),
            },
            {
                id: 3,
                destination: 'Sofia',
                departureDate: new Date(2024, 7, 15),
                returnDate: new Date(2024, 7, 15),
            },
            {
                id: 6,
                destination: 'Sofia',
                departureDate: new Date(2024, 7, 15),
                returnDate: new Date(2024, 7, 15),
            },
            {
                id: 7,
                destination: 'Sofia',
                departureDate: new Date(2024, 7, 15),
                returnDate: new Date(2024, 7, 15),
            },
        ],
    }

    return data
}
