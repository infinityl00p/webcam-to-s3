import React, { Component } from 'react';
import Webcam from 'react-webcam';
import Modal from 'material-ui/Modal';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});

class ImageCaptureModal extends Component {
  state = { screenshot: null }

  handleSave = () => {
    const imageBlob = this.dataURLtoBlob(this.state.screenshot);
    this.props.saveImage(imageBlob, this.props.showModal);
    this.setState({ screenshot: null });
    this.props.onClose();
  }

  handleCapture = (imageType) => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot });
  }

  dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type:mime});
  }

  renderScreenshotOrWebcam = () => {
    if(this.state.screenshot) {
      return (
        <img src={this.state.screenshot} height={300} width={300} />
      );
    } else {
      return (
        <Webcam
          audio={false}
          height={300}
          ref={node => this.webcam = node}
          screenshotFormat="image/jpeg"
          width={300}
        />
      )
    }
  }

  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.showModal}
        onClose={this.props.onClose}
      >
        <Grid container className={this.props.classes.paper}>

          <Typography style={{ textAlign: 'center' }} variant="title" id="modal-title">
            Capture {this.props.showModal} Image
          </Typography>

          <Grid item>
            {this.renderScreenshotOrWebcam()}
          </Grid>

          <Grid container>
            <Button onClick={this.handleCapture}>Capture</Button>
            <Button onClick={this.handleSave}>Save</Button>
          </Grid>

        </Grid>
      </Modal>
    );
  }
};

export default withStyles(styles)(ImageCaptureModal);