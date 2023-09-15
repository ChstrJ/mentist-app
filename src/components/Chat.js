import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {dummyMessages} from './dummy';
import ChatHeader from './ChatComp/ChatHeader';
import Logo from './Logo';

export default function Chat() {
  const [messages, setMessage] = (dummyMessages)

  return (
    <View className="flex items-center justify-center mt-10">
      <Logo />
      
      
      
    
      {
        messages.length>0? (
           <View className="bg-slate-600">
           <Text>tqweqwe</Text>



           </View>
        ) : (
            <View></View>
        )
        
        
        
    }
















    </View>

     
  );
}
