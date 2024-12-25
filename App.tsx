import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import { ThemeProvider } from './src/Settingpage/themecontext'; // Import the ThemeProvider
import HomeScreen from './src/Homepage';
import LoginScreen from './src/loginpage';
import Signup from './src/signup';
import ProfileScreen from './src/profileScreen';
import DashboardScreen from './src/dashboard';
import CoachDetailsScreen from './src/coachDetails';
import PlayerSelectorScreen from './src/playerSelector';
import SettingsScreen from './src/settingscreen';
import PlayerParent from './src/playerparent';
import AddPost from './src/post';
import ClickPost from './src/clickpost';
import HasAcademy from './src/hasAccademy';
import UploadVideo from './src/addVideo';
import MessagesScreen from './src/messages';
import ClickProfile from './src/clickprofile';
import theme from './src/Settingpage/theme';

const Stack = createNativeStackNavigator();

// Common header options
const headerOptions = {
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: '#D3D3D3' },
  headerTitleStyle: { fontWeight: 'bold' },
};

const App = () => {
  return (
    // Wrap the entire app with ThemeProvider
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {/* Home Screen */}
          <Stack.Screen
            name="Welcome"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          {/* Login Screen */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          {/* Signup Screen */}
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={headerOptions}
          />

          {/* Profile and Dashboard */}
          <Stack.Screen
            name="playerParent"
            component={PlayerParent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddPost"
            component={AddPost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ClickProfile"
            component={ClickProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ClickPost"
            component={ClickPost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadVideo"
            component={UploadVideo}
            options={{ headerShown: false }}
          />

          {/* Other Screens */}
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Messages"
            component={MessagesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CoachDetails"
            component={CoachDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlayerSelector"
            component={PlayerSelectorScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HasAcademy"
            component={HasAcademy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="theme"
            component={theme}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
