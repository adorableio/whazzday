import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { flatten, map } from 'lodash';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/SoundFiles';

const initialState = { r: 'nothing yet' };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff'
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: '#54e',
    alignItems: 'center',
    marginBottom: 10
  },
  greenButton: {
    backgroundColor: '#4a5',
  },

  headerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    height: 60,
    width: '90%',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10,
    marginRight: 10,
  }
});

class Whazz extends Component {
  async componentWillMount () {
    this.getPhrase();
  }

  getPhrase = () => {
    const { getPhrase } = this.props.actions;
    getPhrase();
  }

  playSound = (filepath) => {
    return new Promise((resolve) => {
      const mySound = new Sound(filepath, Sound.MAIN_BUNDLE, (error) => {
        if (error) console.error(error)
        mySound.play(() => {
          return resolve();
        });
      });
    });
  }

  sayPhrase = async () => {
    const { currentPhrase } = this.props;

    const soundQueue = currentPhrase;
    for (const sound of soundQueue) {
      const filepath = sound.uri;
      await this.playSound(filepath);
    };
  }

  render () {
    const currentDate = map(this.props.currentPhrase, item => item.text.en).join(' ');
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.getPhrase} style={[styles.headerButton]}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>{ currentDate }</Text>
            <Icon name="ios-refresh" color="#4F8EF7" size={30} style={{marginBottom: 5}} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.sayPhrase} style={[styles.button, styles.greenButton]}>
          <Text style={styles.buttonText}>Say it</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { currentPhrase: state.default.SoundFiles.currentPhrase }
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Whazz);
