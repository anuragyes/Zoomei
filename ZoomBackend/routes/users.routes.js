// import { Router } from "express";
// import { addToHistory, getUserHistory, login, register } from "../controllers/user.controller.js";



// const router = Router();

// router.route("/login").post(login)
// router.route("/register").post(register)
// router.route("/add_to_activity").post(addToHistory)
// router.route("/get_all_activity").get(getUserHistory)

// export default router;





























import { Router } from "express";
import { addToHistory, getUserHistory, login, register } from "../controllers/user.controller.js";

const router = Router();

// Login route
router.post("/login", async (req, res, next) => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

// Register route
router.post("/register", async (req, res, next) => {
    try {
        await register(req, res);
    } catch (error) {
        next(error);
    }
});

// Add to activity route
router.post("/add_to_activity", async (req, res, next) => {
    try {
        await addToHistory(req, res);
    } catch (error) {
        next(error);
    }
});

// Get all activity route
router.get("/get_all_activity", async (req, res, next) => {
    try {
        await getUserHistory(req, res);
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});

export default router;
