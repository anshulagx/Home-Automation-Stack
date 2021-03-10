const jwt = require("jsonwebtoken");

/**
 * This middleware function will be used to ensure only users with tokens are sending events.
 */

function auth(req, res, next) {
	const token = req.header("x-auth-token");

	//checking if token
	if (!token) {
		return res.status(401).json({ message: "No token, authorization denied" });
	}

	try {
		//Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		next();
	} catch (e) {
		res.status(400).json({ message: "Token is not valid." });
	}
}

module.exports = auth;
