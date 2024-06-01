const { faker } = require('@faker-js/faker')

module.exports = () => {
    let data = {}

    const trips = []
    for (let i = 0; i < 10; i++) {
        const departureDate = faker.date.future()
        trips.push({
            id: i,
            destination: faker.location.city(),
            departureDate: departureDate,
            returnDate: faker.date.soon({ days: 20, refDate: departureDate }),
        })
    }

    data = {
        ...data,
        users: [],
        trips: trips,
    }

    return data
}
