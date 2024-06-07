import axios from "../axios/axios";
  
function createFile(body) {
    return axios({
      url: '/upload',
      method: 'post',
      data:body,
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
  }

  function deleteFile(data) {
    return axios({
      url: `/upload/delete`,
      method: 'post',
      data:JSON.stringify(data)
    });
  }
  function getFile(fileName) {
    return axios({
      url: `/upload/${fileName}`,
      method: 'get',
    });
  }
  export default {
    createFile,
    deleteFile,
    getFile
    }