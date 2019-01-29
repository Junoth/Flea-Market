import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getItem, createPhotos } from '../../actions/itemActions';
import PropTypes from 'prop-types';

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview and Type Validation plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

class CreateItemPhotos extends Component {

  state = {
    // Set initial files
    files: []
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  };

  onClickHandler = (e) => {
    const photos = new FormData();
    this.state.files.forEach(file => {
      photos.append('photos', file);
    });
    this.props.createPhotos(photos, this.props.match.params.id, this.props.history);
  };

  render() {
    return (
      <div className='createItemPhoto'>
        <div className='container py-5 my-5'>
          <div className='row justify-content-center'>
            <div className='col-md-10 pt-5'>
              <h1 className='display-4'>Upload photos for your items</h1>
            </div>
          </div>
          <div className='row justify-content-center'>
            <div className='col-md-10 mt-5'>
              {/* Pass FilePond properties as attributes */}
              <FilePond ref={ref => this.pond = ref}
                      allowMultiple={true} 
                      maxFiles={8} 
                      oninit={() => this.handleInit() }
                      acceptedFileTypes = {['image/png', 'image/jpg', 'image/jpeg']}
                      onupdatefiles={(fileItems) => {
                          // Set current file objects to this.state
                          this.setState({
                              files: fileItems.map(fileItem => fileItem.file)
                          });
                      }}>
                
                {/* Update current files  */}
                {this.state.files.map(file => (
                    <File key={file} src={file} origin="local" />
                ))}
                  
              </FilePond>
            </div>
          </div>
          <div className='row justify-content-center mt-5'>
            <div className='col-md-10'>
              <button className='btn btn-primary' onClick={ this.onClickHandler }>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateItemPhotos.propTypes = {
  getItem: PropTypes.func.isRequired,
  createPhotos: PropTypes.func.isRequired
}

export default connect(null, { getItem, createPhotos })(withRouter(CreateItemPhotos));
