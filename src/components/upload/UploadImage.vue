<template>
    <div class="upload-image-container">
        <el-upload ref="upload" class="card-upload" :class="{'upload-limited':imageDisabled}"
                   :action="baseURL+'/upload/store'" :headers="headers" accept=".jpg,.png"
                   :data="params"
                   list-type="picture-card" :on-preview="imagePreview"
                   :on-change="imageChange" :on-remove="imageRemove" :file-list="fileList"
                   :before-remove="file=>beforeImageRemove(file,fileList)"
                   :before-upload="file=>beforeImageUpload(file)"
                   :on-success="imageSuccess" :on-error="imageError" :on-exceed="uploadExceed"
                   :limit="limit||defaultLimit">
            <i class="el-icon-plus"></i>
        </el-upload>

        <PreviewDialog :previewDialog.sync="previewDialog" :imageUrl="imageUrl"></PreviewDialog>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import PreviewDialog from "../dialog/PreviewDialog";

    export default {
        name: "UploadImage",
        components: {
            PreviewDialog
        },
        props: ['modelType', 'type', 'limit', 'fileList','params'],
        data() {
            return {
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('token')  //从cookie里获取token，并赋值  Authorization ，而不是token
                },
                previewDialog: false,
                imageUrl: '',
                imageDisabled: false,
                defaultLimit: 9,
            }
        },
        mounted() {
            // 防止组件销毁后不触发watch
            this.initFileList();
        },
        methods: {
            beforeImageUpload(file) {

            },
            beforeImageRemove(file, fileList) {
                return new Promise((resolve, reject) => {
                    this.$confirm('是否确认删除该图片?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        resolve(true);
                        this.imageRemove(file, fileList) // 在这里真正的处理图片列表
                    }).catch(() => {
                        reject(false);
                    });
                })

                // return false; // 这是重点,不管上面的操作结果如何都返回false
            },
            // 初始化fileList
            initFileList() {
                this.$nextTick(() => {
                    let fileList = this.$refs.upload.fileList;
                    this.imageChange('', fileList);
                });
            },
            imagePreview(file) {
                this.imageUrl = file.url;
                this.previewDialog = true;
            },
            imageChange(file, fileList) {
                this.imageDisabled = fileList.length >= (this.limit || this.defaultLimit);
                this.joinFileListName(fileList);
            },
            imageRemove(file, fileList) {
                this.imageChange(file, fileList);
                this.joinFileListName(fileList);
                let site = file.url.lastIndexOf("\/");
                this.axios({
                    method: 'delete',
                    url: '/upload/store',
                    params: {
                        name: file.url.substring(site + 1, file.url.length),
                    }
                }).then(() => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                })
            },
            imageSuccess(response, file, fileList) {
                this.joinFileListName(fileList);
            },
            imageError(err, file, fileList) {
                this.imageChange(file, fileList);
                this.uploadError(err, file, fileList);
                this.joinFileListName(fileList);
            },
            //拼接多个文件的文件名
            joinFileListName(fileList) {
                let pathList = [];
                fileList.forEach(value => {
                    if (value.response && value.response.data && value.response.data.path) {
                        pathList.push({url: value.response.data.path});
                    } else if (value.status === "success") {
                        pathList.push({url: value.url.replace(this.uploadURL, '')});
                    }
                });
                this.$emit('set-name', JSON.stringify(pathList), this.modelType);
            }
        },
        watch: {
            fileList() {
                this.initFileList();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .upload-image-container {

    }
</style>
