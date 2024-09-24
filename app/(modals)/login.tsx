import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import {useWarmUpBrowser} from'@/hook/useWarmUpBrowser'
import {defaultStyles} from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors'

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook'
}

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();

  const {startOAuthFlow: googleAuth} = useOAuth({strategy:'oauth_google'});
  const {startOAuthFlow: appleAuth} = useOAuth({strategy:'oauth_apple'});
  const {startOAuthFlow: facebookAuth} = useOAuth({strategy:'oauth_facebook'});

  const onSelectAuth = async (strategy:Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth
    }[strategy];

    try {

      const { createdSessionId,setActive} = await selectedAuth();
      console.log("🚀~ login.tsx:31 ~ onSelectedAuth ~ createdSessionId",createdSessionId)

      if(createdSessionId){
        setActive!({session: createdSessionId});
        router.back();
      }
      
    } catch (err) {
      console.log('OAuth Err',err)
    }
  }

  return (
    <View style={styls.container}>
      <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField,{marginBottom:30}]}/>
      <TouchableOpacity style={defaultStyles.btn}>
        <Text>Continue</Text>
      </TouchableOpacity>
      <View style={styls.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styls.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styls.btnOutline}>
          <Ionicons name="mail-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styls.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styls.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styls.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styls.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styls.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styls.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styls.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styls = StyleSheet.create({
      container:{
        flex:1,
        backgroundColor:'#fff',
        padding:26,
      },
      seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
      },
      seperator: {
        fontFamily: 'mon-sb',
        color: Colors.grey,
        fontSize: 16,
      },
      btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
      },
      btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb',
      },
})

export default Page;