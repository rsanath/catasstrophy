import {createStackNavigator} from 'react-navigation';
import HomeScreen from "./home";

const RootNavigator = createStackNavigator({
    Home: HomeScreen,
});

export default RootNavigator;