export const fetchFileUrl = (
  files: {
    [fieldname: string]: Express.Multer.File[];
  },
  field: string
) =>
  files && field in files && files[field].length
    ? `http://localhost:4000/uploads/${files[field][0].filename}`
    : null;
