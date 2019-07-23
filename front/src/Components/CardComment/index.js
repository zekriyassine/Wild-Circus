import React from 'react';
import AddComment from '../AddComment/index';
import { Input, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
import './index.css'



class CardComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      value: "",

    }
  }
  componentDidMount() {
    fetch('http://localhost:4000/users/comments')
      .then(res => res.json())
      .then(data => {
        this.setState({
          comments: data
        })
      })
  }
  componentDidUpdate(PrevProps,PrevState){
    console.log(this.state.comments)
    if(PrevState.value !== this.state.value){
      this.sortDate()
      this.sortNote()
    }
  }

  handleUpdate = (data) => {
    this.setState({
      comments: data
    })
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }
   compare = ( a, b ) =>{
    if ( a.note < b.note ){
      return -1;
    }
    if ( a.note > b.note ){
      return 1;
    }
    return 0;
  }

  sortDate = () =>{
    const orderedComments = this.state.comments

    if(this.state.value === "date"){
      this.setState({
        comments :orderedComments.sort()
      })
    }
  }


  sortNote = () =>{
    const orderedComments = this.state.comments.reverse()
    if(this.state.value === "note"){
      this.setState({
        comments :orderedComments.sort(this.compare)
      })
    }
    
    
  }
  render() {
    const { comments } = this.state
    const comment = comments.map(elem => (
      <Row>
        <Col xs={{ size: 8, offset: 2 }} >
          <Card className="card-commenaitre" body outline color="secondary">
            <Row>
              <Col>
                <CardTitle>{elem.username}</CardTitle>

              </Col>
              <Col>
                <CardTitle>note {elem.note}</CardTitle>

              </Col>
            </Row>
            <CardText>{elem.comment}</CardText>
            <CardText>
              <small className="text-muted">{<TimeAgo
                datetime={elem.created_at} />}</small>
            </CardText>
          </Card>

        </Col>
      </Row>


    ))

    return (
      <div>
        <Row>
          <Col xs={{ size: 6, offset: 5 }} >
            <h1>
              Commentaires
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xs={{ size: 6, offset: 5 }}>
            <AddComment handleUpdate={this.handleUpdate} comments={comments} />

          </Col>
        </Row>
        <Row>
          <Col xs={{ size: 2, offset: 2 }} >
            <p>Trier par</p>
            <Input value={this.state.value} onChange={this.handleChange} type="select" name="select" id="exampleSelect">
              <option value=""></option>
              <option value="note">Note</option>
              <option value="date">Date</option>

            </Input>
          </Col>
        </Row>

        {comment}

      </div>


    )
  }
}

export default CardComment;