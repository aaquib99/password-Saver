const router = require('express').Router()
const CategoryControllerObject = require("../Controller/CategoryController")
const ProjectControllerObject = require("../Controller/ProjectController")
////
router.post("/addCategory",CategoryControllerObject.addCategory)
////
router.post("/addProject",ProjectControllerObject.addProject)
router.post("/deletePostById",ProjectControllerObject.deleteProjectById)
router.post("/updateProject",ProjectControllerObject.updateProject)
router.post("/getAllProject",ProjectControllerObject.getAllProject)
router.post("/getSomeDataOfAllProject",ProjectControllerObject.getSomeDataOfAllProject)
router.post("/numberOfProject",ProjectControllerObject.numberOfProject)
module.exports = router

