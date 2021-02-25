"use strict"

const controllerRespuestas = require("../controller/controllerRespuestas");
const userSessionRouter = require("./routerSessions");

//------------------------------------------------Frameworks----------------------------------------------------//
const express = require("express");
var router = express.Router();
//-------------------------------GET - Sección para implementar las peticiones GET -----------------------------//

router.get("/createReply", userSessionRouter.currentUser, controllerRespuestas.newReply)

router.get("/positiveVote/:answer", userSessionRouter.currentUser, controllerRespuestas.positiveVoteAnswer)

router.get("/negativeVote/:answer", userSessionRouter.currentUser, controllerRespuestas.negativeVoteAnswer)


//---------------------------- POST - Sección para implementar las peticiones POST -----------------------------//

router.post("/process_reply/:id", userSessionRouter.currentUser, controllerRespuestas.createReply)


module.exports = router;