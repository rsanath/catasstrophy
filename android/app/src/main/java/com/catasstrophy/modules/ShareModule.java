package com.catasstrophy.modules;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class ShareModule extends ReactContextBaseJavaModule {

    public ShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ImageShareModule";
    }

    @ReactMethod
    public void shareImage(String message, String uriToImage) {
        Intent shareIntent = new Intent();
        shareIntent.setAction(Intent.ACTION_SEND);
        shareIntent.putExtra(Intent.EXTRA_STREAM, Uri.parse(uriToImage));
        shareIntent.putExtra(Intent.EXTRA_TEXT, message);
        shareIntent.setType("image/jpeg");
        getCurrentActivity().startActivity(Intent.createChooser(shareIntent, "Share via"));
    }

}