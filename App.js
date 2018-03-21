import React, { Component } from 'react';
import { AppRegistry, Alert, Button, FlatList, ListView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from "axios";
import { StackNavigator } from 'react-navigation';

class SecondActivity extends Component
{
  static navigationOptions =
  {
    title: 'Attendance details',
  };
  render()
  {
    return(
        <ScrollView>          
          <Text>{JSON.stringify(global.globalData, null, 4)}</Text>
        </ScrollView>
    );
  }
}

class MainActivity extends React.Component {

  static navigationOptions =
  {
    title: 'SLCM',
  };
  
  FunctionToOpenSecondActivity = () =>
  {
    this.props.navigation.navigate('Second');
  }

  state = {data: 'Data', cc: <Text>Yo</Text>, username: '', password: ''};

  constructor()
  {
      super();
      global.globalData = {};
      console.log("App initialized.");
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2','okay','cool']),
      };
  }

  login()
  {
    Alert.alert('Please wait while we make a request to SLCM.')
    var details = {
      'username': this.state.username,
      'password': this.state.password,
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
        Alert.alert('Login successful!');
        console.log(responseJson);
        global.globalData = responseJson;
        this.FunctionToOpenSecondActivity();
    	})
    .catch((error) => {
        //console.error(error);
        Alert.alert('Login failed.');

        // console.log("Error aaya");
    });
  } // end of the function login

  render() {
    currentComponent = this.state.data;
    return (
        <View style={styles.container}>
          <Text style={{fontSize: 25}}>Welcome to SLCM App</Text>
          <TextInput
            style={{height: 50, width: 250, fontSize: 15, textAlign: 'center'}}
            placeholder="Username"
            onChangeText={(text) => this.setState({username: text})}
          />
          <TextInput
            style={{height: 50, width: 250, fontSize: 15, textAlign: 'center'}}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => this.setState({password: text})}
          />
          <Button
            onPress={this.login.bind(this)}
            title="Login"
            color="#841584"
          />
      </View>
    );
  }
}

export default Project = StackNavigator(
  {
  First: { screen: MainActivity },
  
  Second: { screen: SecondActivity }
});  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    flex: 10,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});