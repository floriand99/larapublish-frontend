<template>
  <div>
  <VueFileAgent
    ref="vueFileAgent"
    :theme="'list'"
    :multiple="true"
    :deletable="true"
    :meta="true"
    :accept="'image/*,.zip'"
    :maxSize="'2MB'"
    :maxFiles="1"
    :helpText="text"
    :errorText="{
      type: 'Invalid file type. Only images or zip Allowed',
      size: 'Files should not exceed 2MB in size',
    }"
    @select="filesSelected($event)"
    @beforedelete="onBeforeDelete($event)"
    @delete="fileDeleted($event)"
    v-model="fileRecords"
  ></VueFileAgent>
  </div>
</template>

<script>
  export default {
    name: 'UploadImage',
    props:{
      text: String
    },
    data: function () {
      return {
        fileRecords: [],
        uploadUrl: 'https://calm-forest-02990.herokuapp.com/api/image-upload?token=' + localStorage.getItem('token'),
        uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
        fileRecordsForUpload: [], // maintain an upload queue
      };
    },
    methods: {
      uploadFiles: function () {
        // Using the default uploader. You may use another uploader instead.
        this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload).then(res => {
         this.$emit('setImage', res[0].data.image)
        })
        this.fileRecordsForUpload = [];
      },
      deleteUploadedFile: function (fileRecord) {
        // Using the default uploader. You may use another uploader instead.
        this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
      },
      filesSelected: function (fileRecordsNewlySelected) {
        var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
        this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
        this.uploadFiles()
      },
      onBeforeDelete: function (fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
          var k = this.fileRecords.indexOf(fileRecord);
          if (k !== -1) this.fileRecords.splice(k, 1);
        } else {
          if (confirm('Are you sure you want to delete?')) {
            this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
          }
        }
      },
      fileDeleted: function (fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        } else {
          this.deleteUploadedFile(fileRecord);
        }
      },
    },
  };
</script>