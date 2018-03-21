import React from 'react';
import { Alert, Button, FlatList, ListView, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from "axios";

export default class App extends React.Component {
  state = {data: 'Data', cc: <Text>Yo</Text>, username: '', password: ''};

  constructor()
  {
    super();
    var details = {
    'username': '150953244',
    'password': 'ccea150953245',
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('https://radiant-gorge-40900.herokuapp.com/', {
	  	method: 'POST',
	  	headers: {
	    Accept: 'application/json',
	    	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	  	},
	  	body: formBody
	  }).then((response) => response.json())
    	.then((responseJson) => {
      		console.log(responseJson)
          this.setState({data: responseJson})   
    	})
    .catch((error) => {
      	//console.error(error);
        console.log("Error aaya");
    });

    console.log("After post");
    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then(res => {
    //     this.setState({data: res.data});
    //   });
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
          <TextInput
            style={{height: 40}}
            placeholder="Username"
            onChangeText={(text) => this.setState({text})}
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
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}></View>}
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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
