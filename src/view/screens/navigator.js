import {createStackNavigator, createMaterialTopTabNavigator} from 'react-navigation'
import HomeScreen from './home-screen'
import LikesScreen from './likes-screen'

const RootNavigator = createMaterialTopTabNavigator({
    Home: createStackNavigator({Home: HomeScreen}),
    Likes: createStackNavigator({Likes: LikesScreen}),
}, {
    tabBarComponent: null
});

export default RootNavigator;