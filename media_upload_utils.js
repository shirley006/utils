/**
 * Created by bryonliu on 2017/1/19.
 */
/*
 参数说明:
 opt.url : 文件要提交到的地址;
 opt.type :  1 图片 2 音频 3 视频
 opt.success : 上传成功后回调;
 opt.error
 opt.limitSize  最大文件限制，单位MB
 */
var browserUtils = require('../utils/browser_utils');
var formatArr = [];
formatArr[1] = ['jpg', 'jpeg', 'gif', 'webp', 'png']; // 图片格式
formatArr[2] = ['mp3', 'wma', 'wav', 'amr'];         // 音频格式
                                                     // 视频格式太多，不做检验
exports.meidaUpload = function (opt) {

    if (!opt.limitSize) {
        opt.limitSize = 10;
    }
    var iframeName = new Date().getTime() + ""; //太长了，变短点
    var iframe, form, file;

    var fileName = "upload_";
    switch (opt.type) {
        case 1:
            fileName += "image";
            break;
        case 2:
            fileName += "voice";
            break;
        case 3:
            fileName += "video";
            break;
        default:
            alert("请输入正确的参数");
            return;
    }
    //创建iframe和form表单
    iframe = $('<iframe style="display:none;" name="' + iframeName + '"/>');
    form = $('<form method="post" style="display:none;" target="' + iframeName + '" action="' + opt.url + '"  name="form_' + iframeName + '" enctype="multipart/form-data" />');
    file = $('<input type="file" name="' + fileName + '" <!--onchange="fileChange(this)"-->/>');
    file.appendTo(form);
    //插入body
    $(document.body).append(iframe).append(form);
    //触发浏览事件，选择文件

    console.log(iframe);
    console.log(iframe[0].domain);
    console.log(iframe[0].document);
    //选中文件后，验证文件格式是否符合要求
    file.change(function (event)
            /*function fileChange(target,id)*/ {
            //取得所选文件的扩展名
            var target = event.target;
            console.log(target);
/*            if (!checkFileSize(target, opt.limitSize)) {
                alert("选择文件不能大于" + opt.limitSize + "MB");
                return;
            }*/
            var fileFormat = ($(this).val().match(/\.[a-zA-Z0-9]+$/)[0] || " ").substring(1);
            if (opt.type === 3 || formatArr[opt.type].join('-').indexOf(fileFormat) !== -1) {
                form.submit();//格式通过验证后提交表单;
            } else {
                iframe.remove();
                form.remove();
                alert('文件格式错误，请重新选择！');
            }
        }
    );
    //)
    file.click();
    //文件提交完后
    iframe.on('load', function () {
        var data = $(this).contents().find('pre').html();
        console.log(data);
        try {
            !opt.success || (opt.success(JSON.parse(data)));
        } catch (err) {
            !opt.error || (opt.error(data));
        }
        iframe.remove();
        form.remove();
    });
};

function checkFileSize(target, limitSize) {

    var fileSize;
    var fileMaxSize = limitSize * 1024;

    if (browserUtils.isIE() && !target.files) {
 /*       var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        if (!fileSystem.FileExists(filePath)) {
            alert("附件不存在，请重新输入！");
            return false;
        }
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;*/
    } else {
        fileSize = target.files[0].size;
    }
    var size = fileSize / 1024;
    return fileMaxSize > size;
}