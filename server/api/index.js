import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import compress_images from 'compress-images';

const router = express.Router();
router.use(fileUpload());

router.get('/', (req, res) => res.send('Router path is loading'));

router.post('/', (req, res) => {
    console.log('request files', req.files.filepond.name);
    const file = req.files.filepond;
    const filePath = path.resolve('public/images/raw/', file.name);

    file.mv(filePath, function(err) {
        if (err) {
            console.log('error happened', err);
            return res.status(500).send(err);
        }
        compressImage(filePath);
        res.json({
            file: `${filePath}`,
        });
    });
});

function compressImage(rawImage) {
    console.log(rawImage);
    compress_images(
        rawImage,
        path.resolve('public/images/optimized'),
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: 'webp', command: ['-q', '75'] } },
        { png: { engine: false, command: false } },
        { svg: { engine: false, command: false } },
        { gif: { engine: false, command: false } },
        function(err) {
            if (err === null) {
                //[jpg] ---to---> [jpg(jpegtran)] WARNING!!! autoupdate  - recommended to turn this off, it's not needed here - autoupdate: false

                compress_images(
                    rawImage,
                    path.resolve('public/images/optimized'),
                    {
                        compress_force: false,
                        statistic: true,
                        autoupdate: false,
                    },
                    false,
                    {
                        jpg: {
                            engine: 'mozjpeg',
                            command: ['-quality', '75', '-progressive'],
                        },
                    },
                    { png: { engine: false, command: false } },
                    { svg: { engine: false, command: false } },
                    { gif: { engine: false, command: false } },
                    function(err) {
                        console.log('error on second', err);
                    }
                );
            } else {
                // console.error(err);
            }
        }
    );
}

export default router;
