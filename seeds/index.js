const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64fd72af80e7866d88b7604d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dku31mdm1/image/upload/v1695109822/YelpCamp/amyaveaqp59azjd6nbbk.jpg',
                  filename: 'YelpCamp/yfmfdd0w51dqkavzmlpc',
                },
                {
                  url: 'https://res.cloudinary.com/dku31mdm1/image/upload/v1696516811/YelpCamp/ig6qgwnss7qc2mb3w7ie.jpg',
                  filename: 'YelpCamp/pcpdpvzwwxhj6b7pltya',
                },
                {
                  url: 'https://res.cloudinary.com/dku31mdm1/image/upload/v1696516811/YelpCamp/asjbawi06t1u90qucg4g.jpg',
                  filename: 'YelpCamp/amyaveaqp59azjd6nbbk',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})