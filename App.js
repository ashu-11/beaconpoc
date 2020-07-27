/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BackgroundJob from 'react-native-background-actions';
import Button from './components/Button'




const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
var j=0

const taskRandom = async taskData => {
  
  
  if (Platform.OS === 'ios') {
    console.warn(
      'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
      'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
    );
  }
  await new Promise(async resolve => {
    // For loop with a delay
    const {delay} = taskData;
    for (let i = 0; BackgroundJob.isRunning(); i++) {
      // console.log('Runned -> ', Math.floor(i / 3600));
      
      await sleep(delay);
      // j= Math.floor(i / 60)
      j=i

    }
  });
};

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask desc',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 1000,
  },
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      txt:'start'
     
    }
   
    this._checkValue = this._checkValue.bind(this);
  }
  playing = BackgroundJob.isRunning();
  
  /**
   * Toggles the background task
   */
  
  // toggleBackground = async () => {
  //   console.log(this.playing)
  //   this.playing = !this.playing;
  //   if (this.playing) {
  //     try {
  //       console.log('Trying to start background service');
  //       await BackgroundJob.start(taskRandom, options);
  //       console.log('Successful start!');
  //     } catch (e) {
  //       console.log('Error', e);
  //     }
  //   } else {
  //     // console.log(j)
  //     console.log('Stop background service');
      
  //     await BackgroundJob.stop();
    


  //   }
  // };

   async _checkValue() {

    this.playing = !this.playing;
    if (this.playing) {
      this.setState({txt:"Stop"})
      this.setState({value:0})
      try {
        console.log('Trying to start background service');
        await BackgroundJob.start(taskRandom, options);
        console.log('Successful start!');
      } catch (e) {
        console.log('Error', e);
      }
    } else {
      // console.log(j)
      console.log('Stop background service');
      this.setState({txt:"Start"})
      this.setState({value:j})
       await BackgroundJob.stop();
  
    


    }

   }


  
  render(){
    
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
              <Button
              onPress={this._checkValue}
              textStyle={styles.white}
              value={this.state.txt}

            />
           
          </View>

         
        </ScrollView>
        <View style>
        <Text style={styles.heading}>{this.state.value}</Text>
      </View>
      </SafeAreaView>
      </>
    );
  }

  }
 

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  white: {
    color: 'white'
  },

  body: {
    backgroundColor: Colors.white,
  },
  heading: {
    fontSize: 30,
    color: '#6c3586',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
