import React, { Component } from 'react';
import { Animated, AppRegistry, Alert, Button, FlatList, Image, Linking, ListView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import axios from "axios";
import { StackNavigator } from 'react-navigation';
import {
  Card,
  CardTitle,
  CardContent
} from 'react-native-card-view';
import { TabNavigator } from 'react-navigation';
import { material, robotoWeights } from 'react-native-typography'
const BusyIndicator = require('react-native-busy-indicator');
const loaderHandler = require('react-native-busy-indicator/LoaderHandler');

class LoginActivity extends React.Component {
  
  state = {username: '', password: ''};

  constructor()
  {
      super();
      global.globalData = {};
      console.log("App initialized.");
  }

  static navigationOptions =
  {
    title: '   Student Life Cycle Management Portal',
  };
  
  FunctionToOpenSecondActivity = () =>
  {
    this.props.navigation.navigate('Second');
  }

  login() // definition of the function login
  {
    if(this.state.username && this.state.password)
    {  
      loaderHandler.showLoader("Authenticating");
      // loading

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
          global.globalData = responseJson;
          loaderHandler.hideLoader();
          ToastAndroid.showWithGravity(
            'Authentication Successful',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          this.FunctionToOpenSecondActivity();
        })
      .catch((error) => {
        loaderHandler.hideLoader();
        ToastAndroid.showWithGravity(
          'Authentication failed. Wrong username or password!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      });
    }
    else
    {
      ToastAndroid.showWithGravity(
        "Can't leave the input fields empty!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  } // end of the function login

  render() {
    currentComponent = this.state.data;
    return (
        <View style={styles.container}>
          <Image
            style={{width: 300 ,height: 70, marginBottom: 35}}
            source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ0AAAB6CAMAAABTN34eAAABaFBMVEX///8AAACcm5z09PT7+/vv7+/q6urS0tLBwcFdXV3ExMT5+fnycCTi4uLr6+tra2sgICB5eXlPT0+Pj48zMzMbGxu6urqYmJjMzMxWVlba2tpAQEBFRUUsLCzk5OQ+Pj5ycnKCgoKsrKypqaljY2OGhoa0tLTpYCUwMDATExPc0MzsZSXn3tvkWCa/qaKjgnjMu7XeYiSzl43XycRsJwCcdmqoiX+4nZT78OqjQCDgUSeLXk+SaFqYcmaEUkHsZCXOWiRlGwBxMxl1OyW7TyO5Rg5vLg+WOR6DTzvszsR5Qi7HVCWySy5sBQC9QCenMgDQRyixPCaWLw/HjnyEGgCGKRGROynDkYO0SyK6bFKuZFWiNg96CACsfHWjbGSdORySST12HBJ+QT7qvqvJm5BfAACPX13Vp5qXKwC+X0HZlHnptqH44dWnVEHjxb6pMwzVnIqfSziwa1qyUjmKTUm6QQDOdlPatrD5626UAAAgAElEQVR4nO19i3vbxpXvkAD4QkmKD/H9fkWkEQACBcAqH1Ek2ZYlt95N7EZZp+tkk71xuk28t73Z/vv3nAEGLwKULDl1vizP18YiMBjMzG/Oc84MCNnRjna0ox3taEc72tGOdrSjHe3o10/8w4cPP3QbdhRB//U/5+c//OXpDqBfI/3l+fnV1dWjn3/4B/+hm7KjID19fnVyCHRy9fzLHfv82ugvb08Ofwf04PDk0bOnH7o1O/LTl48OH/yO0uHh1dufPnRzduSjvzw6/J1NDw6vnu/g+VXRf7voIDxvpQ/doB156K/PTzzwnFz/+KEbtCMvXV+56PwOZNs/PnSDduShb73Mc3hy/Ybz3v1APlCiEOt8mDdHUjxW+YXfMBMJEeSZ/+KzK49dcHL+xsc8MzlHCBd4YpNq42qlksoAVSrjwbaSw7FTMF5KhJfpjGOx2HDzOl8qsYcnpdC3xMdxu0QmValUxw3SL03YFbxUKUHzxCrUwy7itVJpWKnUIlqDJA73YrFiyA1uXII3VjJOXdVSfFv3t9HcFGdyUO//9TmD5wE4pefHX/vuJuQZr81vqrga85IQXZDzFUyGFWmk6b2QsRB9D4fAR/ZjfpqQ2AbVibB5EWna7oU2iHB9q97s5q1OSDVidPe3EDylzshswyr7HuB5QB0eis5XvsGV4An1RgmXqAwLU6d9W2aPA+NeIT6shPajZZdobN6qDUue8Z9sFkhmhn12uwsMIZDMcNjzjNx4MIF6a4NqmV0q9wvpolOgFfJWMrRvhrCrOBzE0279o+EwE47wjWTOCK8qIXzwuR3NwXjO9fFXfvjmisqTmXlz9bmRM/LRs4cVyUfzFytSDb3L5d2xyIS3w4J35OrPivOEO/uFrn2pBz94oeIAFMKSrGPdiBY7U64X2ambSdKkucSHjdznz89PAJ+Tk6vz6ydf+bWMyMNT2m3cIM6ZjyGz2qIBKxEt42usSDOiQN3lhLCJDvAgf+1538CG3gt4nM2TwO9NeMT2Jrg+4lnHa5G9uolyMpHmZKaHjvN3r64xUg3gHD/5g3/kJH1G5hKRtygTRs4cakUJQtaNNhdRgJCSM/gRIiLrMk87F1oCjYq+90LBLp/yXGOzgKHjtj74Xme+RIrsdMSTt6fcWoWRXkco+J/+75vj6+vr4+MnL/9f4NZ8DYiq61ugk3K6ES5z3ALtmwVbLDaOKNF0i3RDZWgt2IIwdBJBdBymTAeqGzuv24to0f3RIao2U+eRoyJ896c3nz158vLlNxvMJczVmabe4g3uJBuFF3CE+15kOxrAebZ90Y7gQI/mCbVysQ6/ELodOk7zAwKsHWse2HfCRem90UkAz5gJTt3iuQjqv3/99X/8eVNYzFQuAVaBusUfsMhFJ7wbSfd+ZF0g2JI3iHFX9sXCFTGgs+frxu3Q4Zl+8Qsw6FWVsU8pvEX3RUe6ALmmXSjbS4lcqKRQLjSUbTdaBo7Oj8UKYffBtGVmdyQ6UIT0t4w8oej0HAMkbMAaAaPglug4xfyNh6tZZ96Ft+ie6IBWNzjTvNHnDyd+ZpqcAVbFDeUAHeashA0/eG5TNu+jrJsaqhvGY/vhog3qGDbcibBpAt8VHWYX1H3vncaavMDYKrzd90NHWnJEVgkne1mDx1ycEBL54KBwYLCpMuGWN8ADvUsxbzFkSgNL9NkkjIpZFegAMDGfCi1TQtmTceHZqOuu6DDeb3mHKUP7wjxanyno0D3RWWhkNlcubNX+12//+8sffgAT7dVboOdvnz9//tamV69eHT979vcv//b5F9//4+lfbZzUC2U+I+biBnRQZ7D5t2mVYfykw9AJdzWpxUYojpTCjQuKDpm48AQn9F3RYVWWvfZ+nloJ20XbvdARiakTWdctwfbtsxdvPnuF9vM5JfRzrv7o0L9S+uyzz168+OqrF19YmSAzfSXzukm2h5BgUJM868ZG2KOEIS4Wl4qwllPWHcd8CDXtLHRc93HDBrkvOnXvs2C2wxx1RFsoO98LHZBI5mrGEerrfPvVyyfH1Pc8sejj3wP9i5dskF4/efnNH/5A+QWk4mxlAg9ufU8B1Q2TAUFXn2vjJGdjEmo10ImKjCAy0RYqAG10vH6I39C8r97peYpVbD7Pb2v4/dBZS3NB0h7TgX6E4FBoDg8PP7bo94wCAL1+8qdv/gMfko4MSZhL6+XW94A7x7mufGCWDaw41eaYeIhnooMNZ6g7w9DxOD5lH1PfFR1msnjFbtHmTMeRDrNU7oGOyKkrlcjLhaV1jl8i54SD40GIwfPNH+hj8/VSJqquhpvcFnEHdGyZ2eYfWb5pDY59M1yjTNjcdMR8WKjGQcf1bv0vuys6LFjgeZZnTrHAzJ2wGOI90FENMjc0XZOsgf3ihcU6DjYBcDzwoHR7+c3/wadEydQ1ZU6MLTEDwQp1ONaUr60w98rYTTaaoSiPWATGCaiGrbG56PCu2+Nlxjuiw9aevJGcgWN99kLuMroPOrpOzJykrixL5OFXr6/DwPH+cOEB5vlPnL/cSpVyJtH17egc4L97IQOG83LouRkaaMPhsf9kY9EOKeaiQ5WZTR5b947oMKPAO8Ytx+RwRFtIAPce6EiGKc1VfcHG9bsXx+d0OefjcGL4WMzz5E+WaFMXujqfacYWozprWztsscobr6qxuLQdwtwPCxYMXKXrMGBIeoEHHe/apKst7oaOaDOi15wU3Mins6AasgB0d3QkIsmyujLnjjr77s0rXG37CMgDykcfORds7qHwMHT4ublSZVnaEjCo2F3lWLjGY9/k2egx2R6W1FF3Q8uOBRviGHnR8cbuHCl4N3T61m+fRox73Gpmg4RYKndH50IW+eUsN9Ncjpz97e3V4eGDBwyQj7zkwsPQoW4Sp80SsyXPyZeRb4qzecdM3akjvmC8ptZ4MZEVspCVi3mcPVZuf7OcDx3PsoUz+HdBR7TB8QcDmh5fyllh3WT7e6CjK7PZXFl6157Fzx+dADoPHnzigPIJEF74hOLD4EGfx17vMZfKfDZT9Gh0xozrHaPaGcSCw0jMag0JYse93OaIts2CfnS8QQN7dN4VnWwjaecZtP0OVtY7OxzRtsnOd0dH1o2cqiiar7ncD5iH84ACZMHi0icWPAAOGgUvvrZFmaTp+jxh6HLkmwqO98iEAJPZuakzykwpbfqZfNEbk3H0/WbALoCOJ2hga7N3RYeZMfVhQONXfVAwdt5c+b0rOqBtJE0xzLnp1xffW+nTDx6AdfCRA8whY6iPfw+M8/bNm5dfm6zBkjnXDLDLQQNFvGvkdN9RBhWnl0y8M3Q2F4FRwU8qjFLMl9kUbUF0PEGDNjXU3xWdwiif71czm8IWGKqUclrk5PZssPNd0THBR5nLgqwv/A7G00cnVu7no0dUyNk7ePBvgOyjj//lj29//OIfP0nuU+JClzFTca5E5OdwTXfus6G1sli4PbfhLA68yRL+nDiXNoL2G+h4ggb0hXf1RoPU2GhLRNvvio5hrA05t1wG/ZSH5ycPaGLu9z99/8xK1T189OVPP32JPPXgk4//+Pefgvyr6stlTob6jPBXCXvurHI0KB3agSewyJR4L/i42NocBkobQftNdDx5Ougsvi90ShttsadA0JW+KzqSbhqCbBpaQKI+/AHQeXD4CHe7SeeHlI2+xJd+iVAdXv3rpuHMaYYpC4YZntVjdZeNCfMdLFQOPOOykQrDCCfq3r6HnOzFYMkQdDgX2vF7Q4ffC7TIyXQMonBnq0CUDVXTVBIQR4DOIQJCf/wP5aOfaQL1X38G2Xb46PPNmkyCFRlyVKSt4zWhHTGVpezizjZmz20E2kB55DnBJc5RXsGgfQg6JOHGdOLvC50kZt0KXmLmQ5Cd74iODCwzP51zRAtkFCA6wDrf0x+4w+rBybnFEz9jHOHnkD1wika4+dkcl0pD35XxZhQlPB5p0+tfs0FpBUDmukEYeKa8eoEXhaFDGm4Kb6XzftDpb8DARF0wpeiO6KweX8zmKuGVs8CIPnx2hSBY+w3+C/jl8OSZhc4juHHyc0gGgnwJCkedzy4er0LfNfRFxdiAxKwp6N6wL5cDHUxu9tkR++LG9ZC0P0/QIL7/PtDBkEeAbR0zIWCp3A0dfqloR6bAXejrQCg+iM6hH53nIejkFvqa48wjTVmGZmOUfInGTkeGeb+Rw6ZfwOMuBJYkiSeGFgjah6PjzTR4L7yD9QWvMdHW81++I++YC12bkwtND1rBNjqWAPsW0bl6Zi1SR6JDTN1Yk7mmL8JN6oI/uj7yjJWXKdg1v3eBcbWgg8ozVR/QURHoeJLZ3ws6vZDVAqZO9/2TfQs6QmZLGqB8YawlbaVgKrSXHv5ABdg7oCPNiLLSpLVxEREtyPt76kk99ElvdtHv0kHp6YY36JgWfpFXiEpoHrqvvD86GLjZCGhELPxuQWe8fcucuZJWmkgCE95C55GFzk9oCbjonBxehaBjLgiHdUXtFUEl7nPT3IVLXzw6fHvOKCz2ywYwELQfRaabezIN7o1OZWNWIDHbw89VW9AJXQ/y0HwhC8S89BttD384P4lE5yQMHeXSJIK8iNwGh7LJt5LpRCf9/Wfo+KZUYi903SRctNWjE67cLUT3Rme0qQiJy85TX/3R6KSiUiaBxDkRCXcJAu5I0X2lfOg8vQU6/Eo5ApF2yUGN8zCXpxPkdyeO6W8zG0AfGBhBCFlTcESbbyzaUUl/xGXYe6ODyxkhKQSOseO7F41OO9aLairYbOvLtaQT6XRpbPLOiYPOI0DKQec8nHcMY3kqEV2CGkMzcxpBdJhF3PKXYyPlk4Lp0InqWm3VwMVoJ6V8W3SYCgnLEyBUh03DUk5Yi3xyOBKdfvj2VpvMlW6Ady+faprJee2Chz9cX52wc3GeUn7Zio7EmZp2CjUZhr5hAFJCme/P0chtDglxeafnudYIosWIWbDeyBbq/v3onS57Ieiw6LJXmjop+aHVoHMcuhGxzx7z6k0mgQPMxvdjkZtKkBILRVMMAf6vSAnd++AmOn9n6FxdnW+gs8pJUIcpGFBf0HeilN0LTih7ygZ3JDG96klBo3s4Q7NDnfCZOwOtdfGIrRrYkP0NdJzkRS/LOXHt0G2U2PRQdBy70KMLHUd438s8XKYbCb5N88ViKS9lWTFJ7rFHo/M/Xp9fnb+yQMAz2lx0rkPQmZ/mwN2R5ZW8XCzCPNWMJVFKCa9KavjHFd7KddwN0PmOZc1wKTp408oGP3CeZc+hdZer2dqs1ImK99WC6HTcBYYqe4foVr35Yr5hMXhpYxpyDTcJqGe/gkt2nWuxYn9CqToeWSMSmi/p1idJiZmhyTlUPh7D4Mfj6/NrDzpX5zY659dX59dv/AjwyzOJJEzNmEmStGEhJtPFPad5zXTdDXOkfXNH7LXcWCVln/qIJOtsYsfa6bSHgRL1dNtbeK9YIem6p4LWKB3um6OJMWVWfHFU9NWSTpcIlx91fRfro7orf4W8s/VxCk97RqE38re/OCZC3V/VBkVZlx4ycGeUfLn0MM+/vb6+Pn5tqaKnePgkQweT36/fBHbFLy/BXgNPNGI02gflbhGoWS4f7Huke8YngrhyrF2GEkVK+BdgV8NrLfjdKh+0vSoalP9B2boF98rlNjg5OJLwJ72AoEZsT0WVwixA+5EmqwTFG1qT07ZVOV7FueXKN2EKD9DuHBwcTD2zi+/G2qxFVvPr1PKbTqf7ZUpOY7HSKVLEJhcfSaccZlPrHrvtb6+Pj4+fWIA8fYuI/GgxxbNjgC2AjqFfrGB0j8JXdsSswNkZvBzH5bIekdP0qe8OFuRs3sO/OlnrYXah482RzXZ8hYUsBxVkc9Y1+nA2SrhVXWWczWYTdjW0EviJDcnSpjhNzmY9EgFv8fathNfO72T9zceqspRoU7238ElK24/hkGezmYRbq6TTteKxC7548eTJ63+z/n76Cvfy2D++RKb6zC9xdWUN1rQqEwlqu8XBEg6J2x3lX4yyjQ/04nck9ejs9HShAjqfKrpOnFU46eXLly/sVZyHr4+vj1/92frx+WfHx6//5OkcPKHryqcSr6qL09Ozo9vsvt7RLUlXDFMz5VniTMMUdZ3xj/r1104482+fvX79xlZKT4GpXv67+/wKxKFsaGe5mQz1GF7+29G9idcUxdCNpWYqGsirxWlIiPnhjy8+cw7++vHFS89hLPLjBdhP4OpoK6hFUbTdqdXvlwTQPDlekxWUSUfrdZhI9tjJ3Hd/doWXsF4fEdxlYmp8DrTOLU782NFdyECTSzpaLd9FcahL/VP6WESa1I7uS4wtFPRZPtVWYHpFp9t6yQRjb2kgOjLTNtFb37xcxXHh1+9L2WbUSTUW/WJS12PpC85/Nm7drbOGqhrrtTbTVcL9p4q8s9BvPoBP1EHjyEv1U5Go+kxbrKEaLapwtu04kplibJSeFixPMbtHQ9RioVWsF5utEsYRuPwU3UB0JnP17r4d6uHKrdEwWS8W0W3v5IvFzRXfZCFbwbMPweUr8fBvq97s16CqLvq/jV6smJ4eVBNir1VvjTqEg3+L9WT6AOos7seSZIxt2C/GWdeTrSnc6sb2xWy9VUy3mq04vrOB5cHF5wrFIgbmxHisO+oexC3Pp0QzPmj4fZ9GSEalZr1Vx6hFqt3Mxw7QrYVGtakbmoV+9m4YanGxXi51RVfnElmZeCbEcmHcNM94Y7EkZLY0dSLNZV1ZLZfrReRDfWcFdEQja3xvn7M6Y68N9nFNBjqaxrbmaYCjhx0osETpIU2C5qZWZKoRcs6RyPJ49uxwRB5flbXeUIqNsXFJdPrHsZ5dJQYyi1iKx/ErYd09N/TF0+Sa3JTDQnA/17NCG227/hKCk522s/QfK4Rq7ZMoJOnSdhJPRCUZesABP6IecDVW5KysZSvMVIyO1zLilMVKQdttZSYU8Pr5i6Vyk/ZRjeWaoEEtmCu01ZTVQol08fhR114+KNiRJbFOh7JdtMOgJWvFrEJ3yvdooQ6yV9wOoohda3Nc1lqWLoaE0IYH9h9tO4QzxkdzFJ0q21xSieMPa3VuQoFI05bVknTk6PZH5v9b6JA4h4XoC3s0VF62Z1q1T4tbPzI0KI1nIMIkwvdzFgApUosVeey41ag+XakqAGvR1xQiTxL0kKosFU1WJcOQwbuUzi5Nc7uMTJjm5RlwmQm+jqTKmrIVz9p4aE3JhJN9RiO/yf7AXn2z0YF5P7DREWkDej3rZIPJqG1FLuMYhSmFBQ+LLJugbUevXHQ67pAnQ9GhkSaKDnGjPBY6HZ446Ai0Hi86Y7YOK1J+SgtOHJFj7EHRacTK1uUcDf/1Ml1rb2zvNug4+lw+Be9SvHisGjMSucsQrs809fEFPLNi/tFW6ZlP2uMTZ420aFwT7GVnhk4JI5095I8BnWtFwZrA9WTbHrV6rJnyLlgOS6Ux9HOQj9ULlmRt29l+JQediS9Sz9Cp2OhAqaotdVD2lZl85un41kXioEP2sWVedPxLivzUEZsBdMbOgk8T355vJPZiTf7W6FASpYSKh0poR9T7kfUwRcLjDirVkI/ABpAeqznpRgtCLIowqFU2AC61sauUDxg6A1xT6MXK6brVtxgIAehXpsd37THn9mL7niyeMgxXCurnhrGsbSi0YzSEXGw76PR9C9DV2J4VR7bR6aaLdOpUY81Gpp12YoiATgtuedGpx3pBdLwLqpM4LrXZS00+dPL4ICX6V75BGlSF3hIddSZI2vrsdCUDLIlTGZcT1NOwA9uMUygx180z6IYqr07P1pokzLadSZ2pNxoFKqGqvhNYakV23YPOlIr3RKJAwYjhGl2W1BugmO2FoYo3x6BfpAMBt8YO7u3YEKPM2aKDzth6hMsmEh0OGtHD+524jU41kchbvNOdeLNsAZ1JotP2opPHZvrR8Q5vfdJIMm4KosMWXvOoAvF9NVytuJXeQcvg7Gy9WGommF8qMenxBcbZctPzkVdn4HrmVrJM1JWimNpysT4722rj5dOj0YjK86FvqbZQH43ylpxn6FSRU6hka9i8A7D0G3k09uy1kIwXHTo4wj6ULzoihlkFaQedlHVUTq40neaFML1Ts3inCFzWdkSBpXeGXnTaaMSUbRmL6Ox518+4WH40KtoyzI9O31noTuMTdDbgGTv920o2bQ2Gmy7Lsqro0gy4hrs4M9YbxdbGGSocfSbpiirLpmIoq/XWZQOOSvI6mqOCk5iSFAhHs97L1Exl6NCR7THDjiTaNOerWLMhQ8p4jq/LUpGURdfIzZ9gVoGLTmJqA0a1X5jNhq4qoiN6Mhhsmw1VqmsVCNhi26IeYrvtUeczqAIJzSKgEtaPTtIxNvawCRQdnKt7t/56wlxfrXRtLnFEXshgWAufnhl6UGLNdePsCPhqBWUIJ83BlF7p2w9FrFBr1jIIxky0wRxO5a0mIng2OhMqAGx0amCNor44oKNYYOuoXt4RqJCJg/NUc8MEm7wDL29SlqD2bzwMnUrSUooe2cbQKQmuRY32f95+vpmkDpgFbgNALTas11MnwY8OPNqzW4/dGFlQlaLPCQwhewmTJ9JiwRHu9NLQgqJNNrWzU7i3Xkh2ZOTGJbQubX/WSo7Kx9IJnnD9Frg8tGUNamIWgCE40Ox5rHMUqwuC0Oh2SBWBGNIu9JhmH8S67htb1OGEQey7CTV7totUpwLSOuqoFKsjjnQG9+2BspRgK9bnBCHZEmDm4PxJOykhML5DTuAGI0yoH4qcYLNvdhpLiTxXohKsAWBw+JoK8Ad9rBBrYfsSLBmsQre7cKNYSSR8kjpeOcYyvXf68giPp3YYi/UKRJwIekeTN9BR4SoRZV1brRcGnhByQ1SBG3XrAE9i1Go1sSmZ9F4936zXxHy3PsSgTKvVmpTgZj3d6tFITr9VHOVH3YM66TebPYEIaJKNoUQBe11otbru5yK4fDxOsztazlkRUGGxCh5GvtlqlZLpViuNr03m99OjdLmQFQvNVrGXgNcUW81eo9dsdZvN5kGPlJqjbj5JuGKzRXkvOaK3uu1hB6pqptPNkm0rZnvTcv2gZHWcGx6UoeIxl+o28yC0hsVWFwTDEJ6uo5Cswmvy1C8tlkErYdW1erM1thih+C7ozDT97PTscmGAWypL3MJQgz6mqhoLUZJlRTMWl1BW1979rFfhHaOBW/G3Kkvs3/xBHiH8aPc7kb8LiVsuhIfsBnmnyKx0cblaGroOg796vJppZvBp0dRmq9OVoSm6bixXlzcfdPxPoVrUZxF+Y6QulspyaeDB4fLj5abDs1o+lvGIcGMJ5Ra/liyCXtS5+7854hwJwC03sqCkoyVjYz53tw/9/BK0mSn6myVLmkmybsxNwy9SOUWeG7r9gatdDsEHIdOQwas5eny0BNdUcdX+TAEHdAnXj84MOerIlR29V9pMfSba0UIxTFNVLsB2O1tatkZieSbLxoWimqahLI524PxTSF5swjNfLBTNNEy0l0XtyBTBWDvCdKg5vaosQvYg8rf6zsuO3onktRCyCMDPTeAe1cJNWl7IFytL2XAqcI7noEqHuDkf9l2yRDW+o2iqbnfC5DUMafSis0Wzy08vb/A6RUUh4o3pCDt6F5IoOLPLrQhK+qksyGdRp0dZZSTRUNSEKP06vNPfBiUuARxprudIJPcI2mMFzYKEcqpFehUzFfQQbg2e3/hp2B3dniTUJGTZITkz1LcU5dMlk2mz5Wn4AV/4uV4el+uM2R2/sLSjcOJnJk8UCT/fFnJTvbzwGmLzi0t1Ex9BUBcc3bgTfZrEju5GMxkm/VxSSU5Tg0pDeCz79TwvPw6qKF7W0Cqf4zetdkrnvROHaWnAIcaMmMHozKai2eAwTsJtC8rtcq93dAeSV4CKPoehl0M8mS1EmUXGHLiF+r8nEPlPpplARDLDFA9Fvs1HkW1K2IeD0/SqaObheS7iY5gO5cbBc3Ay3jUBEZfHOfGO3pRQ8if22rtytxDvlxCdvrW2l/R+msrTJrZjV3R3V4RmAhJnnd/+tCF/20iyTD8xJjwmM4Ns6J8oyp3Sf6SFQLZ4THGuVEyVxls93noQnaT35KjK/pAn8bpdQyrkcJlOxMfIKBV9C6elScl/RBhXCDQtMcx75wYXt0/BaHhzJWt7JZEMiwIRCvHUAA+PqBQqFXtRPbd5rg9fqsBD8QG+u9qkeygqA1LbchSLh1RJWoPxphJNI5ohzG749K5k+T40exoeCzfHLapkSaWPuYVb5olgJW14sruq3hX3HGbud1jqABfC3XyCJCK/wT7yPpAcWwn0NnUwVzrYGsK1PI/E6Yg3smTgO5mkC0VyA8KV8b3DBKlgWsrEGre4832nrM232SGm5h/APEyQ3ISufBcAGeEW50kgSSpPuFMB8zxAzc8WGykFbklzBra21Q+6MXEb40AjCBljt0Y4ulhStFouWvyN85Zv9PBKBlOR7GEpWMxkCaEGdjxFpxkTCbQGG29r6sc92PLef7MFVi3+bFiJ0tazPBna6WzsNAHrn9zI8zNNny0kSaFG88WtcKJIv8RVI/2SVZBvd5znO5M8kwVjZyZ0OVKDSZjPkAptqZXUto3n/SStrK+4gZbXVDCzCWeq85lnyguqiqCplxKL2GiyKG/3QCcASp3me5aIMO4PyXDS7BRLtVimFquQzLDVIJNhGeGrFcdZIV/rYw+FfGbY5EipQlMSaerbkMtNK5NYJhtLlLoE8IxPpmRvEBMn+bF4UKuUh/FYkuzD0OXaFTKu1WLZUgzlYLcKqqeEb6RJb/Ue/GcwbHFkku6DzEykS2QQn8TJJCb2rKynWsmaQIVUtUbirQlMpGF7Ih6QcUwgg0GLbrPC3RMDgbDT4WqeI4OHhCYaD+pxqN8GXNyH/8d4ctAhyWkFc8OzCOeWw+KDNKfo0A1WCYJfd9XmxOSlIw22vC0AAASbSURBVFO1v0qlavSue+qKdHqTA5oGdKmUBQYqwqClhmK6US0l4/HkuAMSrcVVUqRE51GdJ9CFGt29AzOx15ikclTUV2mKPGmM40KRT/aERoEkJ5UJV8wOS0Ktj2qnwxdJsjYimBHXyScS5UQjPeGbJDVBydQTh8PsaGB9QW86BMjEOonjS4ugNxo1AGzcyNYHiR5tczZNZ3cc+KqFopBQbuKbcWhiZsiPELsBznqYcLhPTEgkAGqny51eBZP1+llHZAMlsSeZwhCP2m50RZKPp9oNIvRujw6lxIIn0tL6rDhAAZUtOCJa30mWloRuP8yxz1rcbD/U8cgh3P3VTWYKgxRppaoCSQ9IMUWaZByPZ8mIJ3kq8ZpUhFH5NikR/oCUU1U6oHngPxEkyLQBva3BVJ+AoK9XqiJypVjsk1yeZFDCTAkyYa5HqnmSaHMpnBCgdhqjyYRwbPtVrcyNBnFOwOGCyuD9mEgHGJWBr60iWZrjg5vW9kic6juQm5k2glmsxKmkq+Kb+oRH3skB+9XczS/xZLbaJx0qjh0DZGBlkPZpbaMsDwwInUzeUu8wEk2DfkmRZndcqhqMP5hkRLa45WhuUtN5dVuzLpHHVD8c7xHIKZDLLVBv0PBskWSqfBd+1MakRvV2ZZhI9giWohpzWCVdW5CPQHgLcdIYAS4cSPJerpPiiqhMDlB/pWuZOCnVQFB0a8ilmWqmNCDxIellocJGXUAm4Ct0IBoAZysJE4JLlTDxvSY0+mIPL/KllGPdITPRHSzwyryldhoCVNgY8KDvqSwbI5DAVgWsNp8EvYPl4si6VcopMIWI0M8mbF1Eu4WbSGhtAg/WHthv8Xf+OAIP7COj2gEwCCoVRGdu7as+A2Dwhqbf0i3i8mjBNJLxPmjgfm1AyplBZzJEm2xc50aTSi1ZTFW7OKPGhQzIwWzPGgwUKNPkgGrXTLHRKAkAACqNcpxrDaitNOwkYYTTmSHX6wkjFCQ92vlCUegVhBFHYvFsOVNt1VI9eHE/aY27WBmL9dQgm+wm46RZyg6KicwQeaMJegEZIi4II2ujXQZVd4/aLs2SkE5kgB26qQEVw412o1MCnLh6Skw2E1hzQhxCo8V8DZPduVq9Fid71dyEZhYLRZCriSFAxFXBsAZeGhBo4TuoHZdEiccvx0trmoKP6NjL0vqM4DqPePOeKkY9wiWBcL7xuKEtO8wRPBBKJFnwFYbQ00lNoMYwbgoRKhlLOUxwCBpMpYIGgr9g+BsiqcD/UvSmgGYuScYTJAP/wwG1nKoER7IiloYKKzUOKscHKrTJicakwsOz6J/A5IYHk/Cm5CRL7AegSIUlYNUqOdKgNhmfgpfRpE/6KC02sYqJmUmNvlaoDBo8HuEHFTaAiSvwIniM5FGuN5JJwU4abQzoazLweCbilLKbieNEWZEw9nwpiXPrjBVeMefvGOos/fPWS/nGu6Ql35Iq96yTz0T6YWhV3IuEhEBmssogCYQ4bkM3nEH2Pqlwz86GUvye8cNtQybcnP3926Ff5NS1X0/C6452tKMd7WhHO9rRjna0ox3taEe/BP1/3MI54/dm7kAAAAAASUVORK5CYII='}}
          />
          <Text style={{fontSize: 25}}>Welcome to SLCM App</Text>
          <TextInput
            style={{height: 50, width: 420, fontSize: 15, textAlign: 'center'}}
            placeholder="Username"
            onChangeText={(text) => this.setState({username: text})}
          />
          <TextInput
            style={{height: 50, width: 420, fontSize: 15, textAlign: 'center'}}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => this.setState({password: text})}
          />
          <Button
            onPress={this.login.bind(this)}
            title="Login"
            color="#841584"
          />
          <BusyIndicator />
      </View>
    );
  }
}

class AttendanceScreen extends Component 
{
  static navigationOptions = {
    title: 'Attendance',
    header: null
  };

  render() 
  {
    attendance = global.globalData.attendance;
    return(
        <ScrollView>
          {
            attendance.map(function(item, id){
              if(item.percentage>=85) {
                color = "#90ee90"
              }
              else if(item.percentage>80 && item.percentage<85){
                color = "#ffffe0"
              }
              else{
                color = "#ff4500"
              }
              return (
                <Card key={id}>
                  <CardTitle>
                    <Text style={{backgroundColor: color, fontSize: 26, fontFamily: 'Roboto'}}>{item.name}</Text>
                  </CardTitle>
                  <CardContent style={{textAlign: 'center'}}>
                    <Text style={{fontSize: 20}}>Subject Code: {item.subject_code}</Text>
                    <Text style={{fontSize: 20}}>Total: {item.total}</Text>
                    <Text style={{fontSize: 20}}>Present: {item.present}</Text>
                    <Text style={{fontSize: 20}}>Absent: {item.absent}</Text>
                    <Text style={{fontSize: 20}}>Percentage: {item.percentage}</Text>
                  </CardContent>
                </Card>
              )
            })
          }
        </ScrollView>
    );
  }
} // end of the AttendanceScreen

class ProfileScreen extends Component 
{
  static navigationOptions = {
    title: 'Profile',
    header: null
  };

  render() 
  {
    profile = global.globalData.profile;
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={material.display1}>Profile Details -</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={material.headline}>Name: {profile.username}</Text>
        <Text></Text>
        <Text style={material.headline}>Roll No.: {profile.roll_no}</Text>
        <Text></Text>
        <Text style={material.headline}>Enrollment No.: {profile.en_no}</Text>
        <Text></Text>
        <Text style={material.headline}>Application No.: {profile.app_no}</Text>
      </View>
    );
  }
} // end of the ProfileScreen


class AboutUsScreen extends Component 
{
  static navigationOptions = {
    title: 'About Us',
    header: null
  };

  render() 
  {
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={material.display1}>Developed By</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <TouchableOpacity onPress={() => {Linking.openURL("https://github.com/nishantsahoo");}}>
          <View>
            <Text style={
              {
                textDecorationLine: 'underline',
                fontSize: 20
              }
            }>Nishant Sahoo</Text>
          </View>
        </TouchableOpacity>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={material.display1}>And</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <TouchableOpacity onPress={() => {Linking.openURL("https://github.com/HarshiniN");}}>
          <View>
            <Text style={
              {
                textDecorationLine: 'underline',
                fontSize: 20
              }
            }>Harshini N.</Text>
          </View>
        </TouchableOpacity>
        <Image
            style={{width: 300 ,height: 130, marginBottom: 35}}
            source={{uri: 'https://assets-cdn.github.com/images/modules/open_graph/github-octocat.png'}}
          />
      </View>
    );
  }
} // end of the NotificationScreen


class UserActivity extends Component
{
  static navigationOptions =
  {
    title: 'Academic Details',
    // headerRight: <Button onPress={this.logout} title= "x" />
  };

  logout() 
  {
    console.log("Logout button pressed");
  }

  render()
  {
    ToastAndroid.showWithGravity(
      'Welcome, ' + global.globalData.profile.username + '!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
    const MainNavigator = TabNavigator({
      profile: { screen: ProfileScreen },
      attendance: { screen: AttendanceScreen },
      aboutus: {screen: AboutUsScreen }
    });

    return (
        <MainNavigator />

    );
  }
}

export default Project = StackNavigator(
  {
  First: { screen: LoginActivity },
  Second: { screen: UserActivity }
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