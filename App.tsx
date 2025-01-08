import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all screens
import { ThemeProvider } from './src/Settingpage/themecontext'; // ThemeProvider for theme context
import HomeScreen from './src/Homepage'; // Home screen
import LoginScreen from './src/loginpage'; // Login screen
import Signup from './src/signup'; // Signup screen
import ProfileScreen from './src/profileScreen'; // Profile screen
import DashboardScreen from './src/dashboard'; // Dashboard screen
import CoachDetailsScreen from './src/coachDetails'; // Coach Details screen
import PlayerSelectorScreen from './src/playerSelector'; // Player Selector screen
import SettingsScreen from './src/settingscreen'; // Settings screen
import AddPost from './src/post'; // Add Post screen
import ClickPost from './src/clickpost'; // Click Post screen
import HasAcademy from './src/hasAccademy'; // Has Academy screen
import UploadVideo from './src/addVideo'; // Upload Video screen
import MessagesScreen from './src/messages'; // Messages screen
import ClickProfile from './src/clickprofile'; // Click Profile screen

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

          {/* Other Screens */}
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
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
