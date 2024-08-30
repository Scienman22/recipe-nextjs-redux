import type { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: "Method not allowed."})
    }

    const form  = formidable({multiples: true});
    let fields;
    let files:any;

    try {
        [fields, files] = await form.parse(req);

        const imageFile = files.image[0];

        if (!imageFile || !imageFile.filepath) {
            return res.status(400).json({message: "No image file uploaded."})
        }

        const uploadDir = path.join(process.cwd(), 'public', 'images');

        // create the directory if not existing
        await fs.mkdir(uploadDir, {recursive: true});

        const newFilePath = `${uploadDir}/${imageFile.originalFilename}`;

        await fs.rename(imageFile.filepath, newFilePath);

        return res.status(200).json({message: "Image uploaded successfully.", imageUrl: `/images/${imageFile.originalFilename}`});

    } catch (error) {
        console.log("Error uploading image", error);
    }
}
