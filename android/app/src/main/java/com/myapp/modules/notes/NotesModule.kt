package com.myapp.modules.notes

import com.myapp.utils.CursorReorderNotes
import com.myapp.data.database.NotesDao
import com.facebook.react.bridge.*
import android.content.ContentValues

class NotesModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private val notesDao = NotesDao(reactContext)


    override fun getName(): String {
        return "NotesModule"
    }

    // methods

    @ReactMethod
    fun getAllNotes(promise: Promise) {
        try {

            val cursor = notesDao.getAllNotes()
            val notesArray = CursorReorderNotes.reorderCursorNote(cursor)
            promise.resolve(notesArray)

        } catch (e: Exception) {
            // Si algo falla, rechazamos la promesa con el mensaje de error
            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }

    @ReactMethod
    fun getNotesByFolder(folder: String, promise: Promise) {
        try {

            val cursor = notesDao.getNotesByFolder(folder)
            val notesArray = CursorReorderNotes.reorderCursorNote(cursor)
            promise.resolve(notesArray)

        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }

    @ReactMethod
    fun getNotesWithFolderInfo( promise: Promise) {
        try {

            val cursor = notesDao.getNotesWithFolderInfo()
            val notesArray = CursorReorderNotes.reorderCursorNotesWithFolder(cursor)
            promise.resolve(notesArray)

        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }


    @ReactMethod
    fun getNotesById(id: Int, promise: Promise) {
        try {

            val cursor = notesDao.getNotesById(id)
            val notesArray = CursorReorderNotes.reorderCursorNote(cursor)
            promise.resolve(notesArray)

        } catch (e: Exception) {
            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }
    @ReactMethod
    fun getNotesCount( promise: Promise) {
        try {

            val cursor = notesDao.getNotesCountByFolder()
            val notesArray = CursorReorderNotes.reorderNoteCount(cursor)
            promise.resolve(notesArray)

        } catch (e: Exception) {
            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }
    @ReactMethod
    fun insertNote(nota: ReadableMap, promise: Promise) {
        try {
            val title = if (nota.hasKey("title")) nota.getString("title") else ""
            val content = if (nota.hasKey("content")) nota.getString("content") else ""
            val dateCreated = if (nota.hasKey("dateCreated")) nota.getString("dateCreated") else ""
            val folder = if (nota.hasKey("folder")) nota.getString("folder") else "Default"
            val id = notesDao.insertNote(
                title ?: "",
                content ?: "",
                dateCreated ?: "",
                folder ?: ""
            )
            if (id != -1L) {
                promise.resolve(id.toInt()) // Éxito: devolvemos el ID
            } else {
                promise.reject("INSERT_FAILED", "No se pudo guardar la nota en la base de datos")
            }
        } catch (e: Exception) {
            promise.reject("SQL_ERROR", "Error al leer las notas: ${e.message}")
        }
    }

    @ReactMethod
    fun updateNote(nota: ReadableMap, promise: Promise) {
        try {

            val id: Int = if (nota.hasKey("id")) nota.getInt("id") else -1


            if (id < 0) {
                promise.reject("UPDATE_FAILED", "ID de nota no válido")
                return
            }

            val title = if (nota.hasKey("title")) nota.getString("title") else ""
            val content = if (nota.hasKey("content")) nota.getString("content") else ""
            val dateCreated = if (nota.hasKey("dateCreated")) nota.getString("dateCreated") else ""


            val rowsAffected = notesDao.updateNote(
                id,
                title ?: "",
                content ?: "",
                dateCreated ?: ""
            )

            if (rowsAffected > 0) {
                promise.resolve(id) // Devolvemos el ID de la nota actualizada
            } else {
                promise.reject("UPDATE_FAILED", "No se encontró la nota para actualizar")
            }
        } catch (e: Exception) {
            promise.reject("SQL_ERROR", "Error al actualizar la nota: ${e.message}")
        }
    }

    @ReactMethod
    fun deleteNote(id: Int, promise: Promise){
        try {

            val deletedRows = notesDao.deleteNote(id)

            if (deletedRows > 0) {
                promise.resolve(id)
            } else {
                promise.reject("DELETE_FAILED", "No se encontró la nota con el ID: $id")
            }

        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al eliminar la nota: ${e.message}")
        }
    }
    @ReactMethod
    fun deleteAllNotes(promise: Promise) {
        try {

            val deletedRows = notesDao.deleteAllNote()

            promise.resolve(deletedRows)

        } catch (e: Exception) {

            promise.reject("SQL_ERROR", "Error al eliminar la nota: ${e.message}")
        }
    }


}