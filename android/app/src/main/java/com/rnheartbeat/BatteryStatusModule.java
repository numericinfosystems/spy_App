package com.rnheartbeat;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
public class BatteryStatusModule extends ReactContextBaseJavaModule  {
     public BatteryStatusModule(ReactApplicationContext reactContext) {

         super(reactContext);
     }

     @Override
     public String getName() {
    return "BatteryStatus";
}

@ReactMethod
public void getBatteryStatus(Callback successCallback) {
     Intent batteryIntent = getCurrentActivity().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
     int level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
     int scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);

     if(level == -1 || scale == -1) {
         level = 0;
     }

     Log.d(String.valueOf(level), "gfw------------>");
//     Log("battery levelfwjfbwjkbfkwjfbkjwbfkjwfbkjwbf");
    // System.out.print(level);
//    System.out.print("battery levelfwjfbwjkbfkwjfbkjwbfkjwfbkjwbf");
     successCallback.invoke(level);
    }
 }