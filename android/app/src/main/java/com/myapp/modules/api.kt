package com.myapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Arguments
// No uses import com.facebook.react.bridge.* para evitar colisiones

import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Call
import okhttp3.Callback // <--- ESTE ES EL IMPORT CRÍTICO
import okhttp3.Response
import java.io.IOException
import org.json.JSONObject

class ModuleApi(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
private val client = OkHttpClient()

    // El nombre que usarás en JavaScript: NativeModules.ModuleApi
    override fun getName(): String {
        return "ModuleApi"
    }

    // El decorador @ReactMethod hace que la función sea visible en JS
    @ReactMethod
    fun getPokemonData(pokemonName: String, promise: Promise) {
        val url = "https://pokeapi.co/api/v2/pokemon/${pokemonName.lowercase()}"

        val request = Request.Builder()
            .url(url)
            .build()

        // Ejecutar la petición de forma asíncrona en el hilo de red
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                promise.reject("NETWORK_ERROR", "No se pudo conectar con la API", e)
            }

            override fun onResponse(call: Call, response: Response) {
                response.use {
                    if (!response.isSuccessful) {
                        promise.reject("NOT_FOUND", "Pokémon no encontrado")
                        return
                    }

                    val jsonData = response.body?.string()
                    val jsonObject = JSONObject(jsonData)

                    // Extraemos solo lo que necesitamos para enviarlo a JS
                    val result = Arguments.createMap().apply {
                        putInt("id", jsonObject.getInt("id"))
                        putString("name", jsonObject.getString("name"))
                        putInt("weight", jsonObject.getInt("weight"))
                        // Ejemplo de acceso a un objeto anidado (sprites)
                        putString("image", jsonObject.getJSONObject("sprites").getString("front_default"))
                    }

                    promise.resolve(result)
                }
            }
        })
    }
    
}