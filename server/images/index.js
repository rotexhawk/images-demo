import express from 'express';
import path from 'path';
import glob from 'glob';
import sizeOf from 'image-size';

const router = express.Router();

router.get('/', async (req, res) => {
    const pattern = path.resolve('public/images/raw/', `*+(.jpg|.webp)`);
    const allRawImages = await getImageFromDisk(null, pattern);
    const allImages = await allRawImages.map(async image => {
        const filename = image.substring(
            image.lastIndexOf('/') + 1,
            image.indexOf('.')
        );
        let allImageTypes = await getImageFromDisk(filename);
        return convertToImages(allImageTypes);
    });
    Promise.all(allImages).then(values => res.send(values));
});

router.get('/:filename', (req, res) => {
    getImageFromDisk(req.params.filename).then(images =>
        res.send(convertToImages(images))
    );
});

function getImageFromDisk(filename, pattern) {
    pattern =
        pattern ||
        path.resolve('public/images/', `**/${filename}+(.jpg|.webp)`);
    return new Promise((resolve, reject) => {
        glob(pattern, function (err, files) {
            if (err) reject(err);
            resolve(files);
        });
    });
}

function convertToImages(filenames) {
    return filenames.reduce((acc, filename) => {
        const dimensions = sizeOf(filename);
        acc = {
            ...acc,
            ...rawSource(filename, dimensions),
            ...optimizedImages(filename, dimensions),
            ...resizedImage(filename, dimensions),
        };
        return acc;
    }, {});
}

function rawSource(file, dimensions) {
    if (file.includes('raw')) {
        return {
            src: toServerUrl(file),
            width: dimensions.width,
            height: dimensions.height,
            type: dimensions.type,
        };
    }
    return {};
}

function optimizedImages(file, dimensions) {
    if (file.includes('optimized')) {
        const extension = file.substring(file.indexOf('.') + 1);
        return toJsonObj(file, 'optimized', extension, dimensions);
    }
    return {};
}

function resizedImage(file, dimensions) {
    if (file.includes('resized')) {
        const extension = file.substring(file.indexOf('.') + 1);
        const pattern = /\/resized\/(.*?)\//;
        const filename = pattern.exec(file)[1];
        return toJsonObj(file, filename, extension, dimensions);
    }
    return {};
}

function toJsonObj(file, filename, extension, dimensions) {
    const filename_ext = extension ? `${filename}_${extension}` : filename;

    return {
        [filename_ext]: {
            url: toServerUrl(file),
            width: dimensions.width,
            height: dimensions.height,
            type: dimensions.type,
        },
    };
}

function toServerUrl(file) {
    const host = 'http://localhost:4000/';
    const serverPath = '/mnt/c/users/yyaqoobi/sites/images-demo/';
    return file.replace(serverPath, host);
}

export default router;
