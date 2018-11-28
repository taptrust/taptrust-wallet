import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import TokenItem from '../TokenItem';
const { width, height } = Dimensions.get('window');

class TokensList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    console.log('Data', this.props.data);
  }


  render() {
    if (this.props.data === false){ return (null); }
    let tokensListInner;
    console.log('data -> ' + this.props.data);
    if (this.props.data.length > 0) {
      tokensListInner = (
        <ScrollView style={{flex: 1}}>
                  {this.props.data.map((item, i) => {
                    return (
                        <TokenItem item={item} key={i}/>
                    )})
                  }
        </ScrollView>
    );
    } else {
      tokensListInner = (
        <View>
        <View>
      <Text style={{
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        alignContent: 'flex-end'
      }}>You do not currently have any tokens.</Text>
      </View>
      <View>
    <Text style={{
      color: 'white',
      marginTop: 15,
      textAlign: 'center',
      fontSize: 24,
      textDecorationLine: 'underline',
      alignContent: 'flex-end'
    }}>Buy Tokens</Text>
    </View>
    </View>
  );
    }
    return (
      <View style={styles.tabContent}>
        {tokensListInner}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});


export default withNavigation(connect(mapStateToProps)(TokensList));