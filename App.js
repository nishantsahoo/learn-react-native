import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  handler()
  {
    console.log("Okay");
    Alert.alert(
      'Alert Title',
      'My Alert Msg: Button Clicked',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  } // end of the function handler

  render() {
    return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Really?</Text>
          <Text>Cool</Text>
          <Button
            onPress={this.handler}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
