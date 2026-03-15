package com.myapp.modules.folders

import com.myapp.utils.CursorReorderFolder
import com.myapp.data.database.FolderDao

import com.facebook.react.bridge.*
import android.content.ContentValues

class FolderModule(reactContext: ReactApplicationContext)  :
    ReactContextBaseJavaModule(reactContext){
    private val folderDao = FolderDao(reactContext)

    override fun getName(): String {
        return "FolderModule"
    }

    @ReactMethod
    fun getAllFolders(promise: Promise) {
        try {

            val cursor = folderDao.getAllFolders()
            val notesArray = CursorReorderFolder.reorderFolder(cursor)
            promise.resolve(notesArray)

        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }
    @ReactMethod
    fun getFolderById(id:Int, promise: Promise) {
        try {

            val cursor = folderDao.getFolderById(id)
            val notesArray = CursorReorderFolder.reorderFolder(cursor)
            promise.resolve(notesArray)

        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }

    @ReactMethod
    fun getFolderByTitle(title:String, promise: Promise) {
        try {

            val cursor = folderDao.getFolderByTitle(title)
            val notesArray = CursorReorderFolder.reorderFolder(cursor)
            promise.resolve(notesArray)

        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }
    @ReactMethod
    fun insertFolder(folder: ReadableMap, promise: Promise) {
        try {

            val title = if (folder.hasKey("title")) folder.getString("title") else ""
            val icon = if (folder.hasKey("icon")) folder.getString("icon") else ""
            val dateCreated = if (folder.hasKey("dateCreated")) folder.getString("dateCreated") else ""
            val color = if (folder.hasKey("color")) folder.getString("color") else ""
            val id = folderDao.insertFolder(
                title ?: "",
                icon ?: "",
                dateCreated ?: "",
                color ?: ""
            )
            if (id != -1L) {
                promise.resolve(id.toInt())
            } else {
                promise.reject("INSERT_FAILED", "No se pudo guardar la nota en la base de datos")
            }
        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }


    @ReactMethod
    fun updateFolder(folder: ReadableMap, promise: Promise) {
        try {
            val id: Int = if (folder.hasKey("id")) folder.getInt("id") else -1


            if (id < 0) {
                promise.reject("UPDATE_FAILED", "ID de folder no válido")
                return
            }
            val title = if (folder.hasKey("title")) folder.getString("title") else ""
            val icon = if (folder.hasKey("icon")) folder.getString("icon") else ""
                     val color = if (folder.hasKey("color")) folder.getString("color") else ""
            val rowsAffected = folderDao.updateFolder(
                id,
                title ?: "",
                icon ?: "",
                color ?: ""
            )
            if (rowsAffected > 0) {
                promise.resolve(id) // Devolvemos el ID de la nota actualizada
            } else {
                promise.reject("UPDATE_FAILED", "No se encontró la nota para actualizar")
            }
        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }



    @ReactMethod
    fun deleteFolder(id: Int, promise: Promise){
        try {

            val deletedRows = folderDao.deleteFolder(id)

            if (deletedRows > 0) {
                promise.resolve(id)
            } else {
                promise.reject("DELETE_FAILED", "No se encontró la folder con el ID: $id")
            }

        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al eliminar la folder: ${e.message}")
        }
    }
    @ReactMethod
    fun deleteAllFolders(promise: Promise) {
        try {

            val deletedRows = folderDao.deleteAllFolders()

            promise.resolve(deletedRows)

        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al eliminar la nota: ${e.message}")
        }
    }
}