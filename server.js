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

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "public", "Uploads")); // Use the existing 'Uploads' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Use the original file name
//   },
// });

// const upload = multer({ storage: storage });

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
  const { restaurantName, restaurantCity, restaurantDescription } = req.body;

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
      "Update Restaurants set restaurantName=:restaurantName,restaurantCity=:restaurantCity,restaurantDescription=:restaurantDescription,restaurantImages=:imageUrlsString where restaurantID=:restaurantID";

    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(query, {
        restaurantName,
        restaurantCity,
        restaurantDescription,
        imageUrlsString,
        restaurantID,
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

    oldImages.forEach((imageUrl) => {
      const imagePath = path.join(__dirname, "public", imageUrl); // Path to the image in the 'uploads' folder
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the image file
      } else {
        console.log(`Image not found: ${imagePath}`);
      }
    });

    await connection.execute(
      `DELETE FROM Destinations WHERE DESTINATIONID = :id`,
      [id],
      {
        autoCommit: true,
      }
    );

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
  const { packageName, city, duration, availability, reqs, ratings, price } =
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

  const array = ratings.split(",");
  const Accomodation = array[0];
  const Destination = array[1];
  const Value = array[2];
  const Transport = array[3];
  const Meals = array[4];
  const Overall = array[5];

  let query =
    "Insert into TripPackages(title,city,image,packageduration,packageavailability,packagerequirement,accomodationrating,destinationrating,valuerating,transportrating,mealsrating,overallrating,price) values (:packageName,:city,:imageUrlsString,:duration,:availability,:reqs,:Accomodation,:Destination,:Value,:Transport,:Meals,:Overall,:price)";

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
app.post("/api/add-flight", upload.array("images", 1), async (req, res) => {
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

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});
