import multer from "multer";
import path from "path";

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/upload/");
    },

    filename: (req, file, cb) => {
        const nombreUnico =
            Date.now() + path.extname(file.originalname);

        cb(null, nombreUnico);
    }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {

    const tiposPermitidos = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imágenes"));
    }
};

const upload = multer({
    storage,
    fileFilter
});

export default upload;