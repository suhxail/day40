const router = require("express").Router();
const uuid = require("uuid");
const {
    booking_ids,
    customer_ids,
    hall_ids,
    booking_history
} = require("./bookingHall");

router.get("/", (req, res) => {
    res.status(200).send("start");
});

// creating a new room
router.post("/createroom", async (req, res) => {

    const seats = req.body.seats;
    const amenities = req.body.amenities;
    const price_per_hour = req.body.price_per_hour

    if (!seats && !amenities && !price_per_hour) {
        return res.status(400).send("Please enter valid information");
    }

    const room = hall_ids.push({
        hall_id: hall_ids.length + 1,
        seats: seats,
        amenities: amenities,
        price_per_hour: price_per_hour
    })

    const newRoom = {
        hall_id: hall_ids.length + 1,
        seats: seats,
        amenities: amenities,
        price_per_hour: price_per_hour
    }
    const newRoomList = [...hall_ids, newRoom]
    res.status(200).send("room created");
    return
})

// creating a new user
router.post("/createuser", async (req, res) => {
    const customer_name = req.body.customer_name;
    const customer_address = req.body.customer_address;

    if (!customer_name) {
        return res.status(400).send("Please add your name");
    }
    const user = await customer_ids.find((userid) => userid.customer_name == customer_name);
    try {
        if (user) return res.status(400).send("user exists,change username");
        else {
            await customer_ids.push({
                customer_id: customer_ids.length + 1,
                customer_name: customer_name,
                customer_address: customer_address,
            });
            console.log(customer_ids);
            const newCustomer = {
                customer_id: customer_ids.length + 1,
                customer_name: customer_name,
                customer_address: customer_address,
            }

            const newCustomerList = [...customer_ids, newCustomer]
            res.status(200).send("user created");
            return
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// get user list
router.get('/getusers', (req, res) => {
    res.status(200).json(customer_ids)
})

// get all the rooms
router.get("/getrooms", (req, res) => {
    res.status(200).json(hall_ids);
});

// check the availability of a particular hall
router.get("/gethall/:hall_id", async (req, res) => {
    const hall_id = req.params.hall_id;

    const hall = await hall_ids.find((hallid) => hallid.hall_id == hall_id);
    try {
        if (!hall) return res.status(400).send("hall not exist");
        const reserved_slots = booking_ids.filter(
            (reserved) => reserved.hall_id == hall_id
        );
        console.log(reserved_slots);
        if (reserved_slots.length !== 0) {
            const booked_slots = [];
            await reserved_slots.forEach((slots) =>
                booked_slots.push(slots.booked_at)
            );
            res.status(200).json(booked_slots);
            return;
        } else {
            return res.status(200).end(`Hall no${hall_id} have not reserved yet`);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// book a hall
router.post("/:customer_name/bookrooms/:hall_id", async (req, res) => {
    const customer_name = req.params.customer_name;
    const hall_id = req.params.hall_id;

    // const start_date = new Date(req.body.start_date).toUTCString();
    // const end_date = new Date(req.body.end_date).toUTCString();
    // console.log(new Date(0))

    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const booking_date = Date()
    console.log(booking_date)
    const currentDate = new Date()
    console.log("currenDate126", currentDate)
    console.log("bookingDate127", booking_date)
    const hours = currentDate.getHours() - 12
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()
    const time = hours + ":" + minutes + ":" + seconds
    console.log("time", time,)
    const start_time = req.body.start_time;
    const end_time = req.body.end_time


    if (!start_date && !end_date) {
        return res.status(400).send("Please enter a valid checkin and checkout date")
    }

    if (!start_time && !end_time) {
        return res.status(400).send("Please enter a valid checkin and checkout time")
    }


    // if (new Date(start_date) > new Date(end_date)) return res.send("start time must be before end time");
    // else if (new Date(start_date) < new Date()) return res.send("start time must be after current time");

    // if (start_date > end_date) return res.send("Start date must be before end date");
    // else if (start_date < currentDate) return res.send("Start date must be after current date");

    // if (start_time > end_time) return res.send("Start time must be before end time")
    else if (start_time < hours && start_time < minutes) return res.send("Start time must be after current time");

    const user = await customer_ids.find((userid) => userid.customer_name === customer_name);

    const hall = await hall_ids.find((hallid) => hallid.hall_id == hall_id);


    console.log(hall_id);

    console.log(hall);

    try {

        if (!user) return res.status(400).send("user not exist");
        if (!hall) return res.status(400).send("hall not exist");

        const booking_id = `${customer_name}${uuid.v4()}`;
        const customer_id = user.customer_id;

        //checking the availability
        const availability = await booking_ids.some((booking) => {
            console.log(booking);
            if (booking.hall_id == hall_id) {
                // if (((new Date(booking.booked_at[0]) <= new Date(start_date)) && (new Date(start_date) < new Date(booking.booked_at[1]))) || ((new Date(booking.booked_at[0]) < new Date(end_date)) && (new Date(end_date) <= new Date(booking.booked_at[1])))) {
                //     return res.end("please change your booking time")
                // }

                // if ((((booking.booked_at[0]) <= (start_date)) && ((start_date) < (booking.booked_at[1]))) || (((booking.booked_at[0]) < (end_date)) && ((end_date) <= (booking.booked_at[1])))) {
                //     return res.end("Please change your booking time")
                // }

                if (start_date > end_date) return res.send("Start date must be before end date");
                else if (start_date < currentDate) return res.send("Start date must be after current date");

            }
        })

        if (!availability) {
            booking_ids.push({
                booking_id: booking_id,
                hall_id: hall_id,
                booking_status: "confirmed",
                booked_on: [{ start_date_and_time: [start_date, start_time] },
                { end_date_and_time: [end_date, end_time] }],
                booking_date: booking_date,
                customer_id: customer_id,
                customer_name: customer_name
            });
            console.log(booking_ids);

            res.status(200).send(`your booking id--- ${booking_id}`);

            return customer_ids.map(customer => { if (customer.customer_id == customer_id) customer.booked_id = booking_id })
        }


    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// room with booked data
router.get("/getBookedrooms", async (req, res) => {
    const bookedRooms = []
    const roomData = booking_ids.find((room) => {
        if (room.booking_id === null) {
            console.log("dfokn", room)
            // bookedRooms.push({
            //     customer_name: room.customer_name,
            //     booking_status: room.booking_status,
            //     booked_date: room.booked_on
            // })
            return res.status(400).send("No rooms have been booked")
        }
        else {            
            bookedRooms.push({
                hall_id: room.hall_id,
                customer_name: room.customer_name,
                booking_status: room.booking_status,
                booked_date: room.booked_on
            })            
        }
    })
    return res.status(200).send(bookedRooms)
})

// get customers with booked data
router.get("/getBookedCustomers", async(req,res) => {
    const bookedCustomers = []

    const customerData = booking_ids.find((customers) => {
        if(customers.booking_id === null) {
            return res.status(400).send("No customers yet")
        }
        else {
            bookedCustomers.push({
                hall_id: customers.hall_id,
                customer_name: customers.customer_name,
                booking_status: customers.booking_status,
                booked_date: customers.booked_on
            })
        }
    })
    return res.status(200).send(bookedCustomers)
})

// get booking history
router.get("/:customer_id/mybooking_history", async (req, res) => {
    const customer_id = req.params.customer_id;
    const user = await customer_ids.find((userid) => userid.customer_id == customer_id);
    console.log(booking_ids);
    if (user) {        
        const booking_list = await booking_ids.filter(userid => userid.customer_id == user.customer_id)
        return res.status(200).json(booking_list);
    }
    else {
        return res.status(400).send("no bookings yet");
    }

});




// cancel a booking
router.delete("/:customer_id/cancelroom/:booking_id", async (req, res) => {
    const booking_id = req.params.booking_id;
    const customer_id = req.params.customer_id;
    const user = await customer_ids.find((userid) => userid.customer_id == customer_id);
    const booking = await booking_ids.find((booked) => booked.booking_id == booking_id);
    if (user && booking) {
        booking_ids.splice(booking.booking_id, 1);
        res.status(200).send("hall canceled successfully");
        return
    }
    else {
        res.status(400).send("check your username or booking_id");
        return
    }

});
module.exports = router;
