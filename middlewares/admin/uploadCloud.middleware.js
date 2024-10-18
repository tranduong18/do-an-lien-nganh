const { uploadToCloudinary } = require("../../helpers/uploadToCloudinary.helper");

module.exports.uploadSingle = async (req, res, next) => {
  if(req.file) {
    const link = await uploadToCloudinary(req.file.buffer);

    req.body[req.file.fieldname] = link;
    next();
  } 
  else{
    next();
  }
}

module.exports.uploadFields = async (req, res, next) => {
  const links = [];
  
  for (const item of req.files.thumbnail) {
    try {
      const link = await uploadToCloudinary(item.buffer);
      links.push(link);
    } catch (error) {
      console.log(error); 
    }
  }

  req.body.thumbnail = links; 
  next();
}