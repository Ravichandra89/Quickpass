const booking_service = require("../services/booking");
const payment_service = require("../services/payment");
const show_service = require("../services/show");
async function bookShow(req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    const { booking, userId } = req.body;
    const showID = req.params.id;
    let totalAmount = 0;

    // First, check if all seats are available
    for (const element of booking) {
      const showkey = `show_${showID}_key:${element.seatName}`;
      const isReserved = await booking_service.isSeatAvaialble(showkey);
      const {isBooked,price} = await booking_service.isBooked(showID, element.categoryId, element.rowId, element.seatId);

      if (isBooked || !isReserved) {
        return res.status(400).json({ message: "One or more seats are already booked" });
      }
      totalAmount += price;
    }

    // If all seats are available, proceed to reserve them
    for (const element of booking) {
      const showkey = `show_${showID}_key:${element.seatName}`;
      const reserveSeat = await booking_service.ReserveSeat(showkey, userId);
      if (!reserveSeat) {
        return res.status(500).json({ message: "Internal Server Error. Could Not Book Seat" });
      }
    }

    return res.status(200).json({ message: "Seats Booked Successfully", totalAmount });

  } catch (error) {
    console.error('Error booking show:', error);
    res.status(500).json({ message: "Internal Server Error. Could Not Book Seat" });
  }
}

async function bookSeat(req, res) {
  res.setHeader("Content-Type", "application/json");
  try{
    // console.log(req.body);
    const {Payment,Booking,seat_info}=req.body;
    const showId=Payment.show_id;
    const paymentid= await payment_service.makePayment(Payment);
    console.log(paymentid);
    if(paymentid){
      const updatedBooking = { ...Booking, transaction_id: paymentid };
      console.log(updatedBooking);
      const result= await booking_service.createBooking(updatedBooking);
      console.log(result);
      if(result){
        const updateSeat=await show_service.updateSeat(showId,seat_info);
        return res.status(200).json({message:"Seats Booked Successfully"});
      }
      else{
        return res.status(400).json({message:"Error Booking Seats"});
      }
    }
    // #TODO- try if possible if we can make this transaction atomic.

  }catch(error){
    console.error('Error booking show:', error);
    res.status(500).json({ message: "Internal Server Error. Could Not Book Seat" });
  }
}
module.exports = { bookShow ,bookSeat};

// #TODO- check if thise res.json needed to be written in the separate utils functions or same funciton

// #TODO- check if thise res.json needed to be written in the separate utils functions or same funciton