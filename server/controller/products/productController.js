import { Product } from '../../models';
import multer from "multer";
import path from "path";
import CustomErrorHandler from '../../services/CustiomErrorHandler';
import fs from "fs";
import Joi from "joi";


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    // 32456789-2345678.png
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image"); // = 5mb


const productController = {
  async store(req, res, next) {
    // Multipart form data
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;

      // validation
      const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().required(),
      });
      const { error } = productSchema.validate(req.body);
      if (error) {
        // Delete the uploaded file
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });

        return next(error);
        // rootfolder/uploads/filename.png
      }

      const { name, price, size } = req.body;
      let document;
      try {
        document = await Product.create({
          name,
          price,
          size,
          image: filePath,
        });
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },



  async update(req, res, next){
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      let filePath;
      if(req.file){
        filePath = req.file.path;
      }

      // validation
      const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string(),
      });
      const { error } = productSchema.validate(req.body);
      if (error) {
        // Delete the uploaded file
        if(req.file){
          fs.unlink(`${appRoot}/${filePath}`, (err) => {
            if (err) {
              return next(CustomErrorHandler.serverError(err.message));
            }
          });
        }

        return next(error);
        // rootfolder/uploads/filename.png
      }

      const { name, price, size } = req.body;
      let document;
      try {
        // *router.put("/products/:id", ) --> this id used here
        document = await Product.findOneAndUpdate({ _id: req.params.id },{ 
          name,
          price,
          size,
          ...(req.file && { image: filePath })
        },{ new: true });
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },



  async destroy(req,res,next){
    const document = await Product.findOneAndRemove({ _id: req.params.id });
    if(!document){
      return next(new Error("Product is not exist"));
    }

    // if the document is delete then the image is delete
    const imgPath = document._doc.image;
      // http://localhost:5000/uploads/1616444052539-425006577.png
      // approot/http://localhost:5000/uploads/1616444052539-425006577.png
    fs.unlink('${appRoot}/${imgPath}',(err)=>{
      if(err){
        return next(CustomErrorHandler.serverError());
      }
    })

    res.status(201).json(document);
  },



  async index(req,res,next){
    let document;
    // ! usr mongoose-pasination for pasination
    try{
      document = await Product.find().select('-updatedAt -__v').sort({ _id: -1 });
    }catch(err){
      return next(CustomErrorHandler.serverError());
    }

    res.status(201).json(document);
  },


  async show(req,res,next){
    let document;
    try{
      document = await Product.findOne({ _id: req.params.id }).select('-updatedAt -__v');
    }catch(err){
      return next(CustomErrorHandler.serverError());
    }

    res.status(201).json(document);
  },

  // cart controller  
  async getProducts(req, res, next) {
    let documents;
    try {
      documents = await Product.find({
        _id: { $in: req.body.ids },
      }).select('-updatedAt -__v');
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },
};

export default productController;
