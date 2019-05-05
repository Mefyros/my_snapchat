import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import Register from './Register';
import Login from './Login';
import CameraScreen from './Camera';
import HomeScreen from './Home'
import AuthLoadingScreen from './Auth';

const AppStack = createStackNavigator({ Home: HomeScreen, Camera : CameraScreen});
const AuthStack = createStackNavigator({ SignIn: Login, SignUp: Register });

export default createAppContainer(createSwitchNavigator(
  
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    
  },
  {
    initialRouteName: 'AuthLoading',
    
  }
  
));
