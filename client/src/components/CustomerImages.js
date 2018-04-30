import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ImageCaptureModal from './ImageCaptureModal';
import PortraitImage from './PortraitImage';

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
      images: {
        front: null,
        back: null,
        side: null
      }
    };
  }

  handleClick = (orientation) => {
    this.setState({ showModal: orientation })
  }

  handleSubmit = async (imageFile, type) => {
    const imageUrl = await this.submitImageFile(imageFile, type);
    const images = this.state.images;
    images[type.toLowerCase()] = `https://s3-us-west-2.amazonaws.com/test-wear-modello/420/${type.toLowerCase()}.jpeg`;
    this.setState({images})
  }

  submitImageFile = async (imageFile, type) => {
    const uploadConfig = await axios.get(`/api/upload?type=${type.toLowerCase()}`);

    await axios.put(uploadConfig.data.url, imageFile, {
      headers: {
        'Content-Type': 'image/jpeg'
      }
    });

    return uploadConfig.data.url;
  }

  renderCustomerImages = () => (
    ['Front', 'Side', 'Back'].map(orientation => {
      return (
        <Grid key={orientation} item>
          <Grid item xs={12}>
            <Typography variant="title" style={{ textAlign: 'center' }}>
              {orientation}
            </Typography>
            <PortraitImage
              imageUrl={this.state.images[orientation.toLowerCase()]}
              type={orientation}
              width={150}
              height={150}
            />
          </Grid>
          <Grid container justify='center'>
            <Button onClick={() => {this.handleClick(orientation)}}>
              Capture Image
            </Button>
          </Grid>
        </Grid>
      );
    })
  )

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid container justify='center' spacing={40}>
          {this.renderCustomerImages()}
          <ImageCaptureModal
            showModal={this.state.showModal}
            onClose={() => this.setState({ showModal: false })}
            saveImage={this.handleSubmit}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CustomerImages);