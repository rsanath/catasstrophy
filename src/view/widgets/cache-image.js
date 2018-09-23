import React, {Component} from 'react'
import {Dimensions, Image, ImageBackground} from 'react-native'
import ImageCache from '../../helpers/image-cache'
import {getHeightForFullWidth} from '../../helpers/application-helper'
import {absPath} from '../../helpers/util'


/**
 * A wrapper for Image component that will download and cache the image and then display it.
 *
 * Props:
 * url - url to the image
 * placeholder - a place holder image until the image is
 *  downloaded (either in the form of {uri: ''} or through require).
 *
 */
export default class CacheImage extends Component {
    state = {}

    constructor(props) {
        super(props)
        this._getImage = this._getImage.bind(this)
    }

    async componentDidMount() {
        const {url} = this.props
        const cachePath = absPath(await ImageCache.get(url))  // #1 download the image

        const callback = (width, height) => {   // #2 get its dimensions
            this.setState({
                width: Dimensions.get('window').width,
                height: getHeightForFullWidth(width, height),
                cachePath
            })
        }
        Image.getSize(cachePath, callback);
    }

    _getDimensions() {
        const screenWidth = Dimensions.get('window').width
        const {width, height} = this.state
        return width && height ?
            {w: width, h: height} :
            {w: screenWidth, h: screenWidth}
    }

    _getImage() {
        const {cachePath} = this.state
        return cachePath ? {uri: `file://${cachePath}`} : this.props.placeholder
    }

    render() {
        const {w, h} = this._getDimensions()

        return (
            <ImageBackground style={{width: w, height: h, ...this.props.style}} source={this._getImage()}>
                {this.props.children}
            </ImageBackground>
        )
    }
}