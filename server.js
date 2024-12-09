import express from "express";
import oracledb from "oracledb";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "public", "Uploads");

// Ensure the Uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

oracledb.initOracleClient({
  libDir: process.env.INSTANTCLIENT,
});
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  connectionString: process.env.DBCONSTRING,
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).send({ error: "Internal Server Error" });
});

// Function to get data from the database without any params
async function getQuery(query) {
  let con;
  try {
    con = await oracledb.getConnection(dbConfig);
    const result = await con.execute(query);
    return result.rows;
  } catch (e) {
    console.error(e);
    throw e; // Throw error to be handled in the route
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function DeleteQueryWithParams(query, params) {
  let con;
  try {
    con = await oracledb.getConnection(dbConfig);

    const result = await con.execute(query, params, { autoCommit: true });

    // Return affected rows count
    return result.rowsAffected; // For DELETE, use rowsAffected instead of rows
  } catch (e) {
    console.error(e);
    throw e; // Throw error to be handled in the route
  } finally {
    if (con) {
      try {
        await con.close(); // Close the connection
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// Places To Visit
// Endpoint to GET places to visit
app.get("/api/get-places-to-visit", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM Places");

    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to Delete places to visit
app.delete("/api/delete-place-to-visit/:id", async (req, res) => {
  const { id } = req.params;
  const { imageUrls } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    imageUrls.forEach((imageUrl) => {
      const imagePath = path.join(__dirname, "public", imageUrl); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    await connection.execute(`DELETE FROM Places WHERE PLACEID = :id`, [id], {
      autoCommit: true,
    });

    res.status(200).send("Place and images deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting place or images");
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// Endpoint to Update places to visit
app.put(
  "/api/update-place-to-visit",
  upload.array("images", 5),
  async (req, res) => {
    const {
      placeID,
      placeTitle,
      placeCity,
      placeDescription,
      oldImages,
      destination,
      trip,
    } = req.body;

    const parsedoldImages = JSON.parse(oldImages).imageUrls;

    parsedoldImages.forEach((old) => {
      const imagePath = path.join(__dirname, "public", old); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    const imageUrls = req.files.map((file) => {
      const filePath = path.join(
        __dirname,
        "public",
        "Uploads",
        file.originalname
      );
      fs.writeFileSync(filePath, file.buffer);
      return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
    });

    const imageUrlsString = imageUrls.join(",");

    let query =
      "Update Places set placeTitle=:placeTitle,placeCity=:placeCity,placeDescription=:placeDescription,placeImages=:imageUrlsString,destinationID=:destination,tripPackageID=:trip where placeID=:placeID";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        placeTitle,
        placeCity,
        placeDescription,
        imageUrlsString,
        placeID,
        destination,
        trip,
      });

      await connection.commit();
      res.status(200).send("Place To Visit updated successfully");
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send("Error updating Place to Visit");
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  }
);

// Endpoint to ADD places to visit
app.post(
  "/api/add-place-to-visit",
  upload.array("images", 5),
  async (req, res) => {
    const { placeTitle, placeCity, placeDescription, destination, trip } =
      req.body;

    const imageUrls = req.files.map((file) => {
      const filePath = path.join(
        __dirname,
        "public",
        "Uploads",
        file.originalname
      );
      fs.writeFileSync(filePath, file.buffer);
      return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
    });

    const imageUrlsString = imageUrls.join(",");

    let query =
      "Insert into Places(placeTitle,placeCity,placeDescription,placeImages,destinationID,tripPackageID) values (:placeTitle,:placeCity,:placeDescription,:imageUrlsString,:destination,:trip)";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        placeTitle,
        placeCity,
        placeDescription,
        imageUrlsString,
        destination,
        trip,
      });

      await connection.commit();
      res.status(200).send("Place To Visit added successfully");
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send("Error adding Place to Visit");
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  }
);

// Restaurants
// Endpoint to ADD Restaurants
app.post("/api/add-restaurant", upload.array("images", 2), async (req, res) => {
  const { restaurantName, restaurantCity, restaurantDescription, destination } =
    req.body;

  const imageUrls = req.files.map((file) => {
    const filePath = path.join(
      __dirname,
      "public",
      "Uploads",
      file.originalname
    );
    fs.writeFileSync(filePath, file.buffer);
    return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
  });

  const imageUrlsString = imageUrls.join(",");

  let query =
    "Insert into Restaurants(restaurantName,restaurantCity,restaurantDescription,restaurantImages,destinationID) values (:restaurantName,:restaurantCity,:restaurantDescription,:imageUrlsString,:destination)";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(query, {
      restaurantName,
      restaurantCity,
      restaurantDescription,
      imageUrlsString,
      destination,
    });

    await connection.commit();
    res.status(200).send("Restaurant added successfully");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Error adding restaurant");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

// Endpoint to Delete Restaurant
app.delete("/api/delete-restaurant/:id", async (req, res) => {
  const { id } = req.params;
  const { imageUrls } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    imageUrls.forEach((imageUrl) => {
      const imagePath = path.join(__dirname, "public", imageUrl); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    await connection.execute(
      `DELETE FROM Restaurants WHERE restaurantID = :id`,
      [id],
      {
        autoCommit: true,
      }
    );

    res.status(200).send("Restaurant deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting Restaurant");
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// Endpoint to Update Restaurant
app.put(
  "/api/update-restaurant",
  upload.array("images", 2),
  async (req, res) => {
    const {
      restaurantID,
      restaurantName,
      restaurantCity,
      restaurantDescription,
      oldImages,
      destination,
    } = req.body;

    const parsedoldImages = JSON.parse(oldImages).oldImages;

    parsedoldImages.forEach((old) => {
      const imagePath = path.join(__dirname, "public", old); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    const imageUrls = req.files.map((file) => {
      const filePath = path.join(
        __dirname,
        "public",
        "Uploads",
        file.originalname
      );
      fs.writeFileSync(filePath, file.buffer);
      return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
    });

    const imageUrlsString = imageUrls.join(",");

    let query =
      "Update Restaurants set restaurantName=:restaurantName,restaurantCity=:restaurantCity,restaurantDescription=:restaurantDescription,restaurantImages=:imageUrlsString,destinationID=:destination where restaurantID=:restaurantID";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        restaurantName,
        restaurantCity,
        restaurantDescription,
        imageUrlsString,
        destination,
        restaurantID,
      });

      await connection.commit();
      res.status(200).send("Restaurant updated successfully");
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send("Error updating Restaurant");
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  }
);

// Endpoint to GET restaurants
app.get("/api/get-restaurants", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM Restaurants"); // Adjust the query
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

//Hotels
// Endpoint to GET hotels
app.get("/api/get-hotels", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM hotels");
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to ADD Hotel
app.post(
  "/api/add-hotel",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ]),
  async (req, res) => {
    const {
      hotelName,
      hotelCity,
      hotelDescription,
      hotelClass,
      hotelPrice,
      destination,
      trip,
    } = req.body;

    const imageUrls = req.files["images"].map((file) => {
      const filePath = path.join(
        __dirname,
        "public",
        "Uploads",
        file.originalname
      );
      fs.writeFileSync(filePath, file.buffer);
      return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
    });

    const logoImageUrl = req.files["logo"].map((file) => {
      const filePath = path.join(
        __dirname,
        "public",
        "Uploads",
        file.originalname
      );
      fs.writeFileSync(filePath, file.buffer);
      return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
    });

    const imageUrlsString = imageUrls.join(",");

    const logoImageURLString = logoImageUrl.join(",");

    let query =
      "Insert into Hotels(hotelName,hotelCity,hotelDescription,hotelLogo,hotelImages,hotelClass,hotelPricePerNight,destinationID,tripPackageID) values (:hotelName,:hotelCity,:hotelDescription,:logoImageURLString,:imageUrlsString,:hotelClass,:hotelPrice,:destination,:trip)";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        hotelName,
        hotelCity,
        hotelDescription,
        logoImageURLString,
        imageUrlsString,
        hotelClass,
        hotelPrice,
        destination,
        trip,
      });

      await connection.commit();
      res.status(200).send("Hotel Added Successfully");
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send("Error adding restaurant");
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  }
);

// Endpoint to Delete Hotel
app.delete("/api/delete-hotel/:id", async (req, res) => {
  const { id } = req.params;
  const { images, logo } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    images.forEach((imageUrl) => {
      const imagePath = path.join(__dirname, "public", imageUrl); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    logo.forEach((imageUrl) => {
      const imagePath = path.join(__dirname, "public", imageUrl); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    await connection.execute(`DELETE FROM Hotels WHERE HotelID = :id`, [id], {
      autoCommit: true,
    });

    res.status(200).send("Hotel deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting Hotel");
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// Endpoint to Update Hotel
app.put(
  "/api/update-hotel",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ]),
  async (req, res) => {
    const {
      hotelID,
      hotelName,
      hotelCity,
      hotelDescription,
      hotelClass,
      hotelPrice,
      oldImages,
      oldLogo,
      destination,
      trip,
    } = req.body;

    const parsedOldImages = JSON.parse(oldImages).oldimages;
    const parsedOldLogo = JSON.parse(oldLogo).oldLogo;

    parsedOldImages.forEach((old) => {
      const imagePath = path.join(__dirname, "public", old); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    parsedOldLogo.forEach((old) => {
      const imagePath = path.join(__dirname, "public", old); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    const imageUrls = req.files["images"].map((file) => {
      const filePath = path.join(
        __dirname,
        "public",
        "Uploads",
        file.originalname
      );
      fs.writeFileSync(filePath, file.buffer);
      return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
    });

    const logoImageUrl = req.files["logo"].map((file) => {
      const filePath = path.join(
        __dirname,
        "public",
        "Uploads",
        file.originalname
      );
      fs.writeFileSync(filePath, file.buffer);
      return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
    });

    const imageUrlsString = imageUrls.join(",");

    const logoImageURLString = logoImageUrl.join(",");

    let query =
      "Update Hotels set hotelName=:hotelName,hotelCity=:hotelCity,hotelDescription=:hotelDescription,hotelLogo=:logoImageURLString,hotelImages=:imageUrlsString,hotelClass=:hotelClass,hotelPricePerNight=:hotelPrice,destinationID=:destination,tripPackageID=:trip where hotelID=:hotelID";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        hotelID,
        hotelName,
        hotelCity,
        hotelDescription,
        logoImageURLString,
        imageUrlsString,
        hotelClass,
        hotelPrice,
        destination,
        trip,
      });

      await connection.commit();
      res.status(200).send("Hotel Updated Successfully");
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send("Error Update restaurant");
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  }
);

//Cars
// Endpoint to ADD Car
app.post("/api/add-car", upload.array("images", 1), async (req, res) => {
  const { carmake, carmodel, caryear, carlocation, cartype, carprice } =
    req.body;

  const imageUrls = req.files.map((file) => {
    const filePath = path.join(
      __dirname,
      "public",
      "Uploads",
      file.originalname
    );
    fs.writeFileSync(filePath, file.buffer);
    return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
  });

  const imageUrlsString = imageUrls.join(",");

  let query =
    "Insert into Cars(carMake,carModel,carYear,carLocation,carType,carPrice,carImage) values (:carmake,:carmodel,:caryear,:carlocation,:cartype,:carprice,:imageUrlsString)";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(query, {
      carmake,
      carmodel,
      caryear,
      carlocation,
      cartype,
      carprice,
      imageUrlsString,
    });

    await connection.commit();
    res.status(200).send("Car added successfully");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Error adding Car");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

// Endpoint to GET Cars
app.get("/api/get-cars", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM Cars");
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to Delete Car
app.delete("/api/delete-car/:id", async (req, res) => {
  const { id } = req.params;
  const { oldImages } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    oldImages.forEach((imageUrl) => {
      const imagePath = path.join(__dirname, "public", imageUrl); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    await connection.execute(`DELETE FROM Cars WHERE CarID = :id`, [id], {
      autoCommit: true,
    });

    res.status(200).send("Car deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting Car");
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// Endpoint to Update Car
app.put("/api/update-car", upload.array("images", 1), async (req, res) => {
  const {
    carID,
    carmake,
    carmodel,
    caryear,
    carlocation,
    cartype,
    carprice,
    oldImages,
  } = req.body;

  const parsedOldImages = JSON.parse(oldImages).oldImages;

  parsedOldImages.forEach((old) => {
    const imagePath = path.join(__dirname, "public", old); // Path to the image in the 'uploads' folder
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete the image file
    } else {
      console.log(`Image not found: ${imagePath}`);
    }
  });

  const imageUrls = req.files.map((file) => {
    const filePath = path.join(
      __dirname,
      "public",
      "Uploads",
      file.originalname
    );
    fs.writeFileSync(filePath, file.buffer);
    return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
  });

  const imageUrlsString = imageUrls.join(",");

  let query =
    "Update Cars set carMake=:carmake,carModel=:carmodel,carYear=:caryear,carLocation=:carlocation,carType=:cartype,carPrice=:carprice,carImage=:imageUrlsString where carID=:carID";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(query, {
      carmake,
      carmodel,
      caryear,
      carlocation,
      cartype,
      carprice,
      imageUrlsString,
      carID,
    });

    await connection.commit();
    res.status(200).send("Car updated successfully");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Error updating Car");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

//Flights
// Endpoint to GET Flights
app.get("/api/get-flights", async (req, res) => {
  try {
    const currentDate = new Date().toISOString().slice(0, 10);

    const validFlightsQuery = `
        SELECT * FROM Flights 
        WHERE TO_DATE(DEPARTUREDATE, 'YYYY-MM-DD') >= TO_DATE('${currentDate}', 'YYYY-MM-DD')
      `;

    const invalidFlightsQuery = `
        SELECT * FROM Flights 
        WHERE TO_DATE(DEPARTUREDATE, 'YYYY-MM-DD') < TO_DATE('${currentDate}', 'YYYY-MM-DD')
      `;

    const validFlights = await getQuery(validFlightsQuery);
    const invalidFlights = await getQuery(invalidFlightsQuery);

    if (invalidFlights.length > 0) {
      await fetch("http://localhost:3000/api/delete-old-flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flights: invalidFlights }),
      });
    }

    res.json(validFlights);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to ADD Flights
app.post("/api/add-flight", upload.array("images", 1), async (req, res) => {
  const {
    airline,
    fromcity,
    tocity,
    departuredate,
    availableseats,
    seatprice,
  } = req.body;

  const imageUrls = req.files.map((file) => {
    const filePath = path.join(
      __dirname,
      "public",
      "Uploads",
      file.originalname
    );
    fs.writeFileSync(filePath, file.buffer);
    return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
  });

  const imageUrlsString = imageUrls.join(",");

  let query =
    "Insert into Flights(airline,fromCity,toCity,image,departureDate,availableSeats,seatPrice) values (:airline,:fromcity,:tocity,:imageUrlsString,:departuredate,:availableseats,:seatprice)";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(query, {
      airline,
      fromcity,
      tocity,
      imageUrlsString,
      departuredate,
      availableseats,
      seatprice,
    });

    await connection.commit();
    res.status(200).send("Flight added successfully");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Error adding Flight");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

// Endpoint to Delete Flights
app.delete("/api/delete-flight/:id", async (req, res) => {
  const { id } = req.params;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(`DELETE FROM Flights WHERE FlightID = :id`, [id], {
      autoCommit: true,
    });

    res.status(200).send("Flight deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting Flight");
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

//Endpoint that Deletes old flights automatically
app.post("/api/delete-old-flights", upload.array(null), async (req, res) => {
  const { flights } = req.body;

  if (!flights || flights.length === 0) {
    return res.status(400).send("No flights provided for deletion");
  }

  try {
    let connection = await oracledb.getConnection(dbConfig);
    flights.forEach(async (flight) => {
      const { FLIGHTID: id } = flight;

      try {
        await connection.execute(
          `DELETE FROM Flights WHERE FLIGHTID = :id`,
          [id],
          { autoCommit: true }
        );
      } catch (err) {
        console.error(`Error deleting flight with ID ${id}:`, err);
      }
    });

    res.send("Old flights deleted successfully");
  } catch (err) {
    console.error("Error deleting old flights:", err);
    res.status(500).send("Failed to delete old flights");
  }
});

//Destinations
//Endpoint to GET destinations
app.get("/api/get-destinations", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM destinations");
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to ADD destinations
app.post(
  "/api/add-destination",
  upload.array("images", 3),
  async (req, res) => {
    const { country, city, caption } = req.body;

    const imageUrls = req.files.map((file) => {
      const filePath = path.join(
        __dirname,
        "public",
        "Uploads",
        file.originalname
      );
      fs.writeFileSync(filePath, file.buffer);
      return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
    });

    const imageUrlsString = imageUrls.join(",");

    let query =
      "Insert into destinations(country,city,caption,images) values (:country,:city,:caption,:imageUrlsString)";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        country,
        city,
        caption,
        imageUrlsString,
      });

      await connection.commit();
      res.status(200).send("Destination added successfully");
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send("Error adding Destination");
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  }
);

// Endpoint to Delete Destinations
app.delete("/api/delete-destination/:id", async (req, res) => {
  const { id } = req.params;
  const { oldImages } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `DELETE FROM Destinations WHERE DESTINATIONID = :id`,
      [id],
      {
        autoCommit: true,
      }
    );
    oldImages.forEach((imageUrl) => {
      const imagePath = path.join(__dirname, "public", imageUrl); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    res.status(200).send("Destinations deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting Destinations");
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// Endpoint to Update destinations
app.put(
  "/api/update-destination",
  upload.array("images", 3),
  async (req, res) => {
    const { id, country, city, caption, oldImages } = req.body;

    const parsedOldImages = JSON.parse(oldImages).oldImages;

    parsedOldImages.forEach((old) => {
      const imagePath = path.join(__dirname, "public", old); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    const imageUrls = req.files.map((file) => {
      const filePath = path.join(
        __dirname,
        "public",
        "Uploads",
        file.originalname
      );
      fs.writeFileSync(filePath, file.buffer);
      return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
    });

    const imageUrlsString = imageUrls.join(",");

    let query =
      "Update destinations set country=:country,city=:city,caption=:caption,images=:imageUrlsString where DESTINATIONID=:id";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        country,
        city,
        caption,
        imageUrlsString,
        id,
      });

      await connection.commit();
      res.status(200).send("Destination updated successfully");
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send("Error updating Destination");
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  }
);

//Trip Packages
// Endpoint to GET trip packages
app.get("/api/get-trips", async (req, res) => {
  try {
    const result = await getQuery("SELECT  * FROM TripPackages"); // Adjust the query
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to ADD Trip Pacakge
app.post("/api/add-trip", upload.array("images", 1), async (req, res) => {
  const {
    packageName,
    city,
    duration,
    availability,
    reqs,
    ratings,
    price,
    destination,
  } = req.body;

  const imageUrls = req.files.map((file) => {
    const filePath = path.join(
      __dirname,
      "public",
      "Uploads",
      file.originalname
    );
    fs.writeFileSync(filePath, file.buffer);
    return path.join("/Uploads/", file.originalname).replace(/\\/g, "/");
  });

  const imageUrlsString = imageUrls.join(",");

  const array = ratings.split(",");
  const Accomodation = array[0];
  const Destination = array[1];
  const Value = array[2];
  const Transport = array[3];
  const Meals = array[4];
  const Overall = array[5];

  let query =
    "Insert into TripPackages(title,city,image,packageduration,packageavailability,packagerequirement,accomodationrating,destinationrating,valuerating,transportrating,mealsrating,overallrating,price,destinationID) values (:packageName,:city,:imageUrlsString,:duration,:availability,:reqs,:Accomodation,:Destination,:Value,:Transport,:Meals,:Overall,:price,:destination)";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(query, {
      packageName,
      city,
      imageUrlsString,
      duration,
      availability,
      reqs,
      Accomodation,
      Destination,
      Value,
      Transport,
      Meals,
      Overall,
      price,
      destination,
    });

    await connection.commit();
    res.status(200).send("Trip Package added successfully");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Error adding Trip Package");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

// Endpoint to Delete Reviews
app.delete("/api/delete-trip-package", async (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM TRIPPACKAGES WHERE TRIPPACKAGEID = :id";
  const params = [id];

  try {
    const affectedRows = await DeleteQueryWithParams(query, params);
    if (affectedRows > 0) {
      res.status(200).send("Trip Package deleted successfully");
    } else {
      res.status(404).send("Trip Package not found"); // Handle case where no rows were deleted
    }
  } catch (error) {
    console.error("Error deleting Trip Package:", error);
    res.status(500).send("Internal server error");
  }
});

//Destination Description
// Endpoint to GET Destination Description
app.get("/api/get-destination-desc/:id", async (req, res) => {
  let connection;
  const id = req.params.id;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to select data for the specific trip package ID
    const result = await connection.execute(
      "select * from Destinations d where destinationID=:id",
      [id]
    );

    // Check if any rows were returned
    if (result.rows.length > 0) {
      res.json(result.rows); // Send the first matching record as a JSON response
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  } catch (error) {
    console.error("Error fetching Destination:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

// Endpoint to GET Destination Description Places
app.get("/api/get-destination-desc-places/:id", async (req, res) => {
  let connection;
  const id = req.params.id;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to select data for the specific trip package ID
    const result = await connection.execute(
      "select * from (select * from places where destinationID=:id) where rownum<=4",
      [id]
    );

    // Check if any rows were returned
    if (result.rows.length > 0) {
      res.json(result.rows); // Send the first matching record as a JSON response
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  } catch (error) {
    console.error("Error fetching Destination:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

// Endpoint to GET Destination Description Restaurants
app.get("/api/get-destination-desc-restaurants/:id", async (req, res) => {
  let connection;
  const id = req.params.id;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to select data for the specific trip package ID
    const result = await connection.execute(
      "select * from (select * from Restaurants where destinationID=:id) where rownum<=3",
      [id]
    );

    // Check if any rows were returned
    if (result.rows.length > 0) {
      res.json(result.rows); // Send the first matching record as a JSON response
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  } catch (error) {
    console.error("Error fetching Destination:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

// Endpoint to GET Destination Description Hotels
app.get("/api/get-destination-desc-hotels/:id", async (req, res) => {
  let connection;
  const id = req.params.id;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to select data for the specific trip package ID
    const result = await connection.execute(
      "select * from (select * from Hotels where destinationID=:id) where rownum<=5",
      [id]
    );

    // Check if any rows were returned
    if (result.rows.length > 0) {
      res.json(result.rows); // Send the first matching record as a JSON response
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  } catch (error) {
    console.error("Error fetching Destination:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

// Endpoint to GET Destination Description Trips
app.get("/api/get-destination-trips/:id", async (req, res) => {
  let connection;
  const id = req.params.id;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to select data for the specific trip package ID
    const result = await connection.execute(
      "select * from (select * from TripPackages where destinationID=:id) where rownum<=2",
      [id]
    );

    // Check if any rows were returned
    if (result.rows.length > 0) {
      res.json(result.rows); // Send the first matching record as a JSON response
    } else {
      res.status(404).json({ error: "Destination not found" });
    }
  } catch (error) {
    console.error("Error fetching Destination:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

//Auth
//Endpoint to Login
app.post("/api/login", upload.array(null), async (req, res) => {
  const { email, password } = req.body;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "select * from TravelUsers where email=:email and userPassword=:password",
      [email, password]
    );

    if (result.rows.length === 1) {
      res.json(result.rows);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

//Endpoint to Signup
app.post("/api/signup", upload.array(null), async (req, res) => {
  const { fullName, email, password } = req.body;

  const role = "User";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      "select * from TravelUsers where email=:email",
      [email]
    );

    if (result.rows.length > 0) {
      res.status(404).json({ error: "Email already exists" });
    } else {
      const result = await connection.execute(
        "insert into Travelusers(fullName,email,userPassword,userRole) values(:fullName,:email,:password,:role)",
        [fullName, email, password, role]
      );

      await connection.commit();

      const result1 = await connection.execute(
        "Select * from TravelUsers where email=:email",
        [email]
      );

      res.status(200).json({
        message: "Registered successfully",
        rows: result1.rows,
      });
    }
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

//Reviews
// Endpoint to GET Reviews
app.get("/api/get-reviews", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM Reviews");
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to Delete Reviews
app.delete("/api/delete-review", async (req, res) => {
  const { review } = req.body;
  const query = "DELETE FROM reviews WHERE REVIEWID = :review";
  const params = [review];

  try {
    const affectedRows = await DeleteQueryWithParams(query, params);
    if (affectedRows > 0) {
      res.status(200).send("Review deleted successfully");
    } else {
      res.status(404).send("Review not found"); // Handle case where no rows were deleted
    }
  } catch (error) {
    console.error("Error deleting Review:", error);
    res.status(500).send("Internal server error");
  }
});

// Endpoint to ADD Reviews
app.post("/api/add-review", upload.array(null), async (req, res) => {
  const {
    comments,
    username,
    userID,
    accommodationRating,
    destinationRating,
    valueForMoneyRating,
    transportRating,
    mealsRating,
    overallRating,
    tripPackageID,
    tripPackageName,
  } = req.body;

  let query =
    "Insert into Reviews(UserID,Username,tripPackageID,PackageName,Comments,AccommodationStars,DestinationStars,ValueStars,TransportStars,MealsStars,OverallStars) values (:userID,:username,:tripPackageID,:tripPackageName,:comments,:accommodationRating,:destinationRating,:valueForMoneyRating,:transportRating,:mealsRating,:overallRating)";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(query, {
      userID,
      username,
      tripPackageID,
      tripPackageName,
      comments,
      accommodationRating,
      destinationRating,
      valueForMoneyRating,
      transportRating,
      mealsRating,
      overallRating,
    });

    await connection.commit();
    res.status(200).json({ message: "Review posted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Error posting review" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

//Search Results
//Endpoint to get Car Search Results
app.get("/api/get-car-results/:carcity/:cartype", async (req, res) => {
  const carcity = req.params.carcity;
  const cartype = req.params.cartype;
  console.log(carcity);
  console.log(cartype);

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;
    let query;

    if (cartype == "any") {
      query = "select * from Cars where carLocation=:carcity";
      result = await connection.execute(query, [carcity]);
    } else {
      query =
        "select * from Cars where carLocation=:carcity and carType=:cartype";
      result = await connection.execute(query, [carcity, cartype]);
    }

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ error: "No Cars found" });
    }
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

//Endpoint to get Hotel Search Results
app.get("/api/get-hotel-results/:hotelcity/:hotelclass", async (req, res) => {
  const hotelcity = req.params.hotelcity;
  const hotelclass = req.params.hotelclass;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    let result;
    let query;

    if (hotelclass == 0) {
      query = "select * from Hotels where hotelcity=:hotelcity";
      result = await connection.execute(query, [hotelcity]);
    } else {
      query =
        "select * from Hotels where hotelcity=:hotelcity and hotelClass=:hotelclass";
      result = await connection.execute(query, [hotelcity, hotelclass]);
    }

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ error: "No Hotels found" });
    }
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

//Endpoint to get Hotel Search Results
app.get("/api/get-flight-results/:from/:to/:departure", async (req, res) => {
  const fromCity = req.params.from;
  const toCity = req.params.to;
  const departureDate = req.params.departure;

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const currentDate = new Date().toISOString().slice(0, 10);

    let result;
    let query;

    if (departureDate == "any") {
      query =
        "select * from FLIGHTS where FROMCITY=:fromCity and TOCITY=:toCity and TO_DATE(DEPARTUREDATE, 'YYYY-MM-DD') >= TO_DATE(:currentDate, 'YYYY-MM-DD')";

      result = await connection.execute(query, [fromCity, toCity, currentDate]);
    } else {
      query =
        "select * from FLIGHTS where FROMCITY=:fromCity and TOCITY=:toCity and DEPARTUREDATE=:departureDate";
      result = await connection.execute(query, [
        fromCity,
        toCity,
        departureDate,
      ]);
    }

    const invalidFlightsQuery = `
    SELECT * FROM Flights 
    WHERE TO_DATE(DEPARTUREDATE, 'YYYY-MM-DD') < TO_DATE('${currentDate}', 'YYYY-MM-DD')
  `;

    const invalidFlights = await getQuery(invalidFlightsQuery);

    if (invalidFlights.length > 0) {
      await fetch("http://localhost:3000/api/delete-old-flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flights: invalidFlights }),
      });
    }

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ error: "No Flights found" });
    }
  } catch (error) {
    console.error("Error fetching Flights:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

//Payment
//Endpoint to make Car Booking
app.post("/api/add-car-booking", upload.array(null), async (req, res) => {
  const { carRentedDays, carID, userID, carPickupDate, totalAmount } = req.body;

  let query =
    "Insert into CarBookings(userID,carID,carRentedDays,carPickupDate,totalAmount) values (:userID,:carID,:carRentedDays,:carPickupDate,:totalAmount)";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      query,
      {
        userID,
        carID,
        carRentedDays,
        carPickupDate,
        totalAmount,
      },
      { autoCommit: true }
    );

    res.status(200).json({ message: "Car Booked successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Error booking car" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

//Endpoint to make Hotel Booking
app.post("/api/add-hotel-booking", upload.array(null), async (req, res) => {
  const {
    hotelID,
    hotelBookDays,
    userID,
    hotelBookRooms,
    hotelCheckInDate,
    totalPrice,
  } = req.body;

  let query =
    "Insert into HotelBookings(userID,hotelID,hotelBookDays,hotelBookRooms,hotelCheckinDate,totalPrice) values (:userID,:hotelID,:hotelBookDays,:hotelBookRooms,:hotelCheckInDate,:totalPrice)";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      query,
      {
        userID,
        hotelID,
        hotelBookDays,
        hotelBookRooms,
        hotelCheckInDate,
        totalPrice,
      },
      { autoCommit: true }
    );

    res.status(200).json({ message: "Hotel Booked successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Error booking Hotel" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

//Endpoint to make Trip Booking
app.post("/api/add-trip-booking", upload.array(null), async (req, res) => {
  const { userID, packageID } = req.body;

  let query =
    "Insert into TripBookings(userID,packageID) values (:userID,:packageID)";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      query,
      {
        userID,
        packageID,
      },
      { autoCommit: true }
    );

    res.status(200).json({ message: "Trip Booked successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Error booking trip package" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

//Endpoint to make Flight Booking
app.post("/api/add-flight-booking", upload.array(null), async (req, res) => {
  const userID = Number(req.body.userID);
  const flightID = Number(req.body.flightID);
  const passengers = Number(req.body.passengers);
  const totalPrice = Number(req.body.totalPrice);

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      `BEGIN
          AddFlightBooking(:userID, :flightID, :passengers, :totalPrice);
       END;`,
      { userID, flightID, passengers, totalPrice }
    );

    res.status(200).json({ message: "Flight Booked successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Error booking Flight" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing the connection:", err);
      }
    }
  }
});

// Endpoint to GET Trip Package Card
app.get("/api/get-trip-card", async (req, res) => {
  try {
    const result = await getQuery(
      "SELECT * FROM (SELECT * FROM TripPackages ORDER BY overallRating DESC) WHERE ROWNUM <= 3"
    );
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to GET Destination Card
app.get("/api/get-destination-card", async (req, res) => {
  try {
    const result = await getQuery(
      "SELECT * FROM (SELECT * FROM Destinations) WHERE ROWNUM <= 3"
    );
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

//Trip Package Page Data
//Endpoint to GET Trip Package Data Only
app.get("/api/get-trip-package/:id", async (req, res) => {
  let connection;

  const tripPackageID = req.params.id;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    // Query to select data for the specific trip package ID
    const result = await connection.execute(
      "select * from tripPackages t join Places p on p.tripPackageID=t.tripPackageID join Hotels h on h.tripPackageID=t.tripPackageID where t.tripPackageID=:tripPackageID",
      [tripPackageID]
    );

    // Check if any rows were returned
    if (result.rows.length > 0) {
      res.json(result.rows); // Send the first matching record as a JSON response
    } else {
      res.status(404).json({ error: "Trip package not found" });
    }
  } catch (error) {
    console.error("Error fetching trip package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

//Endpoint to GET Trip Package Data Only
app.get("/api/get-trip-package-visit/:id", async (req, res) => {
  let connection;

  const tripPackageID = req.params.id;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    // Query to select data for the specific trip package ID
    const result = await connection.execute(
      "select * from Places where tripPackageID=:tripPackageID",
      [tripPackageID]
    );

    // Check if any rows were returned
    if (result.rows.length > 0) {
      res.json(result.rows); // Send the first matching record as a JSON response
    } else {
      res.status(404).json({ error: "Trip package not found" });
    }
  } catch (error) {
    console.error("Error fetching trip package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the database connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

//Subscribe To Email Endpoint
app.post("/subscribe", upload.array(null), async (req, res) => {
  const { email } = req.body;

  const EMAIL_USER = process.env.EMAIL_USER;

  const EMAIL_PASS = process.env.EMAIL_PASS;

  // Set up the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // Email details
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Thank you for subscribing!",
    text: "We appreciate your interest in Majestic Travels! Stay tuned for updates.",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});
