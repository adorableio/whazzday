import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Sound from 'react-native-sound';
import { connect } from 'react-redux';
import { flatten } from 'lodash';

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
  }
});

class Whazz extends Component {
  async componentWillMount () {
    const { loadDaysOfTheWeek, loadDaysOfTheMonth, loadMonths, loadPrefixes } = this.props.actions;
    await loadDaysOfTheWeek();
    await loadDaysOfTheMonth();
    await loadMonths();
    await loadPrefixes();
  }

  getDate = () => {
    this.props.actions.getDate();
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
    const { currentDate } = this.props;

    const soundQueue = flatten(['prefixes/its-sb.mp3', currentDate]);
    for (const sound of soundQueue) {
      const filepath = `sounds/${sound}`;
      await this.playSound(filepath);
    };
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.getDate} style={[styles.button]}>
          <Text style={styles.buttonText}>Get Date</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.sayPhrase} style={[styles.button, styles.greenButton]}>
          <Text style={styles.buttonText}>Say it</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { currentDate: state.default.SoundFiles.currentDate }
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actionCreators, dispatch) }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Whazz);
