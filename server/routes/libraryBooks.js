const express = require('express');

const router = express.Router();

const { Router } = require('express');
const libraryController = require('../controllers/library');

router.post("/addBook", libraryController.addBook);

router.get("/getBooks", libraryController.getBooks);

router.post("/returnBook", libraryController.returnBook);

// router.get("/attendanceReport", attendaceController.getAttendanceReport);

// router.post('/markAttendance', attendaceController.postAttendance);


module.exports = router;