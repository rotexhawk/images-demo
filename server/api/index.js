import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import compress_images from 'compress-images';
import fs from 'fs';
import sharp from 'sharp';

const router = express.Router();
router.use(fileUpload());

router.get('/', (req, res) => res.send('Router path is loading'));

router.post('/', (req, res) => {
    const file = req.files.filepond;
    const filePath = path.resolve('public/images/raw/', file.name);

    file.mv(filePath, function(err) {
        if (err) {
            console.log('error happened', err);
            return res.status(500).send(err);
        }
        generateImages(file.name);
        generateSrcsets(file.name);
        res.json({
            file: `${filePath}`,
        });
    });
});

function generateImages(rawImage) {
    const outputPath = path.join('public/images/optimized/');
    const inputPath = path.resolve('public/images/raw/', rawImage);

    compressImage(inputPath, outputPath, {
        jpg: {
            engine: 'mozjpeg',
            command: ['-quality', '75', '-progressive'],
        },
    });

    compressImage(inputPath, outputPath, {
        jpg: { engine: 'webp', command: ['-q', '75'] },
    });
}

function compressImage(inputPath, outputPath, options) {
    const noEngine = { engine: false, command: false };
    options = {
        png: options.png || noEngine,
        svg: options.svg || noEngine,
        gif: options.gif || noEngine,
        jpg: options.jpg || noEngine,
    };

    compress_images(
        inputPath,
        outputPath,
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: options.jpg },
        { png: options.png },
        { svg: options.svg },
        { gif: options.gif },
        function(err) {
            if (err) console.error(err);
        }
    );
}

function generateSrcsets(filename) {
    const webp = filename.replace(/.jpg/, '.webp');
    generateSrcset(filename);
    generateSrcset(webp);
}

function generateSrcset(filename) {
    const sizes = {
        thumb: { width: 200, height: 200 },
        phone_portrait: { width: 320 },
        phone_landscape: { width: 480 },
        ipad_portrait: { width: 768 },
        ipad_landscape: { width: 1024 },
        desktop: { width: 1224 },
        large: { width: 1824 },
    };
    const readableStream = fs.createReadStream(
        path.resolve('public/images/optimized/', filename)
    );

    Object.entries(sizes).map(([folderName, size]) => {
        const writableStream = getWritableStream(filename, folderName);

        const transformer = sharp().resize({
            width: size.width,
            height: size.height || null,
            fit: sharp.fit.cover,
            position: sharp.strategy.entropy,
        });

        readableStream.pipe(transformer).pipe(writableStream);
    });
}

function getWritableStream(filename, folderName) {
    const outPath = path.resolve(
        'public/images/resized/',
        folderName,
        filename
    );

    console.log('should save here', outPath);
    return fs.createWriteStream(outPath);
}

export default router;
