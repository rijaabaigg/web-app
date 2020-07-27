const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://admin:admin123@ds135128.mlab.com:35128/cst3145";
var bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
var dbo;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	dbo = db.db("cst3145");
});

app.get("/insert", (req, res) => {
	const collection = dbo.collection("courses");

	collection.insertMany(
		[
			{
				topic: "Math",
				price: 100,
				location: "United States",
			},
			{
				topic: "Computer Science",
				price: 89,
				location: "London",
			},
			{
				topic: "Physics",
				price: 120,
				location: "Lahore",
			},
			{
				topic: "Chemistry",
				price: 20,
				location: "York",
			},
			{
				topic: "History",
				price: 12,
				location: "Sheffield",
			},
			{
				topic: "Astrology",
				price: 90,
				location: "Birmingham",
			},
			{
				topic: "Dynamics",
				price: 704,
				location: "Bradford",
			},
			{
				topic: "English",
				price: 357,
				location: "Bristol",
			},
			{
				topic: "Biology",
				price: 321,
				location: "United States",
			},
			{
				topic: "Nuclear",
				price: 121,
				location: "Hungry",
			},
		],
		function (err, result) {
			console.log("Inserted 3 documents into the collection");
		},
	);

	res.send("API is Workiing");
});

app.get("/get-courses", (req, res) => {
	var courses = [];

	dbo.collection("courses").find({}, function (err, result) {
		if (err) throw err;
		result.each(function (err, item) {
			console.log(item);
			if (item == null) {
				res.send(courses);
				return;
			}

			courses.push(item);
		});
	});

	// setTimeout(() => {
	// 	res.send(courses);
	// }, 4000);
});

app.post("/register", (req, res) => {
	console.log(req.body.email);
	const collection = dbo.collection("users");

	collection.findOne({ email: req.body.email }, (err, result) => {
		console.log("----", result);
		if (result == null) {
			collection.insertOne(
				{
					email: req.body.email,
					password: req.body.password,
				},
				(err, response) => {
					console.log(response);
					res.json({ msg: "User added", isSuccess: true });
				},
			);
		} else {
			res.json({ msg: "Email Already Found", isSuccess: false });
		}
	});
});

app.post("/login", (req, res) => {
	console.log(req.body);
	const collection = dbo.collection("users");

	collection.findOne({ email: req.body.email }, (err, data) => {
		if (data == null) {
			res.json({ msg: "Email not found", isSuccess: false });
		} else {
			if (data.password == req.body.password) {
				res.json({
					isSuccess: true,
					msg: "true",
					data,
				});
			} else {
				res.json({ msg: "Invalid Password", isSuccess: false });
			}
		}
	});
});

app.listen(3030, () => {
	console.log("Server is running ");
});
