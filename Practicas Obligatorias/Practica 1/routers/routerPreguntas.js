"use strict"

const controllerPreguntas = require("../controller/controllerPreguntas");
const userSessionRouter = require("./routerSessions");



//------------------------------------------------Frameworks----------------------------------------------------//
const express = require("express");
var router = express.Router();




//-------------------------------GET - Sección para implementar las peticiones GET -----------------------------//

router.get("/", userSessionRouter.currentUser, controllerPreguntas.allQuestions);

router.get("/createQuestion", userSessionRouter.currentUser, controllerPreguntas.newQuestion)

router.get("/unansweredQuestions", userSessionRouter.currentUser, controllerPreguntas.unansweredQuestions)

router.get("/filterTag/:tag", userSessionRouter.currentUser, controllerPreguntas.filterTag)

router.get("/positiveVote/:question", userSessionRouter.currentUser, controllerPreguntas.positiveVoteQuestion)

router.get("/negativeVote/:question", userSessionRouter.currentUser, controllerPreguntas.negativeVoteQuestion)

router.get("/:question", userSessionRouter.currentUser, controllerPreguntas.detailedQuestion)

//---------------------------- POST - Sección para implementar las peticiones POST -----------------------------//

router.post("/process_question", userSessionRouter.currentUser, controllerPreguntas.createQuestion);

router.post("/process_search", userSessionRouter.currentUser, controllerPreguntas.filterText)

module.exports = router;