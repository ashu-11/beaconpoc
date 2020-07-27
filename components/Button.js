import React, { Component } from 'react';
import {
  StyleSheet,
  View, 
  TouchableOpacity,
  Text
} from 'react-native';

class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        style={!this.props.disabled ? styles.button : styles.buttonDisabled}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <Text style={this.props.textStyle}>{this.props.value}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#6c3586',
    padding: 10,
    marginTop: 40,
    width: '100%',
    borderWidth: 0,
    borderRadius: 5
  },
  buttonDisabled: {
    alignItems: 'center',
    backgroundColor: 'darkgrey',
    padding: 10,
    marginTop: 40,
    width: '100%',
    borderWidth: 0,
    borderRadius: 5
  }
})

export default Button;
