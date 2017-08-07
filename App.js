import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import axios from "axios";

export default class App extends React.Component {
  state = {data: 'Data'}

  handler()
  {
    console.log("This is this: " + this);
    var requestedData;
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log("Data: ");
        requestedData = res.data;
        for (var i = 0; i < 10; i++) {
          console.log(requestedData[i].name);
        }
      });

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
    console.log(this.state);
    return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Button
            onPress={this.handler}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <FlatList
            data={[{key: 'a'}, {key: 'b'}]}
            renderItem={({item}) =>
              <Text>{item.key}</Text>
            }
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
    justifyContent: 'center'
  },
});
