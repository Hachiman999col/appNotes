package com.myapp.data.database

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
class NotesDao(context: Context) {
    private val dbHelper = NotesDatabaseHelper(context)


    //---- get
    fun getAllNotes(): Cursor{
        val db = dbHelper.readableDatabase
        return db.rawQuery("SELECT * FROM NOTAS ORDER BY id DESC", null)
    }
    fun getNotesByFolder(folderName: String): Cursor {
        val db = dbHelper.readableDatabase
        return db.rawQuery("SELECT * FROM NOTAS WHERE folder = ? ORDER BY id DESC", arrayOf(folderName))
    }
    fun getNotesById(id: Int): Cursor {
        val db = dbHelper.readableDatabase
        return db.rawQuery("SELECT * FROM NOTAS WHERE id = ? ORDER BY id DESC", arrayOf(id.toString()))
    }
    fun getNotesCountByFolder(): Cursor {
        val db = dbHelper.readableDatabase

        return db.rawQuery(
            "SELECT folder, COUNT(*) as total FROM NOTAS GROUP BY folder",
            null
        )
    }

    fun getNotesWithFolderInfo(): Cursor {
        val db = dbHelper.readableDatabase
        val query = """
        SELECT 
            NOTAS.*, 
            FOLDER.color AS folderColor, 
            FOLDER.icon AS folderIcon 
        FROM NOTAS 
        INNER JOIN FOLDER ON NOTAS.folder = FOLDER.title
    """.trimIndent()

        return db.rawQuery(query, null)
    }
    //--- insert
    fun insertNote(title: String, content: String, date: String, folder: String): Long {
        val db: SQLiteDatabase = dbHelper.writableDatabase

        val values = ContentValues().apply {
            put("title", title)
            put("content", content)
            put("dateCreated", date)
            put("folder", folder)
        }


        return db.insert("NOTAS", null, values)
    }

    //--- updates
    fun updateNote(id: Int, title: String, content: String,dateCreated: String): Int {
        val db = dbHelper.writableDatabase
        val values = ContentValues().apply {
            put("title", title)
            put("content", content)
            put("dateCreated", dateCreated)
        }

        return db.update("NOTAS", values, "id = ?", arrayOf(id.toString()))
    }

    //--- deletes
    fun deleteNote(id: Int): Int {
        val db = dbHelper.writableDatabase
        return db.delete("NOTAS", "id = ?", arrayOf(id.toString()))
    }

    fun deleteAllNote(): Int {
        val db = dbHelper.writableDatabase

        return db.delete("NOTAS", null, null)
    }
}