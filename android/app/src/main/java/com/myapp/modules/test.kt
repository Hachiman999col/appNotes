package com.myapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class MiModuloNativo(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    // El nombre que usarás en JavaScript: NativeModules.MiModuloNativo
    override fun getName(): String {
        return "MiModuloNativo"
    }

    // El decorador @ReactMethod hace que la función sea visible en JS
    @ReactMethod
    fun saludar(nombre: String, promise: Promise) {
        try {
            val mensaje = "Hola $nombre desde Kotlin!"
            promise.resolve(mensaje) // Enviamos el resultado de vuelta
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
    
}