const express=require("express")
const router=express()


const meetingRoute=require("../controllers/meetingController")
router.get("/",meetingRoute.loadIndex)
router.get("/meeting",meetingRoute.loadMeeting)
router.get("/stream",meetingRoute.loadStream)

module.exports=router
