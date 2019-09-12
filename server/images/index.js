import express from 'express';
import path from 'path';
import glob from 'glob';
import sizeOf from 'image-size';

const router = express.Router();

router.get('/', (req, res) => {
    glob(path.resolve('public/images/', '**/*+(.jpg|.webp)'), function(
        er,
        files
    ) {
        console.log('list of files', files);
        res.send(convertToImages(files));
    });
});

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
    const serverPath = '/Users/yasinyaqoobi/Sites/images-demo/';
    return file.replace(serverPath, host);
}

export default router;
