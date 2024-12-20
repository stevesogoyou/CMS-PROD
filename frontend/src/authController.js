import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../database";

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (user.length === 0) return res.status(404).json({ message: "User not found" });

        const isValidPassword = await bcrypt.compare(password, user[0].password);
        if (!isValidPassword) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user[0].id, role: user[0].role }, "your_secret_key", {
            expiresIn: "1h",
        });

        res.status(200).json({ token, role: user[0].role });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err });
    }
};
