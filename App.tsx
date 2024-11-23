import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/Homepage'; // Import HomeScreen
import LoginScreen from './src/loginpage'; // Import LoginScreen
import Signup from './src/signup'; // Import SignupScreen
import ProfileScreen from './src/profileScreen'; // Import ProfileScreen
import DashboardScreen from './src/dashboard'; // Import DashboardScreen
import CoachDetailsScreen from './src/coachDetails'; // Import CoachDetailsScreen
import PlayerSelectorScreen from './src/playerSelector'; // Import PlayerSelectorScreen
import SettingsScreen from './src/settingscreen'; // Import SettingsScreen
import playerparent from './src/playerparent'; // Import parent details screen
import AddPost from './src/post'; // Import AddPost screen
import PostsScreen from './src/clickpost'; // Import PostsScreen (clickpost)
import hasAccademy from './src/hasAccademy';
import UploadVideo from './src/addVideo';
import MessagesScreen from './src/messages';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D3D3D3' },
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D3D3D3' },
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D3D3D3' },
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="playerParent"
          component={playerparent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Messages"
          component={MessagesScreen}
          options={{ headerShown: false, }} // Display header for MessagesScreen
        />
        <Stack.Screen
          name="CoachDetails"
          component={CoachDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PlayerSelector"
          component={PlayerSelectorScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#D3D3D3' },
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPost}
          options={{
            headerShown: false,
          }}
        />
        {/* Add PostsScreen to the Stack */}
        <Stack.Screen
          name="PostsScreen"
          component={PostsScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UploadVideo"
          component={UploadVideo}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="hasAccademy"
          component={hasAccademy}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
