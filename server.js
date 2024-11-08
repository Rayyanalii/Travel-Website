import express from "express";
import oracledb from "oracledb";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

oracledb.initOracleClient({ libDir: "D:\\Instant Client\\instantclient_23_5" });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: "hr",
  password: "abc123",
  connectionString: "localhost/xe",
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public", "Uploads")); // Use the existing 'Uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

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

async function grantQuery(query) {
  let con;
  try {
    con = await oracledb.getConnection({
      user: "hr",
      password: "abc123",
      connectString: "localhost/xe",
    });
    const result = await con.execute(query);

    return result;
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
    con = await oracledb.getConnection({
      user: "hr",
      password: "abc123",
      connectString: "localhost/xe",
    });

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

// Endpoint to GET places to visit
app.get("/api/get-places-to-visit", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM Places");

    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to GET best places to eat
app.get("/api/get-restaurants", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM Restaurants"); // Adjust the query
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to GET hotels
app.get("/api/get-hotels", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM hotels");
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to GET trip packages
app.get("/api/trip-packages", async (req, res) => {
  try {
    const result = await getQuery("SELECT first_name FROM employees"); // Adjust the query
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to ADD places to visit
app.post(
  "/api/add-place-to-visit",
  upload.array("images", 5),
  async (req, res) => {
    const { placeTitle, placeCity, placeDescription } = req.body;
    const imageUrls = req.files.map((file) =>
      path.join("/Uploads/", file.filename).replace(/\\/g, "/")
    );
    const imageUrlsString = imageUrls.join(",");

    let query =
      "Insert into Places(placeTitle,placeCity,placeDescription,placeImages) values (:placeTitle,:placeCity,:placeDescription,:imageUrlsString)";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        placeTitle,
        placeCity,
        placeDescription,
        imageUrlsString,
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

// Endpoint to ADD Car
app.post("/api/add-car", upload.array("images", 1), async (req, res) => {
  const { carmake, carmodel, caryear, carlocation, cartype, carprice } =
    req.body;

  const imageUrls = req.files.map((file) =>
    path.join("/Uploads/", file.filename).replace(/\\/g, "/")
  );

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

// Endpoint to ADD Restaurants
app.post("/api/add-restaurant", upload.array("images", 2), async (req, res) => {
  const { restaurantName, restaurantCity, restaurantDescription } = req.body;
  const imageUrls = req.files.map((file) =>
    path.join("/Uploads/", file.filename).replace(/\\/g, "/")
  );
  const imageUrlsString = imageUrls.join(",");

  let query =
    "Insert into Restaurants(restaurantName,restaurantCity,restaurantDescription,restaurantImages) values (:restaurantName,:restaurantCity,:restaurantDescription,:imageUrlsString)";

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(query, {
      restaurantName,
      restaurantCity,
      restaurantDescription,
      imageUrlsString,
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

// Endpoint to ADD Destinations
app.post(
  "/api/add-destination",
  upload.array("images", 3),
  async (req, res) => {
    const { country, city, caption } = req.body;
    const bestPlaces = JSON.stringify(req.body.bestPlaces);
    const bestEats = JSON.stringify(req.body.bestEats);
    const bestStays = JSON.stringify(req.body.bestStays);
    const tripPackages = JSON.stringify(req.body.tripPackages);

    const imagePaths = JSON.stringify(
      req.files.map((file) => `/Uploads/${file.filename}`)
    );

    const query = `INSERT INTO destinations (country, city, caption, images, best_places, best_eats, best_stays, trip_packages)
                     VALUES (:country, :city, :caption, :imagePaths, :bestPlaces, :bestEats, :bestStays, :tripPackages)`;

    let connection;
    try {
      // Get the database connection
      connection = await oracledb.getConnection({
        user: "hr",
        password: "abc123",
        connectString: "localhost/xe",
      });

      const result = await connection.execute(query, {
        country, // Replace with actual value for country
        city,
        caption,
        imagePaths,
        bestPlaces,
        bestEats,
        bestStays,
        tripPackages, // Replace with actual value for city
      });
      await connection.commit();
      res.status(200).send("Destination added successfully");
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send("Error adding destination");
    } finally {
      if (connection) {
        try {
          await connection.close(); // Close the connection
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  }
);

// Endpoint to ADD Hotel
app.post(
  "/api/add-hotel",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 2 },
  ]),
  async (req, res) => {
    const { hotelName, hotelCity, hotelDescription, hotelClass, hotelPrice } =
      req.body;

    const logoImageUrl = req.files["logo"]
      ? path
          .join("/Uploads/", req.files["logo"][0].filename)
          .replace(/\\/g, "/")
      : "";

    const imageUrls = req.files["images"]
      ? req.files["images"].map((file) =>
          path.join("/Uploads/", file.filename).replace(/\\/g, "/")
        )
      : [];

    const imageUrlsString = imageUrls.join(",");

    let query =
      "Insert into Hotels(hotelName,hotelCity,hotelDescription,hotelLogo,hotelImages,hotelClass,hotelPricePerNight) values (:hotelName,:hotelCity,:hotelDescription,:logoImageUrl,:imageUrlsString,:hotelClass,hotelPrice)";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        hotelName,
        hotelCity,
        hotelDescription,
        logoImageUrl,
        imageUrlsString,
        hotelClass,
        hotelPrice,
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

// Endpoint to GET Cars
app.get("/api/get-cars", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM Cars");
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to GET Flights
app.get("/api/get-flights", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM Flights");
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

// Endpoint to ADD Flights
app.post("/api/add-car", upload.array("images", 1), async (req, res) => {
  const {
    airline,
    fromcity,
    tocity,
    departuredate,
    availableseats,
    seatprice,
  } = req.body;

  const imageUrls = req.files.map((file) =>
    path.join("/Uploads/", file.filename).replace(/\\/g, "/")
  );

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

// Endpoint to GET Reviews
app.get("/api/get-reviews", async (req, res) => {
  try {
    const result = await getQuery("SELECT * FROM Reviews");
    res.json(result);
  } catch (err) {
    res.status(500).send("Database error");
  }
});

app.get("/api/get-destination-card", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: "abc123",
      connectString: "localhost/xe",
    });

    const query = `
      SELECT CITY,
             TRIM(BOTH '"' FROM SUBSTR(images, INSTR(images, '"', 1, 1) + 1, 
             INSTR(images, '"', 1, 2) - INSTR(images, '"', 1, 1) - 1)) AS first_image_url
      FROM DESTINATIONS
    `;

    const result = await connection.execute(query);

    // Check if results exist
    if (!result || result.length === 0) {
      console.log("No destinations found");
      return res.json([]); // Return an empty array if no results
    }

    const destinations = await Promise.all(
      result.rows.map(async (row) => {
        const city = row.CITY;
        let firstImageUrl = row.FIRST_IMAGE_URL;

        // Read CLOB if it's still a CLOB object
        if (firstImageUrl && typeof firstImageUrl === "object") {
          firstImageUrl = await readClob(firstImageUrl); // Use the readClob function to convert it to string
        }

        return {
          CITY: city,
          first_image_url: firstImageUrl, // This should now be a string
        };
      })
    );

    res.json(destinations); // Send the processed results as a JSON array
  } catch (err) {
    console.error("Error fetching destinations:", err); // Log error for debugging
    res.status(500).send("Database error");
  } finally {
    // Ensure the connection is closed
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

app.get("/api/get-destinations", async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: "abc123",
      connectString: "localhost/xe",
    });

    const query = `
      SELECT *
      FROM DESTINATIONS
    `;

    const result = await connection.execute(query);

    // Check if results exist
    if (!result || result.length === 0) {
      console.log("No destinations found");
      return res.json([]); // Return an empty array if no results
    }

    const destinations = await Promise.all(
      result.rows.map(async (row) => {
        const city = row.CITY;
        const country = row.COUNTRY;
        const caption = row.CAPTION;

        const firstImageUrl = row.IMAGES ? await readClob(row.IMAGES) : "";
        const bestPlaces = row.BEST_PLACES
          ? await readClob(row.BEST_PLACES)
          : "";
        const bestEats = row.BEST_EATS ? await readClob(row.BEST_EATS) : "";
        const bestStays = row.BEST_STAYS ? await readClob(row.BEST_STAYS) : "";
        const tripPackages = row.TRIP_PACKAGES
          ? await readClob(row.TRIP_PACKAGES)
          : "";

        const imageUrls = firstImageUrl
          ? JSON.parse(firstImageUrl || "[]")
          : [];

        return {
          city: city,
          country: country,
          caption: caption,
          first_image_url: imageUrls,
          best_places: JSON.parse(bestPlaces || "[]"), // Ensure valid JSON
          best_eats: JSON.parse(bestEats || "[]"), // Ensure valid JSON
          best_stays: JSON.parse(bestStays || "[]"), // Ensure valid JSON
          trip_packages: JSON.parse(tripPackages || "[]"), // Ensure valid JSON
        };
      })
    );

    res.json(destinations); // Send the processed results as a JSON array
  } catch (err) {
    console.error("Error fetching destinations:", err); // Log error for debugging
    res.status(500).send("Database error");
  } finally {
    // Ensure the connection is closed
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
});

app.delete("/api/delete-destination", async (req, res) => {
  const { city } = req.body;
  const query = "DELETE FROM destinations WHERE CITY = :city";
  const params = [city];

  try {
    const affectedRows = await DeleteQueryWithParams(query, params);
    if (affectedRows > 0) {
      res.status(200).send("Destination deleted successfully");
    } else {
      res.status(404).send("Destination not found"); // Handle case where no rows were deleted
    }
  } catch (error) {
    console.error("Error deleting destination:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/grant-access", async (req, res) => {
  const query = "GRANT SELECT ON reviews TO hr";

  try {
    const affectedRows = await grantQuery(query);
    res.status(200).send(affectedRows);
  } catch (error) {
    console.error("Error deleting Review:", error);
    res.status(500).send("Internal server error");
  }
});

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

app.get("/trip-packages/:id", async (req, res) => {
  let connection;

  const tripPackageID = req.params.id;

  try {
    // Establish a connection to the database
    connection = await oracledb.getConnection(dbConfig);

    // Query to select data for the specific trip package ID
    const result = await connection.execute(
      "SELECT tp.*,p.* FROM TripPackages tp join Places p on p.placesID=tp.tripPackageID WHERE tripPackageID = :id",
      [tripPackageID]
    );

    // Check if any rows were returned
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Send the first matching record as a JSON response
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

const readClob = (clob) => {
  return new Promise((resolve, reject) => {
    let result = "";

    // Read the CLOB data
    clob.setEncoding("utf8");
    clob.on("data", (chunk) => {
      result += chunk; // Append each chunk to the result
    });

    clob.on("end", () => {
      resolve(result); // Resolve the promise with the final string
    });

    clob.on("error", (err) => {
      reject(err); // Reject the promise on error
    });
  });
};

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});
