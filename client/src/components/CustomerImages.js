import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ImageCaptureModal from './ImageCaptureModal';
import PortraitImage from './PortraitImage';

const CID = 5;

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class CustomerImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalProps: {
        imageOrientation: null
      },
      images: {
        front: ``,
        back: ``,
        side: ``
      }
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/customers/${CID}/images`)
      .then((response) => {
        this.setState({
          images: {
            front: response.data.front,
            back: response.data.back,
            side: response.data.side
          }
        })
      })
      .catch((err) =>{
        console.log(err);
      });
  }

  handleClick = (imageOrientation) => {
    const modalProps = {};
    modalProps.imageOrientation = imageOrientation;

    this.setState({
      modalProps,
      showModal: true
    })
  }

  handleSubmit = async (screenshot, imageFile, imageOrientation) => {
    await this.submitImageFile(imageFile, imageOrientation);
    const images = this.state.images;
    //TODO: screenshot is a work around, i should really be seeing what amazon has stored (but i can assume if there are no errors it is correctly stored)
    images[imageOrientation] = screenshot;
    this.setState({ images });
  }

  submitImageFile = async (imageFile, imageOrientation) => {
    const uploadConfig = await axios.get(`/api/upload?orientation=${imageOrientation}`);

    await axios.put(uploadConfig.data.url, imageFile, {
      headers: {
        'Content-Type': 'image/jpeg'
      }
    });
    console.log(uploadConfig.data.url);
    await axios.post(`/api/customers/${CID}/images?type=${imageOrientation}&url=${uploadConfig.data.url}`);
  }

  renderCustomerImages = () => (
    ['front', 'side', 'back'].map(imageOrientation => {
      return (
        <Grid key={imageOrientation} item>
          <Grid item xs={12}>
            <Typography variant="title" style={{ textAlign: 'center' }}>
              {imageOrientation}
            </Typography>
            <PortraitImage
              imageUrl={this.state.images[imageOrientation]}
              defaultImageUrl='http://cdn7.bigcommerce.com/s-viqdwewl26/stencil/8f903ed0-76e7-0135-12e4-525400970412/icons/icon-no-image.svg'
              type={imageOrientation}
              height={150}
            />
          </Grid>
          <Grid container justify='center'>
            <Button onClick={() => {this.handleClick(imageOrientation)}}>
              Capture Image
            </Button>
          </Grid>
        </Grid>
      );
    })
  )

  renderModal = () => {
    return (
      <ImageCaptureModal
        showModal={this.state.showModal}
        imageOrientation={this.state.modalProps.imageOrientation}
        onClose={() => this.setState({ showModal: false })}
        saveImage={this.handleSubmit}
      />
    );
  }

  render() {
    return (
      <Grid container className={this.props.classes.root} spacing={16}>
        <Grid container justify='center' spacing={40}>
          {this.renderCustomerImages()}
          {this.renderModal()}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CustomerImages);