import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { use } from "react";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Blade4844912", 
  // password: "#@32!Admin99",
  database: "finditdb",
});

app.get("/", (req, res) => {
  res.json("hello from FindIt backend.");
});

// test out finder accounts first
app.get("/finder_accounts", (req, res) => {
  const q = "SELECT * FROM finder;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// get specific finder account user
// check if it still returns null might be helpful
  // check if null deny access to webpage, else login
app.post("/finder_account", (req, res) => {
  const q = "SELECT * FROM finder WHERE Password = ? AND Email = ?";

  // test with existing account
  // const values = [
  //   "finder123", // Password as a varchar
  //   "finder1@example.com", // Email as a varchar
  // ];

  // test with non-existing account
  // const values = [
  //   "finder123nonexist", // Password as a varchar
  //   "findernotexist1@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.json({ success: true, user: data[0] });
  });
});


app.post("/finder_accounts", (req, res) => {
  const q = "INSERT INTO finder(`Password`, `Email`) VALUES (?)";

  // Use to test the post command to database
  // const values = [
  //   "testingPassword123", // Password as a varchar
  //   "testingemail@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.get("/owner_accounts", (req, res) => {
  const q = "SELECT * FROM owner;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/owner_account", (req, res) => {
  const q = "SELECT * FROM owner WHERE Password = ? AND Email = ?";

  // test with existing account
  // const values = [
  //   "owner123", // Password as a varchar
  //   "owner1@example.com", // Email as a varchar
  // ];

  // test with non-existing account
  // const values = [
  //   "owner123nonexist", // Password as a varchar
  //   "ownernotexist1@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.json({ success: true, user: data[0] });
  });
});


app.post("/owner_accounts", (req, res) => {
  const q = "INSERT INTO owner(`Password`, `Email`) VALUES (?)";

  // Use to test the post command to database
  // const values = [
  //   "testingPassword123", // Password as a varchar
  //   "testingemail@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/check_account", (req, res) => {
  const email = req.query.email;
  const q = `SELECT Email FROM finder WHERE Email = ?
             UNION
             SELECT Email FROM owner WHERE Email = ?
             UNION
             SELECT Email FROM admin WHERE Email = ?`;

  const values = [email, email, email];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (data.length > 0) {
      return res.json({ exists: true });
    }

    return res.json({ exists: false });
  });
});


app.get("/admin_accounts", (req, res) => {
  const q = "SELECT * FROM admin;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/admin_account", (req, res) => {
  const q = "SELECT * FROM admin WHERE Password = ? AND Email = ?";

  // test with existing account
  // const values = [
  //   "admin123", // Password as a varchar
  //   "admin1@example.com", // Email as a varchar
  // ];

  // test with non-existing account
  // const values = [
  //   "admin123nonexist", // Password as a varchar
  //   "adminnotexist1@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    return res.json({ success: true, user: data[0] });
  });
});

app.post("/admin_accounts", (req, res) => {
  const q = "INSERT INTO admin(`Password`, `Email`) VALUES (?)";

  // Use to test the post command to database
  // const values = [
  //   "testingPassword123", // Password as a varchar
  //   "testingemail@example.com", // Email as a varchar
  // ];

  const values = [
    req.body.Password, // Password as a varchar
    req.body.Email, // Email as a varchar
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/lost_items", (req, res) => {
  const q = `SELECT lost_item.LostItem_ID, Description, Name, Status, Date, Floor_number, Location_Name, Address 
             FROM finditdb.lost_item 
             JOIN finditdb.location ON lost_item.Location_id = location.Location_id`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    return res.json(data);
  });
});

app.get("/claim_items", (req, res) => {
  const q = "SELECT * FROM finditdb.claim";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    return res.json(data);
  });
});

app.post("/add_newclaim", (req, res) => {
  const q = "INSERT INTO claim(`Owner_ID_number`, `LostItem_ID`, `Status`, `Text`) VALUES (?, ?, ?, ?)";
  
  const values = [
    req.body.Owner_ID_number,
    req.body.LostItem_ID,
    req.body.Status,
    req.body.Text
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to insert new claim" });
    }
    return res.json(data);
  });
});

app.post("/get_user_profile", (req, res) => {
  const q = `SELECT profile.Mobile_no, Bio, Image, First_name, Last_name
            FROM finditdb.finder
            JOIN finditdb.finder_name ON finder_name.Finder_ID_number = finder.Finder_ID_number
            JOIN finditdb.profile ON finder_name.Mobile_no = profile.Mobile_no
            WHERE finder.Finder_ID_number = ?

            UNION

            SELECT profile.Mobile_no, Bio, Image, First_name, Last_name
            FROM finditdb.owner
            JOIN finditdb.owner_name ON owner_name.Owner_ID_number = owner.Owner_ID_number
            JOIN finditdb.profile ON owner.Mobile_no = profile.Mobile_no
            WHERE owner.Owner_ID_number = ?`;

  const values = [
    req.body.Finder_ID_number,
    req.body.Owner_ID_number // Same ID used for both
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Profile not found." });
    }

    const user = data[0];

    // Convert image BLOB to base64
    if (user.Image) {
      // const base64Image = Buffer.from(user.Image).toString('base64');
      user.Image = `data:image/jpeg;base64,${Buffer.from(user.Image).toString("base64")}`;
    } else {
      user.Image = null
    }

    return res.json({ success: true, user });
  });
});

app.get("/posts", (req, res) => {
  const q = `SELECT post.Title, Content, Year, Day, Month, post_image.Image AS PostImage, profile.Image AS ProfileImage, First_name, Last_name 
            FROM finditdb.post
            JOIN finditdb.post_date ON post.Title=post_date.Title
            LEFT JOIN finditdb.post_image ON post_date.Title=post_image.Title
            JOIN finditdb.finder ON post.Finder_ID_number=finder.Finder_ID_number
            JOIN finditdb.finder_name ON finder_name.Finder_ID_number = finder.Finder_ID_number
            JOIN finditdb.profile ON finder_name.Mobile_no = profile.Mobile_no
            ORDER BY Year DESC, Month DESC, Day DESC`;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
    // Convert each image buffer to base64 data URL
    const processedData = data.map(post => {
      const processedPost = { ...post };
      if (post.PostImage) {
        processedPost.PostImage = `data:image/jpeg;base64,${Buffer.from(post.PostImage).toString("base64")}`;
      }
      if (post.ProfileImage) {
        processedPost.ProfileImage = `data:image/jpeg;base64,${Buffer.from(post.ProfileImage).toString("base64")}`;
      }
      return processedPost;
    });

    return res.json(processedData);
  });
});

app.post("/create_profile", (req, res) => {

  const includeImage = req.body.Image !== null;
  
  let q;
  let values;
  
  if (includeImage) {
    q = "INSERT INTO profile(`Mobile_no`, `Bio`, `Image`) VALUES (?, ?, ?)";
    values = [
      req.body.Mobile_no,
      req.body.Bio || null,
      req.body.Image  
    ];
  } else {
    q = "INSERT INTO profile(`Mobile_no`, `Bio`) VALUES (?, ?)";
    values = [
      req.body.Mobile_no,
      req.body.Bio || null
    ];
  }
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create profile" });
    }
    return res.json({ success: true, data });
  });
});


app.post("/create_finder_name", (req, res) => {
  const q = "INSERT INTO finder_name(`Finder_ID_number`, `First_name`, `Last_name`, `Mobile_no`) VALUES (?, ?, ?, ?)";
  
  const values = [
    req.body.Finder_ID_number,
    req.body.First_name,
    req.body.Last_name,
    req.body.Mobile_no
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create finder name" });
    }
    return res.json({ success: true, data });
  });
});

app.post("/create_owner_name", (req, res) => {
  const q = "INSERT INTO owner_name(`Owner_ID_number`, `First_name`, `Last_name`) VALUES (?, ?, ?)";
  
  const values = [
    req.body.Owner_ID_number,
    req.body.First_name,
    req.body.Last_name
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create owner name" });
    }
    return res.json({ success: true, data });
  });
});


app.put("/update_owner_mobile", (req, res) => {
  const q = "UPDATE owner SET Mobile_no = ? WHERE Owner_ID_number = ?";
  
  const values = [
    req.body.Mobile_no,
    req.body.Owner_ID_number
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to update owner mobile" });
    }
    return res.json({ success: true, data });
  });
});


app.put("/update_profile", (req, res) => {
  const bio = req.body.Bio || null;
  const mobileNo = req.body.Mobile_no;
  let image = req.body.Image;

  // Decode base64 image to Buffer if image is provided
  if (!image || image === "null" || image === "") {
    image = null;
  } else {
    try {
      const base64Data = image.split(',')[1]; // Remove data:image/...;base64,
      image = Buffer.from(base64Data, 'base64');
    } catch (err) {
      console.error("Error decoding base64 image:", err);
      return res.status(400).json({ error: "Invalid image format" });
    }
  }

  // Construct SQL query and values
  let q;
  let values;

  if (image !== null) {
    q = "UPDATE profile SET Bio = ?, Image = ? WHERE Mobile_no = ?";
    values = [bio, image, mobileNo];
  } else {
    q = "UPDATE profile SET Bio = ?, Image = NULL WHERE Mobile_no = ?";
    values = [bio, mobileNo];
  }

  // Execute query
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to update profile" });
    }
    return res.json({ success: true, data });
  });
});

app.put("/update_finder_name", (req, res) => {
  const q = "UPDATE finder_name SET First_name = ?, Last_name = ?, Mobile_no = ? WHERE Finder_ID_number = ?";
  
  const values = [
    req.body.First_name,
    req.body.Last_name,
    req.body.Mobile_no,
    req.body.Finder_ID_number
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to update finder name" });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Finder name record not found" });
    }
    
    return res.json({ success: true, data });
  });
});

app.put("/update_owner_name", (req, res) => {
  const q = "UPDATE owner_name SET First_name = ?, Last_name = ? WHERE Owner_ID_number = ?";
  
  const values = [
    req.body.First_name,
    req.body.Last_name,
    req.body.Owner_ID_number
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to update owner name" });
    }
    
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Owner name record not found" });
    }
    
    return res.json({ success: true, data });
  });
});

// Update an item (for admin)
app.put("/update_item/:id", (req, res) => {
  const itemId = req.params.id;
  const { Name, Description, Status } = req.body;
  
  const q = "UPDATE lost_item SET Name = ?, Description = ?, Status = ? WHERE LostItem_ID = ?";
  
  db.query(q, [Name, Description, Status, itemId], (err, data) => {
    if (err) {
      console.error("Error updating item:", err);
      return res.status(500).json({ error: "Database error." });
    }
    return res.json({ success: true, message: "Item updated successfully" });
  });
});

// Update an item (for admin)
app.put("/update_item_byclaim", (req, res) => {
  
  const q = "UPDATE lost_item SET Claim_ID = ? WHERE LostItem_ID = ?";

  const values =[
    req.body.Claim_ID,    
    req.body.LostItem_ID,    
  ]
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error updating item:", err);
      return res.status(500).json({ error: "Database error." });
    }
    return res.json({ success: true, message: "Item updated successfully" });
  });
});

// Delete an item (for admin)
app.delete("/delete_item/:id", (req, res) => {
  const itemId = req.params.id;
  
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ error: "Database error." });
    }

    db.query("UPDATE lost_item SET Claim_ID = NULL WHERE LostItem_ID = ?", [itemId], (err) => {
      if (err) {
        return db.rollback(() => {
          console.error("Error nullifying claim reference:", err);
          res.status(500).json({ error: "Database error." });
        });
      }

      db.query("DELETE FROM claim WHERE LostItem_ID = ?", [itemId], (err) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error deleting related claims:", err);
            res.status(500).json({ error: "Database error." });
          });
        }

        db.query("DELETE FROM creates WHERE LostItem_ID = ?", [itemId], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error deleting from creates:", err);
              res.status(500).json({ error: "Database error." });
            });
          }

          // Delete from specifications
          db.query("DELETE FROM specifications WHERE LostItem_ID = ?", [itemId], (err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Error deleting from specifications:", err);
                res.status(500).json({ error: "Database error." });
              });
            }

            // Finally, delete from lost_item
            db.query("DELETE FROM lost_item WHERE LostItem_ID = ?", [itemId], (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error("Error deleting lost item:", err);
                  res.status(500).json({ error: "Database error." });
                });
              }

              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error("Error committing transaction:", err);
                    res.status(500).json({ error: "Database error." });
                  });
                }
                res.json({ success: true, message: "Item deleted successfully" });
              });
            });
          });
        });
      });
    });
  });
});


// Delete a finder (for admin)
app.delete("/delete_finder/:id", (req, res) => {
  const finderId = req.params.id;

  // First delete notifications related to the finder
  db.query("DELETE FROM notification WHERE Finder_ID_number = ?", [finderId], (err) => {
    if (err) {
      console.error("Error deleting notifications:", err);
      return res.status(500).json({ error: "Database error." });
    }

    // Then delete the finder
    const q = "DELETE FROM finder WHERE Finder_ID_number = ?";
    db.query(q, [finderId], (err, data) => {
      if (err) {
        console.error("Error deleting finder:", err);
        return res.status(500).json({ error: "Database error." });
      }
      return res.json({ success: true, message: "Finder deleted successfully" });
    });
  });
});

// Delete an owner (for admin)
app.delete("/delete_owner/:id", (req, res) => {
  const ownerId = req.params.id;

  // First delete notifications related to the owner
  db.query("DELETE FROM notification WHERE Owner_ID_number = ?", [ownerId], (err) => {
    if (err) {
      console.error("Error deleting notifications:", err);
      return res.status(500).json({ error: "Database error." });
    }

    // Then delete the owner
    const q = "DELETE FROM owner WHERE Owner_ID_number = ?";
    db.query(q, [ownerId], (err, data) => {
      if (err) {
        console.error("Error deleting owner:", err);
        return res.status(500).json({ error: "Database error." });
      }
      return res.json({ success: true, message: "Owner deleted successfully" });
    });
  });
});


app.post("/add_post_content",  (req, res) => {
  const q = "INSERT INTO post(`Title`, `Content`, `Finder_ID_number`) VALUES (?, ?, ?)";

  const values = [
    req.body.Title,
    req.body.Content,
    req.body.Finder_ID_number,
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create post content" });
    }
    return res.json({ success: true, data });
  });
});

app.post("/add_post_date",  (req, res) => {
  const q = "INSERT INTO post_date(`Title`, `Year`, `Day`, `Month`) VALUES (?, ?, ?, ?)";

  const values = [
    req.body.Title,
    req.body.Year,
    req.body.Day,
    req.body.Month,
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create post date"});
    }
    return res.json({ success: true, data });
  });
});

app.post('/add_post_image', (req, res) => {
  const { Title, Image } = req.body;

  if (!Image) {
    // Insert with NULL if no image is provided
    db.query("INSERT INTO post_image (Title, Image) VALUES (?, NULL)", [Title], (err, result) => {
      if (err) {
        console.error("Insert NULL image error:", err);
        return res.status(500).send("Error inserting null image.");
      }
      res.send("Image not provided, inserted null.");
    });
  } else {
    try {
      // Convert base64 to binary buffer
      const buffer = Buffer.from(Image.split(",")[1], "base64");

      // Insert buffer into BLOB column
      db.query("INSERT INTO post_image (Title, Image) VALUES (?, ?)", [Title, buffer], (err, result) => {
        if (err) {
          console.error("Insert image error:", err);
          return res.status(500).send("Error inserting image.");
        }
        res.send("Image uploaded successfully.");
      });
    } catch (error) {
      console.error("Buffer conversion error:", error);
      return res.status(500).send("Failed to process image.");
    }
  }
});

// Update a post (for admin)
app.put("/update_post/:title", (req, res) => {
  const title = req.params.title;
  const { Content, newTitle } = req.body;
  
  // If only updating content (not changing title)
  if (!newTitle || newTitle === title) {
    const q = "UPDATE post SET Content = ? WHERE Title = ?";
    
    db.query(q, [Content, title], (err, data) => {
      if (err) {
        console.error("Error updating post content:", err);
        return res.status(500).json({ error: "Database error." });
      }
      return res.json({ success: true, message: "Post content updated successfully" });
    });
  } else {
    // If updating title (need to update in multiple tables)
    db.beginTransaction((err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        return res.status(500).json({ error: "Database error." });
      }
      
      // Check if the post is referenced in creates table
      db.query("SELECT * FROM creates WHERE Title = ?", [title], (err, createsResults) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error checking creates references:", err);
            res.status(500).json({ error: "Database error." });
          });
        }
        
        // Check if the post is referenced in searches table
        db.query("SELECT * FROM searches WHERE Title = ?", [title], (err, searchesResults) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error checking searches references:", err);
              res.status(500).json({ error: "Database error." });
            });
          }
          
          // First update the post table
          db.query("UPDATE post SET Title = ?, Content = ? WHERE Title = ?", 
            [newTitle, Content, title], 
            (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error("Error updating post title:", err);
                  res.status(500).json({ error: "Database error." });
                });
              }
              
              // Then update post_date table
              db.query("UPDATE post_date SET Title = ? WHERE Title = ?", 
                [newTitle, title], 
                (err) => {
                  if (err) {
                    return db.rollback(() => {
                      console.error("Error updating post_date:", err);
                      res.status(500).json({ error: "Database error." });
                    });
                  }
                  
                  // Update post_image table if it exists
                  db.query("UPDATE post_image SET Title = ? WHERE Title = ?", 
                    [newTitle, title], 
                    (err) => {
                      if (err) {
                        return db.rollback(() => {
                          console.error("Error updating post_image:", err);
                          res.status(500).json({ error: "Database error." });
                        });
                      }
                      
                      // Now handle creates table if needed
                      const updateCreates = createsResults.length > 0 
                        ? new Promise((resolve, reject) => {
                            db.query("UPDATE creates SET Title = ? WHERE Title = ?", [newTitle, title], (err) => {
                              if (err) reject(err);
                              else resolve();
                            });
                          }) 
                        : Promise.resolve();
                        
                      // Handle searches table if needed
                      const updateSearches = searchesResults.length > 0 
                        ? new Promise((resolve, reject) => {
                            db.query("UPDATE searches SET Title = ? WHERE Title = ?", [newTitle, title], (err) => {
                              if (err) reject(err);
                              else resolve();
                            });
                          }) 
                        : Promise.resolve();
                      
                      // Execute updates for creates and searches if needed
                      Promise.all([updateCreates, updateSearches])
                        .then(() => {
                          // Commit transaction
                          db.commit((err) => {
                            if (err) {
                              return db.rollback(() => {
                                console.error("Error committing transaction:", err);
                                res.status(500).json({ error: "Database error." });
                              });
                            }
                            res.json({ success: true, message: "Post updated successfully" });
                          });
                        })
                        .catch(err => {
                          db.rollback(() => {
                            console.error("Error updating references:", err);
                            res.status(500).json({ error: "Database error: " + err.message });
                          });
                        });
                    }
                  );
                }
              );
            }
          );
        });
      });
    });
  }
});

// Update a post image (for admin)
app.put("/update_post_image/:title", (req, res) => {
  const title = req.params.title;
  const { Image } = req.body;

  if (!Image) {
    // Update with NULL if no image is provided
    db.query("UPDATE post_image SET Image = NULL WHERE Title = ?", [title], (err, result) => {
      if (err) {
        console.error("Update NULL image error:", err);
        return res.status(500).send("Error updating image to null.");
      }
      res.send("Image removed successfully.");
    });
  } else {
    try {
      // Convert base64 to binary buffer
      const buffer = Buffer.from(Image.split(",")[1], "base64");

      // Update buffer in BLOB column
      db.query("UPDATE post_image SET Image = ? WHERE Title = ?", [buffer, title], (err, result) => {
        if (err) {
          console.error("Update image error:", err);
          return res.status(500).send("Error updating image.");
        }
        res.send("Image updated successfully.");
      });
    } catch (error) {
      console.error("Buffer conversion error:", error);
      return res.status(500).send("Failed to process image.");
    }
  }
});

// Delete a post (for admin)
app.delete("/delete_post/:title", (req, res) => {
  const title = req.params.title;
  
  // We'll use a simpler approach - since we have ON DELETE CASCADE,
  // we should be able to delete directly from the post table
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ error: "Database error." });
    }
    
    db.query("DELETE FROM post WHERE Title = ?", [title], (err) => {
      if (err) {
        // If there's an error, try a manual approach
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
          return db.rollback(() => {
            console.error("Error deleting post - it has references:", err);
            res.status(400).json({ 
              error: "Cannot delete this post as it's referenced by other data. Please contact the administrator."
            });
          });
        } else {
          // Some other error
          return db.rollback(() => {
            console.error("Error deleting post:", err);
            res.status(500).json({ error: "Database error." });
          });
        }
      }
      
      // If successful, commit transaction
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error committing transaction:", err);
            res.status(500).json({ error: "Database error." });
          });
        }
        res.json({ success: true, message: "Post deleted successfully" });
      });
    });
  });
});

app.use(express.json({ limit: '1gb' })); // Allow large payloads if using base64
app.use(express.urlencoded({ limit: '1gb', extended: true }));

// add new lost_item for finder
app.post('/add_lost_item', (req, res) => {
  const q = "INSERT INTO lost_item(`Description`, `Name`, `Status`, `Date`, `Color_id`, `Location_id`, `Finder_ID_number`) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.Description,
    req.body.Name,
    req.body.Status,
    req.body.Date,
    req.body.Color_id,
    req.body.Location_id,
    req.body.Finder_ID_number,
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create post date"});
    }
    return res.json(data);
  });
});

app.post('/add_lost_item_location', (req, res) => {
  const q = "INSERT INTO location (`Floor_number`, `Location_Name`, `Address`) VALUES(?, ?, ?)";

  const values = [
    req.body.Floor_number,
    req.body.Location_Name,
    req.body.Address
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create post date"});
    }
    return res.json(data);
  });
});

app.post('/add_lost_item_specifications', (req, res) => {
  const q = "INSERT INTO specifications(`Conditions`, `Size_Type`, `Category_Name`, `LostItem_ID`) VALUES (?, ?, ?, ?)";

  const values = [
    req.body.Conditions,
    req.body.Size_Type,
    req.body.Category_Name,
    req.body.LostItem_ID,
  ];
  
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create post date"});
    }
    return res.json(data);
  });
});

app.post("/get_notifications", (req, res) => {
  const q = `SELECT Date, Seen_Status, Text FROM finditdb.notification 
            JOIN finditdb.message ON message.Notify_ID=notification.Notify_ID
            WHERE notification.Finder_ID_number = ?
            UNION
            SELECT Date, Seen_Status, Text FROM finditdb.notification 
            JOIN finditdb.message ON message.Notify_ID=notification.Notify_ID
            WHERE notification.Owner_ID_number = ?`;

  const values = [
    req.body.Finder_ID_number, // Password as a varchar
    req.body.Owner_ID_number, // Email as a varchar
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error." });
    }

    return res.json(data);
  });
});

app.get("/conversations/:userType/:userId", (req, res) => {
  const { userType, userId } = req.params;
  
  let q;
  if (userType === 'finder') {
    q = `
      SELECT c.Owner_ID_number, c.First_name, c.Last_name, c.LastMessageDate, n.Seen_Status
      FROM (
        SELECT m.Owner_ID_number, own.First_name, own.Last_name, 
              MAX(n.Date) as LastMessageDate, MAX(n.Notify_id) as LastNotifyId
        FROM message m
        JOIN notification n ON m.Notify_ID = n.Notify_id
        JOIN owner_name own ON m.Owner_ID_number = own.Owner_ID_number
        WHERE m.Finder_ID_number = ?
        GROUP BY m.Owner_ID_number, own.First_name, own.Last_name
      ) c
      JOIN notification n ON n.Notify_id = c.LastNotifyId
      ORDER BY c.LastMessageDate DESC
    `;
  } else {
    q = `
      SELECT c.Finder_ID_number, c.First_name, c.Last_name, c.LastMessageDate, n.Seen_Status
      FROM (
        SELECT m.Finder_ID_number, fn.First_name, fn.Last_name, 
              MAX(n.Date) as LastMessageDate, MAX(n.Notify_id) as LastNotifyId
        FROM message m
        JOIN notification n ON m.Notify_ID = n.Notify_id
        JOIN finder_name fn ON m.Finder_ID_number = fn.Finder_ID_number
        WHERE m.Owner_ID_number = ?
        GROUP BY m.Finder_ID_number, fn.First_name, fn.Last_name
      ) c
      JOIN notification n ON n.Notify_id = c.LastNotifyId
      ORDER BY c.LastMessageDate DESC
    `;
  }
  
  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Error retrieving conversations:", err);
      return res.status(500).json({ error: "Database error." });
    }
    return res.json(data);
  });
});

app.get("/messages/:finderId/:ownerId", (req, res) => {
  const { finderId, ownerId } = req.params;
  
  const q = `
    SELECT m.Owner_ID_number, m.Finder_ID_number, m.Notify_ID, m.Text, n.Date, n.Seen_Status, 
           fn.First_name as FinderFirstName, fn.Last_name as FinderLastName, 
           own.First_name as OwnerFirstName, own.Last_name as OwnerLastName
    FROM message m
    JOIN notification n ON m.Notify_ID = n.Notify_id
    JOIN finder_name fn ON m.Finder_ID_number = fn.Finder_ID_number
    JOIN owner_name own ON m.Owner_ID_number = own.Owner_ID_number
    WHERE m.Finder_ID_number = ? AND m.Owner_ID_number = ?
    ORDER BY n.Date ASC
  `;
  
  db.query(q, [finderId, ownerId], (err, data) => {
    if (err) {
      console.error("Error retrieving messages:", err);
      return res.status(500).json({ error: "Database error." });
    }
    return res.json(data);
  });
});

// Send a new message
app.post("/send-message", (req, res) => {
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ error: "Database error." });
    }
    
    // Create notification first
    const notificationQuery = `
      INSERT INTO notification (Date, Seen_Status, Finder_ID_number, Owner_ID_number)
      VALUES (NOW(), 'Unread', ?, ?)
    `;
    
    db.query(notificationQuery, [req.body.FinderId, req.body.OwnerId], (err, notificationResult) => {
      if (err) {
        return db.rollback(() => {
          console.error("Error creating notification:", err);
          res.status(500).json({ error: "Database error." });
        });
      }
      
      const notifyId = notificationResult.insertId;
      
      // Now insert the message
      const messageQuery = `
        INSERT INTO message (Owner_ID_number, Finder_ID_number, Notify_ID, Text)
        VALUES (?, ?, ?, ?)
      `;
      
      db.query(messageQuery, [req.body.OwnerId, req.body.FinderId, notifyId, req.body.Text], (err) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error creating message:", err);
            res.status(500).json({ error: "Database error." });
          });
        }
        
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error committing transaction:", err);
              res.status(500).json({ error: "Database error." });
            });
          }
          
          res.json({ 
            success: true, 
            message: "Message sent successfully", 
            notifyId: notifyId 
          });
        });
      });
    });
  });
});

// Mark messages as read
app.put("/mark-as-read", (req, res) => {
  const { notifyIds } = req.body; // Array of notification IDs
  
  if (!notifyIds || !notifyIds.length) {
    return res.status(400).json({ error: "No notification IDs provided." });
  }
  
  const placeholders = notifyIds.map(() => '?').join(',');
  const q = `UPDATE notification SET Seen_Status = 'Read' WHERE Notify_id IN (${placeholders})`;
  
  db.query(q, notifyIds, (err, data) => {
    if (err) {
      console.error("Error marking messages as read:", err);
      return res.status(500).json({ error: "Database error." });
    }
    return res.json({ success: true, message: "Messages marked as read" });
  });
});


app.listen(8800, () => {
    console.log("Connected to backend for FindIt.");
});