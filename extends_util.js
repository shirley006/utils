/**
 * Created by p_yunfzhang on 2017/3/8.
 * @desc  根据文件扩展名,检查文件是属于 image, audio 还是 video
 */

class ExtendsUtil {
    //
    static get all_image_extends () {
        return [".ani",".bmp",".cal",".fax",".gif",".img",".jbg",".jpe",".jpeg",
                ".jpg",".mac",".pbm",".pcd",".pcx",".pct",".pgm",".png",".ppm",".psd",".ras",".tga",".tiff",".wmf"];
    }

    static get all_audio_extends() {
        return [".3gp", ".aa", ".aac",".aax",".act",".aiff",".amr",".ape",".au",".awb",".dct",".dss",".dvf",
            ".flac",".gsm",".iklax",".ivs",".m4a",".m4b",".m4p",".mmf",".mp3",".mpc",".msv",".ogg",".oga",".mogg",".opus",
            ".ra",".rm",".raw",".sln",".tta",".vox",".wav",".wma",".wv", ".webm"];
    }

    static get all_video_extends() {
        return [".webm",".mkv",".flv",".vob",".ogv",".ogg",".drc",".gif",".gifv",".mng",".avi",".mov",
            ".qt",".wmv",".yuv",".rm",".rmvb",".asf",".amv",".mp4",".m4p",".m4v",".mpg",".mp2",".mpeg",".mpe",".mpv",
            ".m2v",".svi",".3gp",".3g2",".mxf",".roq",".nsv",".f4v",".f4p",".f4a",".f4b"];
    }

    static get all_excel_extends() {
        return [".xls", ".xlsx"];//".csv"暂时不支持
    }

    /**
     * 获取文件名的后缀
     * @param fileName 文件名,比如 hello.mp3
     * @return e.g.: .mp3 或者 empty string
     */
    static fileExtend(fileName) {
        let extend = "";
        if (fileName == null) { // null or undefined, just return empty string ""
            return extend;
        }
        let tmp = fileName.split('.');
        if (tmp.length <= 1) {
            return "";
        }
        extend = tmp[tmp.length-1];
        return [".", extend].join("");
    }
    
    /**
     *
     * @param extendName 扩展名, e.g.: ".png"
     */
    static isImageExtend(extendName) {
        if (extendName == null) { // extendName is null or undefined, just return false
            return false;
        }
        let length = ExtendsUtil.all_image_extends.length;
        for (let i = 0; i < length; i++) {
            if (ExtendsUtil.all_image_extends[i] === extendName.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param extendName 扩展名, e.g.: ".mp3"
     */
    static isAudioExtend(extendName) {
        if (extendName == null) { // extendName is null or undefined, just return false
            return false;
        }
        let length = ExtendsUtil.all_audio_extends.length;
        for (let i = 0; i < length; i++) {
            if (ExtendsUtil.all_audio_extends[i] === extendName.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param extendName 扩展名, e.g.: ".avi"
     */
    static isVideoExtend(extendName) {
        if (extendName == null) { // extendName is null or undefined, just return false
            return false;
        }
        let length = ExtendsUtil.all_video_extends.length;
        for (let i = 0; i < length; i++) {
            if (ExtendsUtil.all_video_extends[i] === extendName.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    static isExcelExtend(extendName) {
        if (extendName == null) { // extendName is null or undefined, just return false
            return false;
        }
        let length = ExtendsUtil.all_excel_extends.length;
        for (let i = 0; i < length; i++) {
            if (ExtendsUtil.all_excel_extends[i] === extendName.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param fileName 文件名, e.g.: "hello.png"
     */
    static isImageFile(fileName) {
        let extend = ExtendsUtil.fileExtend(fileName);
        return ExtendsUtil.isImageExtend(extend);
    }

    /**
     *
     * @param fileName 文件名, e.g.: "hello.mp3"
     */
    static isAudioFile(fileName) {
        let extend = ExtendsUtil.fileExtend(fileName);
        return ExtendsUtil.isAudioExtend(extend);
    }

    /**
     *
     * @param fileName 文件名, e.g.: "hello.avi"
     */
    static isVideoFile(fileName) {
        let extend = ExtendsUtil.fileExtend(fileName);
        return ExtendsUtil.isVideoExtend(extend);
    }

    static isExcelFile(fileName) {
        let extend = ExtendsUtil.fileExtend(fileName);
        return ExtendsUtil.isExcelExtend(extend);
    }
}

exports.ExtendsUtil = ExtendsUtil;