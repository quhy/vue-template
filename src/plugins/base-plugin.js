const basePlugin = {
    install(Vue, options) {
        // 地区信息
        Vue.prototype.gdKey ='8c831ecb3a0456ffc53205c5c8247f7e';
        // 重置表单
        Vue.prototype.resetForm = function (formName) {
            if (this.$refs[formName]) {
                this.$refs[formName].resetFields();
            }
        };
        //重置上传文件，先取消再清空
        Vue.prototype.resetFiles = function (fileName) {
            if (this.$refs[fileName]) {
                this.$refs[fileName].abort();
                this.$refs[fileName].clearFiles();
            }
        };
        //上传前判断大小
        Vue.prototype.beforeImageUpload = function (file, type) {
            const imageFlag = ['image/jpeg', 'image/png'].includes(file.type);
            const size = file.size / 1024;  // KB
            if (!imageFlag) {
                this.$message.warning('图片格式只能是 JPG 或 PNG');
                return false;
            }
            if (type === 'logo' && size > 5) {
                this.$message.warning('Logo 大小不能超过 5KB');
                return false;
            } else if (size > 512) {
                this.$message.warning('图片大小不能超过 512KB');
                return false;
            }
            return imageFlag;
        };
        //upload上传失败钩子
        Vue.prototype.uploadError = function (err, file, fileList) {
            if(err.message.indexOf('营业执照')>-1){
                this.$notify.error({
                    title: '上传失败',
                    message:'营业执照模糊,或营业执照与门店名称不匹配,上传错误'
                });
            }else{
                this.$notify.error({
                    title: '上传失败',
                    message: err.message
                });
            }

        };
        //upload超过最大数量钩子
        Vue.prototype.uploadExceed = function (files, fileList) {
            this.$message.warning('超过最大上传数量');
        };
        //错误信息格式化
        Vue.prototype.errorFormatter = function (error) {
            let message = error;
            if (error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            }
            return message;
        };
        Vue.prototype.priceFormatter = function (row, column, cellValue, index) {
            if (typeof cellValue === 'number') {
                return '￥' + (cellValue / 100).toFixed(2);
            }
            return cellValue;
        };
        Vue.prototype.addressFormatter = function (row, column, cellValue, index) {
            return `${row.address.split('|')[1]} ${row.detailedAddress}`;
        };
        Vue.prototype.dateFormatter = function (row, column, cellValue, index) {
            if (cellValue) {
                return Vue.prototype.moment(cellValue).format('YYYY-MM-DD');
            }
            return cellValue;
        };
        Vue.prototype.timeFormatter = function (row, column, cellValue, index) {
            if (cellValue) {
                return Vue.prototype.moment(cellValue).format('YYYY-MM-DD HH:mm:ss');
            }
            return cellValue;
        };

    }
};

export default basePlugin;
