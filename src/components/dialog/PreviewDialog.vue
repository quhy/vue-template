<template>
    <div class="preview-dialog-container">
        <el-dialog title="图片预览" :visible="previewDialog" width="800px" :before-close="closePreviewDialog">
            <div class="preview-image">
                <el-image :src="imageUrl"></el-image>
            </div>
            <div slot="footer">
                <el-button ref="closeButton" type="primary" size="medium" @click="closePreviewDialog">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PreviewDialog",
        props: ['previewDialog', 'imageUrl'],
        methods: {
            closePreviewDialog() {
                this.$emit('update:previewDialog', false);
            }
        },
        watch: {
            previewDialog() {
                // 防止表单整体禁用导致关闭按钮禁用
                if (this.previewDialog) {
                    this.$refs.closeButton.$el.classList.remove('is-disabled');
                    this.$refs.closeButton.$el.removeAttribute('disabled');
                }
            }
        }
    }
</script>

<style lang="scss">
    .preview-dialog-container {
        .el-dialog {
            .preview-image {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>
