    import * as express from "express";
    import { ObjectId } from "mongodb";
    import { collections } from "../database";
    import multer from "multer";
    import path from "path";
    import fs from "fs";


    const MIMETYPES = ['image/jpg', 'image/png', 'image/jpeg'];
    const uploadFolder = __dirname + '/uploads/';

    // Improving MULTER
    const fileUploads = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadFolder)
            },
            filename: (req, file, cb) => {
                const fileExt =  path.extname(file.originalname);
                cb(null, file.originalname.split(fileExt)[0] + '-' + Date.now() + fileExt );
            }     
        }),
        fileFilter: (req, file, cb) => {
            if (MIMETYPES.includes(file.mimetype)) {
            cb(null, true) 
            } else {
            cb ( new Error (`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
            }
        },
        limits: {
            fileSize: 10000000,
        }

    });

    export const productRouter = express.Router();
    export const productRouterAdmin = express.Router();
    export const productRouterUpload = express.Router();

    productRouter.use(express.json());
    productRouterAdmin.use(express.json())

    productRouter.get("/", async (_req, res) => {
        try {
            const products = await collections?.products?.find({}).toArray();
            res.status(200).send(products);
        }  catch (error) 
        {
            res.status(500).send(error instanceof Error ? error.message: "Unknown error")
        };
    });

    productRouter.get("/:id", async (req, res) => {
        try {
            const id = req?.params.id;
            const query = { _id: new ObjectId(id) };
            const product = await collections.products?.findOne(query);

            if (product) {
                res.status(200).send(product);
            } else {
                res.status(404).send(`Failed to find a product: ID: ${id}`);
            }

        } catch (error) {
            res.status (404).send(`Failed to find a product: ID ${req?.params?.id}`);
        }
    });

    productRouterAdmin.post("/", async (req, res) => {
        try {
            const product = req.body;
            const result = await collections?.products?.insertOne(product);

            if (result?.acknowledged) {
                res.status(201).send(`Created a new product: ID ${result.insertedId}.`);
            } else {
                res.status(500).send("Failed to create a new product");
            }
        } catch (error) {
            console.error(error);
            res.status(400).send (error instanceof Error ? error.message: 'Unknown error');
        }        
    });

    productRouterAdmin.post("/upload", fileUploads.single('image'), async (req, res) => {

        try {
            if (!req.file) {
                return res.status(400).send('No file uploaded or invalid file type.');
            }

            // Respond with the file details or a success message
            res.status(201).send({
                filename: req.file.filename
            });
        } catch (error) {
            console.error(error);
            res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
        }
    });
    
    productRouterAdmin.put("/upload/:id", fileUploads.single('image'), async(req, res) => {
        try {
            const id = req?.params?.id;
            const item = req.body;

            const query = {_id: new ObjectId(id)};
            const product = await collections.products?.findOne(query); 

            if (req.file) {
                req.body.img = req.file.filename;
            }

            const result = await collections?.products?.updateOne(query, {$set: item});

            if (result && result.matchedCount) {
                try {
                    if (product?.img !== ''){
                        fs.unlinkSync(uploadFolder + product?.img);
                    };          
                } catch (error) {
                    console.log(`Problem to delete the image ${product?.img}. Please, confirm if exists.`);
                }

                res.status(201).send(`Image uploaded successfully in the product ID: ${id}`);

            } else if (!result?.matchedCount) {
                res.status(404).send(`Failed to find a product: ID: ${id}`);
            } else {
                res.status(400).send(`Failed to updated a product: ID: ${id}`);
            }
        } catch (error) {
            res.status(400).send('Error uploading file');
        }
    });

    productRouterAdmin.put("/:id", async (req, res) => {
        try {
            const id = req?.params?.id;
            const product = req.body;
            const query = { _id: new ObjectId(id) };
            const result = await collections?.products?.updateOne(query, {$set: product});

            if (result && result.matchedCount) {
                res.status(201).send(`Updated a product: ID ${id}.`);
            } else if (!result?.matchedCount) {
                res.status(404).send(`Failed to find a product: ID: ${id}`);
            } else {
                res.status(400).send(`Failed to updated a product: ID: ${id}`);
            }
        } catch (error) {
            console.error(error);
            res.status(400).send (error instanceof Error ? error.message: 'Unknown error');
        }
    })

    productRouterAdmin.delete("/:id", async (req, res) => {
        try {
            const id = req?.params?.id;
            const query = { _id: new ObjectId(id) };
            const product = await collections.products?.findOne(query);
            const result = await collections?.products?.deleteOne(query);

            if (result && result.deletedCount) {
            // Delete the image     
                try {
                    if (product?.img !== ''){
                        fs.unlinkSync(uploadFolder + product?.img);
                    };   
                } catch (error) {
                    console.log(`Problem to delete the image ${product?.img}. Please, confirm if exists.`);
                }
                res.status(201).send(`Delete a product: ID ${id}.`);
                
            } else if  (!result) {
                res.status(400).send(`Failed to remove a product: ID ${id}`);
            } else if ( !result.deletedCount) {
                res.status(404).send(`Failed to find product ID ${id}.`);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            console.error (message);
            res.status(400).send(message);
        }
    });

