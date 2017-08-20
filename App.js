import React from 'react';
import { Alert, Button, FlatList, ListView, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from "axios";

export default class App extends React.Component {
  state = {data: 'Data', cc: <Text>Yo</Text>};

  constructor()
  {
    super();
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        this.setState({data: res.data});
      });
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2','okay','cool']),
      };
  }

  handler()
  {
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
    currentComponent = this.state.data;
    return (
        <View style={styles.container}>
          <Text>You can type your text here</Text>
          <Button
            onPress={this.handler.bind(this)}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <FlatList
            data={currentComponent}
            renderItem={({item}) =>
              <Text>{item.name}</Text>
            }
          />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <Text>{rowData}</Text>
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
    justifyContent: 'center',
  },
});
