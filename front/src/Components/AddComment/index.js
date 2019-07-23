import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText,Card, CardTitle, CardText } from 'reactstrap';


class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: "",
      comment: "",
      note: "",
    }
    this.toggle = this.toggle.bind(this);

  }


  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleChange = (event) => {
    this.setState({
         [event.target.name]: event.target.value 
        })
  }

handleSubmit = (event)=>{
  event.preventDefault();
const data = {
  username: this.state.username,
  comment : this.state.comment,
  note: this.state.note,
}
  const url = 'http://localhost:4000/users/new-comment'
  const config = {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  fetch(url,config)
  .then(res => {
    if(res.status === 200){
      console.log("Commentaire envoye")
      fetch('http://localhost:4000/users/comments')
      .then(res => res.json())
      .then(data => {
        this.props.handleUpdate(data)
      })
     
    }
  })
}
  render() {
    
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Rajouter un commentaire</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Rajouter un commentaire</ModalHeader>
          <ModalBody>
            <p>Partager votre éxperience au Wild Circus</p>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="username">Pseudonyme</Label>
                <Input onChange={this.handleChange} type="text" name="username" id="username" />
              </FormGroup>
              <FormGroup>
                <Label for="comment">Commenaitre</Label>
                <Input onChange={this.handleChange} type="textarea" name="comment" id="comment" />
              </FormGroup>
              <FormGroup>
                <Label for="note">Note de 0 à 10</Label>
                <Input onChange={this.handleChange} type="number"  min="0" max="10" name="note" id="note" />
              </FormGroup>
              <Button type="submit" color="primary" onClick={this.toggle}>Envoyer</Button>{' '}

            </Form>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}



export default AddComment;