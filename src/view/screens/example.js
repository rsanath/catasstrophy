import React, {Component} from 'react'
import {View} from 'react-native'
import Article from "../widgets/article";
import CacheImage from '../widgets/cache-image'

export default class Example extends Component {

    render() {
        const a = () => {}

        return (
            <View style={{flex: 1}} >
                <CacheImage
                    placeholder={require('../../assets/images/image_placeholder.png')}
                    url={'https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg?w=640&ssl=1'} >

                </CacheImage>
                <Article
                    onLike={a}
                    onUnlike={a}
                    onShare={a}
                    onSave={a}
                    liked={false}
                    image={'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'}/>
            </View>
        )
    }
}
