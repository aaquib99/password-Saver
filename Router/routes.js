const router = require('express').Router()
const CategoryControllerObject = require("../Controller/CategoryController")
const ProjectControllerObject = require("../Controller/ProjectController")
////
router.post("/addCategory",CategoryControllerObject.addCategory)
////
router.post("/addProject",ProjectControllerObject.addProject)
router.post("/deletePostById",ProjectControllerObject.deleteProjectByid)
router.post("/updateProject",ProjectControllerObject.updateProject)
module.exports = router

