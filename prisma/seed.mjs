import { PrismaClient, BOOKING_STATUS, FLIGHT_STATUS } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clean the database
  await prisma.booking.deleteMany()
  await prisma.passenger.deleteMany()
  await prisma.flight.deleteMany()
  await prisma.stopover.deleteMany()
  await prisma.spaceport.deleteMany()
  await prisma.location.deleteMany()
  await prisma.spaceportCompany.deleteMany()
  await prisma.user.deleteMany()

  // Create Locations
  const earth = await prisma.location.create({
    data: { city: "Cape Canaveral", country: "United States" }
  })
  const mars = await prisma.location.create({
    data: { city: "Olympus City", country: "Mars" }
  })
  const moon = await prisma.location.create({
    data: { city: "Armstrong Base", country: "Moon" }
  })
  const titan = await prisma.location.create({
    data: { city: "Titan Outpost", country: "Saturn" }
  })

  // Create Spaceport Companies
  const spaceX = await prisma.spaceportCompany.create({ data: { name: "SpaceX" } })
  const blueOrigin = await prisma.spaceportCompany.create({ data: { name: "Blue Origin" } })
  const nasa = await prisma.spaceportCompany.create({ data: { name: "NASA" } })
  const galactic = await prisma.spaceportCompany.create({ data: { name: "Virgin Galactic" } })

  // Create Spaceports
  const capCanaveralPort = await prisma.spaceport.create({
    data: { name: "Cape Canaveral Spaceport", locationId: earth.id }
  })
  const olympusPort = await prisma.spaceport.create({
    data: { name: "Olympus Mons Spaceport", locationId: mars.id }
  })
  const armstrongPort = await prisma.spaceport.create({
    data: { name: "Armstrong Memorial Spaceport", locationId: moon.id }
  })
  const titanPort = await prisma.spaceport.create({
    data: { name: "Titan Outpost Spaceport", locationId: titan.id }
  })

  // Create Stopovers
  const moonStopover = await prisma.stopover.create({
    data: {
      arrivalDate: new Date('2025-01-01T10:00:00Z'),
      departureDate: new Date('2025-01-01T14:00:00Z'),
      spaceportId: armstrongPort.id
    }
  })

  const titanStopover = await prisma.stopover.create({
    data: {
      arrivalDate: new Date('2025-06-10T08:00:00Z'),
      departureDate: new Date('2025-06-10T16:00:00Z'),
      spaceportId: titanPort.id
    }
  })

  // Create Flights with more detailed scenarios
  const earthToMarsFlight = await prisma.flight.create({
    data: {
      bookingOpenStatus: true,
      flightStatus: FLIGHT_STATUS.CANCELED,
      departureDateTime: new Date('2025-01-01T08:00:00Z'),
      arrivalDateTime: new Date('2025-01-03T15:00:00Z'),
      SpaceportCompanyId: spaceX.id,
      departureSpaceportId: capCanaveralPort.id,
      arrivalSpaceportId: olympusPort.id,
      departureLocationId: earth.id,
      arrivalLocationId: mars.id,
      stopoverIds: [moonStopover.id]
    }
  })

  const marsToTitanFlight = await prisma.flight.create({
    data: {
      bookingOpenStatus: true,
      flightStatus: FLIGHT_STATUS.BOOOKED,
      departureDateTime: new Date('2025-06-01T09:00:00Z'),
      arrivalDateTime: new Date('2025-06-12T22:00:00Z'),
      SpaceportCompanyId: blueOrigin.id,
      departureSpaceportId: olympusPort.id,
      arrivalSpaceportId: titanPort.id,
      departureLocationId: mars.id,
      arrivalLocationId: titan.id,
      stopoverIds: [titanStopover.id]
    }
  })

  // Create Users with more details
  const user1 = await prisma.user.create({
    data: {
      email: "astronaut.alex@space.com",
      password: "hashedpassword123",
      phoneNotification: true,
      phoneNumber: 1234567890
    }
  })

  const user2 = await prisma.user.create({
    data: {
      email: "pilot.jordan@space.com",
      password: "hashedpassword456",
      phoneNotification: false,
      phoneNumber: 1987654321
    }
  })

  // Create Passengers
  const passenger1 = await prisma.passenger.create({
    data: { firstName: "Alex", lastName: "Stratos", age: 29 }
  })

  const passenger2 = await prisma.passenger.create({
    data: { firstName: "Jordan", lastName: "Skywalker", age: 34 }
  })

  // Create Bookings
  const booking1 = await prisma.booking.create({
    data: {
      bookingStatus: BOOKING_STATUS.CONFIRMED,
      userId: user1.id,
      flightId: earthToMarsFlight.id,
      passengerIds: [passenger1.id]
    }
  })

  const booking2 = await prisma.booking.create({
    data: {
      bookingStatus: BOOKING_STATUS.PENDING,
      userId: user2.id,
      flightId: marsToTitanFlight.id,
      passengerIds: [passenger2.id]
    }
  })

  // Update passengers with booking references
  await prisma.passenger.update({
    where: { id: passenger1.id },
    data: { bookingIds: [booking1.id] }
  })
  await prisma.passenger.update({
    where: { id: passenger2.id },
    data: { bookingIds: [booking2.id] }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
