import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import pick from '../api/picker';
import uploadFile from '../api/upload';

export default class DemoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      data: null,
    };
  }
  render() {
    let img =
      this.state.avatarSource == null ? null : (
        <Image
          source={this.state.avatarSource}
          style={{height: 200, width: 200}}
        />
      );
    return (
      <View>
        <Text>Hello React Native</Text>
        <TouchableOpacity onPress={this.show.bind(this)}>
          <Text>Show Image Picker</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.upload.bind(this)}>
          <Text>Upload</Text>
        </TouchableOpacity>
        {img}
      </View>
    );
  }
  show() {
    pick((source, data) => this.setState({avatarSource: source, data: data}));
  }
  upload() {
    uploadFile([
      {name: 'avatar', filename: 'avatar.png', data: this.state.data},
      {name: 'name', data: 'KhoaPham11'},
      {name: 'price', data: 'KhoaPham11'},
      {name: 'note', data: 'KhoaPham11'},
      {name: 'category', data: 'KhoaPham111'},
    ])
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
