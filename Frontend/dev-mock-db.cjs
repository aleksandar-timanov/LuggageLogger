const { faker } = require('@faker-js/faker')

module.exports = () => {
    let data = {}

    const trips = []
    for (let i = 0; i < 10; i++) {
        const departureDate = faker.date.future()
        const luggageItems = []
        for (let j = 0; j < faker.number.int({ min: 10, max: 30 }); j++) {
            luggageItems.push({
                name: faker.commerce.product(),
                quantity: faker.number.int({ min: 1, max: 5 }),
                id: j,
                isTaken: faker.datatype.boolean(),
                category: faker.datatype.boolean()
                    ? faker.helpers.arrayElement([
                          'clothing',
                          'electronics',
                          'toiletries',
                          'other',
                      ])
                    : null,
            })
        }
        trips.push({
            id: i,
            destination: faker.location.city(),
            departureDate: departureDate,
            returnDate: faker.date.soon({ days: 20, refDate: departureDate }),
            luggageItems: luggageItems,
        })
    }

    data = {
        ...data,
        users: [],
        trips: trips,
    }

    return data
}
