import React, {useState, useEffect} from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import axios from "axios"

const UploadButton = () => {
  const [imagePreviewFile, setImagePreviewFile] = useState(null)
  const [isImageModal, setImageModal] = useState(false)
  const [previewImage, isPreviewImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  function openImageModal() {
    setImageModal(true)
  }
  function closeImageModal() {
    setImageModal(false)
  }

  function handleImages(e) {
    setImagePreviewFile(URL.createObjectURL(e.target.files[0]))
    setImageFile(e.target.files[0])
    isPreviewImage(true)
  }

  function uploadImage() {
    let formData = new FormData()
    formData.append("image", imageFile)

    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/images/",
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      },
      data: formData
    })
    .then(response => {
      console.log(response.data)
      closeImageModal()
    })
    .catch(error => {
      console.log(error)
    })
  }

    return(
      <div>
          <button onClick={openImageModal}>Upload Image</button>
          <Modal isOpen={isImageModal}>
            <Form>
              <FormGroup>
                <Label for="exampleFile">Upload a Picture</Label>
                <Input type="file" name="image-file" onChange={handleImages} />
                <FormText color="muted">
                  Select an Image you would like to upload to your profile!
                </FormText>
                <div class="card">
                  {
                    previewImage ?
                    (
                      <img src={imagePreviewFile} style = {{width : "300px", height : "300px"}}></img>
                    )
                    :
                    (
                      <h1>Preview Image</h1>
                    )
                  }
                </div>
              </FormGroup>
              <ModalFooter>
                <Button color="primary" onClick={uploadImage}>Upload</Button>{' '}
                <Button color="secondary" onClick={closeImageModal}>Cancel</Button>
              </ModalFooter>
            </Form>
          </Modal>

      </div>
    )
}

export default UploadButton;