import React from 'react';
import { Provider } from 'react-redux'
import store from './store';

import Whazz from './components/Whazz';


class App extends React.Component {
  // getPhrase = () => {
  //   this.setState({
  //     prefix: getPrefix(),
  //     date: getDate(),
  //     suffix: getSuffix(),
  //     phrase: ''
  //   });
  // };

  // playSound = (filepath) => {
  //   return new Promise((resolve) => {
  //     console.log('playing sound')
  //
  //     const mySound = new Sound(filepath, Sound.MAIN_BUNDLE, (error) => {
  //       if (error) console.error(error)
  //       mySound.play(() => {
  //         return resolve();
  //       });
  //     });
  //   });
  // }

  // sayPhrase = async () => {
  //   const { prefix, date, suffix } = this.state;
  //   this.setState({
  //     phrase: `${prefix} ${date} ${suffix}`
  //   })
  //
  //   const soundQueue = flatten(['prefixes/its', date]);
  //   console.log(soundQueue);
  //   for (const sound of soundQueue) {
  //     const filepath = `sounds/${sound}-sb.mp3`;
  //     await this.playSound(filepath);
  //   };
  // }


  render() {
    return (
      <Provider store={store}>
        <Whazz />
      </Provider>
    );
  }
}

export default App;
