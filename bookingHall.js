const booking_ids = [
    {
        booking_id: "",
        hall_id: 1,        
        start_date: 'start_date',
        end_date: "end_date",
        start_time: "start_time",
        end_time: "end_time",
        customer_id: "id",
        booking_date: "booking_date"

    },
    {
        booking_id: "",
        hall_id: 2,        
        start_date: 'start_date',
        end_date: "end_date",
        start_time: "start_time",
        end_time: "end_time",
        customer_id: "id",
        booking_date: "booking_date"


    },
    {
        booking_id: "",
        hall_id: 3,       
        start_date: 'start_date',
        end_date: "end_date",
        start_time: "start_time",
        end_time: "end_time",
        customer_id: "id",

    },
];

const customer_ids = [
    {
        customer_id: 1,
        customer_name: "customer1",
        customer_address: "address1",
        booked_id: '',
    },
    {
        customer_id: 2,
        customer_name: "customer2",
        customer_address: "address2",
        booked_id: '',
    },
];

const hall_ids = [
    {
        hall_id: 1,
        available_now: false,
        hall_size: "w*l*b",
        stage_size: "w*l*b",
        seats: 50,
        price_per_hour: "1500",
        amenities: "amenities",
    },
    {
        hall_id: 2,
        available_now: false,
        hall_size: "w*l*b",
        stage_size: "w*l*b",
        seats: 50,
        price_per_hour: "1500",
        amenities: "amenities",
    },
    {
        hall_id: 3,
        available_now: false,
        hall_size: "w*l*b",
        stage_size: "w*l*b",
        seats: 50,
        price_per_hour: "1500",
        amenities: "amenities",
    },
    {
        hall_id: 4,
        available_now: false,
        hall_size: "w*l*b",
        stage_size: "w*l*b",
        seats: 50,
        price_per_hour: "1500",
        amenities: "amenities",
    },
    {
        hall_id: 5,
        available_now: false,
        hall_size: "w*l*b",
        stage_size: "w*l*b",
        seats: 80,
        price_per_hour: "3000",
        amenities: "amenities",
    },
];

const booking_history = [
    {
        hall_id: "id",
        booking_id: "booking_id",
        booking_status: "",
        booked_on : "booked_on",        
        booking_date: "booking_date"
    },
];

module.exports = {
    booking_ids,
    customer_ids,
    hall_ids,
    booking_history,
};
