//1. Write a query to display all the documents in the collection
// restaurnats.

db.restaurants.find({});

//2. Write a query to display restaurant_id, name, borough, and
// cuisine for all documents in the collection restaurant

db.restaurant.find({},{
	"restaurant_id": 1,
	"name": 1,
	"borough": 1,
	"cuisine": 1
});

//3. Write a query to dipsplay the fields restaurant_id, name
// borough, and cuisine, but exclude the field _id for all the
// documents in the collection restaurants

db.restaurants.find({},{
	"restaurant_id": 1,
	"name": 1,
	"borough": 1,
	"cuisine": 1,
	"_id": 0
});

//4. Write a query to display the fields restaurant_id, name, 
// borough, and zip code BUT exclude the field _id for all 
// the documents in the collection restaurant.

db.restaurants.find({},{
	"restaurant_id": 1,
	"name": 1,
	"borough": 1,
	"zipcode": 1,
	"_id": 0 
});

// 5. Write a query to dispaly all the restaurant which is in
// the borough Bronx

db.restaurants.find({"borough": "Bronx"});

// 6. Write a query to display the first 5 restaurants which is
// in the borough Bronx

db.restaurants.find({"borough": "Bronx"}).limit(5);

// 7. Write a query to display the next 5 restaurants after 
// skipping first 5 which are in the borough Bronx

db.restaurants.find({"borough": "Bronx"}).skip(5).limit(5);

// 8. Write a query to find the restaurants who achieved a score
// more than 90

db.restaurants.find({"grades.score": {$gt: 90}});

// 9. Write a mongo db query to find the restaurants who achieved
// a score more than 80 but less than 100

db.restaurants.find({"grades.score": {$gt: 80, $lt: 100}});

// 10. Write a query to find the restaurants which locate in the
// latitue value less than -95.754168

db.restaurants.find({"address.coord": {$lt: -95.754168}});

// 11. Write a query to find the restaurants that do no prepare
// any cuisine of "American" and their grade score more than 
// 70 and latitude less than -65.754168

db.restaurants.find({
	$and: [
		{"cuisine" : {$ne: "American"}},
		{"grades.score" : {$gt: 70}},
		{"address.coord": {$lt:-65.754168}}
	]
});

// 12. Write a query to find the restaurants which do not prepare
// any cuisine of "American" and achieved a score more tha 70
// and located in the longitude less than -65.754168.

db.restaurants.find({
	$query: {
		"cuisine": {$ne: "American"},
		"grades.score": {$gt: 70},
		"address.coord": {$lt: -65.754168}
	}
}); 

//13. Write a query to find the restaurants which do not preapre 
// any cuisine of "American" and achieved a grade point "A" not
// belongs to the borough Brooklyn. The document must be displayed
// according to the cuisine in the descending order.

db.restaurants.find({
	$query: {
		"cuisine": {$ne: "American"},
		"grades.grade": "A",
		"borough": {$ne: "Brooklyn"}
	}
}).sort("cuisine": -1);

//14. Write a query to find the restaurant_id, name, borough, and
// cuisine for those restaurants which contain 'Wil', as first
// three letters for its name

db.restaurants.find({
	"name": /^Wil/,
}, {
	"restaurant_id": 1,
	"name": 1,
	"borough": 1,
	"cuisine": 1
});

//15. Write a query to find the restaurant_id, name, borough, 
// and cuisine for those restaurants which contian 'ces' as 
// last three letters for its name.

db.restaurants.find({
	"name": /ces$/
}, {
	"restaurant_id": 1,
	"name": 1,
	"borough": 1,
	"cuisine": 1
});

// 16. Write a query to find the restaurant_id, name, borough, 
// and cuisine for those restaurants which contain 'Reg' as three
// letters somewhere in its name

db.restaurants.find({"name": /.*Reg.*/},{
	"restaurant_id": 1,
	"name": 1,
	"borough": 1,
	"cuisine": 1
});

//17. Write a query to find the restaurants which belong to the 
// borough Bronx and prepared either American or Chinese dish

db.restaurants.find({$query: {
	"borough": "Bronx",
	$or: [
		{"cuisine" : "American"},
		{"cuisine" : "Chinese"}
	]
}});

//18. Write a query to find the restaurant_id, name, borough, 
// and cuisine for those restaurants which belong to the
// borough Staten Isnald, or Queens, or Bronx, or Brooklyn

db.restaurants.find({
	"borough" : {$in: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}
}, {
	"restaurant_id": 1,
	"name": 1,
	"borough": 1,
	"cuisine": 1
});

//19 Write a query to find the restaurant_id, name, borough, 
// cusisine for those resaurants which are not belonging to
// the borough Staten Island, or Queens, or Bronx, or Brooklyn

db.restaurants.find({
	"borough" : {$nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}
}, {
	"restaurant_id": 1,
	"name": 1,
	"borough": 1,
	"cuisine": 1
});

// 20. Write a query to find the restaurant_id, name, borough, 
// and cuisine for those restaurants which achieved a score
// which is not more than 10.

db.restaurants.find({
	"grades.score": {$lte: 10}
}, {
	"restaurant_id": 1,
	"name": 1,
	"borough": 1,
	"cuisine": 1
});

// 21. Write a query to find the restaurant_id, name, borough
// and cuisine for those restaurans which prepared dish 
// except 'American' and 'Chinese',  or 'restaurant's name
// begins with letter 'Wil'

db.restaurants.find({
	$or: [
		$and : [
			"cuisine": {$ne: "American"},
			"cuisine": {$ne: "Chinese"}
		]
		"name": {$regex: /^Wil/, $option: 1}
	]
}, {
	"restaurant_id": 1,
	"name": 1,
	"borough": 1
	"cuisine": 1
});

// 22. Write a query to find the restaurant_id, name, and grades for those
// restaurants which achieved a grade of "A", and scored 11 and on an
// ISODate("2014-08-11T00:00:00Z") among many of survey dates.

db.restaurants.find({
	$query: {
		"grades.grade": "A",
		"grades.score": 11,
		"grades.grade": ISODate("2014-08-11T00:00:00Z")
	}
}, {
	"restaurant_id": 1,
	"name": 1,
	"grades": 1
});

//23. Write a query to find the restaurant_id, name and grades for those
// restaurants where the 2nd element of grades array contains a grade of
// "A" and score 9 on on an ISODate(""2014-08-11T00:00:00Z"")

db.restaurants.find({
	$query: {
		"grades.1.grade": "A", 
		"grades.1.score": 9,
		"grades.1.date": ISODate("2014-08-11T00:00:00Z")
	}
}, {
	"restaurant_id": 1,
	"name": 1,
	"grades":1
});

//24. Write a query to find the restaurant_id, name, address, and 
// geopgraphical location for those restaurants where 2nd element of 
// coord array contains a value which is more than 42 and up to 52

db.restaurants.find({
	$query: {
		"address.coord.1": {
			$gt: 42,
			$lte: 52
		}
	}
}, {
	"restaurant_id": 1,
	"name": 1,
	"address": 1,
	"coord": 1
});

//25 Write a query to arrange the name of the restaurants in ascending order
// along with all the columns.

db.restaurants.find().sort({"name": 1});

//26. Write a query to arrange the name of the restaurants in descending
// along with all the columns

db.restaurants.find().sort({"name": -1});

//27. Write a query to arrange all the name of the cuisine in ascending 
// order and for that same cuisine, borough should be in decending order

db.restaurants.find().sort({$and: [
	{"cuisine": 1},
	{"borough": -1} 
	]});

//28. Write a query to know whether all the addresses contains the street 
// or not

db.restaurants.find({"address.street": {$exist: true}});

// 29. Write a query which will select all documents in the restaurants
// collection where the coor fild is double

db.restaurants.find({"address.coord": {$type: "double"}});
db.restaurants.find({"address.coord": {$type: 1}});

// 30. Write a query which will select the restaurant_id, name, and grades
// for those restaurants which return 0 as a remainder after dividing the
// score by 7

db.restaurans.find({"grades.score": {$mod: [7, 0]}});

//31 Write a query to find the restaurant name, borough, longitude, and
// attitude and cuisine for those resaurants which contain 'mon' as
// three letters somewhere in its name

db.restaurants.find({"name": {$regex: "mon.*", $option: "i"}},{
	"name": 1,
	"borough": 1,
	"address.coord": 1,
	"cuisine": 1
});

//32. Write a query to find the restaurant name, borough, longitude and latitude
// and cuisine for those restaurants which contain 'Mad' as first three letters
// of its name

db.restaurants.find({"name": {$regex: '/^Mad/i'}},{
	"name": 1,
	"borough": 1,
	"address.coord": 1,
	"cuisine": 1
})

