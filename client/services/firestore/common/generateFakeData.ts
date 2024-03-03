import { collection, addDoc } from 'firebase/firestore';
import { faker } from '@faker-js/faker'; // Make sure to install @faker-js/faker for generating fake data
import generateRandomId from './generateRandomId';
// Helper function to generate a random Order
const generateOrder = (userId:any) => ({
  id: generateRandomId(),
  items: [], // Populate according to your ProductItemType structure
  date: faker.date.recent(),
  method: faker.helpers.arrayElement(['pickup', 'delivery']),
  status: faker.helpers.arrayElement(['Delivered', 'Pickedup', 'Placed', 'Confirmed', 'Cancelled']),
  address: faker.location.streetAddress(),
  deliveryDetails: faker.lorem.sentence(),
  Total: faker.number.float({ min: 20, max: 1000 }),
  paymentid: generateRandomId()
});

// Helper function to generate a random Payment
const generatePayment = () => ({
  id: generateRandomId(),
  name: faker.person.fullName(),
  cardno: faker.finance.creditCardNumber(),
  expiration: faker.number.int({min: 1000, max: 9999}),
  cvc: faker.number.int({min: 100, max: 999}),
  zipcode: faker.location.zipCode(),
  last4: "**** **** **** "+faker.finance.creditCardNumber().slice(-4),
});

// Helper function to generate a random Address
const generateAddress = () => ({
  id: generateRandomId(),
  name: faker.person.jobArea(),
  area: faker.location.state(),
  street1: faker.location.streetAddress(),
  street2: faker.location.buildingNumber(),
  city: faker.location.city(),
  zipcode: faker.location.zipCode(),
  phone: faker.phone.number(),
});

// Main function to add fake data to Firestore
export const writeFakeData = async (auth:any, db:any) => {
  if (!auth.currentUser) {
    console.log('No user authenticated!');
    return;
  }

  const userId = auth.currentUser.uid;
  // Assuming your collections are subcollections of a User document
  const addressesRef = collection(db, 'Users', userId, 'addresses');
  const paymentsRef = collection(db, 'Users', userId, 'payments');
  const ordersRef = collection(db, 'Users', userId, 'orders');

  // Generate and add 7 documents for addresses
  for (let i = 0; i < 7; i++) {
    //await addDoc(addressesRef, generateAddress());
    await addDoc(paymentsRef, generatePayment());
    //await addDoc(ordersRef, generateOrder(userId));
  }

  console.log('Fake data added successfully!');
};

