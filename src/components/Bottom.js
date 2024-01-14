import React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';

const Bottom = () => {
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'profile', title: 'Profile', icon: 'account' },
    { key: 'settings', title: 'Settings', icon: 'settings' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: () => <Text>Home Content</Text>,
    profile: () => <Text>Profile Content</Text>,
    settings: () => <Text>Settings Content</Text>,
  });

  const renderTab = ({ route, focused }) => {
    return (
      <BottomNavigation.Tab
        key={route.key}
        label={route.title}
        onPress={() => setIndex(routes.findIndex((r) => r.key === route.key))}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: focused ? '#2196F3' : '#fff', // Change the background color as needed
        }}
        labelStyle={{
          color: focused ? '#fff' : '#000', // Change the text color as needed
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={(props) => <BottomNavigation
          {...props}
          renderTab={renderTab}
          activeColor="#2196F3"
          inactiveColor="#000"
        />}
      />
    </View>
  );
};

export default Bottom;
