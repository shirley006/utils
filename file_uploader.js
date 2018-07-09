/**
 * 上传文件
 **/
var browserUtils = require("./browser_utils");
require('../jquery/jquery.form.min');
var extendsUtil = require('../utils/extends_util');
var commonDialog = require('../component/common_dialog');

var FileUploader = function (options) {
    
    var isIE9 = function () {
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE ' + 9 + ']><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    };
    var isIE9 = isIE9();
    this.iframeNameId = "iframe-" + new Date().getTime() + "";
    this.iframe = null; // iframe dom
    this.defaults = {
        element: "body", // element selector
        formAction: "/materials/api/newMedia?type=1",
        formOptions: "", // form 的 class
        formStyle: "",
        formId: "cmp-form-uploader",
        fileOptions: "", // input[type="file"] 的class
        fileStyle: "position: absolute;right: 0px;top: 0px;;margin: 0px;padding: 0px;cursor: pointer;opacity: 0;height: 100%; width:100%;" + (isIE9 ? "font-size:50px;" : "font-size:0;"),
        fileId: "cmp-input-file",
        fileName: "filename",
        limitFileSize: 2, // 2MB
        fileAccept: "image/gif,image/jpeg,image/png,image/bmp,image/jpg",
        buttonOptions: "",
        buttonStyle: "",
        buttonText: "上传文件",
        method: "post",
        before: function () { return true;}, // before需要有返回值，当返回true时才会进行提交操作，返回false不会进行提交操作
        success: function(data) { },
        error: function (data) { },
        complete: function () { },
        xhr: function (data) {  } //上传进度
    };
    this.uploading = false; //判断是否有文件正在上传，false为无，true为有
    this.options = this.defaults;
    
    var that = this;
    if (options) {
        this.options = $.extend(this.defaults, options);
    }

    var divBtn = this.getUploaderDom();
    $(this.options.element).append($(divBtn));

    var inputFileChanged = false;

    this.jqXHR = null;
    $('#' + this.options.fileId).change(function (event) {
        "use strict";
        event.bubbles && (event.bubbles = false);
        inputFileChanged = true;
        var self = $(this);

        // 验证文件名后缀
        if (!$(this).val()) {
            console.log("just return...");
            return false;
        }
        var fileExtend = ($(this).val().match(/\.[a-zA-Z0-9]+$/)[0] || " ").substring(1);
        
        var validateResult = that.validateFileTypeBeforeSubmit(fileExtend);
        if (validateResult.ret === -1) {
            that.options.error(validateResult);
            self.val("");
            return;
        }

        // 验证文件大小
        validateResult = that.validateFileSizeBeforeSubmit(event);
        if (validateResult.ret === -1) {
            that.options.error(validateResult);
            self.val("");
            return;
        }
        // 给jQuery重新生成一个绑定了onprogress的XMLHttpRequest对象
        var xhrOnProgress=function(fun) {
            xhrOnProgress.onprogress = fun; //绑定监听
            //使用闭包实现监听绑
            return function() {
                //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
                var xhr = $.ajaxSettings.xhr();
                
                //判断监听函数是否为函数
                if (typeof xhrOnProgress.onprogress !== 'function')
                    return xhr;
                //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
                if (xhrOnProgress.onprogress && xhr.upload) {
                    xhr.upload.onprogress = xhrOnProgress.onprogress;
                }
                return xhr;
            };
        };
        var continue_ = that.options.before();
        if (continue_) {
            // 正在上传文件的时候，直接返回
            if (that.uploading === true) {
                commonDialog.showMessageDialog("有文件正在上传", 'error', 'fade');
                return;
            }

            $('#'+that.options.formId).ajaxSubmit({
                dataType: "json",
                xhr: xhrOnProgress(function(e){
                    var percent = e.loaded / e.total;//计算百分比(上传进度)
                    that.options.xhr(percent);
                }),
                beforeSend: function(jqXhr) {
                    that.jqXHR = jqXhr;
                    that.uploading = true;
                    return true;
                },
                success: function (respose) {
                    that.uploading = false;
                    console.log("ajaxSubmit success: " + JSON.stringify(respose));
                    that.options.success(respose);
                    self.val("");


                },
                error: function (jqXHR, textStatus, errorThrown) {
                    that.uploading = false;                     
                    console.log("ajaxSubmit error");
                    that.options.error(textStatus);
                    self.val("");
                },
                complete: function(XMLHttpRequest, textStatus){
                    that.uploading = false;
                    that.options.complete();
                    that.jqXHR = null;
                }
            });

        } else {
            self.val("");
        }
    });
    return this;
};

// 返回jqXHR
FileUploader.prototype.getJqXhr = function() {
    "use strict";
    return this.jqXHR;
};


FileUploader.prototype.getUploaderDom = function() {

    // 构造 form 表单
    var form = document.createElement('form');
    form.id = this.options.formId;
    form.className = form.className + " " + this.options.formOptions;
    form.action = this.options.formAction;
    form.method = this.options.method;
    form.encoding = "multipart/form-data";
    form.enctype = "multipart/form-data";
    // form.target = this.iframeNameId; // FIXME: uncomment me
    form.style.cssText = this.options.formStyle;

    var fileInput = document.createElement('input');
    fileInput.id = this.options.fileId;
    fileInput.className = this.options.fileOptions;
    fileInput.type = "file";
    fileInput.name = this.options.fileName;
    fileInput.accept = this.options.fileAccept;
    fileInput.style.cssText = this.options.fileStyle;

    var divBtn = document.createElement('div');
    var spanText = document.createElement('span');
    spanText.innerHTML =this.options.buttonText;
    divBtn.className = this.options.buttonOptions;
    divBtn.style.cssText = this.options.buttonStyle; // 'position:relative;overflow:hidden;direction:ltr;'
    /*divBtn.innerHTML = this.options.buttonText;*/

    form.appendChild(fileInput);
    divBtn.appendChild(spanText);
    divBtn.appendChild(form);

    return divBtn;
}


FileUploader.prototype.validateFileSizeBeforeSubmit = function(event) {
    "use strict";
    var fileSizeOk = -1;
    // 如果是ie9，没有event,不验证fileSize
    if (browserUtils.isIEBrowser(9) || browserUtils.isIEBrowser(8)) {
        fileSizeOk = 0;
    } else {
        var target = event.target;
        var fileSize = target.files[0].size;
        fileSizeOk = (fileSize <= this.options.limitFileSize * 1024 * 1024) ? 0 : -1;
    }
    var msg = (fileSizeOk === 0 ? "" : "文件大小不能超过" + this.options.limitFileSize + "M");

    return {ret: fileSizeOk, msg: msg};
}


FileUploader.prototype.validateFileTypeBeforeSubmit = function (fileExtend) {
    "use strict";
    var lowerFileExtend = fileExtend.toLowerCase();
    var acceptExtends = this.options.fileAccept.split(',');
    var _extends = acceptExtends.map(function (extend) {
        return extend.split('/')[1].toLowerCase();
    });
    var mediaType = acceptExtends[0].split('/')[0].toLowerCase(); // mediaType == audio or video or image
    var length = _extends.length;
    var fileExtendOk = -1;
    var fileTypeOk = false; //


    // 检查这个文件是不是 mediaType 中的某个格式
    switch (mediaType) {
    case "image":
        fileTypeOk = extendsUtil.ExtendsUtil.isImageExtend("." + lowerFileExtend);
        break;
    case "audio":
        fileTypeOk = extendsUtil.ExtendsUtil.isAudioExtend("." + lowerFileExtend);
        break;
    case "video":
        fileTypeOk = extendsUtil.ExtendsUtil.isVideoExtend("." + lowerFileExtend);
        break;
    default:
        fileTypeOk = false;
    }
    console.log("MediaType: " + mediaType + "  FileExtend: " + "." + lowerFileExtend + "  ;fileTypeOk: " + fileTypeOk);
    if (!fileTypeOk) {
        fileExtendOk = -1;
        return {ret: fileExtendOk, msg: "文件必须为以下格式: " +mediaType + "/" +  _extends.join(',')};
    }

    for (var i = 0; i < length; i++) {
        if (_extends[i] === '*' || _extends[i] === lowerFileExtend) { // 增加对 * 通配符的支持
            console.log("_extends[" + i + "] == " + _extends[i] + "  ; lowerFileExtend: " +　lowerFileExtend);
            fileExtendOk = 0;
            break;
        }
    }
    var msg = (fileExtendOk === 0 ? "" : "文件必须为以下格式：" + _extends.join(',') );
    return {ret: fileExtendOk, msg: msg};
}


exports.FileUploader = FileUploader;

