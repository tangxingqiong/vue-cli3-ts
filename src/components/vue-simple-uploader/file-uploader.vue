<!--上传图纸文件-->
<template>
    <Modal
            v-model="value"
            width="560"
            title="上传文件"
            class="drawing-uploader-modal"
            :mask-closable="false"
            :closable="false"
            :footer-hide="true">
        <div class="modal-top-closed" @click="cancel">
            <Icon type="md-close" size="24"/>
        </div>
        <uploader
                ref="uploader"
                :options="options"
                :autoStart="false"
                :file-status-text="statusText"
                @file-added="fileAdded"
                @file-success="fileSuccess"
                @file-progress="fileProgress"
                @file-error="fileError"
                class="uploader-example">
            <uploader-unsupport></uploader-unsupport>
            <!-- <uploader-drop> -->
            <div>
                <p class="tip inlineblock margin-right-20">支持多文件上传</p>
                <uploader-btn :attrs="attrs"
                              class="uploader-btn-1 ivu-icon ivu-icon-ios-cloud-upload-outline margin-right-20">
                    点击选择文件
                </uploader-btn>

                <uploader-btn :attrs="attrs" :directory="true"
                              class="uploader-btn-1 ivu-icon ivu-icon-ios-cloud-upload-outline">
                    点击选择文件夹
                </uploader-btn>
            </div>
            <uploader-list></uploader-list>
        </uploader>
        <div class="footer text-align-r">
            <Button @click="cancel">取消</Button>
            <Button type="primary" class="margin-left-20" :loading="loading" @click="filesSubmit">全部上传</Button>
        </div>
    </Modal>
</template>

<script>

    import '../../../public/render/jquery/jquery.min.js';
    import './spark-md5.js';
    import uploaderList from 'vue-simple-uploader/src/components/list'
    import uploaderUnsupport from 'vue-simple-uploader/src/components/unsupport'
    import uploaderBtn from 'vue-simple-uploader/src/components/btn'

    var file_type = [];
    var filed = 0;//已经上传的数量
    export default {
        name: "fileuploader",
        props: ['value', 'singleFile', 'uploadData', 'path_file'],
        components: {
            uploaderList,
            uploaderUnsupport,
            uploaderBtn
        },
        data() {
            return {
                loading: false,
                status: "waiting",
                options: {
                    //上传url
                    target: this.uploadData.uploadURL,
                    uploadMethod: 'post',
                    chunkSize: 1 * 1024 * 1024,
                    maxChunkRetries: 3,
                    //是否开启服务器分片校验
                    testChunks: true,
                    //单文件上传
                    singleFile: this.singleFile,
                    query: this.uploadData.data,
                    headers: {
                        Authorization: this.$store.state.user.token
                    },
                    // 服务器分片校验函数，秒传及断点续传基础
                    checkChunkUploadedByResponse: function (chunk, message) {
                        let objMessage = JSON.parse(message).data;
                        if (objMessage.skipUpload) {
                            return true;
                        }
                        return (objMessage.uploaded || [1, 2, 3]).indexOf(chunk.offset + 1) >= 0
                    },
                },
                attrs: {
                    accept: file_type
                },
                statusText: {
                    success: '成功了',
                    error: '出错了',
                    uploading: '上传中',
                    paused: '暂停中',
                    waiting: '等待中'
                },
            }
        },
        computed: {
            //Uploader实例
            uploader() {
                filed = 0;
                return this.$refs.uploader.uploader;
            }
        },
        methods: {
            fileAdded(file) {
                this.computeMD5(file);
                // this.$emit('fileAdded');
            },
            fileSuccess(rootFile, file, response, chunk) {
                this.loading = false
                let res = JSON.parse(response);
                // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
                if (!res.status) {
                    //this.$Message.success(res.message);
                    // 文件状态设为“失败”
                    this.statusSet(file.id, 'failed');
                }
                // 如果服务端返回需要合并
                if (res.data.needMerge) {
                    // 文件状态设为“合并中”
                    this.statusSet(file.id, 'merging');
                    let FileName = file.relativePath;
                    let ext = FileName.substring(FileName.lastIndexOf(".") + 1);//后缀名
                    this.$api.design.fileChunksMerge({
                        'identifier': res.data.identifier,
                        'ext': ext,
                        'fileName': FileName,
                        'path_file': this.path_file,
                        'project_id': this.uploadData.data.project_id,
                    }).then(res => {
                        if (res.success) {
                            // 文件合并成功
                            this.$emit('fileSuccess');
                            this.statusRemove(file.id);
                            filed = filed + 1;
                            this.submitFrom();
                        }
                    })
                    // 不需要合并
                } else {
                    this.$emit('fileSuccess');
                    this.submitFrom();
                }
            },
            fileError(rootFile, file, response, chunk) {
                this.$Message.error(response)
                this.loading = false
            },
            fileProgress(res) {
                this.loading = true;
            },
            filesSubmit() {
                if (!this.$refs.uploader.files.length) {
                    this.$Message.error('请先选择文件')
                }
                this.uploader.resume();
            },
            /**
             * 计算md5，实现断点续传及秒传
             * @param file
             */
            computeMD5(file) {
                let fileReader = new FileReader();
                let time = new Date().getTime();
                let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
                let currentChunk = 0;
                const chunkSize = 1 * 1024 * 1024;
                let chunks = Math.ceil(file.size / chunkSize);

                let spark = new SparkMD5.ArrayBuffer();
                // 文件状态设为"计算MD5"
                this.statusSet(file.id, 'md5');
                file.pause();
                loadNext();
                fileReader.onload = (e => {

                    spark.append(e.target.result);

                    if (currentChunk < chunks) {
                        currentChunk++;
                        loadNext();

                        // 实时展示MD5的计算进度
                        this.$nextTick(() => {
                            $(`.myStatus_${file.id}`).text('校验MD5 ' + ((currentChunk / chunks) * 100).toFixed(0) + '%')
                        })
                    } else {
                        let md5 = spark.end();
                        this.computeMD5Success(md5, file);
                        console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
                    }
                });

                fileReader.onerror = function () {
                    this.error(`文件${file.name}读取出错，请检查该文件`)
                    file.cancel();
                };

                function loadNext() {
                    let start = currentChunk * chunkSize;
                    let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

                    fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
                }
            },

            computeMD5Success(md5, file) {
                // 将自定义参数直接加载uploader实例的opts上
                Object.assign(this.uploader.opts, {
                    query: {
                        ...this.params,
                    }
                })

                file.uniqueIdentifier = md5;
                // console.log(this.$refs.uploader.files[0].resume());
                //file.resume();
                this.statusRemove(file.id);
            },
            submitFrom() {
                console.log(filed + '-----' + this.$refs.uploader.files.length);
                if (filed == this.$refs.uploader.files.length) {
                    this.$parent.loadData();
                    this.$emit('input', false)
                }
            },
            cancel() {
                this.uploader.cancel();
                this.$emit('input', false)
            },
            /**
             * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
             * @param id
             * @param status
             */
            statusSet(id, status) {
                let statusMap = {
                    md5: {
                        text: '校验MD5',
                        bgc: '#fff'
                    },
                    merging: {
                        text: '合并中',
                        bgc: '#e2eeff'
                    },
                    transcoding: {
                        text: '转码中',
                        bgc: '#e2eeff'
                    },
                    failed: {
                        text: '上传失败',
                        bgc: '#e2eeff'
                    }
                }

                this.$nextTick(() => {
                    $(`<p class="myStatus_${id}"></p>`).appendTo(`.file_${id} .uploader-file-status`).css({
                        'position': 'absolute',
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'zIndex': '1',
                        'backgroundColor': statusMap[status].bgc
                    }).text(statusMap[status].text);
                })
            },
            statusRemove(id) {
                this.$nextTick(() => {
                    $(`.myStatus_${id}`).remove();
                })
            },

            error(msg) {
                this.$Message.error(msg)
            }
        }
    }
</script>

<style lang="less" scoped>
    .drawing-uploader-modal {
        /deep/ .ivu-modal-header {
            border-bottom: none;
        }
        /deep/ .ivu-modal-body {
            padding-top: 0;
        }
    }

    .uploader-example {
        width: 100%;
        font-size: 12px;
        margin-bottom: 5px;
        /* box-shadow: 0 0 10px rgba(0, 0, 0, .4); */
        .tip {
            margin-bottom: 8px;
            color: #999;
        }
        .uploader-btn-1 {
            color: #39f;
            border: 1px solid #dcdee2;
            font-size: 12px;
            border-radius: 4px;
            transition: color .2s linear, background-color .2s linear, border .2s linear, box-shadow .2s linear;
            color: #515a6e;
            background-color: #fff;
            user-select: none;
            vertical-align: middle;
            line-height: 1.5;
            text-transform: none;
            &:active, &:focus {
                outline: 0;
            }
            &:active {
                color: #2b85e4;
                background-color: #fff;
                border-color: #2b85e4;
            }
            &:focus {
                box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
            }
            &:hover {
                color: #57a3f3;
                background-color: #fff;
                border-color: #57a3f3;
            }
        }
        .uploader-list {
            max-height: 440px;
            margin-top: 10px;
            overflow: auto;
            overflow-x: hidden;
            overflow-y: auto;
        }
        /deep/ .uploader-file-status {
            width: 15%;
        }
        /deep/ .uploader-file {
            border-bottom: 0 !important;
        }
        /deep/ .uploader-file-resume {
            // visibility: hidden;
            text-align: center;
            // width: 30px;
            // background: no-repeat;
            // line-height: 16px;
            // margin-right: 26px;
        }
        /deep/ .uploader-file-actions {
            width: 19%;
        }
        .uploader-drop {
            border-radius: 2px;
            background: none;
            padding: 0;
            cursor: pointer;
            transition: border-color 0.2s ease;
            &:hover {
                border: 1px dashed #666;
            }
        }
    }
</style>